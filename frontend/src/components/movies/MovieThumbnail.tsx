import { FC } from 'react'
import defaultImage from "../../assets/images/default-movie.png"
import { MovieType } from '../../lib/types'
import { NavLink } from 'react-router-dom'

interface MovieThumbnailProps {
    movie: MovieType
}

const MovieThumbnail: FC<MovieThumbnailProps> = ({ movie }) => {
    const { poster_path, id } = movie

    return (
        <div className=" flex flex-col items-center max-h-[450px] max-w-[266px] 2xl:max-h-[500px]">
            <NavLink to={`/movies/${id}`}><img  src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : defaultImage} className="max-h-[400px] h-full object-contain cursor-pointer hover:brightness-75 hover:translate-y-[-5px] transition-all" /></NavLink>
        </div>
    )
}

export default MovieThumbnail