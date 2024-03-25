import { QueryClient } from "@tanstack/react-query"
import { getUserData } from "../services/movieServices"


export const userDataLoader =
    (queryClient: QueryClient) =>
        async ({ params }: { params: any }) => {
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
                staleTime: Infinity
            })

            const query = userDataQuery(params.username)
            const cached = queryClient.getQueryData(query.queryKey)
            return (
                cached ??
                await queryClient.fetchQuery(query)
            )
        }