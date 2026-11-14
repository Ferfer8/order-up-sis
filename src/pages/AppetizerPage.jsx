import "./AppetizerPage.css"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import WaveHeading from "../components/WaveHeading"
import CourseProgress from "../components/CourseProgress"
import Dish from "../components/Dish"

function AppetizerPage() {
    const navigate = useNavigate()

    return (
        <>
            <button
                className="back-button"
                onClick={() => navigate("/")}
            >
                <ArrowLeft size={22} strokeWidth={3} />
                Back
            </button>
            <h6 className="top-text">COURSE 1 OF 3</h6>
            <WaveHeading title="Appetizer" />

            <img className="plate" src="/images/appetizer/plate.svg" alt="Empty plate" />
            <Dish className="small-chops" name="Small chops" src="/images/appetizer/small-chops.svg" />
            <Dish className="pepper-soup" name="Pepper soup" src="/images/appetizer/pepper-soup.svg" />

            <CourseProgress course={1} />
        </>
    )
}

export default AppetizerPage
