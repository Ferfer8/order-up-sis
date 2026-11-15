// Works out how far to shrink the page on touch screens, as CSS variables for touch.css

// The desktop layout was built for roughly this size
const DESIGN_WIDTH = 1440
const DESIGN_HEIGHT = 900
// The receipt page scrolls, so it only needs to fit the width of the narrow layout
const RECEIPT_WIDTH = 620

// Sets --touch-scale (whole page) plus zooms that bring small things back up
// to a readable, tappable size. Each zoom is relative to the shrunk page
export function applyTouchScale(pathname) {
    const width = window.innerWidth
    const height = window.innerHeight
    const scale =
        pathname === "/order"
            ? Math.min(1, width / RECEIPT_WIDTH)
            : Math.min(1, width / DESIGN_WIDTH, height / DESIGN_HEIGHT)

    const root = document.documentElement.style
    root.setProperty("--touch-scale", scale)
    root.setProperty("--touch-unscale", 1 / scale) // undoes the page shrink (rotate prompt)
    root.setProperty("--touch-button-zoom", Math.max(1, 0.9 / scale))
    root.setProperty("--touch-popup-zoom", Math.max(1, 0.75 / scale))
    root.setProperty("--touch-text-zoom", Math.max(1, 0.55 / scale))
    root.setProperty("--touch-bubble-zoom", Math.max(1, 0.65 / scale))
}

// Current page scale (1 when nothing has been set, e.g. on desktop)
export function getTouchScale() {
    const value = parseFloat(document.documentElement.style.getPropertyValue("--touch-scale"))
    return value > 0 ? value : 1
}
