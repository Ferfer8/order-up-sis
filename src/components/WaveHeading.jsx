import "./WaveHeading.css"
function WaveHeading({ title }) {
    return (
        <h1 className="heading">
            {title.split("").map((letter, index) => (
                <span
                    key={index}
                    style={{ animationDelay: `${index * 0.1}s` }}
                >
                    {letter === " " ? " " : letter}
                </span>
            ))}
        </h1>
    )
}

export default WaveHeading
