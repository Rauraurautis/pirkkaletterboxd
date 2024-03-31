
import { ReviewType, UserMovieType } from "../lib/types"
import { axiosApiInstance, axiosMovieDBInstance } from "./axiosInstance"

export const searchMoviesByName = async (keyword: string) => {
    try {
        const response = await axiosMovieDBInstance.get(`/3/search/movie?query=${keyword}`)
        return response.data.results
    } catch (error) {
        console.error(error)
    }
}

export const searchMoviesByGenre = async (genreId: number) => {
    try {
        const response = await axiosMovieDBInstance.get(`/3/discover/movie?with_genres=${genreId}`)
        return response.data.results
    } catch (error) {
        console.error(error)
    }
}

type UserData = {
    avatar_path: string
    movies: UserMovieType[]
    reviews: ReviewType[]
}

export const getUserData = async (username: string): Promise<UserData | undefined> => {
    try {
        const response = await axiosApiInstance.get(`/users/${username}/movies`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

