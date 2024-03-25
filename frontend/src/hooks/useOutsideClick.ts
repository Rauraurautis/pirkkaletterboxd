import { useCallback, useEffect, useRef } from "react"

export const useOutsideClick = (setVisible: Function) => {
    const ref = useRef<HTMLDivElement | null>(null)

    const handleOutsideClick = useCallback((e: MouseEvent) => {
        if (ref.current && e.target instanceof Node && !ref.current.contains(e.target)) {
            setVisible()
        }
    }, [])

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick)
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick)
        }
    }, [])

    return { ref }
}