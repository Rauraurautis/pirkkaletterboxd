import { FC, memo, useState } from 'react'
import Star from '../ui/Star'
import { ReviewType } from '../../lib/types'

interface StarRatingProps {
    changeRating: (rating: Pick<ReviewType, "rating"> | null) => void
}


const StarRating: FC<StarRatingProps> = ({ changeRating }) => {
    const [starColors, setStarColors] = useState(new Array(5).fill("fill-slate-500"))

    const onHover = (index: number) => {
        changeRating({ rating: index as 1 | 2 | 3 | 4 | 5 })
        setStarColors(new Array(index).fill("fill-yellow-500").concat(new Array(5 - index).fill("fill-slate-500")))
    }

    return (
        <div className='flex gap-2 cursor-pointer'>
            {starColors.map((star, i) => (
                <Star key={i} fillColor={star} onHover={() => onHover(i + 1)} />
            ))}
        </div>

    )
}

export default memo(StarRating)