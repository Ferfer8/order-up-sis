// Shared page for the rice, protein and side steps of the main course
import { useCallback, useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import WaveHeading from "./WaveHeading"
import CourseProgress from "./CourseProgress"
import CourseNav from "./CourseNav"
import JokeBackButton from "./JokeBackButton"
import Dish from "./Dish"
import GreedyPopup from "./GreedyPopup"
import useScoop from "../hooks/useScoop"
import useRandomMessage from "../hooks/useRandomMessage"
import { NO_DRINK_MESSAGES } from "../data/messages"
import { getStep } from "../data/courses"
import { getMainCourseStep, mainCoursePlateImage, MAIN_COURSE_STEPS } from "../data/mainCourse"

// requireDrink: ask "are you sure?" if Next is clicked with no drink picked
function MainCourseStep({ slot, requireDrink = false }) {
    const step = getStep(slot)
    const course = getMainCourseStep(slot)
    const { selections } = useOutletContext()
    const navigate = useNavigate()
    const pickNoDrinkMessage = useRandomMessage(NO_DRINK_MESSAGES)
    const [noDrinkMessage, setNoDrinkMessage] = useState(null)
    const closeNoDrinkPopup = useCallback(() => setNoDrinkMessage(null), [])

    const goNext = () => navigate(step.nextPath)
    const handleNext = () => {
        if (requireDrink && !selections.drinks?.drink) {
            setNoDrinkMessage(pickNoDrinkMessage())
        } else {
            goNext()
        }
    }

    const scoop = useScoop({
        course: "main-course",
        slot,
        dishes: course.dishes,
        spoonImage: course.spoonImage,
    })
    const { onPlate, platedDish } = scoop

    // Everything on the plate: locked picks from earlier steps, then this one
    const picks = selections["main-course"] ?? {}
    const earlierNames = []
    for (const item of MAIN_COURSE_STEPS) {
        if (item.slot === slot) break
        if (picks[item.slot]) earlierNames.push(picks[item.slot])
    }
    const plateNames = platedDish ? [...earlierNames, platedDish.name] : earlierNames

    return (
        <>
            <JokeBackButton />
            <h6 className="top-text">{step.label}</h6>
            <WaveHeading title={step.title} />

            <img
                key={scoop.plateShakes}
                className={scoop.plateShakes ? "plate shake" : "plate"}
                src={mainCoursePlateImage(selections, slot, onPlate)}
                alt={
                    plateNames.length
                        ? `Your plate with ${plateNames.join(", ")}`
                        : "Your empty plate"
                }
                onClick={scoop.handlePlateClick}
            />

            {course.dishes.map((dish) => (
                <Dish
                    key={dish.id}
                    className={dish.id}
                    name={dish.name}
                    src={
                        scoop.isTaken(dish.id)
                            ? course.fetchedImage(dish.id)
                            : course.servingImage(dish.id)
                    }
                    onClick={() => scoop.handleDishClick(dish.id)}
                    shake={scoop.dishShakes[dish.id]}
                    bubble={scoop.bubble?.dishId === dish.id ? scoop.bubble : null}
                    onBubbleDone={scoop.clearBubble}
                />
            ))}

            <CourseProgress
                step={step.number}
                text={platedDish ? `On your plate: ${plateNames.join(", ")}` : undefined}
            />

            <CourseNav nextTo={step.nextPath} canContinue={Boolean(onPlate)} onNext={handleNext} />

            <GreedyPopup
                message={scoop.greedyMessage}
                onClose={scoop.closeGreedyPopup}
            />

            <GreedyPopup
                message={noDrinkMessage}
                heading="WAIT!"
                buttonLabel="Pick a drink"
                onClose={closeNoDrinkPopup}
                secondaryLabel="I'm sure, no drink"
                onSecondary={goNext}
            />
        </>
    )
}

export default MainCourseStep
