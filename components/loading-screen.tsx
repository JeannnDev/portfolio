"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, ShieldCheck, Cpu, Database, Fingerprint } from "lucide-react"

export function LoadingScreen() {
    const [statusIndex, setStatusIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [percent, setPercent] = useState(0)

    const statuses = [
        { text: "INICIANDO SISTEMA...", icon: <Cpu className="h-4 w-4" /> },
        { text: "ESTABELECENDO CONEXÃO SEGURA...", icon: <ShieldCheck className="h-4 w-4" /> },
        { text: "CARREGANDO MÓDULOS ADVPL...", icon: <Terminal className="h-4 w-4" /> },
        { text: "SINCRONIZANDO BANCO DE DADOS...", icon: <Database className="h-4 w-4" /> },
        { text: "VERIFICANDO IDENTIDADE...", icon: <Fingerprint className="h-4 w-4" /> },
        { text: "ACESSO CONCEDIDO: BEM-VINDO JEAN CORREA", icon: <ShieldCheck className="h-4 w-4" /> },
    ]

    useEffect(() => {
        const totalDuration = 4500 // 4.5 seconds
        const stepTime = totalDuration / statuses.length

        // Animate Percent
        const percentInterval = setInterval(() => {
            setPercent((p) => {
                if (p >= 100) {
                    clearInterval(percentInterval)
                    return 100
                }
                return p + 1
            })
        }, totalDuration / 100)

        // Animate Statuses
        const statusInterval = setInterval(() => {
            setStatusIndex((prev) => {
                if (prev >= statuses.length - 1) {
                    clearInterval(statusInterval)
                    setTimeout(() => setIsLoading(false), 800)
                    return prev
                }
                return prev + 1
            })
        }, stepTime)

        return () => {
            clearInterval(percentInterval)
            clearInterval(statusInterval)
        }
    }, [])

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.1,
                        filter: "blur(20px)"
                    }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#05070a] overflow-hidden"
                >
                    {/* Futuristic Background */}
                    <div className="absolute inset-0">
                        {/* Scanning Lines */}
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(56,189,248,0.05)_50%,transparent_100%)] bg-[length:100%_4px] animate-scanline pointer-events-none" />

                        {/* Atmospheric Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.1)_0%,transparent_70%)]" />

                        {/* Moving Data Bits (Slight Matrix Feel) */}
                        <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none overflow-hidden font-mono text-[10px] leading-none whitespace-pre break-all p-4">
                            {Array.from({ length: 20 }).map((_, i) => (
                                <div key={i} className="mb-2">
                                    {Math.random().toString(16).repeat(10)}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        {/* Top Security Emblem / Biometric Circle */}
                        <div className="relative mb-16">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="w-40 h-40 rounded-full border border-primary/20 border-t-primary/60 border-l-primary/40 relative"
                            >
                                <div className="absolute inset-2 rounded-full border border-white/5" />
                                <div className="absolute inset-[15%] rounded-full border border-primary/10 border-b-primary/40 animate-spin-reverse" />
                            </motion.div>

                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="relative w-24 h-24 p-1 rounded-full bg-gradient-to-br from-primary/40 to-black overflow-hidden shadow-[0_0_30px_rgba(56,189,248,0.3)]"
                                >
                                    <div className="w-full h-full rounded-full overflow-hidden bg-black relative border border-white/20">
                                        <Image
                                            src="/logo.png"
                                            alt="JC Logo"
                                            fill
                                            className="object-cover scale-110"
                                            priority
                                        />
                                        {/* Scanning Beam */}
                                        <motion.div
                                            animate={{ top: ['-10%', '110%'] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            className="absolute left-0 right-0 h-1 bg-primary/80 shadow-[0_0_15px_rgba(56,189,248,0.8)] z-20"
                                        />
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Status Messages */}
                        <div className="w-[320px] sm:w-[500px] h-24 flex flex-col justify-center items-center text-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={statusIndex}
                                    initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
                                    transition={{ duration: 0.4 }}
                                    className="flex items-center gap-3"
                                >
                                    <span className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20 shadow-lg shadow-primary/5">
                                        {statuses[statusIndex].icon}
                                    </span>
                                    <span className="text-sm sm:text-base font-black tracking-[0.2em] text-foreground uppercase">
                                        {statuses[statusIndex].text}
                                    </span>
                                </motion.div>
                            </AnimatePresence>

                            {/* Hex/Terminal Decorative Info (Slightly to the side or bottom) */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.4 }}
                                className="flex gap-4 mt-6 text-[10px] font-mono text-muted-foreground uppercase tracking-widest"
                            >
                                <div className="flex items-center gap-1.5 ">
                                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                                    SECURE_MODE: ON
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                                    KERNAL_V: 1.0.42
                                </div>
                            </motion.div>
                        </div>

                        {/* Progress Container */}
                        <div className="mt-12 w-[280px] space-y-4">
                            <div className="flex justify-between items-end mb-1">
                                <div className="text-[10px] font-black tracking-widest text-primary/60 uppercase">System Integrity</div>
                                <div className="text-xs font-black tabular-nums text-foreground">{percent}%</div>
                            </div>

                            <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 shadow-inner">
                                <motion.div
                                    animate={{ width: `${percent}%` }}
                                    className="absolute inset-0 bg-gradient-to-r from-primary/40 via-primary to-cyan-400"
                                />
                                {/* Shimmer */}
                                <motion.div
                                    animate={{ left: ['-100%', '100%'] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                />
                            </div>

                            {/* Loading Dots */}
                            <div className="flex justify-center gap-1.5 pt-2">
                                {[0, 1, 2].map(i => (
                                    <motion.div
                                        key={i}
                                        animate={{ opacity: [0.2, 1, 0.2] }}
                                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                        className="h-1 w-1 rounded-full bg-primary"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
