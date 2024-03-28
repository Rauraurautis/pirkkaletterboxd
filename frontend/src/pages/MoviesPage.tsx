import { FC, useCallback, useEffect, useState } from 'react'

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useMoviesQuery } from '../hooks/movieQueries'
import MovieThumbnail from '../components/movies/MovieThumbnail'
import MovieSearchForms from '../components/movies/MovieSearchForms';
import { MovieSearchType } from '../lib/types';
import { Outlet, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../lib/store/AuthStore';
import { getUserData } from '../services/movieServices';
import { useAppStateStore } from '../lib/store/AppStateStore';
import { deriveGenre } from '../lib/utils/utils';

interface MoviesPageProps {

}

const MoviesPage: FC<MoviesPageProps> = ({ }) => {
  const [searchParams, setSearchParams] = useSearchParams({ searchMode: "", searchQuery: "" })
  const { movies: fetchedMovies } = useAppStateStore(state => state.fetchedMovies)
  const [page, setPage] = useState(0)
  const { isPending } = useMoviesQuery("popular")
  const { user, setUserMovies } = useAuthStore(state => ({ user: state.user, setUserMovies: state.setUserMovies }))

  const searchMode = searchParams.get("searchMode")
  const searchQuery = searchParams.get("searchQuery")


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

  const applySearch = useCallback((val: MovieSearchType | null) => {
    if (val) {
      setSearchParams(prev => {
        prev.set("searchMode", val.searchMode)
        prev.set("searchQuery", val.value)
        return prev
      })
    }
  }, [])


  const visibleMovies = page === 0 ? fetchedMovies.slice(0, 6) : fetchedMovies.slice(page * 6, page * 6 + 6)

  return (
    <>
      <Outlet context={visibleMovies} />
      <section className="h-full w-full flex flex-col items-center gap-20 animate-fadeIn">
        <MovieSearchForms applySearch={applySearch} searchParams={{ searchMode: searchParams.get("searchMode"), searchQuery: searchParams.get("searchQuery") }} setSearchParams={setSearchParams} />
        <div className="flex flex-col items-center gap-5 w-full relative select-none">
          <h2 className="text-2xl">
            {searchMode !== "name" && searchMode !== "genre" && "Popular movies right now"}
            {searchMode === "name" && `Movies found with the search term '${searchParams.get("searchQuery")}'`}
            {searchMode === "genre" && `Movies found with the genre '${deriveGenre(Number(searchQuery))}'`}
          </h2>
          <div className="w-[50%] h-[1px] bg-white"></div>
          <div className="flex items-center w-screen justify-around gap-5">
            {page > 0 ? <div className="top-[50%] left-0 cursor-pointer" onClick={() => setPage(prev => prev - 1)}><AiOutlineArrowLeft style={{ width: "50px", height: "50px" }} /></div> : <div className="w-[50px] h-[50px]"></div>}
            <div className="grid gap-5 grid-cols-3 xl:grid-cols-6 h-full min-h-[300px]">
              {isPending ? <h1>Loading</h1> : <>{
                visibleMovies.map((movie, i) => (
                  <MovieThumbnail key={i} movie={movie} />
                ))
              }</>
              }
            </div>
            {fetchedMovies.slice((page + 1) * 6, (page + 1) * 6 + 6).length > 0 ?
              <div className="top-[50%] right-0 cursor-pointer " onClick={() => setPage(prev => prev + 1)}><AiOutlineArrowRight style={{ width: "50px", height: "50px" }} /></div>
              : <div className="w-[50px] h-[50px]"></div>}
          </div>
        </div>
      </section>
    </>
  )
}

export default MoviesPage