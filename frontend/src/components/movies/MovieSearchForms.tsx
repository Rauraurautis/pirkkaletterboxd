import { FC, memo } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { searchMoviesByGenre, searchMoviesByName } from '../../services/movieServices'
import { MovieSearchType } from '../../lib/types'
import { genres } from '../../lib/utils/data'
import { useAppStateStore } from '../../lib/store/AppStateStore'

interface MovieSearchFormsProps {
    setSearchMode: React.Dispatch<React.SetStateAction<MovieSearchType>>

}



const MovieSearchForms: FC<MovieSearchFormsProps> = memo(({ setSearchMode }) => {
    const { register: registerNameSearch, handleSubmit: handleNameSubmit, formState: { errors: name_errors }, } = useForm()
    const { register: registerGenreSearch, handleSubmit: handleGenreSubmit } = useForm()
    const setFetchedMovies = useAppStateStore(state => state.setFetchedMovies)

    const handleNameSearch = async (e: FieldValues) => {
        const movies = await searchMoviesByName(e.name)
        setFetchedMovies(movies)
        setSearchMode({ searchMode: "name", value: e.name })
    }

    const handleGenreSearch = async (e: FieldValues) => {
        const movies = await searchMoviesByGenre(e.genre)
        setFetchedMovies(movies)
        setSearchMode({ searchMode: "genre", value: e.genre })
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
                    <select className="p-1" {...registerGenreSearch("genre")}>
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