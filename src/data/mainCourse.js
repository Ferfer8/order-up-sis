// Main course steps, their dishes and image paths
// Each step is one slot in selections["main-course"], all on the same plate

const fromMainCourseFolders = {
    servingImage: (id) => `/images/main_course/${id}.svg`,
    fetchedImage: (id) => `/images/main_course_fetch/${id}-fetched.svg`,
    spoonImage: (id) => `/images/main_course_fetch/spoon-${id}.svg`,
}

const fromSidesFolder = {
    servingImage: (id) => `/images/sides/${id}.svg`,
    fetchedImage: (id) => `/images/sides/${id}-fetched.svg`,
    spoonImage: (id) => `/images/sides/spoon-${id}.svg`,
}

// In step order. code is the short name in the plate files (plate-jf-ch-s.svg)
export const MAIN_COURSE_STEPS = [
    {
        slot: "rice",
        dishes: [
            { id: "jollof-rice", name: "Jollof rice", code: "jf" },
            { id: "fried-rice", name: "Fried rice", code: "fr" },
        ],
        ...fromMainCourseFolders,
    },
    {
        slot: "protein",
        dishes: [
            { id: "chicken", name: "Chicken", code: "ch" },
            { id: "fish", name: "Fish", code: "fs" },
        ],
        ...fromMainCourseFolders,
    },
    {
        slot: "side",
        dishes: [
            { id: "salad", name: "Salad", code: "s" },
            { id: "coleslaw", name: "Coleslaw", code: "c" },
        ],
        ...fromSidesFolder,
    },
]

export const getMainCourseStep = (slot) =>
    MAIN_COURSE_STEPS.find((step) => step.slot === slot)

const EMPTY_PLATE = "/images/appetizer/plate.svg"

// Rice-only plates don't follow the code naming
const RICE_ONLY_PLATES = {
    jf: "/images/main_course_fetch/plate-jollof.svg",
    fr: "/images/main_course_fetch/plate-fried-rice.svg",
}

// Full rice + protein + side plates live in a folder per rice
const FULL_PLATE_FOLDERS = { jf: "jollof", fr: "fried_rice" }

// Plate image for this step: locked picks from earlier steps plus what's on the plate now
export function mainCoursePlateImage(selections, currentSlot, currentDishId) {
    const picks = selections["main-course"] ?? {}
    const codes = []

    for (const step of MAIN_COURSE_STEPS) {
        const dish =
            step.slot === currentSlot
                ? step.dishes.find((d) => d.id === currentDishId)
                : step.dishes.find((d) => d.name === picks[step.slot])
        if (!dish) break // stop at the first gap
        codes.push(dish.code)
        if (step.slot === currentSlot) break
    }

    const [rice, protein, side] = codes
    if (!rice) return EMPTY_PLATE
    if (!protein) return RICE_ONLY_PLATES[rice]
    if (!side) return `/images/main_course_fetch/plate-${rice}-${protein}.svg`
    return `/images/${FULL_PLATE_FOLDERS[rice]}/plate-${rice}-${protein}-${side}.svg`
}
