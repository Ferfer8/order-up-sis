import "./MainCoursePage.css"
import WaveHeading from "../components/WaveHeading"
import Dish from "../components/Dish"

// labelPosition keeps each hover label on screen
const DISHES = [
    { id: "jollof-rice", name: "Jollof rice", labelPosition: "bottom" },
    { id: "fried-rice", name: "Fried rice", labelPosition: "right" },
    { id: "chicken", name: "Chicken", labelPosition: "bottom" },
    { id: "fish", name: "Fish", labelPosition: "left" },
]

const servingImage = (id) => `/images/main_course/${id}.svg`

function MainCoursePage() {
    return (
        <>
            <h6 className="top-text">COURSE 2 OF 3</h6>
            <WaveHeading title="Main course" />

            <img className="plate" src="/images/appetizer/plate.svg" alt="Your empty plate" />

            {DISHES.map((dish) => (
                <Dish
                    key={dish.id}
                    className={dish.id}
                    name={dish.name}
                    labelPosition={dish.labelPosition}
                    src={servingImage(dish.id)}
                />
            ))}
        </>
    )
}

export default MainCoursePage
