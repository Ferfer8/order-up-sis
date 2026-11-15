// Next button that goes to the following step
import { useNavigate } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import "./NextButton.css"

// Dull and unclickable while disabled (nothing on the plate yet).
// onNext lets a page step in first (the side page checks for a drink)
function NextButton({ to, disabled = false, label = "Next", onNext }) {
    const navigate = useNavigate()

    return (
        <button
            className="next-course-button"
            disabled={disabled}
            onClick={() => (onNext ? onNext() : navigate(to))}
        >
            {label}
            <ArrowRight size={22} strokeWidth={3} />
        </button>
    )
}

export default NextButton

