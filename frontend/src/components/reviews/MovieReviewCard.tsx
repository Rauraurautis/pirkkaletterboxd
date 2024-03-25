import { FC } from 'react'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { ReviewType } from '../../lib/types'
import Star from '../ui/Star'
import { capitalizeString } from '../../lib/utils/utils'
import Back from '../ui/Back'
import { NavLink } from 'react-router-dom'

interface MovieReviewProps {
    review: ReviewType
    setReview: React.Dispatch<React.SetStateAction<ReviewType | null>>
}


const MovieReview: FC<MovieReviewProps> = ({ review, setReview }) => {
    const { ref: reviewRef } = useOutsideClick(() => setReview(null))



    const { movie, rating, review: content, title, user } = review

    return (
        <div className="z-10 max-h-[600px] w-[400px] md:w-[700px] bg-zinc-700 absolute left-[50%]
         translate-x-[-50%] top-[50%] translate-y-[-50%] rounded-xl flex flex-col items-center gap-5 pt-5 pb-10" ref={reviewRef} id="review">
            <div className="absolute left-5 top-5 hover:brightness-75 ">
                <button onClick={() => setReview(null)}><Back /></button>
            </div>
            <div className="flex flex-col items-center gap-5">
                <NavLink to={`/movies/${movie.id}`}><div className="text-3xl">{movie.title}</div></NavLink>
                <div className="text-5xl flex gap-1">{new Array(rating).fill(null).map((_, i) => <Star key={i} fillColor='fill-yellow-500' />)}</div>
            </div>
            <div className="flex flex-col items-center">
                <div className="text-2xl">{capitalizeString(title)}</div>
                {user && <NavLink to={`/user/${user.name}`} target='_blank'><div className="text-sm">{user.name}</div></NavLink>}
            </div>
            <div className="w-[70%] overflow-y-auto">
                <p className="text-center">
                    {capitalizeString(content)}
                </p>
            </div>
        </div>
    )
}

export default MovieReview