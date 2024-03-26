import { FC, memo, useEffect } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { searchMoviesByGenre, searchMoviesByName } from '../../services/movieServices'
import { MovieSearchParams, MovieSearchType } from '../../lib/types'
import { genres } from '../../lib/utils/data'
import { useAppStateStore } from '../../lib/store/AppStateStore'
import { SetURLSearchParams } from 'react-router-dom'

interface MovieSearchFormsProps {
    searchParams: MovieSearchParams
    applySearch: (val: MovieSearchType | null) => void
    setSearchParams: SetURLSearchParams
}



const MovieSearchForms: FC<MovieSearchFormsProps> = memo(({ applySearch, searchParams, setSearchParams }) => {
    const { register: registerNameSearch, handleSubmit: handleNameSubmit, formState: { errors: name_errors }, } = useForm()
    const { register: registerGenreSearch, handleSubmit: handleGenreSubmit } = useForm()
    const setFetchedMovies = useAppStateStore(state => state.setFetchedMovies)

    useEffect(() => {
        if (searchParams.searchMode == "name") {
            (async () => {
                const movies = await searchMoviesByName(searchParams.searchQuery || "")
                setFetchedMovies(movies)
            })()
        } else if (searchParams.searchMode == "genre") {
            (async () => {
                const movies = await searchMoviesByGenre(Number(searchParams.searchQuery + "") || 0)
                setFetchedMovies(movies)
            })()
        }
    }, [])

    const handleNameSearch = async (e: FieldValues) => {
        const movies = await searchMoviesByName(e.name)
        setFetchedMovies(movies)
        applySearch({ searchMode: "name", value: e.name })
    }

    const handleGenreSearch = async (e: FieldValues) => {
        const movies = await searchMoviesByGenre(e.genre)
        setFetchedMovies(movies)
        applySearch({ searchMode: "genre", value: e.genre })
    }

    return (
        <div className="flex w-full lg:w-[50%] justify-around">
            <div className="flex flex-col items-center gap-2">
                <h2 className='underline underline-offset-[5px]'>Search by name</h2>
                <form className="flex flex-col gap-5 items-center" onSubmit={handleNameSubmit(handleNameSearch)}>
                    <input type="text" {...registerNameSearch("name", { required: true })} placeholder='Movie name' className='p-1' />
                    {name_errors.name && <p className="text-red-600">Enter a movie name or a part of a movie name!</p>}
                    <button className="p-2 bg-blue-800 w-fit">Search</button>
                </form>
            </div>
            <div className="flex flex-col items-center gap-2">
                <h2 className='underline underline-offset-[5px]'>Search by Genre</h2>
                <form className="flex flex-col gap-5 items-center" onSubmit={handleGenreSubmit(handleGenreSearch)}>
                    <select
                        className="p-1" {...registerGenreSearch("genre")}
                        onChange={(e) => setSearchParams(prev => {
                            prev.set("searchMode", "genre")
                            prev.set("searchQuery", e.target.value)
                            return prev
                        })}>
                        {genres.map((genre, i) => (
                            <option key={i} value={genre.id}>{genre.name}</option>
                        ))}
                    </select>
                    <button className="p-2 bg-blue-800 w-fit">Search</button>
                </form>
            </div>
        </div>
    )
})

export default MovieSearchForms