// Spoon that follows the mouse on the course pages (or glides to taps on touch screens)
import { useEffect, useRef } from "react"
import "./SpoonCursor.css"
import useIsTouch from "../hooks/useIsTouch"
import { getTouchScale } from "../utils/touchScale"

const EMPTY_SPOON = "/images/appetizer/spoon.svg"

function SpoonCursor({ src = EMPTY_SPOON, bounceKey = 0 }) {
    const spoonRef = useRef(null)
    // Moved with transform so the browser doesn't repaint what's underneath
    const followRef = useRef(null)

    useEffect(() => {
        // Touch screens keep their normal behaviour
        const hasMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches
        if (!hasMouse) return

        const follow = followRef.current
        document.body.classList.add("spoon-cursor-active")

        const handleMove = (event) => {
            follow.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
            follow.style.opacity = "1"
        }
        const handleLeave = () => {
            follow.style.opacity = "0"
        }

        window.addEventListener("mousemove", handleMove)
        document.documentElement.addEventListener("mouseleave", handleLeave)

        return () => {
            document.body.classList.remove("spoon-cursor-active")
            window.removeEventListener("mousemove", handleMove)
            document.documentElement.removeEventListener("mouseleave", handleLeave)
        }
    }, [])

    // Touch screens: no cursor to follow, so the spoon rests beside the plate
    // and glides to whichever dish or plate gets tapped
    const isTouch = useIsTouch()
    const srcRef = useRef(src)
    const restRef = useRef(null)
    useEffect(() => {
        srcRef.current = src
    }, [src])

    useEffect(() => {
        if (!isTouch) return
        const follow = followRef.current
        let timer

        // Positions are in page units, so divide screen pixels by the page scale
        const moveTo = (x, y) => {
            follow.style.transform = `translate(${x}px, ${y}px)`
        }
        // Just left of the plate (350px wide, centred, near the bottom)
        const rest = () => {
            const scale = getTouchScale()
            moveTo(window.innerWidth / scale / 2 - 240, window.innerHeight / scale - 330)
        }
        restRef.current = rest

        const handleTap = (event) => {
            // Drinks are picked up by hand, not with the spoon
            if (!event.target.closest?.(".dish:not(.drink), .plate")) return
            const scale = getTouchScale()
            moveTo(event.clientX / scale, event.clientY / scale)
            // Nothing scooped (e.g. tapped an empty plate): wander back
            clearTimeout(timer)
            timer = setTimeout(() => {
                if (srcRef.current === EMPTY_SPOON) rest()
            }, 900)
        }
        const handleResize = () => {
            if (srcRef.current === EMPTY_SPOON) rest()
        }

        // Next frame, so App has set the page scale first
        const frame = requestAnimationFrame(rest)
        window.addEventListener("pointerdown", handleTap)
        window.addEventListener("resize", handleResize)
        return () => {
            cancelAnimationFrame(frame)
            clearTimeout(timer)
            window.removeEventListener("pointerdown", handleTap)
            window.removeEventListener("resize", handleResize)
        }
    }, [isTouch])

    // Food put down (spoon empty again): head back beside the plate
    useEffect(() => {
        if (!isTouch || src !== EMPTY_SPOON) return
        const timer = setTimeout(() => restRef.current?.(), 600)
        return () => clearTimeout(timer)
    }, [isTouch, src])

    // Restarts an animation class from the beginning
    const playAnimation = (className) => {
        const spoon = spoonRef.current
        spoon.classList.remove("shake", "spoon-bounce")
        void spoon.offsetWidth // forces a reflow so the animation replays
        spoon.classList.add(className)
    }

    // Wobble when the spoon picks something up or puts it down (not on first load)
    const isFirstSrc = useRef(true)
    useEffect(() => {
        if (isFirstSrc.current) {
            isFirstSrc.current = false
            return
        }
        playAnimation("shake")
    }, [src])

    // Bounce back when the food is offered to the wrong dish
    useEffect(() => {
        if (bounceKey > 0) playAnimation("spoon-bounce")
    }, [bounceKey])

    return (
        <div ref={followRef} className="spoon-cursor-follow" aria-hidden="true">
            <img
                ref={spoonRef}
                className="spoon-cursor"
                src={src}
                alt=""
            />
        </div>
    )
}

export default SpoonCursor
