import { FC } from 'react'
import { useAuthStore } from '../lib/store/AuthStore'

interface DropdownMenuProps {
    setLoginDialog: React.Dispatch<React.SetStateAction<boolean>>
    setReviewDialog: React.Dispatch<React.SetStateAction<boolean>>
    navigateToPage: (page: string) => void
}

const navButtonStyle = "text-xl cursor-pointer hover:opacity-80 hover:translate-y-[-1px] transition-transform bg-gray-700 p-1  rounded-md"

const DropdownMenu: FC<DropdownMenuProps> = ({ setLoginDialog, setReviewDialog, navigateToPage }) => {
    const { loggedIn, logout, user } = useAuthStore(state => ({ loggedIn: state.loggedIn, logout: state.logout, user: state.user }))

    const handleReviewClick = () => {
        if (loggedIn) {
            setReviewDialog(true)
        } else {
            setLoginDialog(true)
        }
    }

    return (
        <div className="absolute w-full flex gap-5 items-center justify-center flex-col top-[125px] bg-gray-800 p-5 z-50 sm:hidden">
            <div className="gap-2 flex flex-col w-full text-center">
                <div className={navButtonStyle}>
                    <h2 onClick={() => navigateToPage("/movies")}>Discover movies</h2>
                </div>
                <div className={navButtonStyle}>
                    <h2 onClick={() => navigateToPage("/reviews")}>Reviews</h2>
                </div>
                <div className={navButtonStyle} onClick={handleReviewClick}>
                    <h2>Review a movie</h2>
                </div>
            </div>
            <span className="hidden lg:flex">____________</span>
            <div className="lg:flex gap-2 flex flex-col w-full text-center">
                {loggedIn ?
                    <>
                        <div className={navButtonStyle}>
                            <h2 onClick={() => navigateToPage(`/user/${user?.name}`)}>My page</h2>
                        </div>
                        <div className={navButtonStyle} onClick={logout}>
                            <h2>Sign out</h2>
                        </div>
                    </>
                    :
                    <div className={navButtonStyle} onClick={() => setLoginDialog(true)}>
                        <h2>Sign in</h2>
                    </div>}
            </div>
        </div>
    )
}

export default DropdownMenu