// True on touch screens with no mouse (phones, tablets)
import { useEffect, useState } from "react"

// Same query as touch.css, so JS and CSS always agree
export const TOUCH_QUERY = "(hover: none) and (pointer: coarse)"

function useIsTouch() {
    const [isTouch, setIsTouch] = useState(() => window.matchMedia(TOUCH_QUERY).matches)

    useEffect(() => {
        const query = window.matchMedia(TOUCH_QUERY)
        const handleChange = () => setIsTouch(query.matches)
        query.addEventListener("change", handleChange)
        return () => query.removeEventListener("change", handleChange)
    }, [])

    return isTouch
}

export default useIsTouch
