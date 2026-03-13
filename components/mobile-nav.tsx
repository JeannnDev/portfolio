"use client"

import { Briefcase, FolderGit2, Cpu, Award, Mail } from "lucide-react"
import { useEffect, useState } from "react"

const navItems = [
    { id: "projetos", label: "Projetos", icon: FolderGit2 },
    { id: "skills", label: "Skills", icon: Cpu },
    { id: "experiencia", label: "Exp.", icon: Briefcase },
    { id: "certificados", label: "Certific.", icon: Award },
    { id: "contato", label: "Contato", icon: Mail },
]

export function MobileNav() {
    const [activeSection, setActiveSection] = useState("projetos")

    useEffect(() => {
        // IntersectionObserver for reliable active-section detection
        const observerOptions: IntersectionObserverInit = {
            root: null,
            rootMargin: "-30% 0px -60% 0px",
            threshold: 0,
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id)
                }
            })
        }, observerOptions)

        navItems.forEach(({ id }) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - 80
            window.scrollTo({ top: y, behavior: "smooth" })
            setActiveSection(id)
        }
    }

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md md:hidden">
            <nav className="glass py-3 px-4 rounded-[2rem] shadow-2xl flex items-center justify-between gap-1 border border-white/10">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = activeSection === item.id

                    return (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="relative flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-300 outline-none flex-1 group"
                        >
                            {isActive && (
                                <div className="absolute inset-0 bg-primary/10 rounded-2xl border border-primary/20 animate-in fade-in zoom-in duration-300" />
                            )}

                            <Icon
                                className={`h-5 w-5 transition-all duration-300 ${isActive ? "text-primary scale-110" : "text-muted-foreground group-hover:text-foreground"
                                    }`}
                            />
                            <span className={`text-[10px] font-bold mt-1 tracking-tight transition-all duration-300 ${isActive
                                ? "text-primary opacity-100"
                                : "text-muted-foreground opacity-60"
                                }`}>
                                {item.label}
                            </span>
                        </button>
                    )
                })}
            </nav>
        </div>
    )
}
