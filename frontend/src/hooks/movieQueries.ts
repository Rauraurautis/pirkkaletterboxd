import { useQuery } from "@tanstack/react-query"
import { useCallback, useState } from "react"
import { MovieType, UserMovieType } from "../lib/types"
import { axiosMovieDBInstance } from "../services/axiosInstance"
import { getUserData } from "../services/movieServices"
import { useAppStateStore } from "../lib/store/AppStateStore"

const getPopularMovies = async () => {
    const response = await axiosMovieDBInstance("/3/trending/movie/day?language=en-US")
    const data: MovieType[] = response.data.results
    return data
}

export const usePopularMoviesQuery = () => {
    const setFetchedMovies = useAppStateStore(state => state.setFetchedMovies)

    const { isPending, data } = useQuery({
        queryKey: ['popularMovies'],
        queryFn: async () => {
            const movies = await getPopularMovies()
            setFetchedMovies(movies)
            return movies
        },
        refetchOnWindowFocus: false,

    })

    return { data, isPending }
}

export const useSingleMovieQuery = (id: number) => {
    const [movie, setMovie] = useState<MovieType | null>()
   
    const { data, isFetching } = useQuery({
        queryKey: ['singleMovieData'],
        queryFn: async () => {
            const response = await axiosMovieDBInstance(`/3/movie/${id}`)
            setMovie(response.data)
            return response.data
        },
        refetchOnWindowFocus: false
    })

    return { data, movie, isFetching }
}

export const useUserDataQuery = (username: string) => {
    const [watchedMovies, setWatchedMovies] = useState<UserMovieType[] | undefined>([])
    const [wantedMovies, setWantedMovies] = useState<UserMovieType[] | undefined>([])

    const { data, isFetching, isError, error } = useQuery({
        queryKey: ['userMovieData'],
        queryFn: async () => {
            const data = await getUserData(username)
            if (data) {
                const watched = data.movies.filter(movie => movie.watched)
                const wanted = data.movies.filter(movie => !movie.watched)
                setWatchedMovies(watched)
                setWantedMovies(wanted)
            } else {
                throw Error("User not found!")
            }

            return data.avatar_path ?? ""
        },
        refetchOnWindowFocus: false,
        retry: false
    })

    const setNewWatched = useCallback((movie: UserMovieType) => {
        setWatchedMovies(prev => prev?.concat(movie))
        setWantedMovies(prev => prev?.filter(wantedMovie => wantedMovie.movie.id !== movie.movie.id))
    }, [watchedMovies, wantedMovies])

    return { avatar_path: data, watchedMovies, wantedMovies, isFetching, setNewWatched, isError, error }
}