import { LoginUser, SignUpUser, User, UserMovieType } from "../lib/types";
import { axiosApiInstance } from "./axiosInstance";

export const signUp = async (user: SignUpUser) => {
    try {
        const response = await axiosApiInstance.post("/users", user)
        return response
    } catch (error) {
        console.error(error)
    }
}

export const loginUser = async (user: LoginUser) => {
    try {
        const response = await axiosApiInstance.post("/login", user)
        return response.data
    } catch (error: any) {
        if (error.response.data.message) {
            throw new Error(error.response.data.message)
        }
        throw new Error(error.message + "")
    }
}

export const addMovieForUser = async (userId: string, movie: UserMovieType): Promise<UserMovieType | undefined> => {
    try {
        const response = await axiosApiInstance.post(`/users/${userId}/movies`, movie)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const editUser = async (userId: string, user: FormData): Promise<User | undefined> => {
    try {
        const response = await axiosApiInstance.put(`/users/${userId}`, user)
        return response.data
    } catch (error: any) {
        console.error(error)
        throw Error(error.message)
    }
}