import axios from "axios"
import { useEffect, useState } from "react"
import { useAuthStore } from "../lib/store/AuthStore"

export const useAvatar = () => {
    const { user } = useAuthStore(state => ({ user: state.user }))
    const [avatar, setAvatar] = useState<string | null>(null)

    useEffect(() => {
        const address = import.meta.env.VITE_IP_ADDRESS
        if (user) {
            const { avatar_path } = user
            if (user?.avatar_path) {
                axios.get(`http://${address}/api/${avatar_path}`).then(_ => setAvatar(`http://${address}/api/${avatar_path}`)).catch(_ => { return })
            }
        }

    }, [user])

    return avatar
}