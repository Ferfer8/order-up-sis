import { useEffect, useRef } from "react"
import "./SpoonCursor.css"

const EMPTY_SPOON = "/images/appetizer/spoon.svg"

function SpoonCursor({ src = EMPTY_SPOON, bounceKey = 0 }) {
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

    // Play an animation class from the start
    const playAnimation = (className) => {
        const spoon = spoonRef.current
        spoon.classList.remove("shake", "spoon-bounce")
        void spoon.offsetWidth // restart the animation
        spoon.classList.add(className)
    }

    // Wobble whenever the spoon picks something up or puts it down
    const isFirstSrc = useRef(true)
    useEffect(() => {
        if (isFirstSrc.current) {
            isFirstSrc.current = false
            return
        }
        playAnimation("shake")
    }, [src])

    // Small bounce back when she tries the wrong dish
    useEffect(() => {
        if (bounceKey > 0) playAnimation("spoon-bounce")
    }, [bounceKey])

    return (
        <img
            ref={spoonRef}
            className="spoon-cursor"
            src={src}
            alt=""
            aria-hidden="true"
        />
    )
}

export default SpoonCursor
