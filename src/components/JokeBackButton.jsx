// Fake Back button after the appetizer: only shows a cheeky message
import { useEffect, useRef, useState } from "react"
import { ArrowLeft } from "lucide-react"
import "./JokeBackButton.css"
import SpeechBubble from "./SpeechBubble"
import useRandomMessage from "../hooks/useRandomMessage"
import useIsTouch from "../hooks/useIsTouch"
import { BACK_MESSAGES } from "../data/messages"

function JokeBackButton() {
    const pickMessage = useRandomMessage(BACK_MESSAGES)
    const [message, setMessage] = useState(null)
    const isTouch = useIsTouch()
    const hideTimer = useRef(null)

    const showMessage = () => setMessage(pickMessage())
    const hideMessage = () => setMessage(null)

    // Touch: no hover to end it, so a tap shows the message for ~2.5s
    const showBriefly = () => {
        showMessage()
        clearTimeout(hideTimer.current)
        hideTimer.current = setTimeout(hideMessage, 2500)
    }
    useEffect(() => () => clearTimeout(hideTimer.current), [])

    return (
        <div className="joke-back">
            <button
                className="back-button"
                // Phones fire fake mouse and focus events on a tap, so these are mouse-only
                onMouseEnter={isTouch ? undefined : showMessage}
                onMouseLeave={isTouch ? undefined : hideMessage}
                onFocus={isTouch ? undefined : showMessage}
                onBlur={isTouch ? undefined : hideMessage}
                onClick={
                    isTouch
                        ? showBriefly
                        : () => {
                              if (!message) showMessage()
                          }
                }
            >
                <ArrowLeft size={22} strokeWidth={3} />
                Back
            </button>
            {message && <SpeechBubble message={message} steady below />}
        </div>
    )
}

export default JokeBackButton
