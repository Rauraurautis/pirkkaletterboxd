import { FC, useCallback, useState } from 'react'
import defaultProfile from "../assets/images/profile_default.jpg"
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../lib/store/AuthStore'
import hamburger from "../assets/images/hamburger.png"
import DropdownMenu from './DropdownMenu'

interface NavbarProps {
    setLoginDialog: React.Dispatch<React.SetStateAction<boolean>>
    setReviewDialog: React.Dispatch<React.SetStateAction<boolean>>
}


const Navbar: FC<NavbarProps> = ({ setLoginDialog, setReviewDialog }) => {
    const { loggedIn, logout, user } = useAuthStore(state => ({ loggedIn: state.loggedIn, logout: state.logout, user: state.user }))
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const navigate = useNavigate()
   
    const handleReviewClick = () => {
        if (loggedIn) {
            setReviewDialog(true)
        } else {
            setLoginDialog(true)
        }
    }

    const navigateToPage = useCallback((page: string) => {
        navigate(page)
        if (dropdownOpen) setDropdownOpen(false)
    }, [dropdownOpen])



    return (
        <nav className="w-full flex flex-col items-center gap-3 justify-center p-5 rounded-b-xl bg-black bg-opacity-15 h-[125px] xl:justify-between xl:h-[100px] xl:flex-row lg:gap-0 relative">
            {dropdownOpen && <DropdownMenu setLoginDialog={setLoginDialog} setReviewDialog={setReviewDialog} navigateToPage={navigateToPage} />}
            <div className="text-xs lg:text-base text-center">
                <NavLink to="/"><h1 className="text-2xl lg:text-4xl text-center cursor-pointer text-blue-800">Pirkka Letterboxd</h1></NavLink>
            </div>
            <div className="text-white flex items-center gap-10 justify-between w-[90%] sm:justify-around sm:w-auto">
                <div className="flex sm:hidden">
                    <img src={hamburger} onClick={() => setDropdownOpen(prev => !prev)} className="w-[50px] cursor-pointer" />
                </div>
                <div className="hidden sm:flex gap-5">
                    <div className="text-xl cursor-pointer hover:opacity-80 hover:translate-y-[-1px] transition-transform" >
                        <h2 onClick={() => navigateToPage("/movies")}>Discover movies</h2>
                    </div>
                    <div className="text-xl cursor-pointer hover:opacity-80 hover:translate-y-[-1px] transition-transform">
                        <h2 onClick={() => navigateToPage("/reviews")}>Reviews</h2>
                    </div>
                    <div className="text-xl cursor-pointer hover:opacity-80 hover:translate-y-[-1px] transition-transform" onClick={handleReviewClick}>
                        <h2>Review a movie</h2>
                    </div>
                </div>
                <span className="hidden lg:flex text-blue-900">|</span>
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
                    <img src={user?.avatar_path ? `http://80.220.95.201/api/${user.avatar_path}` : defaultProfile} className='rounded-full hover:cursor-pointer hover:brightness-90' />
                </div>
            </div>
        </nav >
    )
}

export default Navbar