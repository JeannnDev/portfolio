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
    SheetTrigger,
    SheetTitle,
    SheetDescription,
    SheetHeader,
} from "@/components/ui/sheet"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
    type CarouselApi,
} from "@/components/ui/carousel"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useIsMobile } from "@/components/ui/use-mobile"
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerTitle,
    DrawerDescription,
    DrawerHeader,
} from "@/components/ui/drawer"

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
    const isMobile = useIsMobile()
    const [open, setOpen] = React.useState(false)
    const [selectedImage, setSelectedImage] = React.useState<string | null>(null)
    const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 })
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const cardRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (!api) return
        setCurrent(api.selectedScrollSnap())
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        })
    }

    const ProjectContent = (
        <div className="flex-1 overflow-y-auto pb-20">
            <div className="flex flex-col">
                {/* Imersive Header / Carousel */}
                <div className="relative w-full overflow-hidden bg-muted group/carousel">
                    {project.images && project.images.length > 0 ? (
                        <Carousel setApi={setApi} className="w-full">
                            <CarouselContent className="ml-0">
                                {project.images.map((image, i) => (
                                    <CarouselItem key={i} className="pl-0">
                                        <div
                                            className="relative w-full aspect-video sm:aspect-[16/10] md:cursor-zoom-in group/img"
                                            onClick={() => {
                                                if (!isMobile) {
                                                    setSelectedImage(image)
                                                }
                                            }}
                                        >
                                            <Image
                                                src={image}
                                                alt={`${project.title} - Screenshot ${i + 1}`}
                                                fill
                                                priority={i === 0}
                                                className="object-cover transition-transform duration-700 md:group-hover/img:scale-105"
                                            />
                                            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/20 to-transparent" />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>

                            {project.images.length > 1 && (
                                <>
                                    <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 h-14 w-14 bg-black/60 backdrop-blur-md border-white/10 text-white hover:bg-black/80 hover:scale-110 transition-all pointer-events-auto shadow-2xl z-40" />
                                    <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 h-14 w-14 bg-black/60 backdrop-blur-md border-white/10 text-white hover:bg-black/80 hover:scale-110 transition-all pointer-events-auto shadow-2xl z-40" />
                                    <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-30">
                                        {project.images.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => api?.scrollTo(i)}
                                                className={`h-1.5 transition-all duration-300 rounded-full shadow-sm ${current === i ? "w-8 bg-primary" : "w-1.5 bg-white/40 hover:bg-white/60"}`}
                                            />
                                        ))}
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
                <div className="px-6 py-8 md:px-10 md:py-12 space-y-12">
                    <div className="space-y-6">
                        <div className="space-y-3">
                            {isMobile ? (
                                <DrawerHeader className="p-0 text-left">
                                    <DrawerTitle className="text-2xl sm:text-4xl font-black tracking-tight text-foreground leading-tight">
                                        {project.title}
                                    </DrawerTitle>
                                    <DrawerDescription className="sr-only">
                                        Detalhes sobre o projeto {project.title}
                                    </DrawerDescription>
                                </DrawerHeader>
                            ) : (
                                <SheetHeader className="p-0 text-left">
                                    <SheetTitle className="text-2xl sm:text-4xl font-black tracking-tight text-foreground leading-tight">
                                        {project.title}
                                    </SheetTitle>
                                    <SheetDescription className="sr-only">
                                        Detalhes sobre o projeto {project.title}
                                    </SheetDescription>
                                </SheetHeader>
                            )}
                            <div className="h-1.5 w-16 bg-primary rounded-full" />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="px-4 py-1.5 text-[10px] font-bold bg-primary/5 text-primary/80 border border-primary/10 rounded-xl"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">Sobre o Projeto</h4>
                        </div>
                        <div className="text-sm sm:text-base text-muted-foreground/90 font-medium leading-[1.8] whitespace-pre-line max-w-4xl">
                            {project.description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    const ProjectCardUI = (
        <Card
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className="glass-card group h-full cursor-pointer hover:-translate-y-2 rounded-[2rem] overflow-hidden relative"
        >
            <div
                className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-10"
                style={{
                    background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.1), transparent 80%)`
                }}
            />

            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                {project.images && project.images.length > 0 ? (
                    <>
                        <Image
                            src={project.images[0]}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full bg-muted/50">
                        <LayoutGrid className="h-10 w-10 text-muted-foreground/30" />
                    </div>
                )}

                <div className="absolute bottom-5 left-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <Button className="w-full bg-white text-black hover:bg-white/90 rounded-xl font-bold text-xs h-10 shadow-2xl">
                        Explorar Detalhes <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>

            <CardContent className="p-6 sm:p-7 flex flex-col gap-4">
                <div>
                    <h3 className="font-black text-xl leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-1 mb-2 tracking-tight">
                        {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground/80 font-medium line-clamp-2 leading-relaxed">
                        {project.description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.slice(0, 3).map((tag) => (
                        <Badge
                            key={tag}
                            variant="secondary"
                            className="text-[10px] px-3 py-1 font-bold bg-primary/5 text-primary/80 border-none rounded-lg"
                        >
                            {tag}
                        </Badge>
                    ))}
                    {project.tags.length > 3 && (
                        <Badge variant="secondary" className="text-[10px] px-2 py-1 font-bold bg-muted text-muted-foreground border-none rounded-lg">
                            +{project.tags.length - 3}
                        </Badge>
                    )}
                </div>
            </CardContent>
        </Card>
    )

    return (
        <>
            {isMobile ? (
                <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerTrigger asChild>
                        {ProjectCardUI}
                    </DrawerTrigger>
                    <DrawerContent className="max-h-[95vh] border-t border-white/10 p-0 overflow-hidden outline-none bg-background/95 backdrop-blur-2xl">
                        <div className="w-12 h-1 bg-muted-foreground/20 rounded-full mx-auto my-4 shrink-0" />
                        {ProjectContent}
                    </DrawerContent>
                </Drawer>
            ) : (
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        {ProjectCardUI}
                    </SheetTrigger>
                    <SheetContent side="right" className="h-[100dvh] w-full sm:max-w-xl md:max-w-2xl p-0 gap-0 border-l border-white/10 bg-background/95 backdrop-blur-2xl transition-all duration-500 overflow-hidden outline-none">
                        {ProjectContent}
                    </SheetContent>
                </Sheet>
            )}

            {/* Smart Image Zoom (Lightbox) - Portalled via Dialog */}
            <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
                <DialogContent className="max-w-[100vw] sm:max-w-7xl w-full h-screen sm:h-auto sm:max-h-[95vh] p-0 border-none bg-black/60 sm:bg-transparent shadow-none gap-0 z-[110] outline-none flex items-center justify-center">
                    <DialogTitle className="sr-only">Visualização ampliada da imagem</DialogTitle>
                    <DialogDescription className="sr-only">Mostra a captura de tela do projeto em tela cheia</DialogDescription>
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
