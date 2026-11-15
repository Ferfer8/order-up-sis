// The three drinks on the side page: click one to put it by the plate
import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import "./DrinkPicker.css"
import Dish from "./Dish"
import useRandomMessage from "../hooks/useRandomMessage"
import { DRINK_MESSAGES } from "../data/messages"

const DRINKS = [
    { id: "mango-juice", name: "Mango juice" },
    { id: "water", name: "Water" },
    { id: "zobo", name: "Zobo" },
]

const drinkImage = (id) => `/images/drinks/${id}.svg`

function DrinkPicker() {
    const { selections, setSelection } = useOutletContext()
    const pickMessage = useRandomMessage(DRINK_MESSAGES)

    // Start from the saved drink so it's still by the plate after a refresh
    const [chosen, setChosen] = useState(() => {
        const savedName = selections.drinks?.drink
        return DRINKS.find((drink) => drink.name === savedName)?.id ?? null
    })
    const [shakes, setShakes] = useState({})
    const [bubble, setBubble] = useState(null)

    const choose = (id) => {
        setChosen(id)
        const name = DRINKS.find((drink) => drink.id === id)?.name ?? null
        setSelection("drinks", "drink", name)
        if (id) {
            setShakes((previous) => ({
                ...previous,
                [id]: { count: (previous[id]?.count ?? 0) + 1, type: "wobble" },
            }))
        }
    }

    const handleClick = (id) => {
        if (chosen === id) {
            // Clicked the one by the plate: put it back
            choose(null)
        } else if (chosen) {
            // Already holding a drink: swap them and show a cheeky message
            choose(id)
            setBubble((previous) => ({
                dishId: id,
                message: pickMessage(),
                key: (previous?.key ?? 0) + 1,
            }))
        } else {
            choose(id)
        }
    }

    return DRINKS.map((drink) => (
        <Dish
            key={drink.id}
            className={`drink drink-${drink.id}${chosen === drink.id ? " drink-chosen" : ""}`}
            name={drink.name}
            labelPosition="top"
            src={drinkImage(drink.id)}
            onClick={() => handleClick(drink.id)}
            shake={shakes[drink.id]}
            bubble={bubble?.dishId === drink.id ? bubble : null}
            onBubbleDone={() => setBubble(null)}
        />
    ))
}

export default DrinkPicker
