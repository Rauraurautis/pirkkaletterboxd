import { jwtDecode } from "jwt-decode"
import { TokenPayload } from "../types"

export const getUser = () => {
    const accessToken = localStorage.getItem("accessToken")

    if (accessToken) {
        const { user }: TokenPayload = jwtDecode(accessToken)
        return user
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