// Landing page with the welcome card and the Let's eat button
import "./LandingPage.css"
import { ArrowRight } from "lucide-react"
import MessageCard from "../components/MessageCard"
import WaveHeading from "../components/WaveHeading"

function LandingPage({ onStart }) {
    return (
        <>
            <h6 className="top-text">TONIGHT'S KITCHEN IS OPEN</h6>

            <WaveHeading title="Order Up, Sis!" />

            <MessageCard
                header="Welcome!"
                text="Please pick what you'd like to have tonight. One of each, no being greedy."
            />
            <img className="plate-corner" src="/images/appetizer/plate.svg" alt="Empty plate" />
            <img className="dish-corner" src="/images/main_course/dish.svg" alt="cloche" />
            <img className="spoon-corner" src="/images/appetizer/spoon.svg" alt="spoon" />
            <button id="start_button" className="next-button" onClick={onStart}>
                Let's eat! <ArrowRight size={26} strokeWidth={3} />
            </button>
        </>


    )
}

export default LandingPage
