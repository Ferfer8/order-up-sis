import "./Dish.css"

function Dish({ name, src, className = "" }) {
    return (
        <div className={`dish ${className}`}>
            <img className="dish-image" src={src} alt={name} />
            <span className="dish-label">{name}</span>
        </div>
    )
}

export default Dish
