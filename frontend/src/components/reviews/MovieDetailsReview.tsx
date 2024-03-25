import { FC } from 'react'
import { ReviewType } from '../../lib/types'
import Star from '../ui/Star'

interface MovieDetailsReviewProps {
    review: ReviewType
    setReview: React.Dispatch<React.SetStateAction<ReviewType | null>>
}

const MovieDetailsReview: FC<MovieDetailsReviewProps> = ({ review, setReview }) => {

    const { rating, user, title } = review

    return (
        <div className="flex gap-5 bg-black bg-opacity-20 p-5 justify-between cursor-pointer hover:brightness-75" onClick={() => setReview(review)}>
            <div className="flex gap-1">
                {new Array(rating).fill(null).map((_, i) => <Star key={i} fillColor='fill-yellow-500' />)}
            </div>
            <div className="">By: {user.name}</div>
            <div className="">{title}</div>
        </div>
    )
}

export default MovieDetailsReview

