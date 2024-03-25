import { create } from "zustand"
import { MovieType } from "../types"


interface AppStateStore {
    fetchedMovies: MovieType[]
    setFetchedMovies: (movies: MovieType[]) => void
}

export const useAppStateStore = create<AppStateStore>((set) => ({
    fetchedMovies: [],
    setFetchedMovies: (movies: MovieType[]) => {
        console.log(movies)
        set(state => ({ ...state, fetchedMovies: movies }))
    }
})) 
