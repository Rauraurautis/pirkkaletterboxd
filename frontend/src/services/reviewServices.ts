import { ReviewType } from "../lib/types"
import { axiosApiInstance } from "./axiosInstance"

export const addReviewForMovie = async (review: Omit<ReviewType, "user">) => {
    try {
        const response = await axiosApiInstance.post("/reviews", review)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const getAllReviews = async (): Promise<ReviewType[] | undefined> => {
    try {
        const response = await axiosApiInstance.get("/reviews")
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const searchForReviewsByTitle = async (title: string): Promise<ReviewType[] | undefined> => {
    try {
        const response = await axiosApiInstance.get(`/reviews?movie=${title}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}


export const getAllReviewsForMovie = async (movieId: number) => {
    try {
        const response = await axiosApiInstance.get(`/reviews/${movieId}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}
