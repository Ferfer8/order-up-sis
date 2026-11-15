// Full-screen "turn your phone sideways" message, only shown on phones held upright
import "./RotatePrompt.css"
import { RotateCw } from "lucide-react"

// Always rendered; RotatePrompt.css only displays it on phones in portrait
function RotatePrompt() {
    return (
        <div className="rotate-prompt" role="alert">
            <div className="rotate-prompt-card">
                <RotateCw className="rotate-prompt-icon" size={56} strokeWidth={2.5} />
                <p className="rotate-prompt-heading">Turn your phone sideways.</p>
                <p className="rotate-prompt-text">This table needs more room!</p>
            </div>
        </div>
    )
}

export default RotatePrompt
