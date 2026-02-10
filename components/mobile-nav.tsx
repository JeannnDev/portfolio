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
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border/50 shadow-[0_-1px_3px_rgba(0,0,0,0.05)] md:hidden safe-area-bottom pb-safe">
            <nav className="flex items-center justify-around px-2 h-16">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = activeSection === item.id

                    return (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all duration-200 active-scale group ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            <div className={`relative p-1.5 rounded-2xl transition-all duration-300 ${isActive
                                ? "bg-primary/10 -translate-y-1 shadow-[0_0_15px_-3px_rgba(var(--primary),0.3)]"
                                : "group-hover:bg-muted/50"
                                }`}>
                                <Icon
                                    className={`h-5 w-5 transition-all duration-300 ${isActive ? "fill-current stroke-[2.5]" : "stroke-2"
                                        }`}
                                />
                            </div>
                            <span className={`text-[10px] font-medium transition-all duration-300 tracking-wide ${isActive ? "opacity-100 font-semibold translate-y-0" : "opacity-70 group-hover:opacity-100 translate-y-0.5"
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
