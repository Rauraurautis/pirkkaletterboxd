import { FC, useState } from 'react'
import { useParams, useLoaderData } from 'react-router-dom'

import { useAuthStore } from '../lib/store/AuthStore'

import defaultProfile from "../assets/images/profile_default.jpg"
import UserDetailsForm from '../components/user/UserDetailsForm'
import { ReviewType, UserMovieType } from '../lib/types'
import MovieReviewThumbnail from '../components/reviews/MovieReviewThumbnail'
import MovieReview from '../components/reviews/MovieReviewCard'
import EditableMoviePoster from '../components/movies/EditableMoviePoster'
import MovieThumbnail from '../components/movies/MovieThumbnail'

interface UserPageProps {

}

const UserPage: FC<UserPageProps> = ({ }) => {
    const { username } = useParams()

    const { avatar_path, wantedMovies, watchedMovies, reviews } = useLoaderData() as { avatar_path: string, watchedMovies: UserMovieType[], wantedMovies: UserMovieType[], reviews: ReviewType[] }
    const [review, setReview] = useState<ReviewType | null>(null)
    if (!username) return

    let isFetching = false

    const user = useAuthStore(state => state.user)

    const isOwner = user?.name === username

    return (
        <section className="h-full w-full flex flex-col items-center md:flex-row gap-20">
            {review && <MovieReview review={review} setReview={setReview} />}
            <div className="w-[40%] h-full flex justify-center bg-zinc-900 bg-opacity-90">
                <div className=" flex flex-col items-center gap-5">
                    <img src={avatar_path ? avatar_path : defaultProfile} className="rounded-full w-[100px] md:w-[200px]" />
                    {isOwner && <UserDetailsForm user={user} />}
                </div>
            </div>
            <div className="w-[60%] flex flex-col gap-5">
                <div className="flex flex-col gap-5 w-full min-h-[250px]">
                    <h2 className="text-2xl">Reviews</h2>
                    <div className="w-[50%] h-[1px] bg-white"></div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2">
                        {reviews.map((review, i) => (
                            <MovieReviewThumbnail key={i} review={review} setReview={setReview} />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-5 w-full ">
                    <h2 className="text-2xl">Watched movies ({watchedMovies?.length})</h2>
                    <div className="w-[50%] h-[1px] bg-white"></div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2">
                        {isFetching ? <h1>Loading</h1> : <>{
                            watchedMovies!.map((movie, i) => (
                                isOwner ? <EditableMoviePoster movie={movie.movie} key={i} watched={movie.watched} userId={user._id} /> : <MovieThumbnail movie={movie.movie} key={i} />
                            ))
                        }</>
                        }
                    </div>
                </div>
                <div className="flex flex-col gap-5 w-full min-h-[250px]">
                    <h2 className="text-2xl">Want to watch ({wantedMovies?.length})</h2>
                    <div className="w-[50%] h-[1px] bg-white"></div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2">
                        {isFetching ? <h1>Loading</h1> : <>{
                            wantedMovies!.map((movie, i) => (
                                isOwner ? <EditableMoviePoster movie={movie.movie} key={i} watched={movie.watched} userId={user._id} /> : <MovieThumbnail movie={movie.movie} key={i} />
                            ))
                        }</>
                        }
                    </div>
                </div>
            </div>
        </section>)
}

export default UserPage