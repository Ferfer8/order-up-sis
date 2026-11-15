// Dessert page: apple pie or brownie, on a fresh plate
import "./DessertPage.css"
import WaveHeading from "../components/WaveHeading"
import CourseProgress from "../components/CourseProgress"
import CourseNav from "../components/CourseNav"
import JokeBackButton from "../components/JokeBackButton"
import Dish from "../components/Dish"
import GreedyPopup from "../components/GreedyPopup"
import useScoop from "../hooks/useScoop"
import { getStep } from "../data/courses"

const DISHES = [
    { id: "apple-pie", name: "Apple pie" },
    { id: "brownie", name: "Brownie" },
]

const servingImage = (id) => `/images/dessert/${id}.svg`
const fetchedImage = (id) => `/images/dessert/${id}-fetched.svg`
const spoonImage = (id) => `/images/dessert/spoon-${id}.svg`
// Plated files don't follow the dish ids
const PLATED_IMAGES = {
    "apple-pie": "/images/dessert_plate/plate-pie.svg",
    brownie: "/images/dessert_plate/plate-brownies.svg",
}
const EMPTY_PLATE = "/images/appetizer/plate.svg"

const STEP = getStep("dessert")

function DessertPage() {
    const scoop = useScoop({ course: "dessert", dishes: DISHES, spoonImage })
    const { onPlate, platedDish } = scoop

    return (
        <>
            <JokeBackButton />
            <h6 className="top-text">{STEP.label}</h6>
            <WaveHeading title={STEP.title} />

            <img
                key={scoop.plateShakes}
                className={[
                    "plate dessert-plate",
                    onPlate === "apple-pie" && "dessert-plate-pie",
                    scoop.plateShakes && "shake",
                ]
                    .filter(Boolean)
                    .join(" ")}
                src={onPlate ? PLATED_IMAGES[onPlate] : EMPTY_PLATE}
                alt={platedDish ? `Your plate with ${platedDish.name}` : "Your empty plate"}
                onClick={scoop.handlePlateClick}
            />

            {DISHES.map((dish) => (
                <Dish
                    key={dish.id}
                    className={dish.id}
                    name={dish.name}
                    src={scoop.isTaken(dish.id) ? fetchedImage(dish.id) : servingImage(dish.id)}
                    onClick={() => scoop.handleDishClick(dish.id)}
                    shake={scoop.dishShakes[dish.id]}
                    bubble={scoop.bubble?.dishId === dish.id ? scoop.bubble : null}
                    onBubbleDone={scoop.clearBubble}
                />
            ))}

            <CourseProgress
                step={STEP.number}
                text={platedDish ? `On your plate: ${platedDish.name}` : undefined}
            />

            <CourseNav nextTo={STEP.nextPath} canContinue={Boolean(onPlate)} />

            <GreedyPopup
                message={scoop.greedyMessage}
                onClose={scoop.closeGreedyPopup}
            />
        </>
    )
}

export default DessertPage
