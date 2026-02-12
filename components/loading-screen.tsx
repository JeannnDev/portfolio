"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export function LoadingScreen() {
    const [progress, setProgress] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [canClose, setCanClose] = useState(false)

    useEffect(() => {
        // Ensure minimum 3 seconds display time
        const minDisplayTimer = setTimeout(() => {
            setCanClose(true)
        }, 3000)

        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    if (canClose) {
                        setTimeout(() => setIsLoading(false), 300)
                    }
                    return 100
                }
                // Smooth acceleration curve
                const increment = prev < 50 ? 1.5 : prev < 80 ? 3 : prev < 95 ? 8 : 15
                return Math.min(prev + increment, 100)
            })
        }, 40)

        return () => {
            clearInterval(interval)
            clearTimeout(minDisplayTimer)
        }
    }, [canClose])

    // Close when both conditions are met
    useEffect(() => {
        if (progress >= 100 && canClose) {
            setTimeout(() => setIsLoading(false), 300)
        }
    }, [progress, canClose])

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-background overflow-hidden"
                >
                    {/* Enhanced animated background */}
                    <div className="absolute inset-0 overflow-hidden">
                        {/* Main gradient orb */}
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-primary/30 via-blue-400/20 to-cyan-400/10 rounded-full blur-[100px]"
                        />

                        {/* Secondary gradient orb */}
                        <motion.div
                            animate={{
                                scale: [1.2, 1, 1.2],
                                opacity: [0.2, 0.4, 0.2],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5,
                            }}
                            className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-bl from-cyan-400/20 via-primary/15 to-transparent rounded-full blur-[80px]"
                        />

                        {/* Floating particles */}
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    y: [0, -30, 0],
                                    x: [0, Math.sin(i) * 20, 0],
                                    opacity: [0.1, 0.3, 0.1],
                                }}
                                transition={{
                                    duration: 3 + i * 0.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: i * 0.2,
                                }}
                                className="absolute w-1 h-1 bg-primary/40 rounded-full"
                                style={{
                                    left: `${20 + i * 10}%`,
                                    top: `${30 + (i % 3) * 20}%`,
                                }}
                            />
                        ))}
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center gap-14 px-4">
                        {/* Enhanced Logo with multiple layers */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            transition={{
                                duration: 0.8,
                                ease: [0.34, 1.56, 0.64, 1],
                                delay: 0.1
                            }}
                            className="relative"
                        >
                            <div className="relative h-28 w-28 sm:h-36 sm:w-36">
                                {/* Outer glow ring */}
                                <motion.div
                                    animate={{
                                        scale: [1, 1.15, 1],
                                        opacity: [0.3, 0.6, 0.3],
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute inset-0 bg-gradient-to-tr from-primary/50 to-cyan-400/50 rounded-full blur-3xl"
                                />

                                {/* Middle glow */}
                                <motion.div
                                    animate={{
                                        rotate: [0, 360],
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    className="absolute inset-2 bg-gradient-to-tr from-primary/30 via-transparent to-cyan-400/30 rounded-full blur-xl"
                                />

                                {/* Logo container with enhanced border */}
                                <motion.div
                                    animate={{
                                        boxShadow: [
                                            "0 0 20px rgba(56, 189, 248, 0.3)",
                                            "0 0 40px rgba(56, 189, 248, 0.5)",
                                            "0 0 20px rgba(56, 189, 248, 0.3)",
                                        ],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="relative h-full w-full rounded-full bg-gradient-to-br from-primary/50 to-cyan-400/50 p-[3px]"
                                >
                                    <div className="h-full w-full rounded-full bg-zinc-900 overflow-hidden relative border-2 border-white/20">
                                        <Image
                                            src="/logo.png"
                                            alt="Jean Correa Logo"
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Enhanced Loading text and progress */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="flex flex-col items-center gap-8 w-full max-w-sm"
                        >
                            <div className="text-center space-y-3">
                                <motion.h2
                                    animate={{
                                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-foreground via-primary to-foreground bg-[length:200%_auto] bg-clip-text text-transparent"
                                >
                                    Carregando Portfolio
                                </motion.h2>
                                <p className="text-sm text-muted-foreground/80 font-semibold">
                                    {progress < 30 && "Inicializando componentes..."}
                                    {progress >= 30 && progress < 70 && "Carregando recursos..."}
                                    {progress >= 70 && progress < 100 && "Finalizando..."}
                                    {progress === 100 && "Pronto!"}
                                </p>
                            </div>

                            {/* Enhanced Progress bar */}
                            <div className="w-full space-y-4">
                                <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-white/5 border border-white/10 shadow-inner">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className="h-full relative overflow-hidden rounded-full"
                                    >
                                        {/* Gradient fill */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-400 to-cyan-400" />

                                        {/* Shimmer effect */}
                                        <motion.div
                                            animate={{
                                                x: ["-100%", "200%"],
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                        />

                                        {/* Glow effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-cyan-400/50 blur-sm" />
                                    </motion.div>
                                </div>

                                {/* Progress info */}
                                <div className="flex justify-between items-center text-xs font-bold">
                                    <motion.span
                                        key={progress}
                                        initial={{ scale: 1.2 }}
                                        animate={{ scale: 1 }}
                                        className="text-muted-foreground tabular-nums"
                                    >
                                        {Math.floor(progress)}%
                                    </motion.span>
                                    <motion.span
                                        animate={{
                                            opacity: progress === 100 ? [1, 0.5, 1] : 1,
                                        }}
                                        transition={{
                                            duration: 0.8,
                                            repeat: progress === 100 ? Infinity : 0,
                                        }}
                                        className={progress === 100 ? "text-green-400" : "text-primary"}
                                    >
                                        {progress === 100 ? "✓ Completo" : "Carregando..."}
                                    </motion.span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Enhanced animated dots */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="flex gap-2.5"
                        >
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        scale: [1, 1.4, 1],
                                        opacity: [0.4, 1, 0.4],
                                    }}
                                    transition={{
                                        duration: 1.2,
                                        repeat: Infinity,
                                        delay: i * 0.15,
                                        ease: "easeInOut",
                                    }}
                                    className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-primary to-cyan-400 shadow-lg shadow-primary/50"
                                />
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
