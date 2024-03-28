import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MovieType, ReviewType } from '../lib/types'
import MovieDetailsCard from '../components/movies/MovieDetailsCard'
import MovieReview from '../components/reviews/MovieReviewCard'
import { useAppStateStore } from '../lib/store/AppStateStore'
import { axiosMovieDBInstance } from '../services/axiosInstance'
import { deriveGenre } from '../lib/utils/utils'
import Spinner from '../components/ui/Spinner'


interface MovieDetailsPageProps {

}

const MovieDetailsPage: FC<MovieDetailsPageProps> = ({ }) => {
    const { id } = useParams()
    const fetchedMovies = useAppStateStore(state => state.fetchedMovies)
    const [movie, setMovie] = useState<MovieType | undefined>(fetchedMovies.movies.find(movie => String(movie.id) === id))
    const [review, setReview] = useState<ReviewType | null>(null)

    useEffect(() => {
        if (!movie) {
            axiosMovieDBInstance(`/3/movie/${id}`).then(res => setMovie(res.data))
        }
    }, [])

    const movieGenres = movie?.genre_ids?.map(genreId => {
        return deriveGenre(genreId)
    })

    return (
        <section className="w-[60%] min-w-[500px] min-h-[500px] max-h-[80%] rounded-xl p-10 bg flex flex-col items-center justify-around gap-5 lg:flex-row  z-20 bg-zinc-800  absolute shadow-xl overflow-y-auto">
            {movie ?
                <>
                    {review && <MovieReview review={review} setReview={setReview} />}
                    {movie && <MovieDetailsCard movie={movie} genres={movieGenres} setReview={setReview} />}
                </>
                :
                <div><Spinner /></div>
            }
        </section>
    )







}

export default MovieDetailsPage