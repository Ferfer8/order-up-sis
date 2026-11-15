// A clickable dish with a hover label, shake animations and an optional speech bubble
import "./Dish.css"
import SpeechBubble from "./SpeechBubble"

// shake.type -> class in index.css
const SHAKE_CLASSES = { wobble: "shake", no: "shake-no" }

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
    // It's a div, so Enter/Space need wiring up to work like a button
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
            {/* New key = fresh img, which restarts the shake animation */}
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
