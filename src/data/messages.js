// Shared messages for every course page.

// Shown in the pop-up when her plate already has a dish
// and she tries to scoop the other one.
export const GREEDY_MESSAGES = [
    "Don't be greedy! One dish only, sis.",
    "Ah ah! Your stomach is not a warehouse.",
    "You can't have both. This is not a buffet.",
    "Sis, please. Leave some for the rest of us.",
    "One dish per person. I don't make the rules. Okay, I do.",
    "Abeg, save space for the next course.",
]

// Shown in the speech bubble when she tries to put the food on her spoon
// into the wrong dish. `food` is the dish on the spoon, `dish` is the one clicked.
export const WRONG_DISH_MESSAGES = [
    "Have some table manners!",
    "Wrong dish! Put it back where you found it.",
    "We don't mix food in this house.",
    "Excuse me? That doesn't go here.",
    ({ food, dish }) => `${food} in ${dish.toLowerCase()}? Who raised you?`,
    "Return it to its owner, please.",
]
