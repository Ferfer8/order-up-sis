import { useCallback, useRef } from "react"

// Returns a function that picks a random message from `messages`,
// never the same one twice in a row. Messages can be plain strings or
// functions that build the text from `details` (e.g. food names).
function useRandomMessage(messages) {
    const lastIndex = useRef(-1)

    return useCallback(
        (details) => {
            let index = Math.floor(Math.random() * messages.length)
            if (messages.length > 1 && index === lastIndex.current) {
                // Move to a different, still random, message
                const step = 1 + Math.floor(Math.random() * (messages.length - 1))
                index = (index + step) % messages.length
            }
            lastIndex.current = index

            const message = messages[index]
            return typeof message === "function" ? message(details) : message
        },
        [messages]
    )
}

export default useRandomMessage
