// Progress dots and status text in the bottom-left of the course pages
import "./CourseProgress.css"
import { STEPS } from "../data/courses"
import useIsTouch from "../hooks/useIsTouch"

// step is 1-based, so it lines up with STEPS
function CourseProgress({ step, text }) {
    // No hover on touch screens, so the hint talks about tapping instead
    const isTouch = useIsTouch()
    const hint = isTouch
        ? "Tap a dish to scoop it, then tap your plate"
        : "Hover a dish, then scoop it with the spoon"

    return (
        <div className="course-progress">
            <div
                className="progress-dots"
                aria-label={`Progress: step ${step} of ${STEPS.length}`}
            >
                {STEPS.map((item, index) => (
                    <span
                        key={item.id}
                        className={
                            index + 1 === step
                                ? "progress-dot progress-dot-current"
                                : "progress-dot"
                        }
                    ></span>
                ))}
            </div>
            <p className="progress-text">{text ?? hint}</p>
        </div>
    )
}

export default CourseProgress
