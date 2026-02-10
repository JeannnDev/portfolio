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

function StarRating({ level }: { level: number }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`h-3 w-3 ${star <= level ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
                />
            ))}
        </div>
    )
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
            onMouseEnter={() => plugin.current.stop()}
            onMouseLeave={() => plugin.current.play()}
        >
            <CarouselContent className="-ml-2 md:-ml-4">
                {skills.map((skill, index) => (
                    <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                        <div className="p-1">
                            <Card className="group bg-card/50 backdrop-blur border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 h-full">
                                <CardContent className="flex flex-col items-center justify-center p-6 gap-3">
                                    <div className="relative w-16 h-16 group-hover:scale-110 transition-transform duration-300">
                                        <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <Image
                                            src={skill.icon || "/placeholder.svg"}
                                            alt={skill.name}
                                            fill
                                            className="object-contain relative z-10"
                                        />
                                    </div>
                                    <div className="text-center space-y-2">
                                        <span className="font-semibold text-sm group-hover:text-primary transition-colors">
                                            {skill.name}
                                        </span>
                                        {skill.category && (
                                            <span className="block text-[10px] text-muted-foreground uppercase tracking-wider">
                                                {skill.category}
                                            </span>
                                        )}
                                    </div>
                                    <StarRating level={skill.level} />
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
