import { jwtDecode } from "jwt-decode"
import { TokenPayload } from "../types"
import { getUserData } from "../../services/movieServices"

export const getUser = async () => {
    const accessToken = localStorage.getItem("accessToken")

    if (accessToken) {
        const { user }: TokenPayload = jwtDecode(accessToken)
        const userData = await getUserData(user.name)
        return { user, userData }
    }
    return null
}

export const setAccessToken = (accessToken: string) => {
    if (accessToken) {
        localStorage.setItem("accessToken", accessToken)
    }
}

export const removeAccessToken = (accessToken: string) => {
    if (accessToken) {
        localStorage.removeItemItem("accessToken", accessToken)
    }
}