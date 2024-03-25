import { FC, useState } from 'react'

import { NavLink } from 'react-router-dom'
import defaultImage from "../../assets/images/default-movie.png"


import { toast } from 'react-toastify'
import { useAuthStore } from '../../lib/store/AuthStore'
import { MovieType, UserMovieType } from '../../lib/types'
import { addMovieForUser } from '../../services/userServices'

interface EditableMoviePosterProps {
    movie: MovieType
    watched: boolean
    userId: string
    setNewWatched?: (movie: UserMovieType) => void
}

const EditableMoviePoster: FC<EditableMoviePosterProps> = ({ movie, watched, userId, setNewWatched }) => {
    const { poster_path, id } = movie
    const [hoverMode, setHoverMode] = useState(false)
    const { user } = useAuthStore(state => ({ setUserMovies: state.setUserMovies, user: state.user }))

    const addToWatched = async () => {
        const data = { movie: movie, watched: true }
        console.log(user?.movies)
        const changedMovie = await addMovieForUser(userId, data)
        toast(`Added movie ${movie.title} to watched!`)
        if (changedMovie && setNewWatched) {
            setNewWatched(changedMovie)
        }
    }

    return (
        <div className="relative max-w-[400px] w-full  flex flex-col items-center" onMouseEnter={() => setHoverMode(true)} onMouseLeave={() => setHoverMode(false)}>
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : defaultImage} className={`h-full object-contain transition-all cursor-default ${hoverMode && "brightness-75 translate-y-[-5px]"}`} />
            {hoverMode && <div className="absolute flex flex-col h-[50%] justify-around items-center">
                <NavLink to={`/movies/${id}`} target='_blank'><button className="bg-zinc-800 p-2 rounded-md hover:brightness-75">Movie details</button></NavLink>
                {!watched && <button className="bg-zinc-800 p-2 rounded-md hover:brightness-75" onClick={addToWatched}>Add to watched</button>}
            </div>}
        </div>
    )
}

export default EditableMoviePoster