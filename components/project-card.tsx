"use client"

import * as React from "react"
import Image from "next/image"
import { Github, ExternalLink, LayoutGrid, Trophy, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface Project {
    title: string
    description: string
    images: string[]
    tags: string[]
    github: string
}

interface ProjectCardProps {
    project: Project
    index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
    const [selectedImage, setSelectedImage] = React.useState<string | null>(null)

    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Card className="group h-full cursor-pointer hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 active:scale-[0.98]">
                        <div className="relative aspect-video overflow-hidden bg-muted rounded-t-xl">
                            {project.images && project.images.length > 0 ? (
                                <>
                                    <Image
                                        src={project.images[0]}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                                </>
                            ) : (
                                <div className="flex items-center justify-center h-full bg-muted/50">
                                    <LayoutGrid className="h-10 w-10 text-muted-foreground/50" />
                                </div>
                            )}

                            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                                <Badge className="bg-primary/90 hover:bg-primary shadow-sm backdrop-blur-sm">
                                    Ver Detalhes <ArrowRight className="ml-1 h-3 w-3" />
                                </Badge>
                            </div>
                        </div>

                        <CardContent className="p-5 flex flex-col gap-3">
                            <div className="flex items-start justify-between gap-2">
                                <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1">
                                    {project.title}
                                </h3>
                            </div>

                            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                                {project.tags.slice(0, 3).map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant="secondary"
                                        className="text-[10px] px-2 h-5 font-normal bg-secondary/50"
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                                {project.tags.length > 3 && (
                                    <Badge variant="secondary" className="text-[10px] px-2 h-5 font-normal bg-secondary/50">
                                        +{project.tags.length - 3}
                                    </Badge>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </SheetTrigger>

                <SheetContent className="w-full sm:max-w-xl md:max-w-2xl p-0 gap-0 border-l border-border/50 bg-background/95 backdrop-blur-xl transition-all duration-300">
                    <ScrollArea className="h-full w-full">
                        <div className="flex flex-col min-h-screen sm:min-h-full pb-8">
                            {/* Imersive Header / Carousel */}
                            <div className="relative w-full aspect-video sm:aspect-[16/10] bg-muted w-full group/carousel">
                                {project.images && project.images.length > 0 ? (
                                    <Carousel className="w-full h-full">
                                        <CarouselContent className="ml-0">
                                            {project.images.map((image, i) => (
                                                <CarouselItem key={i} className="pl-0">
                                                    <div
                                                        className="relative w-full h-full aspect-video sm:aspect-[16/10] md:cursor-zoom-in group/img"
                                                        onClick={() => {
                                                            if (window.innerWidth >= 768) {
                                                                setSelectedImage(image)
                                                            }
                                                        }}
                                                    >
                                                        <Image
                                                            src={image}
                                                            alt={`${project.title} - Screenshot ${i + 1}`}
                                                            fill
                                                            priority={i === 0}
                                                            className="object-cover transition-transform duration-500 md:group-hover/img:scale-105"
                                                        />
                                                        {/* Gradient Overlay for Text Readability if needed, or just style */}
                                                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80" />
                                                    </div>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>

                                        {project.images.length > 1 && (
                                            <>
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 pointer-events-none md:pointer-events-auto">
                                                    <CarouselPrevious className="h-10 w-10 border-none bg-black/50 hover:bg-black/70 text-white backdrop-blur-md relative left-0 translate-x-0" />
                                                </div>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 pointer-events-none md:pointer-events-auto">
                                                    <CarouselNext className="h-10 w-10 border-none bg-black/50 hover:bg-black/70 text-white backdrop-blur-md relative right-0 translate-x-0" />
                                                </div>
                                            </>
                                        )}
                                    </Carousel>
                                ) : (
                                    <div className="flex items-center justify-center h-full bg-muted/30">
                                        <LayoutGrid className="h-16 w-16 text-muted-foreground/20" />
                                    </div>
                                )}
                            </div>

                            {/* Content Body */}
                            <div className="px-6 sm:px-8 py-6 flex flex-col gap-6">
                                <SheetHeader className="space-y-4 text-left">
                                    <SheetTitle className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-tight">
                                        {project.title}
                                    </SheetTitle>

                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="secondary"
                                                className="px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 border-transparent"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </SheetHeader>

                                <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
                                    {project.description}
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </SheetContent>
            </Sheet>

            {/* Smart Image Zoom (Lightbox) - Portalled via Dialog */}
            {/* Smart Image Zoom (Lightbox) - Portalled via Dialog */}
            <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
                <DialogContent className="max-w-[100vw] sm:max-w-7xl w-full h-screen sm:h-auto sm:max-h-[95vh] p-0 border-none bg-black/60 sm:bg-transparent shadow-none gap-0 z-[110] outline-none flex items-center justify-center">
                    <div
                        className="relative w-full h-full flex items-center justify-center animate-in zoom-in-95 duration-500 p-2 sm:p-0"
                        onClick={() => setSelectedImage(null)}
                    >
                        <div className="relative w-full h-[70vh] sm:h-auto sm:aspect-video md:aspect-[16/10] bg-zinc-950/20 sm:bg-card rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border-none sm:border sm:border-white/10 flex items-center justify-center">
                            {selectedImage && (
                                <Image
                                    src={selectedImage}
                                    alt="Project full view"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            )}

                            {/* Lightbox controls */}
                            <div className="absolute top-4 right-4 group z-[120]">
                                <button
                                    className="h-11 w-11 sm:h-10 sm:w-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition-all shadow-xl active:scale-95"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedImage(null);
                                    }}
                                >
                                    <ArrowRight className="h-6 w-6 sm:h-5 sm:w-5 rotate-180" />
                                </button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
