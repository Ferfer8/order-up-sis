import "./OrderPage.css"
import WaveHeading from "../components/WaveHeading"
import { COURSES } from "../data/courses"

// Final page: everything she picked, grouped by course in order
function OrderPage({ selections }) {
    return (
        <>
            <WaveHeading title="Your order" />

            <div className="order-summary">
                {COURSES.map((course) => {
                    const picks = Object.values(selections[course.id] ?? {})
                    return (
                        <section key={course.id} className="order-course">
                            <h2 className="order-course-title">{course.title}</h2>
                            {picks.length > 0 ? (
                                <ul className="order-course-picks">
                                    {picks.map((name) => (
                                        <li key={name} className="order-course-pick">{name}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="order-course-empty">Nothing picked</p>
                            )}
                        </section>
                    )
                })}
            </div>
        </>
    )
}

export default OrderPage
