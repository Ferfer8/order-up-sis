// All the scooping rules for one pick on a course page
import { useCallback, useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import useRandomMessage from "./useRandomMessage"
import { GREEDY_MESSAGES, WRONG_DISH_MESSAGES } from "../data/messages"

// course: id from data/courses.js. slot: which pick in that course (main course has three)
// dishes: [{ id, name }]. spoonImage: (id) => spoon image path
function useScoop({ course, slot = "dish", dishes, spoonImage }) {
    const { setSpoonSrc, bounceSpoon, selections, setSelection } = useOutletContext()
    const pickGreedyMessage = useRandomMessage(GREEDY_MESSAGES)
    const pickWrongDishMessage = useRandomMessage(WRONG_DISH_MESSAGES)

    // Dish ids, or null
    const [onSpoon, setOnSpoon] = useState(null)
    // Start from the saved pick so the plate is still full after a refresh
    const [onPlate, setOnPlate] = useState(() => {
        const savedName = selections[course]?.[slot]
        return dishes.find((dish) => dish.name === savedName)?.id ?? null
    })

    // Bumping a counter restarts its animation
    const [plateShakes, setPlateShakes] = useState(0)
    const [dishShakes, setDishShakes] = useState({}) // { id: { count, type } }

    const [greedyMessage, setGreedyMessage] = useState(null)
    const [bubble, setBubble] = useState(null) // { dishId, message, key }

    // useCallback so the pop-up's effect doesn't re-run every render
    const closeGreedyPopup = useCallback(() => setGreedyMessage(null), [])
    const clearBubble = useCallback(() => setBubble(null), [])

    const findDish = (id) => dishes.find((dish) => dish.id === id)

    const shakeDish = (id, type = "wobble") =>
        setDishShakes((shakes) => ({
            ...shakes,
            [id]: { count: (shakes[id]?.count ?? 0) + 1, type },
        }))
    const shakePlate = () => setPlateShakes((count) => count + 1)

    // Keep the cursor image in sync with what's on the spoon
    useEffect(() => {
        setSpoonSrc(onSpoon ? spoonImage(onSpoon) : null)
    }, [onSpoon, setSpoonSrc, spoonImage])

    // Plate contents are the saved pick, so the two can't drift apart
    useEffect(() => {
        const name = dishes.find((dish) => dish.id === onPlate)?.name ?? null
        setSelection(course, slot, name)
    }, [onPlate, course, slot, dishes, setSelection])

    // Empty the spoon when leaving the page
    useEffect(() => () => setSpoonSrc(null), [setSpoonSrc])

    const handleDishClick = (id) => {
        if (onSpoon === id) {
            // Back into its own dish
            setOnSpoon(null)
            shakeDish(id)
        } else if (onSpoon) {
            // Wrong dish: food stays on the spoon
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
            // Plate already has the other dish
            setGreedyMessage(pickGreedyMessage())
        } else if (!onPlate) {
            // Scoop it up
            setOnSpoon(id)
            shakeDish(id)
        }
    }

    const handlePlateClick = () => {
        if (onSpoon && !onPlate) {
            // Spoon onto the plate
            setOnPlate(onSpoon)
            setOnSpoon(null)
            shakePlate()
        } else if (!onSpoon && onPlate) {
            // Scoop it back off the plate
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
