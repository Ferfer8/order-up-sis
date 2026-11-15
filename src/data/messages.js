// All the funny messages, shared by every course page
// Pop-up when the plate already has a dish and the other one is clicked
export const GREEDY_MESSAGES = [
    "Don't be greedy! One dish only, sis. Want to swap? Put your food back in its dish first.",
    "Madam! Your stomach is not a warehouse. Want to swap? Put your food back in its dish first.",
    "You can't have both. This is not a buffet. Want to swap? Put your food back in its dish first.",
    "Sis, please. Leave some for the rest of us. Want to swap? Put your food back in its dish first.",
    "One dish per person. I don't make the rules. Okay, I do. Want to swap? Put your food back in its dish first.",
    "Abeg, save space for the next course. Want to swap? Put your food back in its dish first.",
]

// Speech bubble when spoon food is offered to the wrong dish.
// food = what's on the spoon, dish = what was clicked
export const WRONG_DISH_MESSAGES = [
    "Have some table manners!",
    "Wrong dish! Put it back where you found it.",
    "We don't mix food in this house.",
    "Excuse me? That doesn't go here.",
    ({ food, dish }) => `${food} in ${dish.toLowerCase()}? Who raised you?`,
    "Return it to its proper dish, please.",
]

// Speech bubble when one drink is swapped for another
export const DRINK_MESSAGES = [
    "Haha, you can't have two drinks. Pick one!",
    "One drink only, sis. I swapped it for you.",
    "Two drinks? Not on my watch.",
    "One cup onlyyyy!!!",
    "Make up your mind! One drink.",
]

// Pop-up when Next is clicked on the side page with no drink
export const NO_DRINK_MESSAGES = [
    "No drink? Are you sure?",
    "You're really going to eat all that without a drink?",
    "Are you sure? That food is not going down by itself.",
    "Sis, hydrate. Even water is free.",
    "Bold of you to skip the drink. You sure?",
]

// Bubble on the joke Back button
export const BACK_MESSAGES = [
    "You can't go back. You've already made your choice.",
    "No take-backs in this kitchen.",
    "Back? The chef has already started cooking.",
    "You chose it, you eat it.",
    "Sorry, this restaurant only moves forward.",
]
