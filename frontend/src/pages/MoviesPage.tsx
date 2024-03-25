import { FC, useEffect, useState } from 'react'

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { usePopularMoviesQuery } from '../hooks/movieQueries'
import MovieThumbnail from '../components/movies/MovieThumbnail'
import MovieSearchForms from '../components/movies/MovieSearchForms';
import { MovieSearchType} from '../lib/types';
import { Outlet } from 'react-router-dom';
import { useAuthStore } from '../lib/store/AuthStore';
import { getUserData } from '../services/movieServices';
import { useAppStateStore } from '../lib/store/AppStateStore';

interface MoviesPageProps {

}

const MoviesPage: FC<MoviesPageProps> = ({ }) => {
  const [searchMode, setSearchMode] = useState<MovieSearchType>(null)
  const fetchedMovies = useAppStateStore(state => state.fetchedMovies)
  const [page, setPage] = useState(0)
  const { isPending } = usePopularMoviesQuery()
  const { user, setUserMovies } = useAuthStore(state => ({ user: state.user, setUserMovies: state.setUserMovies }))
  

  useEffect(() => {
    if (user?.movies.length === 0) {
      getUserData(user.name).then(data => {
        if (data) setUserMovies(data.movies)
      })
    }
  }, [user])

  useEffect(() => {
    setPage(0)
  }, [searchMode])


  const visibleMovies = page === 0 ? fetchedMovies.slice(0, 6) : fetchedMovies.slice(page * 6, page * 6 + 6)

  return (
    <>
      <Outlet context={visibleMovies} />
      <section className="h-full w-full flex flex-col items-center gap-20 animate-fadeIn">
        <MovieSearchForms setSearchMode={setSearchMode} />
        <div className="flex flex-col items-center gap-5 relative w-dvw select-none">
          <h2 className="text-2xl">
            {!searchMode && "Popular movies right now"}
            {searchMode?.searchMode === "name" && `Movies found with the search term '${searchMode.value}'`}
            {searchMode?.searchMode === "genre" && `Movies found with the genre '${searchMode.value}'`}
          </h2>
          <div className="w-[50%] h-[1px] bg-white"></div>
          <div className="grid gap-5 grid-cols-3 md:grid-cols-6 w-[90%] h-full min-h-[300px]">
            {isPending ? <h1>Loading</h1> : <>{
              visibleMovies.map((movie, i) => (
                <MovieThumbnail key={i} movie={movie} />
              ))
            }</>
            }
          </div>
          {visibleMovies.length === 6 && <div className="absolute top-[50%] right-0 cursor-pointer " onClick={() => setPage(prev => prev + 1)}><AiOutlineArrowRight style={{ width: "50px", height: "50px" }} /></div>}
          {page > 0 && <div className="absolute top-[50%] left-0 cursor-pointer" onClick={() => setPage(prev => prev - 1)}><AiOutlineArrowLeft style={{ width: "50px", height: "50px" }} /></div>}
        </div>
      </section>
    </>
  )
}

export default MoviesPage