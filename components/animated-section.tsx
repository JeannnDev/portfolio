"use client"

import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { ReactNode } from "react"

interface AnimatedSectionProps {
    children: ReactNode
    className?: string
    animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale"
    delay?: number
}

export function AnimatedSection({
    children,
    className = "",
    animation = "fade-up",
    delay = 0
}: AnimatedSectionProps) {
    const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 })

    const animations = {
        "fade-up": "opacity-0 translate-y-8",
        "fade-in": "opacity-0",
        "slide-left": "opacity-0 -translate-x-8",
        "slide-right": "opacity-0 translate-x-8",
        "scale": "opacity-0 scale-95"
    }

    const visibleClass = "opacity-100 translate-y-0 translate-x-0 scale-100"

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${isVisible ? visibleClass : animations[animation]
                } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    )
}
