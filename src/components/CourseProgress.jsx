import "./CourseProgress.css"

const TOTAL_COURSES = 3

function CourseProgress({
    course,
    text = "Hover a dish, then scoop it with the spoon",
}) {
    return (
        <div className="course-progress">
            <div
                className="progress-dots"
                aria-label={`Progress: course ${course} of ${TOTAL_COURSES}`}
            >
                {Array.from({ length: TOTAL_COURSES }, (_, index) => (
                    <span
                        key={index}
                        className={
                            index + 1 === course
                                ? "progress-dot progress-dot-current"
                                : "progress-dot"
                        }
                    ></span>
                ))}
            </div>
            <p className="progress-text">{text}</p>
        </div>
    )
}

export default CourseProgress
