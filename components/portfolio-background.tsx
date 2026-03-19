"use client"

import { useTheme } from "next-themes"
import { useEffect, useState, memo } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

/**
 * A professional, high-end background component for a portfolio.
 * Features:
 * - Subtle mesh gradients (animated and layered)
 * - Clean grid pattern with masking
 * - Interactive mouse-following spotlight for desktop
 * - Refined noise grain for a "premium" texture
 * - Theme-aware styling
 */
function PortfolioBackground() {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth spring animation for the spotlight
    const springConfig = { damping: 50, stiffness: 300 }
    const springX = useSpring(mouseX, springConfig)
    const springY = useSpring(mouseY, springConfig)

    useEffect(() => {
        setMounted(true)
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
        }
        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [mouseX, mouseY])

    if (!mounted) return <div className="fixed inset-0 bg-background" />

    const isDark = resolvedTheme === "dark"

    return (
        <div className="fixed inset-0 z-0 h-screen w-full overflow-hidden bg-background pointer-events-none">
            {/* 1. Underlying Atmospheric Mesh Gradients */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${isDark ? 'opacity-[0.4]' : 'opacity-[0.2]'}`}>
                {/* Primary Top-Right Aurora */}
                <div
                    className="absolute -top-[10%] -right-[5%] h-[75%] w-[65%] rounded-full bg-primary/25 blur-[120px] animate-pulse"
                    style={{ animationDuration: '10s' }}
                />

                {/* Secondary Mid-Left Aurora */}
                <div
                    className="absolute top-[20%] -left-[10%] h-[60%] w-[55%] rounded-full bg-blue-500/15 blur-[110px] animate-pulse"
                    style={{ animationDuration: '14s', animationDelay: '2s' }}
                />

                {/* Tertiary Bottom-Right Shadow Flow */}
                <div className="absolute -bottom-[5%] right-[5%] h-[45%] w-[45%] rounded-full bg-indigo-600/10 blur-[100px]" />
            </div>

            {/* 2. Structured Grid Pattern with Soft Masking */}
            <div
                className={`absolute inset-0 z-[1] transition-opacity duration-700 ${isDark ? 'opacity-[0.14]' : 'opacity-[0.08]'}`}
                style={{
                    backgroundImage: `
                        linear-gradient(to right, hsl(var(--foreground)/0.1) 1px, transparent 1px),
                        linear-gradient(to bottom, hsl(var(--foreground)/0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(circle at center, black 30%, transparent 90%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 90%)',
                }}
            />

            {/* 3. Interactive Spotlight - Enhances depth on desktop */}
            <motion.div
                className="hidden lg:block absolute inset-0 z-[2] pointer-events-none opacity-[0.25] dark:opacity-[0.15]"
                style={{
                    background: `radial-gradient(800px circle at ${springX}px ${springY}px, var(--primary), transparent 80%)`,
                }}
            />

            {/* 4. High-End Noise Grain Texture */}
            <div className="absolute inset-0 z-[3] opacity-[0.04] dark:opacity-[0.06] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

            {/* 5. Vignette & Finishing Atmosphere */}
            <div className={`absolute inset-0 z-[4] transition-all duration-700 ${isDark
                ? 'bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background)/0.5)_100%)]'
                : 'bg-[radial-gradient(circle_at_center,transparent_0%,white/30_100%)]'}`}
            />
        </div>
    )
}

export default memo(PortfolioBackground)
