// One-time "made for desktop" notice on touch screens, shown before anything else
import "./PhoneNotice.css"
import { useEffect, useRef, useState } from "react"
import useIsTouch from "../hooks/useIsTouch"

// Separate from the order progress, so starting over doesn't bring it back
const STORAGE_KEY = "order-up-sis-phone-notice-seen"

// Storage can be blocked (private mode), so never let it crash the app
const hasSeenNotice = () => {
    try {
        return window.sessionStorage.getItem(STORAGE_KEY) === "true"
    } catch {
        return false
    }
}

const rememberNoticeSeen = () => {
    try {
        window.sessionStorage.setItem(STORAGE_KEY, "true")
    } catch {
        // Blocked: it'll just show again after a refresh
    }
}

function PhoneNotice() {
    const isTouch = useIsTouch()
    const [seen, setSeen] = useState(hasSeenNotice)
    const buttonRef = useRef(null)
    const open = isTouch && !seen

    useEffect(() => {
        if (open) buttonRef.current?.focus()
    }, [open])

    if (!open) return null

    const close = () => {
        rememberNoticeSeen()
        setSeen(true)
    }

    return (
        <div className="phone-notice">
            <div
                className="phone-notice-card"
                role="dialog"
                aria-modal="true"
                aria-labelledby="phone-notice-heading"
                aria-describedby="phone-notice-text"
            >
                <h2 id="phone-notice-heading" className="phone-notice-heading">Heads up!</h2>
                <p id="phone-notice-text" className="phone-notice-text">
                    This web app was made to be used on a laptop or desktop. If you'd like to
                    carry on with your phone, you can, but it won't look or work quite as smoothly.
                </p>
                <button ref={buttonRef} className="phone-notice-button" onClick={close}>
                    OK
                </button>
            </div>
        </div>
    )
}

export default PhoneNotice
