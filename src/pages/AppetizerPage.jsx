import "./AppetizerPage.css"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import WaveHeading from "../components/WaveHeading"
import CourseProgress from "../components/CourseProgress"
import Dish from "../components/Dish"
import GreedyPopup from "../components/GreedyPopup"
import NextButton from "../components/NextButton"
import useScoop from "../hooks/useScoop"

const DISHES = [
    { id: "small-chops", name: "Small chops" },
    { id: "pepper-soup", name: "Pepper soup" },
]

const servingImage = (id) => `/images/appetizer/${id}.svg`
const fetchedImage = (id) => `/images/appetizer_fetch/${id}-fetched.svg`
const spoonImage = (id) => `/images/appetizer_fetch/spoon-${id}.svg`
const plateImage = (id) => `/images/appetizer_fetch/plate-${id}.svg`
const EMPTY_PLATE = "/images/appetizer/plate.svg"

function AppetizerPage() {
    const navigate = useNavigate()
    const scoop = useScoop({ course: "starter", dishes: DISHES, spoonImage })
    const { onPlate, platedDish } = scoop

    return (
        <>
            <button
                className="back-button"
                onClick={() => navigate("/")}
            >
                <ArrowLeft size={22} strokeWidth={3} />
                Back
            </button>
            <NextButton to="/main-course" disabled={!onPlate} />
            <h6 className="top-text">COURSE 1 OF 3</h6>
            <WaveHeading title="Appetizer" />

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
                course={1}
                text={platedDish ? `On your plate: ${platedDish.name}` : undefined}
            />

            <GreedyPopup
                message={scoop.greedyMessage}
                onClose={scoop.closeGreedyPopup}
            />
        </>
    )
}

export default AppetizerPage
