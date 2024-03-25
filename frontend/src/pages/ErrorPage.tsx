import { FC, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import AddReviewDialog from '../components/reviews/AddReviewDialog'
import LoginDialog from '../components/user/LoginDialog'
import { useAuthStore } from '../lib/store/AuthStore'
import { getUser } from '../lib/utils/auth'

interface ErrorPageProps {

}

const ErrorPage: FC<ErrorPageProps> = ({ }) => {

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
            <ToastContainer />
            <main className="w-dvw h-dvh flex flex-col items-center justify-between gap-5 overflow-y-auto bg-zinc-900"  >
                <div className="w-[90%]">
                    <Navbar setLoginDialog={setLoginDialog} setReviewDialog={setReviewDialog} />
                </div>
                <div className="w-[90%] flex flex-col items-center gap-10" >
                    {loginDialog && <LoginDialog setLoginDialog={setLoginDialog} />}
                    {reviewDialog && <AddReviewDialog setReviewDialog={setReviewDialog} />}
                    <h1 className="text-4xl">404: Page Not Found</h1>
                </div>
                <div className="w-[90%] flex flex-col gap-10">
                    <Footer />
                </div>
            </main >
        </>
    )

}

export default ErrorPage