// Appetizer page: small chops or pepper soup
import "./AppetizerPage.css"
import WaveHeading from "../components/WaveHeading"
import CourseProgress from "../components/CourseProgress"
import CourseNav from "../components/CourseNav"
import HomeBackButton from "../components/HomeBackButton"
import Dish from "../components/Dish"
import GreedyPopup from "../components/GreedyPopup"
import useScoop from "../hooks/useScoop"
import { getStep } from "../data/courses"

const DISHES = [
    { id: "small-chops", name: "Small chops" },
    { id: "pepper-soup", name: "Pepper soup" },
]

const servingImage = (id) => `/images/appetizer/${id}.svg`
const fetchedImage = (id) => `/images/appetizer_fetch/${id}-fetched.svg`
const spoonImage = (id) => `/images/appetizer_fetch/spoon-${id}.svg`
const plateImage = (id) => `/images/appetizer_fetch/plate-${id}.svg`
const EMPTY_PLATE = "/images/appetizer/plate.svg"

const STEP = getStep("starter")

function AppetizerPage() {
    const scoop = useScoop({ course: "starter", dishes: DISHES, spoonImage })
    const { onPlate, platedDish } = scoop

    return (
        <>
            <HomeBackButton />
            <h6 className="top-text">{STEP.label}</h6>
            <WaveHeading title={STEP.title} />

            <img
                key={scoop.plateShakes}
                className={scoop.plateShakes ? "plate shake" : "plate"}
                src={onPlate ? plateImage(onPlate) : EMPTY_PLATE}
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

export default AppetizerPage
