// Saves and restores progress in sessionStorage so a refresh keeps the order
import { STEPS } from "../data/courses"

// Saved as { selections, path }. sessionStorage, so closing the tab starts fresh
const STORAGE_KEY = "order-up-sis-progress"

// Only send people back to pages that actually exist
const KNOWN_PATHS = new Set(["/", "/order", ...STEPS.map((step) => step.path)])

const isPlainObject = (value) =>
    typeof value === "object" && value !== null && !Array.isArray(value)

// Has to look like { course: { slot: "Dish name" } }
function isValidSelections(selections) {
    return (
        isPlainObject(selections) &&
        Object.values(selections).every(
            (picks) =>
                isPlainObject(picks) &&
                Object.values(picks).every((name) => typeof name === "string")
        )
    )
}

// null if nothing usable. Never throws: broken data just means start fresh
export function loadProgress() {
    try {
        const raw = window.sessionStorage.getItem(STORAGE_KEY)
        if (!raw) return null

        const saved = JSON.parse(raw)
        if (!isPlainObject(saved) || !isValidSelections(saved.selections)) {
            clearProgress()
            return null
        }

        return {
            selections: saved.selections,
            path: KNOWN_PATHS.has(saved.path) ? saved.path : null,
        }
    } catch {
        clearProgress()
        return null
    }
}

export function saveProgress(progress) {
    try {
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    } catch {
        // Full or blocked (private mode): just don't save
    }
}

export function clearProgress() {
    try {
        window.sessionStorage.removeItem(STORAGE_KEY)
    } catch {
        // Storage blocked, nothing to do
    }
}
