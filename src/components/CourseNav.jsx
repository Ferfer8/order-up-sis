// Bottom-right nav that holds the Next button on the course pages
import "./CourseNav.css"
import NextButton from "./NextButton"

function CourseNav({ nextTo, canContinue, onNext }) {
    return (
        <nav className="course-nav" aria-label="Course navigation">
            <NextButton to={nextTo} disabled={!canContinue} onNext={onNext} />
        </nav>
    )
}

export default CourseNav
