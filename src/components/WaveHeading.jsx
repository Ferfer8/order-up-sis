// Big title where each letter bobs in a wave
import "./WaveHeading.css"
function WaveHeading({ title }) {
    return (
        <h1 className="heading">
            {title.split("").map((letter, index) => (
                <span
                    key={index}
                    // Staggered delay is what makes it ripple
                    style={{ animationDelay: `${index * 0.1}s` }}
                >
                    {letter === " " ? " " : letter}
                </span>
            ))}
        </h1>
    )
}

export default WaveHeading
