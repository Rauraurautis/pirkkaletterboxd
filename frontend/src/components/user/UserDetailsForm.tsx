import { FC } from 'react'
import { User } from '../../lib/types'
import { editUser } from '../../services/userServices'
import { toast } from 'react-toastify'
import { useAuthStore } from '../../lib/store/AuthStore'

interface UserDetailsFormProps {
    user: User | null
}

const UserDetailsForm: FC<UserDetailsFormProps> = ({ user }) => {
    const setUser = useAuthStore(state => state.setUser)


    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (user) {
                const formData = new FormData()

                if (e.target.files) {
                    let image = e.target.files[0]
                    formData.append("avatar", image)
                }
                formData.append("email", user.email)
                formData.append("name", user.name)

                const editedUser = await editUser(user._id, formData)
                if (editedUser) {
                    toast.success("Avatar updated!")
                    setUser({...user, avatar_path: editedUser.avatar_path})
                }
                return editedUser
            }
        } catch (error) {
            toast.error("Image too large, max size 1 MB!")
        }
    }

    return (
        <div className="flex justify-center items-center hover:brightness-90">
            <label htmlFor="upload-profile-picture" className="bg-blue-600 p-2 rounded-md cursor-pointer ">Change profile picture</label>
            <input type="file" className="opacity-0 absolute cursor-pointer " id="upload-profile-picture" onChange={handleAvatarChange} />
        </div>
    )
}

export default UserDetailsForm