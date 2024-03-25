import { Outlet, createBrowserRouter } from "react-router-dom"
import Navbar from "../components/Navbar";
import IndexPage from "../pages/IndexPage";
import Footer from "../components/Footer";
import MoviesPage from "../pages/MoviesPage";
import ReviewsPage from "../pages/ReviewsPage";
import MovieDetailsPage from "../pages/MovieDetailsPage";
import AddReviewDialog from "../components/reviews/AddReviewDialog";
import LoginDialog from "../components/user/LoginDialog";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { getUser } from "./utils/auth";
import { useAuthStore } from "./store/AuthStore";
import UserPage from "../pages/UserPage";
import ErrorPage from "../pages/ErrorPage";

import { QueryClient } from "@tanstack/react-query";
import { userDataLoader } from "./routerLoaders";











export const Layout = () => {
    const setUser = useAuthStore(state => state.setUser)
    const [loginDialog, setLoginDialog] = useState(false)
    const [reviewDialog, setReviewDialog] = useState(false)


    useEffect(() => {
        const user = getUser()
        if (user) {
            setUser({ ...user })
        }
    }, [])

    return (
        <>
            <ToastContainer position="bottom-left" />
            <main className="w-dvw h-dvh flex flex-col items-center justify-between gap-5 overflow-y-auto bg-zinc-900"  >
                <div className="w-[90%]">
                    <Navbar setLoginDialog={setLoginDialog} setReviewDialog={setReviewDialog} />
                </div>
                <div className="w-[90%] flex flex-col items-center gap-10" >
                    {loginDialog && <LoginDialog setLoginDialog={setLoginDialog} />}
                    {reviewDialog && <AddReviewDialog setReviewDialog={setReviewDialog} />}
                    <Outlet />
                </div>
                <div className="w-[90%] flex flex-col gap-10">
                    <Footer />
                </div>
            </main >
        </>
    )
}

const queryClient = new QueryClient()

export const router = createBrowserRouter([
    {
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <IndexPage />,
                errorElement: <h1>Error</h1>
            },
            {
                path: "/movies",
                element: <MoviesPage />,
                children: [
                    {
                        path: "/movies/:id",
                        element: <MovieDetailsPage />,
                    }
                ]
            },
            {
                path: "/reviews",
                element: <ReviewsPage />,
            },
            {
                path: "/user/:username",
                element: <UserPage />,
                loader: userDataLoader(queryClient)
            }
        ]
    }


]);