"use client"

import { Home, FolderGit2, Cpu, Award, Mail } from "lucide-react"
import { useEffect, useState } from "react"

const navItems = [
    { id: "sobre", label: "Início", icon: Home },
    { id: "projetos", label: "Projetos", icon: FolderGit2 },
    { id: "skills", label: "Skills", icon: Cpu },
    { id: "certificados", label: "Certific.", icon: Award },
    { id: "contato", label: "Contato", icon: Mail },
]

export function MobileNav() {
    const [activeSection, setActiveSection] = useState("sobre")

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map((item) => document.getElementById(item.id))
            const scrollPosition = window.scrollY + window.innerHeight / 2

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i]
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(navItems[i].id)
                    break
                }
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            const offset = 80
            const elementPosition = element.offsetTop - offset
            window.scrollTo({ top: elementPosition, behavior: "smooth" })
            setActiveSection(id)
        }
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-2xl border-t border-border/40 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] md:hidden safe-area-bottom pb-safe transition-all duration-300">
            <nav className="flex items-center justify-around px-4 h-18 py-2">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = activeSection === item.id

                    return (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all duration-300 relative group outline-none"
                        >
                            <div className={`relative flex items-center justify-center p-2 rounded-xl transition-all duration-500 ease-out ${isActive
                                    ? "text-primary scale-110 -translate-y-1.5"
                                    : "text-muted-foreground group-active:scale-95 translate-y-0"
                                }`}>
                                {isActive && (
                                    <div className="absolute inset-0 bg-primary/10 rounded-xl blur-md animate-pulse" />
                                )}
                                <Icon
                                    className={`h-[22px] w-[22px] transition-all duration-500 ${isActive ? "fill-primary/20 stroke-[2.5px]" : "stroke-2 opacity-80"
                                        }`}
                                />
                            </div>
                            <span className={`text-[10px] font-bold transition-all duration-500 tracking-tight leading-none ${isActive
                                    ? "text-primary opacity-100 translate-y-0"
                                    : "text-muted-foreground opacity-60 translate-y-1"
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
