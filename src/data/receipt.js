// Receipt prices, chef's verdicts and a shuffle helper
// Each one is used at most once per receipt
export const RECEIPT_PRICES = [
    "you owe me shawarma",
    "doing the dishes",
    "free, because I'm nice",
    "a coffee date paid by you (obvi)",
    "sharing your snacks",
    "a favour, to be claimed later",
    "doing all house chores",
    "letting me pick the movie",
]

// Checked in order, first match wins. picks = every dish name on the order
export const VERDICTS = [
    {
        matches: (picks) => picks.includes("Jollof rice") && picks.includes("Chicken"),
        text: "A classic. No notes.",
    },
    {
        matches: (picks) => picks.includes("Fish"),
        text: "Fish over chicken? You've changed ooo😭.",
    },
    {
        matches: () => true,
        text: "Interesting choices. The chef is judging you quietly.",
    },
]

export const getVerdict = (picks) => VERDICTS.find((rule) => rule.matches(picks)).text

// Shuffled copy (Fisher-Yates)
export function shuffled(list) {
    const copy = [...list]
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy
}
