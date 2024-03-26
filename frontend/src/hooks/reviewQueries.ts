import { useState } from "react"
import { ReviewType } from "../lib/types"
import { useQuery } from "@tanstack/react-query"
import { getAllReviews, getAllReviewsForMovie, searchForReviewsByTitle } from "../services/reviewServices"

export const useAllReviewsQuery = () => {
    const [reviews, setReviews] = useState<ReviewType[]>([])

    const { isPending } = useQuery({
        queryKey: ['allReviews'],
        queryFn: async () => {
            const reviews = await getAllReviews()
            if (reviews) setReviews(reviews)
            return reviews ?? []
        },
        refetchOnWindowFocus: false
    })

    return { reviews, isPending }
}

export const useLatestReviewsQuery = () => {
    const [reviews, setReviews] = useState<ReviewType[]>([])

    const { isPending } = useQuery({
        queryKey: ['allReviews'],
        queryFn: async () => {
            const reviews = await getAllReviews()
            if (reviews) {
                setReviews(reviews.reverse().slice(0, 6))
            }
            return reviews ?? []
        },
        refetchOnWindowFocus: false
    })

    return { reviews, isPending }
}

export const useReviewsForMovieQuery = (movieId: number) => {
    const [reviews, setReviews] = useState<ReviewType[]>([])

    const { isPending } = useQuery({
        queryKey: ['allReviewsForMovie'],
        queryFn: async () => {
            const reviews = await getAllReviewsForMovie(movieId)
            setReviews(reviews)
            return reviews
        },
        refetchOnWindowFocus: false
    })

    return { reviews, isPending }
}

export const useReviewSearchQuery = (movie: string | null) => {
    if (movie) {
        const { isPending, data, refetch } = useQuery({
            queryKey: ['allReviewsForSearchedMovie'],
            queryFn: async () => {
                const reviews = await searchForReviewsByTitle(movie)
                if (!reviews) return []
                return reviews
            }
        })


        return { reviews: data, isPending, refetch }
    } else {
        const { isPending, data } = useQuery({
            queryKey: ['allReviews'],
            queryFn: async () => {
                const reviews = await getAllReviews()
                if (!reviews) return []
                return reviews
            },
            refetchOnWindowFocus: false
        })
        return { reviews: data, isPending }
    }

}

