import axios from "axios"
import { useEffect, useState } from "react"

export const useAvatar = (avatar_path: string | undefined | null) => {
    const [avatar, setAvatar] = useState<string | null>(null)

    if (!avatar_path) return avatar

    useEffect(() => {
        const address = import.meta.env.VITE_IP_ADDRESS
        axios.get(`http://${address}/api/${avatar_path}`).then(_ => setAvatar(`http://${address}/api/${avatar_path}`)).catch(_ => { return })
    }, [])

    return avatar
}