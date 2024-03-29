import { QueryClient } from "@tanstack/react-query"
import { getUserData } from "../services/movieServices"
import { axiosMovieDBInstance } from "../services/axiosInstance"


export const userDataLoader =
    (queryClient: QueryClient) =>
        async ({ params }: { params: any }) => {
            console.log("sd")
            const userDataQuery = (username: string) => ({
                queryKey: ["userData"],
                queryFn: async () => {
                    const data = await getUserData(username)

                    if (data) {
                        const watchedMovies = data.movies.filter(movie => movie.watched === true)
                        const wantedMovies = data.movies.filter(movie => movie.watched === false)
                        return { avatar_path: data.avatar_path, watchedMovies, wantedMovies, reviews: data.reviews }
                    }
                },

            })

            const query = userDataQuery(params.username)

            // const cached = queryClient.getQueryData(query.queryKey)
            return (
                //   cached ??
                await queryClient.fetchQuery(query)
            )
        }

export const singleMovieDataLoader = () =>
    async ({ params }: { params: any }) => {
        const movie = await axiosMovieDBInstance(`/3/movie/${params.id}`)
        return movie.data
    }