import { useCallback, useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import useRandomMessage from "./useRandomMessage"
import { GREEDY_MESSAGES, WRONG_DISH_MESSAGES } from "../data/messages"

// All the scooping rules for a course page.
//   course:     course id from data/courses.js, e.g. "starter"
//   slot:       which pick this is within the course (default "dish");
//               a course with several picks uses one slot per pick
//   dishes:     [{ id, name }]
//   spoonImage: (id) => path of the spoon holding that dish
function useScoop({ course, slot = "dish", dishes, spoonImage }) {
    const { setSpoonSrc, bounceSpoon, selections, setSelection } = useOutletContext()
    const pickGreedyMessage = useRandomMessage(GREEDY_MESSAGES)
    const pickWrongDishMessage = useRandomMessage(WRONG_DISH_MESSAGES)

    // id of the dish on the spoon / on her plate, or null
    const [onSpoon, setOnSpoon] = useState(null)
    // Start with whatever was already saved, so the plate is still full
    // when she comes back to this page
    const [onPlate, setOnPlate] = useState(() => {
        const savedName = selections[course]?.[slot]
        return dishes.find((dish) => dish.name === savedName)?.id ?? null
    })

    // Animations: a counter going up restarts the animation
    const [plateShakes, setPlateShakes] = useState(0)
    const [dishShakes, setDishShakes] = useState({}) // { id: { count, type } }

    const [greedyMessage, setGreedyMessage] = useState(null)
    const [bubble, setBubble] = useState(null) // { dishId, message, key }

    // Stable so the pop-up and bubble don't re-run their effects every render
    const closeGreedyPopup = useCallback(() => setGreedyMessage(null), [])
    const clearBubble = useCallback(() => setBubble(null), [])

    const findDish = (id) => dishes.find((dish) => dish.id === id)

    const shakeDish = (id, type = "wobble") =>
        setDishShakes((shakes) => ({
            ...shakes,
            [id]: { count: (shakes[id]?.count ?? 0) + 1, type },
        }))
    const shakePlate = () => setPlateShakes((count) => count + 1)

    // Keep the cursor in sync with what's on the spoon
    useEffect(() => {
        setSpoonSrc(onSpoon ? spoonImage(onSpoon) : null)
    }, [onSpoon, setSpoonSrc, spoonImage])

    // Save what's on the plate as this course's pick (or clear it)
    useEffect(() => {
        const name = dishes.find((dish) => dish.id === onPlate)?.name ?? null
        setSelection(course, slot, name)
    }, [onPlate, course, slot, dishes, setSelection])

    // Leave the spoon empty when moving to another page
    useEffect(() => () => setSpoonSrc(null), [setSpoonSrc])

    const handleDishClick = (id) => {
        if (onSpoon === id) {
            // Put it back on its own serving dish
            setOnSpoon(null)
            shakeDish(id)
        } else if (onSpoon) {
            // Wrong dish: the food stays on the spoon
            shakeDish(id, "no")
            bounceSpoon()
            const message = pickWrongDishMessage({
                food: findDish(onSpoon).name,
                dish: findDish(id).name,
            })
            setBubble((previous) => ({
                dishId: id,
                message,
                key: (previous?.key ?? 0) + 1,
            }))
        } else if (onPlate && onPlate !== id) {
            // Her plate already has the other dish
            setGreedyMessage(pickGreedyMessage())
        } else if (!onPlate) {
            // Scoop it
            setOnSpoon(id)
            shakeDish(id)
        }
    }

    const handlePlateClick = () => {
        if (onSpoon && !onPlate) {
            // Put the scooped dish on her plate
            setOnPlate(onSpoon)
            setOnSpoon(null)
            shakePlate()
        } else if (!onSpoon && onPlate) {
            // Scoop it back off her plate
            setOnSpoon(onPlate)
            setOnPlate(null)
            shakePlate()
        }
    }

    return {
        onSpoon,
        onPlate,
        platedDish: findDish(onPlate),
        isTaken: (id) => onSpoon === id || onPlate === id,
        plateShakes,
        dishShakes,
        handleDishClick,
        handlePlateClick,
        greedyMessage,
        closeGreedyPopup,
        bubble,
        clearBubble,
    }
}

export default useScoop
