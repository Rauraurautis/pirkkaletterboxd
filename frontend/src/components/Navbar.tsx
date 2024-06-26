import { FC, useCallback, useState } from 'react'
import defaultProfile from "../assets/images/profile_default.jpg"
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../lib/store/AuthStore'
import hamburger from "../assets/images/hamburger.png"
import DropdownMenu from './DropdownMenu'
import { useAvatar } from '../hooks/useAvatar'

interface NavbarProps {
    setLoginDialog: React.Dispatch<React.SetStateAction<boolean>>
    setReviewDialog: React.Dispatch<React.SetStateAction<boolean>>
}


const Navbar: FC<NavbarProps> = ({ setLoginDialog, setReviewDialog }) => {
    const { loggedIn, logout, user } = useAuthStore(state => ({ loggedIn: state.loggedIn, logout: state.logout, user: state.user }))
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const avatar = useAvatar()
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
        <ul className="w-full flex flex-col items-center gap-3 justify-center p-5 rounded-b-xl bg-black bg-opacity-15 h-[125px] xl:justify-between xl:h-[100px] xl:flex-row lg:gap-0 relative">
            {dropdownOpen && <DropdownMenu setLoginDialog={setLoginDialog} setReviewDialog={setReviewDialog} navigateToPage={navigateToPage} />}
            <li className="text-xs lg:text-base text-center">
                <NavLink to="/"><h1 className="text-2xl lg:text-4xl text-center cursor-pointer text-blue-800">Pirkka Letterboxd</h1></NavLink>
            </li>
            <div className="text-white flex items-center gap-10 justify-between w-[90%] sm:justify-around sm:w-auto">
                <div className="flex sm:hidden">
                    <img src={hamburger} onClick={() => setDropdownOpen(prev => !prev)} className="w-[50px] cursor-pointer" />
                </div>
                <li className="hidden sm:flex gap-5">
                    <li className="text-xl cursor-pointer hover:opacity-80 hover:translate-y-[-1px] transition-transform" >
                        <h2 onClick={() => navigateToPage("/movies")}>Discover movies</h2>
                    </li>
                    <li className="text-xl cursor-pointer hover:opacity-80 hover:translate-y-[-1px] transition-transform">
                        <h2 onClick={() => navigateToPage("/reviews")}>Reviews</h2>
                    </li>
                    <li className="text-xl cursor-pointer hover:opacity-80 hover:translate-y-[-1px] transition-transform" onClick={handleReviewClick}>
                        <h2>Review a movie</h2>
                    </li>
                </li>
                <span className="hidden lg:flex text-blue-900 text-3xl">|||</span>
                <div className="hidden lg:flex gap-5">
                    {loggedIn ?
                        <>
                            <li className="text-xl cursor-pointer hover:opacity-80 hover:translate-y-[-1px] transition-transform">
                                <NavLink to={`/user/${user?.name}`}><h2>My page</h2></NavLink>
                            </li>
                            <li className="text-xl cursor-pointer hover:opacity-80 hover:translate-y-[-1px] transition-transform" onClick={logout}>
                                <h2>Sign out</h2>
                            </li>
                        </>
                        :
                        <li className="text-xl cursor-pointer hover:opacity-80 hover:translate-y-[-1px] transition-transform" onClick={() => setLoginDialog(true)}>
                            <h2>Sign in</h2>
                        </li>}
                </div>
                <div className="w-[50px] ">
                    <img src={avatar ? avatar : defaultProfile} className='rounded-full hover:cursor-pointer hover:brightness-90' />
                </div>
            </div>
        </ul>
    )
}

export default Navbar