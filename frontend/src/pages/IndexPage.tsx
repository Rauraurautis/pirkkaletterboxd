import { FC, memo, useState } from 'react'
import MovieReviewThumbnail from '../components/reviews/MovieReviewThumbnail'
import MovieReview from '../components/reviews/MovieReviewCard'
import { useAppStateStore } from '../lib/store/AppStateStore'
import { usePopularMoviesQuery } from '../hooks/movieQueries'

import { useLatestReviewsQuery } from '../hooks/reviewQueries'
import { ReviewType } from '../lib/types'
import MovieThumbnail from '../components/movies/MovieThumbnail'

interface IndexPageProps {

}


const IndexPage: FC<IndexPageProps> = memo(({ }) => {
    const { reviews, isPending: isPendingLatestReviews } = useLatestReviewsQuery()
    const { isPending: isPendingMovies } = usePopularMoviesQuery()
    const [review, setReview] = useState<ReviewType | null>(null)
    const fetchedMovies = useAppStateStore(state => state.fetchedMovies)

    if (isPendingLatestReviews && isPendingMovies && reviews.length === 0) {
        return <div className=""></div>
    }

    return (
        <>
            {review && <MovieReview review={review} setReview={setReview} />}
            <section className="h-full w-full flex flex-col items-center gap-20" >
                <div className="flex flex-col  w-full gap-10 ">
                    <div className="">
                        <h2 className="text-2xl">Random movie reviews</h2>
                        <div className="w-[50%] h-[1px] bg-white"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-5 xl:grid-cols-6 w-full content-center">
                        {isPendingLatestReviews ?
                            <div className="">Loading</div>
                            : reviews.map((review, i) => (
                                <MovieReviewThumbnail key={i} review={review} setReview={setReview} />
                            ))}
                    </div>
                </div>
                <div className="flex flex-col gap-5 w-full ">
                    <h2 className="text-2xl">Popular movies</h2>
                    <div className="w-[50%] h-[1px] bg-white"></div>
                    <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 2xl:grid-cols-6 w-full h-full min-h-[450px]">
                        {isPendingMovies ? <div className="">Loading</div> : <>{
                            fetchedMovies.map((movie, i) => (
                                <MovieThumbnail key={i} movie={movie} />
                            ))
                        }</>
                        }
                    </div>
                </div>

            </section>
        </>
    )
})

export default IndexPage