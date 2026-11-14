import { useNavigate } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import "./NextButton.css"

// Top-right button to the next course. Stays dull and unclickable
// until `disabled` is false (i.e. something is on her plate).
function NextButton({ to, disabled = false, label = "Next" }) {
    const navigate = useNavigate()

    return (
        <button
            className="next-course-button"
            disabled={disabled}
            onClick={() => navigate(to)}
        >
            {label}
            <ArrowRight size={22} strokeWidth={3} />
        </button>
    )
}

export default NextButton
