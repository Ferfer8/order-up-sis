// Course and step lists: drive the routes, progress dots, labels and receipt
// Courses in receipt order. id is the key in selections
export const COURSES = [
    { id: "starter", title: "Appetizer" },
    { id: "main-course", title: "Main course" },
    { id: "drinks", title: "Drink" },
    { id: "dessert", title: "Dessert" },
]

// Every step in order: progress dots, page title + label, and where Next goes
export const STEPS = [
    { id: "starter", title: "Appetizer", label: "Pick your appetizer", path: "/appetizer" },
    { id: "rice", title: "Main course", label: "Pick your rice", path: "/main-course/rice" },
    { id: "protein", title: "Main course", label: "Pick your protein", path: "/main-course/protein" },
    { id: "side", title: "Main course", label: "Pick your side", path: "/main-course/side" },
    { id: "dessert", title: "Dessert", label: "Pick your dessert", path: "/dessert" },
]

// Adds number (1-based) and nextPath to a step
export function getStep(id) {
    const index = STEPS.findIndex((step) => step.id === id)
    return {
        ...STEPS[index],
        number: index + 1,
        // Last step goes to the receipt
        nextPath: STEPS[index + 1]?.path ?? "/order",
    }
}
