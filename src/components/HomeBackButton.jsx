// Real Back button on the appetizer page, goes to the landing page
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import "./HomeBackButton.css"

function HomeBackButton() {
    const navigate = useNavigate()

    return (
        <button className="back-button home-back-button" onClick={() => navigate("/")}>
            <ArrowLeft size={22} strokeWidth={3} />
            Back
        </button>
    )
}

export default HomeBackButton
