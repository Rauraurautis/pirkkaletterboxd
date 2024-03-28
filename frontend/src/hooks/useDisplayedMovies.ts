import { MovieType } from "../lib/types"

export const useDisplayedMovies = () => {

    const movies = localStorage.getItem("movies")

    if (movies) {
        const parsedMovies = JSON.parse(movies) as MovieType[]
        return parsedMovies
    }
    return []
}