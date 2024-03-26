import { FC } from 'react'
import { ReviewType } from '../../lib/types'
import Star from '../ui/Star'

interface MovieReviewThumbnailProps {
    review: ReviewType
    setReview: React.Dispatch<React.SetStateAction<ReviewType | null>>
}

const MovieReviewThumbnail: FC<MovieReviewThumbnailProps> = ({ review, setReview }) => {
    const { poster_path } = review.movie
    const { rating } = review

    return (
        <div className=" flex flex-col items-center max-h-[450px] 2xl:max-h-[500px]" onClick={() => setReview(review)} >
            <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} className="max-h-[400px] 2xl:max-h-[450px] object-contain cursor-pointer hover:brightness-75 hover:translate-y-[-5px] transition-all" />
            <div className="w-full flex flex-col items-center">
                <div className="flex gap-1 mt-2">
                    {new Array(rating).fill(null).map((_, i) => <Star key={i} fillColor='fill-yellow-500' />)}
                </div>
                <div className="">
                    {review.user && <p>Reviewer: {review.user.name}</p>}
                </div>
            </div>
        </div>
    )
}

export default MovieReviewThumbnail