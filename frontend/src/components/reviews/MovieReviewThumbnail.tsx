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
        <div className="relative max-w-[350px] w-full  flex flex-col items-center" onClick={() => setReview(review)} >
            <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} className="h-full object-contain cursor-pointer hover:brightness-75 hover:translate-y-[-5px] transition-all" />
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