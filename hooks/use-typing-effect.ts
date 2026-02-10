import { useState, useEffect } from 'react'

export function useTypingEffect(
    words: string[],
    typingSpeed: number = 150,
    deletingSpeed: number = 100,
    delayBetweenWords: number = 2000
) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [currentText, setCurrentText] = useState('')
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        const currentWord = words[currentWordIndex]

        const timeout = setTimeout(
            () => {
                if (!isDeleting) {
                    // Typing
                    if (currentText.length < currentWord.length) {
                        setCurrentText(currentWord.slice(0, currentText.length + 1))
                    } else {
                        // Wait before deleting
                        setTimeout(() => setIsDeleting(true), delayBetweenWords)
                    }
                } else {
                    // Deleting
                    if (currentText.length > 0) {
                        setCurrentText(currentText.slice(0, -1))
                    } else {
                        setIsDeleting(false)
                        setCurrentWordIndex((prev) => (prev + 1) % words.length)
                    }
                }
            },
            isDeleting ? deletingSpeed : typingSpeed
        )

        return () => clearTimeout(timeout)
    }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delayBetweenWords])

    return currentText
}
