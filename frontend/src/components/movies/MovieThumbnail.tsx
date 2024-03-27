import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import defaultImage from "../../assets/images/default-movie.png"
import { MovieType } from '../../lib/types'

interface MovieThumbnailProps {
    movie: MovieType
}

const MovieThumbnail: FC<MovieThumbnailProps> = ({ movie }) => {
    const { poster_path, id } = movie

    return (
        <div className="relative max-w-[400px] w-full  flex flex-col items-center">
            <a target='_blank' href={`/movies/${id}`}><img  src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : defaultImage} className="h-full object-contain cursor-pointer hover:brightness-75 hover:translate-y-[-5px] transition-all" /></a>
        </div>
    )
}

export default MovieThumbnail