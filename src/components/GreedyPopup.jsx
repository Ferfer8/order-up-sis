import { useEffect, useRef } from "react"
import "./GreedyPopup.css"

function GreedyPopup({ message, onClose }) {
    const buttonRef = useRef(null)

    useEffect(() => {
        if (!message) return
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
                <h2 id="greedy-popup-heading" className="greedy-popup-heading">HMMM!</h2>
                <p id="greedy-popup-text" className="greedy-popup-text">{message}</p>
                <button ref={buttonRef} className="greedy-popup-button" onClick={onClose}>
                    Okay, okay
                </button>
            </div>
        </div>
    )
}

export default GreedyPopup
