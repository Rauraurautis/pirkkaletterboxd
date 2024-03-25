import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const axiosMovieDBInstance = axios.create({ baseURL: "https://api.themoviedb.org", headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Yzk1YzdkNDQ2Y2VjZjVmNmJkZjZmNGUyNGQzYmIxZSIsInN1YiI6IjYyMzExNTZlYzNiZmZlMDA0NmNkNzhmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-IWjHj-RML3oHLtM8aVAjLC57BQolVdTpte0yWCW7v0" } })

const backendHost = import.meta.env.MODE === "development" ? "http://localhost:1337/api" : "http://80.220.95.201/api"
console.log(import.meta.env.MODE)
export const axiosApiInstance = axios.create({
    baseURL: backendHost
    , withCredentials: true
})

type tokenPayload = {
    email: string
    name: string
    createdAt: string
    updatedAt: string
    __v: number
    session: string
    iat: number
    exp: number
}


export const getToken = () => {
    const token = localStorage.getItem("accessToken")
    if (typeof token === "string") { return token }
    return ""
}

export const setAccessToken = (token: string) => {
    localStorage.setItem("accessToken", token)
}

const isTokenExpired = () => {
    if (getToken()) {
        try {
            const decoded: tokenPayload = jwtDecode(getToken() as string)
            return decoded.exp < new Date().getTime() / 1000
        } catch (err) {
            console.error(err)
        }


    }
}

const getRefreshedToken = async () => {
    try {
        const result = await axios.get("http://localhost:1337/refresh", { withCredentials: true })
        return result.data
    } catch (error: any) {
        console.error(error.message)
    }

}

const newAccessToken = async () => {
    const data = await getRefreshedToken()
    if (data && typeof data.token === "string") {
        setAccessToken(data.token)
        return data.token
    }

}


axiosApiInstance.interceptors.request.use(async (req) => {
    if (isTokenExpired()) {
        const token = await newAccessToken()
        req.headers["Authorization"] = `Bearer ${token}`
        return req
    }
    const accessToken = getToken()

    req.headers["Authorization"] = `Bearer ${accessToken}`
    return req
})

