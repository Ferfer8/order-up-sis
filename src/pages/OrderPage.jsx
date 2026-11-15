// Final page showing the full order as a receipt
import "./OrderPage.css"
import { useRef, useState } from "react"
import { Download, RotateCcw } from "lucide-react"
import { toPng } from "html-to-image"
import WaveHeading from "../components/WaveHeading"
import { COURSES } from "../data/courses"
import { MAIN_COURSE_STEPS } from "../data/mainCourse"
import { RECEIPT_PRICES, getVerdict, shuffled } from "../data/receipt"

// Picks for one course in display order (main course is always rice, protein, side)
function picksFor(selections, courseId) {
    const picks = selections[courseId] ?? {}
    if (courseId === "main-course") {
        return MAIN_COURSE_STEPS.map((step) => picks[step.slot]).filter(Boolean)
    }
    return Object.values(picks)
}

function OrderPage({ selections, onStartOver }) {
    const receiptRef = useRef(null)
    const [saving, setSaving] = useState(false)
    const [saveFailed, setSaveFailed] = useState(false)

    // Shuffled once per visit so prices don't change on re-render
    const [prices] = useState(() => shuffled(RECEIPT_PRICES))

    // Item N on the whole receipt gets price N, so no price shows up twice
    const picksByCourse = COURSES.map((course) => picksFor(selections, course.id))
    const allPicks = picksByCourse.flat()
    const courses = COURSES.map((course, courseIndex) => {
        const firstItemNumber = picksByCourse.slice(0, courseIndex).flat().length
        return {
            ...course,
            items: picksByCourse[courseIndex].map((name, index) => ({
                name,
                price: prices[firstItemNumber + index],
            })),
        }
    })
    const verdict = getVerdict(allPicks)

    const saveReceipt = async () => {
        setSaving(true)
        setSaveFailed(false)
        try {
            await document.fonts.ready // wait for Chewy and Fredoka or the PNG falls back
            const dataUrl = await toPng(receiptRef.current, {
                pixelRatio: 2,
                cacheBust: true,
            })
            const link = document.createElement("a")
            link.download = "order-up-sis-receipt.png"
            link.href = dataUrl
            link.click()
        } catch (error) {
            console.error("Couldn't save the receipt", error)
            setSaveFailed(true)
        } finally {
            setSaving(false)
        }
    }

    return (
        <main className="order-page">
            <WaveHeading title="Your order" />

            {/* Save | receipt | start over */}
            <div className="order-layout">
                <button
                    className="order-button order-button-save"
                    onClick={saveReceipt}
                    disabled={saving}
                >
                    <Download size={22} strokeWidth={3} />
                    {saving ? "Saving..." : "Save my receipt"}
                </button>

                {/* Everything in here ends up in the PNG */}
                <div className="receipt-capture" ref={receiptRef}>
                    <div className="receipt">
                        <header className="receipt-header">
                            <p className="receipt-title">Order Up, Sis!</p>
                            <p className="receipt-subtitle">Kitchen receipt</p>
                        </header>

                        {courses.map((course) => (
                            <section key={course.id} className="receipt-course">
                                <h2 className="receipt-course-title">{course.title}</h2>
                                {course.items.length > 0 ? (
                                    <ul className="receipt-items">
                                        {course.items.map((item) => (
                                            <li key={item.name} className="receipt-item">
                                                <span className="receipt-item-name">{item.name}</span>
                                                <span className="receipt-dots" aria-hidden="true"></span>
                                                <span className="receipt-price">{item.price}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="receipt-empty">Nothing picked</p>
                                )}
                            </section>
                        ))}

                        <footer className="receipt-footer">
                            <p className="receipt-total">TOTAL: You're washing the plates.</p>
                            <p className="receipt-small-print">Estimated wait: until I feel like cooking.</p>
                            <p className="receipt-small-print">No refunds. No take-backs.</p>
                        </footer>
                    </div>

                    <p className="receipt-verdict">
                        <span className="receipt-verdict-label">Chef's verdict:</span> {verdict}
                    </p>
                </div>

                <button
                    className="order-button order-button-secondary order-button-restart"
                    onClick={onStartOver}
                >
                    <RotateCcw size={22} strokeWidth={3} />
                    Send it back to the kitchen
                </button>
            </div>
            {saveFailed && (
                <p className="order-save-error" role="alert">
                    The printer jammed. Try saving again.
                </p>
            )}
        </main>
    )
}

export default OrderPage
