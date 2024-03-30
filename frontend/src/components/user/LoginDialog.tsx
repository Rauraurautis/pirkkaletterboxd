import { FC, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { LoginUser } from '../../lib/types'
import { loginUser } from '../../services/userServices'
import { toast } from 'react-toastify'
import { getUser, setAccessToken } from '../../lib/utils/auth'
import { useAuthStore } from '../../lib/store/AuthStore'
import SignupDialog from './SignupDialog'
import Back from '../ui/Back'

interface LoginDialogProps {
    setLoginDialog: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginDialog: FC<LoginDialogProps> = ({ setLoginDialog }) => {
    const [signupDialog, setSignupDialog] = useState(false)
    const setUser = useAuthStore(state => state.setUser)
    const { register, handleSubmit, } = useForm()

    const handleLogin = async (values: FieldValues) => {
        try {
            const user: LoginUser = { email: values.email, password: values.password }
            const loginData = await loginUser(user)
            if (loginData) {
                toast("Succesfully logged in")
                setAccessToken(loginData.accessToken)
                const userData = await getUser()
                if (userData?.user) {
                    setUser(userData.user)
                }
                setLoginDialog(false)
            }
        } catch (error: any) {
            toast(error.message)
        }

    }

    if (signupDialog) {
        return <SignupDialog setSignupDialog={setSignupDialog} />
    }

    return (
        <div className="z-10 max-h-[600px] min-w-[300px] bg-zinc-700 absolute left-[50%]
         translate-x-[-50%] top-[50%] translate-y-[-50%] rounded-xl flex flex-col items-start gap-5 pt-5 pb-10">
            <div className="hover:brightness-75 ml-5 ">
                <button onClick={() => setLoginDialog(false)}><Back /></button>
            </div>
            <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col items-center gap-2 w-full">
                <div className="">
                    <h2 className='underline underline-offset-[5px] mb-3'>Email</h2>
                    <input type="text" {...register("email")} placeholder="Email" className="p-1" />
                </div>
                <div className="">
                    <h2 className='underline underline-offset-[5px] mb-3'>Password</h2>
                    <input type="text" {...register("password")} placeholder="Password" className="p-1" />
                </div>
                <button className="p-2 bg-blue-900 mt-5 w-[100px] rounded-xl">Login</button>
            </form>
            <div className="cursor-pointer hover:text-gray-300 w-full text-center" onClick={() => setSignupDialog(true)}>No account yet? Sign up here.</div>
        </div>
    )
}

export default LoginDialog