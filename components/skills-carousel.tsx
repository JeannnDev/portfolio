"use client"

import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Star } from "lucide-react"
import Autoplay from "embla-carousel-autoplay"

interface Skill {
    name: string
    icon: string
    level: number
    category?: string
}

interface SkillsCarouselProps {
    skills: Skill[]
}

export function SkillsCarousel({ skills }: SkillsCarouselProps) {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    )

    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={() => plugin.current?.stop?.()}
            onMouseLeave={() => plugin.current?.play?.()}
        >
            <CarouselContent className="-ml-2 md:-ml-4">
                {skills.map((skill, index) => (
                    <CarouselItem key={index} className="pl-4 basis-[70%] sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                        <div className="p-2 h-full">
                            <Card className="glass-card group hover:-translate-y-2 rounded-3xl overflow-hidden h-full">
                                <CardContent className="flex flex-col items-center justify-center p-8 gap-4 h-full">
                                    <div className="relative w-20 h-20 group-hover:scale-110 transition-transform duration-500">
                                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="relative w-14 h-14 mx-auto">
                                            <Image
                                                src={skill.icon}
                                                alt={skill.name}
                                                fill
                                                className="object-contain filter drop-shadow-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="text-center space-y-2">
                                        <span className="font-black text-base group-hover:text-primary transition-colors block tracking-tight">
                                            {skill.name}
                                        </span>
                                        {skill.category && (
                                            <span className="inline-block px-2 py-0.5 rounded-full bg-primary/5 text-[10px] text-primary/70 font-bold uppercase tracking-widest">
                                                {skill.category}
                                            </span>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 bg-card/80 backdrop-blur border-border/50 hover:bg-primary/10 hover:border-primary/30" />
            <CarouselNext className="hidden md:flex -right-12 bg-card/80 backdrop-blur border-border/50 hover:bg-primary/10 hover:border-primary/30" />
        </Carousel>
    )
}
