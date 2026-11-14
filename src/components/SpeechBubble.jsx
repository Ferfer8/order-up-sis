import "./SpeechBubble.css"

// Pops in, stays for about 2.5s, fades out by itself, then calls onDone.
function SpeechBubble({ message, onDone }) {
    return (
        <p className="speech-bubble" role="status" onAnimationEnd={onDone}>
            {message}
        </p>
    )
}

export default SpeechBubble
