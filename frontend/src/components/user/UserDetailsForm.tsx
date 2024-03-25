import { FC } from 'react'
import { User } from '../../lib/types'
import { editUser } from '../../services/userServices'

interface UserDetailsFormProps {
    user: User | null
}

const UserDetailsForm: FC<UserDetailsFormProps> = ({ user }) => {

    

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (user) {
            const formData = new FormData()

            if (e.target.files) {
                let image = e.target.files[0]
                formData.append("avatar", image)
            }
            formData.append("email", user.email)
            formData.append("name", user.name)

            const editedUser = await editUser(user._id, formData)
            return editedUser
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