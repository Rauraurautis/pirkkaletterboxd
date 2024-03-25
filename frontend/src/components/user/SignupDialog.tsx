import { FC } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { SignUpUser } from '../../lib/types'
import { signUp } from '../../services/userServices'
import { toast } from 'react-toastify'
import Back from '../ui/Back'

interface SignupDialogProps {
  setSignupDialog: React.Dispatch<React.SetStateAction<boolean>>
}

const SignupDialog: FC<SignupDialogProps> = ({ setSignupDialog }) => {

  const { register, handleSubmit, formState: { errors }, } = useForm()


  const handleSignUp = async (values: FieldValues) => {
    const user: SignUpUser = { email: values.email, name: values.name, password: values.password, passwordConfirmation: values.passwordConfirmation }
    const signedUp = await signUp(user)
    if (signedUp) {
      setSignupDialog(false)
      toast("Succesfully signed up the user, you may now log in.", { theme: "dark" })
    }
  }



  return (
    <div className="z-20 max-h-[600px]  min-w-[300px] bg-zinc-700 absolute left-[50%]
       translate-x-[-50%] top-[50%] translate-y-[-50%] rounded-xl flex flex-col items-start justify-center gap-5 pt-5 pb-10">
      <div className="hover:brightness-75 ml-5 ">
        <button onClick={() => setSignupDialog(false)}><Back /></button>
      </div>
      <form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col items-center gap-2 w-full">
        <div className="">
          <h2 className='underline underline-offset-[5px] mb-3'>Email</h2>
          <input type="text" {...register("email")} placeholder="Email" className="p-1" />
          {errors.email && <p className="text-red-600">A proper email in the format ***@***.*** is required.</p>}
        </div>
        <div className="">
          <h2 className='underline underline-offset-[5px] mb-3'>Username</h2>
          <input type="text" {...register("name")} placeholder="Username" className="p-1" />
          {errors.name && <p className="text-red-600">A proper username is required.</p>}
        </div>
        <div className="">
          <h2 className='underline underline-offset-[5px] mb-3'>Password</h2>
          <input type="password" {...register("password")} placeholder="Password" className="p-1" />
          {errors.password && <p className="text-red-600">A proper password is required.</p>}
        </div>
        <div className="">
          <h2 className='underline underline-offset-[5px] mb-3'>Repeat password</h2>
          <input type="password" {...register("passwordConfirmation")} placeholder="Password" className="p-1" />
          {errors.passwordConfirmation && <p className="text-red-600">Password confirmation is incorrect.</p>}
        </div>
        <button className="p-2 bg-blue-900 mt-5 w-[100px] rounded-xl">Sign up</button>
      </form>
    </div>
  )
}

export default SignupDialog