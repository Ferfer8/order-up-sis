// Funny pop-up used for the greedy message and the no-drink check
import { useEffect, useRef } from "react"
import "./GreedyPopup.css"

function GreedyPopup({
    message,
    onClose,
    heading = "HMMM!",
    buttonLabel = "Okay, okay",
    secondaryLabel,
    onSecondary,
}) {
    const buttonRef = useRef(null)

    useEffect(() => {
        if (!message) return
        // Focus the button so Enter and Escape work straight away
        buttonRef.current?.focus()
        const handleKey = (event) => {
            if (event.key === "Escape") onClose()
        }
        window.addEventListener("keydown", handleKey)
        return () => window.removeEventListener("keydown", handleKey)
    }, [message, onClose])

    if (!message) return null

    return (
        <div className="greedy-popup-overlay">
            <div
                className="greedy-popup"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="greedy-popup-heading"
                aria-describedby="greedy-popup-text"
            >
                <h2 id="greedy-popup-heading" className="greedy-popup-heading">{heading}</h2>
                <p id="greedy-popup-text" className="greedy-popup-text">{message}</p>
                <div className="greedy-popup-buttons">
                    <button ref={buttonRef} className="greedy-popup-button" onClick={onClose}>
                        {buttonLabel}
                    </button>
                    {secondaryLabel && (
                        <button
                            className="greedy-popup-button greedy-popup-button-secondary"
                            onClick={onSecondary}
                        >
                            {secondaryLabel}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default GreedyPopup
