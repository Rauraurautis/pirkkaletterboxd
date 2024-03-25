import { create } from "zustand"
import { User, UserMovieType } from "../types"
import { jwtDecode } from "jwt-decode"


type AuthStore = {
    user: User | null
    userToken: string
    loggedIn: boolean
    setUser: (user: User) => void
    logout: () => void
    validateToken: (token: string) => boolean
    setNewToken: (token: string) => void
    setUserMovies: (movies: UserMovieType[]) => void
}

type TokenPayload = {
    session: string
    iat: number
    exp: number
    user: UserPayload
}

type UserPayload = {
    _id: string
    email: string
    name: string
    createdAt: string
    updatedAt: string
    __v: number
}


export const useAuthStore = create<AuthStore>(
    (set) => ({
        user: null,
        userToken: "getToken()",
        loggedIn: false,
        setUser(user: User) {
            set(state => ({
                ...state, user: { ...user, movies: [] }, loggedIn: true
            }))
        },
        logout() {
            localStorage.removeItem("accessToken")
            set(state => ({
                ...state, user: null, userToken: "", refreshToken: "", loggedIn: false
            }))
        },
        validateToken(token: string | null) {
            if (token) {
                const decodedToken: TokenPayload = jwtDecode(token)
                const secondsNow = new Date().getTime() / 1000
                return decodedToken.exp > secondsNow
            }
            return false
        },
        setNewToken(token: string) {
            set(state => ({
                ...state, userToken: token
            }))
        },
        setUserMovies(movies: UserMovieType[]) {
            set(state => {
                if (state.user) {
                    return { ...state, user: { ...state.user, movies } }
                }
                return { ...state }
            }
            )
        }


    }))


