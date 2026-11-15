// Main course step 3: salad or coleslaw, plus the drinks
import "./SidePage.css"
import MainCourseStep from "../components/MainCourseStep"
import DrinkPicker from "../components/DrinkPicker"

function SidePage() {
    return (
        <>
            <MainCourseStep slot="side" requireDrink />
            <DrinkPicker />
        </>
    )
}

export default SidePage
