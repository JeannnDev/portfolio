import { useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverProps {
    threshold?: number
    rootMargin?: string
    freezeOnceVisible?: boolean
}

export function useIntersectionObserver({
    threshold = 0.1,
    rootMargin = '0px',
    freezeOnceVisible = true,
}: UseIntersectionObserverProps = {}) {
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                const isIntersecting = entry.isIntersecting
                setIsVisible(isIntersecting)

                if (isIntersecting && freezeOnceVisible) {
                    observer.unobserve(element)
                }
            },
            { threshold, rootMargin }
        )

        observer.observe(element)

        return () => {
            observer.disconnect()
        }
    }, [threshold, rootMargin, freezeOnceVisible])

    return { ref, isVisible }
}
