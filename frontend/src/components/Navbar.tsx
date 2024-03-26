import { FC } from 'react'
import defaultProfile from "../assets/images/profile_default.jpg"
import { NavLink } from 'react-router-dom'
import { useAuthStore } from '../lib/store/AuthStore'
import hamburger from "../assets/images/hamburger.png"

interface NavbarProps {
    setLoginDialog: React.Dispatch<React.SetStateAction<boolean>>
    setReviewDialog: React.Dispatch<React.SetStateAction<boolean>>
}


const Navbar: FC<NavbarProps> = ({ setLoginDialog, setReviewDialog }) => {
    const { loggedIn, logout, user } = useAuthStore(state => ({ loggedIn: state.loggedIn, logout: state.logout, user: state.user }))

    const handleReviewClick = () => {
        console.log("asd")
        if (loggedIn) {
            setReviewDialog(true)
        } else {
            setLoginDialog(true)
        }
    }

    console.log(user)

    return (
        <nav className="w-full flex flex-col items-center gap-3 justify-center p-5 rounded-b-xl bg-black bg-opacity-15 xl:justify-between xl:flex-row lg:gap-0">
            <div className="text-xs lg:text-base text-center">
                <NavLink to="/"><h1 className="text-2xl lg:text-4xl text-center cursor-pointer text-green-500">Pirkka Letterboxd</h1></NavLink>
            </div>
            <div className="text-white flex items-center gap-10 justify-between w-[90%] sm:justify-around sm:w-auto">
                <div className="flex sm:hidden">
                    <img src={hamburger} className="w-[50px]" />
                </div>
                <div className="hidden sm:flex gap-5">
                    <div className="text-xl cursor-pointer hover:opacity-80 hover:translate-y-[-1px] transition-transform" >
                        <NavLink to="/movies"><h2>Discover movies</h2></NavLink>
                    </div>
                    <div className="text-xl cursor-pointer hover:opacity-80 hover:translate-y-[-1px] transition-transform">
                        <NavLink to="/reviews"><h2>Reviews</h2></NavLink>
                    </div>
                    <div className="text-xl cursor-pointer hover:opacity-80 hover:translate-y-[-1px] transition-transform" onClick={handleReviewClick}>
                        <h2>Review a movie</h2>
                    </div>
                </div>
                <span className="hidden lg:flex">|</span>
                <div className="hidden lg:flex gap-5">
                    {loggedIn ?
                        <>
                            <div className="text-xl cursor-pointer hover:opacity-80 hover:translate-y-[-1px] transition-transform">
                                <NavLink to={`/user/${user?.name}`}><h2>My page</h2></NavLink>
                            </div>
                            <div className="text-xl cursor-pointer hover:opacity-80 hover:translate-y-[-1px] transition-transform" onClick={logout}>
                                <h2>Sign out</h2>
                            </div>
                        </>
                        :
                        <div className="text-xl cursor-pointer hover:opacity-80 hover:translate-y-[-1px] transition-transform" onClick={() => setLoginDialog(true)}>
                            <h2>Sign in</h2>
                        </div>}
                </div>
                <div className="w-[50px] ">
                    <img src={user?.avatar_path ? user.avatar_path : defaultProfile} className='rounded-full hover:cursor-pointer hover:brightness-90' />
                </div>
            </div>
        </nav >
    )
}

export default Navbar