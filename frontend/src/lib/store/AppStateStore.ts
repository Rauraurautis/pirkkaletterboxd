import { create } from "zustand"
import { MovieType } from "../types"
import { persist } from "zustand/middleware"


interface AppStateStore {
    fetchedMovies: { type: "searchedMovies" | "popularMovies", movies: MovieType[] }
    setFetchedMovies: (type: "searchedMovies" | "popularMovies", movies: MovieType[]) => void
}

export const useAppStateStore = create<AppStateStore, [["zustand/persist", AppStateStore]]>(
    persist((set) => ({
        fetchedMovies: { type: "popularMovies", movies: [] },
        setFetchedMovies: (type: "searchedMovies" | "popularMovies", movies: MovieType[]) => {
            set(state => ({ ...state, fetchedMovies: { type, movies } }))
        }
    }), { name: "movie-storage" })) 
