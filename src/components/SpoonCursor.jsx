import { useEffect, useRef } from "react"
import "./SpoonCursor.css"

function SpoonCursor() {
    const spoonRef = useRef(null)

    useEffect(() => {
        const hasMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches
        if (!hasMouse) return

        const spoon = spoonRef.current
        document.body.classList.add("spoon-cursor-active")

        const handleMove = (event) => {
            spoon.style.left = `${event.clientX}px`
            spoon.style.top = `${event.clientY}px`
            spoon.style.opacity = "1"
        }
        const handleLeave = () => {
            spoon.style.opacity = "0"
        }

        window.addEventListener("mousemove", handleMove)
        document.documentElement.addEventListener("mouseleave", handleLeave)

        return () => {
            document.body.classList.remove("spoon-cursor-active")
            window.removeEventListener("mousemove", handleMove)
            document.documentElement.removeEventListener("mouseleave", handleLeave)
        }
    }, [])

    return (
        <img
            ref={spoonRef}
            className="spoon-cursor"
            src="/images/appetizer/spoon.svg"
            alt=""
            aria-hidden="true"
        />
    )
}

export default SpoonCursor
