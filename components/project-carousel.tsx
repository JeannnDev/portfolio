"use client"

import * as React from "react"
import { ProjectCard } from "@/components/project-card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

interface ProjectCarouselProps {
    filteredProjects: any[]
}

export function ProjectCarousel({ filteredProjects }: ProjectCarouselProps) {
    if (filteredProjects.length === 0) {
        /* If no projects, the parent component handles it (or we can handle here) */
        return null
    }

    return (
        <div className="relative px-4 sm:px-8 md:px-12 lg:px-0">
            <Carousel
                opts={{
                    align: "start",
                    loop: false,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-4 pb-4">
                    {filteredProjects.map((project, index) => (
                        <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3 h-full">
                            <div className="h-full py-2">
                                <ProjectCard project={project} index={index} />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-4 lg:-left-16 h-12 w-12 border-primary/20 hover:border-primary text-primary hover:bg-primary/10" />
                <CarouselNext className="hidden md:flex -right-4 lg:-right-16 h-12 w-12 border-primary/20 hover:border-primary text-primary hover:bg-primary/10" />
            </Carousel>

            {/* Mobile Swipe hint */}
            <div className="flex justify-center mt-4 md:hidden">
                <span className="text-xs text-muted-foreground/50 italic flex items-center gap-1">
                    Deslize para ver mais &rarr;
                </span>
            </div>
        </div>
    )
}
