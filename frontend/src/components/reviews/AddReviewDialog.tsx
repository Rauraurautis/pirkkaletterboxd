import { FC, useCallback, useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { searchMoviesByName } from '../../services/movieServices'
import { MovieType, ReviewType } from '../../lib/types'
import { releaseYear } from '../../lib/utils/utils'
import StarRating from './StarRating'
import { addReviewForMovie } from '../../services/reviewServices'

interface AddReviewDialogProps {
    setReviewDialog: React.Dispatch<React.SetStateAction<boolean>>
}


const AddReviewDialog: FC<AddReviewDialogProps> = ({ setReviewDialog }) => {

    const [searchTerm, setSearchTerm] = useState<string>('')
    const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null)
    const [rating, setRating] = useState<Pick<ReviewType, "rating"> | null>(null)
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const [movieSuggestions, setMovieSuggestions] = useState<MovieType[]>([])

    useEffect(() => {
        const delaySearch = setTimeout(async () => {
            const movies = await searchMoviesByName(searchTerm)
            setMovieSuggestions(movies)
        }, 1000);

        return () => clearTimeout(delaySearch);
    }, [searchTerm]);


    const handleAddReview = async (values: FieldValues) => {
        if (selectedMovie && rating) {
            const review: Omit<ReviewType, "user"> = {
                title: values.title,
                movie: {
                    id: selectedMovie.id, poster_path: selectedMovie.poster_path, title: selectedMovie.title,
                    release_date: selectedMovie.release_date, genre_ids: selectedMovie.genre_ids, original_language: selectedMovie.original_language,
                    original_title: selectedMovie.original_title, overview: selectedMovie.overview
                },
                rating: rating.rating, review: values.review
            }
            const reviewAdded = await addReviewForMovie(review)
            if (reviewAdded) {
                setSelectedMovie(null)
                reset()
                setReviewDialog(false)
            }
        }
    }

    const changeRating = useCallback((rating: Pick<ReviewType, "rating"> | null) => {
        setRating(rating)
    }, [setRating])

    const setMovie = (movie: MovieType) => {
        setSelectedMovie(movie)
        setSearchTerm(`${movie.original_title} (${releaseYear(movie.release_date)})`)
        setMovieSuggestions([])
    }

    return (
        <div className="z-10 min-h-[200px] max-h-[510px] h-[50%] w-[400px] md:w-[700px] bg-zinc-700 absolute left-[50%] overflow-y-auto
        translate-x-[-50%] top-[50%] translate-y-[-50%] rounded-xl flex flex-col items-center gap-5 pt-5 pb-10">
            <div className="absolute left-5 top-5 bg-slate-400 py-2 px-4 hover:brightness-75 ">
                <button onClick={() => setReviewDialog(false)}>Back</button>
            </div>
            <div className="flex flex-col gap-5 items-center  w-full ">
                <div className="flex flex-col items-center gap-2  ">
                    <h2 className='underline underline-offset-[5px]'>Movie name</h2>
                    <div className="">
                        <input type="text" placeholder='Movie name' className='p-1' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        <div className="max-h-[100px] overflow-y-auto bg-slate-600 absolute">
                            <ul>
                                {movieSuggestions.map((movie, i) => (
                                    <li key={i} className="hover:opacity-80 cursor-pointer flex gap-2" onClick={() => setMovie(movie)}>
                                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className='h-[25px]' />
                                        <p>{movie.original_title} ({releaseYear(movie.release_date)})</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {selectedMovie?.poster_path && <img className="max-w-[150px]" src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} />}
                </div>

                <form onSubmit={handleSubmit(handleAddReview)} className="w-full flex flex-col items-center">
                    <div className="flex flex-col items-center gap-4">
                        <h2 className='underline underline-offset-[5px]'>Review title</h2>
                        <div className="">
                            <input type="text" {...register("title", { required: true })} placeholder='Review title' className='p-1' />
                            {errors.title && <p className="text-red-600">Enter a title!</p>}
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4 w-full">
                        <h2 className='underline underline-offset-[5px]'>Review</h2>
                        <StarRating changeRating={changeRating} />
                        <div className="w-full flex flex-col items-center">
                            <textarea {...register("review", { required: true })} placeholder='Review title' className='p-1 resize-none w-[80%] min-h-[150px]' />
                            {errors.title && <p className="text-red-600">Enter a review!</p>}
                        </div>
                    </div>
                    <button type="submit" className="bg-blue-800 p-2 mt-5">Submit review</button>
                </form>
            </div>
        </div>
    )
}


export default AddReviewDialog

