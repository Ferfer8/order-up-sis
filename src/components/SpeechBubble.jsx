// Speech bubble with a tail, either timed or steady
import "./SpeechBubble.css"

// Default: pops in, stays ~2.5s, fades out, then calls onDone
// steady: stays until the parent removes it. below: hangs under the anchor
function SpeechBubble({ message, onDone, steady = false, below = false }) {
    const className = [
        "speech-bubble",
        steady && "speech-bubble-steady",
        below && "speech-bubble-below",
    ]
        .filter(Boolean)
        .join(" ")

    return (
        <p
            className={className}
            role="status"
            onAnimationEnd={onDone}
        >
            {message}
        </p>
    )
}

export default SpeechBubble
