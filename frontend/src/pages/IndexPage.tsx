import { FC, memo, useState } from 'react'
import MovieReviewThumbnail from '../components/reviews/MovieReviewThumbnail'
import MovieReview from '../components/reviews/MovieReviewCard'
import { useMoviesQuery } from '../hooks/movieQueries'

import { useLatestReviewsQuery } from '../hooks/reviewQueries'
import { ReviewType } from '../lib/types'
import MovieThumbnail from '../components/movies/MovieThumbnail'

interface IndexPageProps {

}


const IndexPage: FC<IndexPageProps> = memo(({ }) => {
    const { reviews, isPending: isPendingLatestReviews } = useLatestReviewsQuery()
    const { data: fetchedMovies, isPending: isPendingMovies } = useMoviesQuery("popular")
    const [review, setReview] = useState<ReviewType | null>(null)
    
    if (isPendingLatestReviews && isPendingMovies && reviews.length === 0) {
        return <div className=""></div>
    }

    return (
        <>
            {review && <MovieReview review={review} setReview={setReview} />}
            <section className="h-full w-full flex flex-col items-center gap-20" >
                <div className="flex flex-col  w-full gap-10 ">
                        <h2 className="text-2xl">Random movie reviews</h2>
                        <div className="w-[50%] h-[1px]  bg-white"></div>
                    <div className="grid grid-cols-3 gap-3 xl:grid-cols-6 w-full">
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
                    <div className="grid grid-cols-3 gap-3 w-full h-full min-h-[450px] xl:grid-cols-6">
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