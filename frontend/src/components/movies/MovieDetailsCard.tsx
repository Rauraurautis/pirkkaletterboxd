import { FC } from 'react'
import MovieDetailsReview from '../reviews/MovieDetailsReview'
import { NavLink } from 'react-router-dom'
import { releaseYear } from '../../lib/utils/utils'
import { MovieType, ReviewType } from '../../lib/types'
import { useReviewsForMovieQuery } from '../../hooks/reviewQueries'
import { useAuthStore } from '../../lib/store/AuthStore'
import { addMovieForUser } from '../../services/userServices'
import Back from '../ui/Back'
import { toast } from 'react-toastify'

interface MovieDetailsCardProps {
    movie: MovieType
    genres: (string | undefined)[] | undefined
    setReview: React.Dispatch<React.SetStateAction<ReviewType | null>>
}

const MovieDetailsCard: FC<MovieDetailsCardProps> = ({ movie, genres, setReview }) => {
    const { reviews, isPending } = useReviewsForMovieQuery(Number(movie.id))
    const { user, setUserMovies, loggedIn } = useAuthStore(state => ({ user: state.user, setUserMovies: state.setUserMovies, loggedIn: state.loggedIn }))
    
    const addMovieToWatched = async () => {
        if (user) {
            const addedMovie = await addMovieForUser(user?._id, { watched: true, movie: { ...movie } })
            if (addedMovie) {
                setUserMovies(user.movies.concat(addedMovie))
            }
            toast("Added movie to watched movies")
            return addedMovie
        }
    }

    const addMovieToWanted = async () => {
        if (user) {
            const addedMovie = await addMovieForUser(user?._id, { watched: false, movie: { ...movie } })
            if (addedMovie) {
                setUserMovies(user.movies.concat(addedMovie))
            }
            toast("Added movie to wanted movies")
            return addedMovie
        }
    }

    return (
        <div className="h-full">
            <div className="absolute left-5 top-5 hover:brightness-75 ">
                <NavLink to="/movies"><button><Back /></button></NavLink>
            </div>
            <div className="flex flex-col gap-5 lg:flex-row p-5">
                <div className="w-full h-full flex flex-col items-center justify-start gap-5">
                    <a href={`https://imdb.com/title/${movie.id}`} target='_blank'>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="max-w-[250px]" />
                    </a>
                    <h2 className="text-2xl">{movie.title} {`(${releaseYear(movie.release_date)})`}</h2>
                    <div className="flex gap-2 flex-wrap max-w-[300px]">
                        {genres?.map((genre, i) => (
                            <div className="bg-blue-500 py-1 px-3 rounded-xl select-none text-nowrap" key={i}>{genre}</div>
                        ))}
                    </div>
                    {loggedIn && !user?.movies.find(userMovie => userMovie.movie.id === movie.id) &&
                        <div className="mt-2 pb-5 flex flex-col gap-2">
                            <button className="p-2 bg-zinc-900 rounded-md hover:brightness-90" onClick={addMovieToWatched}>
                                Add to watched
                            </button>
                            <button className="p-2 bg-zinc-900 rounded-md hover:brightness-90" onClick={addMovieToWanted}>
                                I want to watch this
                            </button>
                        </div>
                    }

                </div>
                <div className="h-[90%] w-full flex flex-col justify-start">
                    <p>{movie.overview}</p>
                    <div className="mt-5">
                        <h1 className="text-3xl mb-1">Reviews</h1>
                        <div className="w-[50%] h-[1px] bg-white"></div>
                    </div>
                    <div className="flex flex-col   mt-2 max-h-[500px] overflow-y-auto">
                        {isPending ? <h1>Loading</h1> : <>{
                            reviews.map((review, i) => (
                                <MovieDetailsReview key={i} review={review} setReview={setReview} />
                            ))
                        }</>
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MovieDetailsCard