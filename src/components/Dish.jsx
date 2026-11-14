import "./Dish.css"
import SpeechBubble from "./SpeechBubble"

const SHAKE_CLASSES = { wobble: "shake", no: "shake-no" }

// shake:  { count, type }. A new count restarts the animation.
//         type is "wobble" (scooped / returned) or "no" (wrong dish).
// bubble: { message, key } shows a speech bubble next to this dish.
// labelPosition: "bottom" (default), "top", "left" or "right"
function Dish({
    name,
    src,
    className = "",
    labelPosition = "bottom",
    onClick,
    shake,
    bubble,
    onBubbleDone,
}) {
    const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            onClick?.()
        }
    }

    const shakeClass = shake ? SHAKE_CLASSES[shake.type] : ""

    return (
        <div
            className={`dish label-${labelPosition} ${className}`}
            role="button"
            tabIndex={0}
            aria-label={name}
            onClick={onClick}
            onKeyDown={handleKeyDown}
        >
            <img
                key={shake?.count ?? 0}
                className={`dish-image ${shakeClass}`}
                src={src}
                alt=""
            />
            <span className="dish-label">{name}</span>
            {bubble && (
                <SpeechBubble
                    key={bubble.key}
                    message={bubble.message}
                    onDone={onBubbleDone}
                />
            )}
        </div>
    )
}

export default Dish
