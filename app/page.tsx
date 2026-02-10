"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Github, Linkedin, Mail, Star, Award, ExternalLink, ChevronRight, Code2, Database, Server, Terminal, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { ScrollProgress } from "@/components/scroll-progress"
import { AnimatedSection } from "@/components/animated-section"
import { useTypingEffect } from "@/hooks/use-typing-effect"
import { SkillsCarousel } from "@/components/skills-carousel"
import { MobileNav } from "@/components/mobile-nav"

const navItems = [
  { id: "sobre", label: "Sobre" },
  { id: "projetos", label: "Projetos" },
  { id: "skills", label: "Skills" },
  { id: "certificados", label: "Certificados" },
  { id: "contato", label: "Contato" },
]

const skills = [
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", level: 4, category: "Backend" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", level: 3, category: "Frontend" },
  { name: "Supabase", icon: "https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png", level: 3, category: "Backend" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", level: 3, category: "Database" },
  { name: "PM2", icon: "https://cdn.simpleicons.org/pm2/24B9FF", level: 4, category: "DevOps" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", level: 3, category: "Database" },
  { name: "Git / GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", level: 4, category: "DevOps" },
  { name: "HTML5 & CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", level: 4, category: "Frontend" },
  { name: "APIs REST", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmJoxiAXVIxedd5WnxL3yepJpACK2lmCSl9w&s", level: 4, category: "Backend" },
  { name: "n8n", icon: "https://cdn.simpleicons.org/n8n/EA580C", level: 3, category: "Backend" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", level: 2, category: "Frontend" },
  { name: "XAMPP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg", level: 3, category: "DevOps" },
  { name: "Totvs Protheus", icon: "https://www.systax.com.br/site/wp-content/uploads/2023/06/Systax-parceiros-logo-Totvs.jpg", level: 2, category: "Backend" },
  { name: "Lua", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg", level: 1, category: "Backend" },
]

const certificates = [
  { title: "Engenharia de Software", institution: "Uninter (Em andamento)", date: "2025" },
  { title: "Formação Backend (Python, SQL, Git)", institution: "Alura", date: "138h" },
  { title: "Jornada Python", institution: "Hashtag Treinamentos", date: "8h" },
]

const projects = [
  {
    title: "Gerador de SVG Interativo",
    description: "Aplicativo desktop que processa arquivos SVG e gera versões interativas e dinâmicas para web, facilitando visualização de dados gráficos.",
    images: ["/images/svg1.png", "/images/svg2.png"],
    tags: ["Python", "HTML5", "JavaScript", "CSS3"],
    github: "#",
  },
  {
    title: "Gerenciador PM2 via Web",
    description: "Interface web para monitorar, subir, parar e reiniciar processos Node.js com PM2. Backend em Python e frontend moderno sem uso de terminal.",
    images: ["/images/pm21.png", "/images/pm22.png", "/images/pm23.png", "/images/pm24.png", "/images/pm25.png"],
    tags: ["Python", "PM2", "REST API", "Dashboard"],
    github: "#",
  },
  {
    title: "Auth & API Supabase",
    description: "Sistema completo de autenticação, gestão de perfis e validação. APIs desenvolvidas em Supabase e consumidas por frontend próprio.",
    images: ["/images/supa1.png", "/images/supa2.png"],
    tags: ["Supabase", "PostgreSQL", "Auth", "RLS"],
    github: "#",
  },
  {
    title: "Consulta Chassi (Zoho CRM)",
    description: "Sistema de consulta integrada ao Zoho CRM via API Deluge, retornando informações de chassi em tempo real.",
    images: [],
    tags: ["Zoho CRM", "Python", "Deluge", "Integration"],
    github: "#",
  },
  {
    title: "Migração SQL Server → PostgreSQL",
    description: "Automação ETL com n8n para migração massiva de dados (Produtos, Clientes, Financeiro) entre bancos diferentes.",
    images: [],
    tags: ["n8n", "SQL Server", "PostgreSQL", "ETL"],
    github: "#",
  },
]

const stats = [
  { value: "2+", label: "Anos de Experiência" },
  { value: "138h+", label: "Horas de Formação" },
  { value: "8+", label: "Projetos Reais" },
  { value: "15+", label: "Tecnologias" },
]

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

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    if (project.images.length <= 1) return
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % project.images.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [project.images.length])

  return (
    <Card className="group flex flex-col h-full overflow-hidden bg-card border-border/40 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
      <div className="relative aspect-video overflow-hidden bg-muted">
        {project.images.map((img, imgIndex) => (
          <Image
            key={imgIndex}
            src={img || "/placeholder.svg"}
            alt={`${project.title} - ${imgIndex + 1}`}
            fill
            className={`object-cover transition-all duration-700 ${imgIndex === currentImage ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />

        {/* Carousel Indicators */}
        {project.images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
            {project.images.map((_, imgIndex) => (
              <button
                key={imgIndex}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImage(imgIndex);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${imgIndex === currentImage
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/40 hover:bg-white/60"
                  }`}
              />
            ))}
          </div>
        )}
      </div>

      <CardContent className="p-5 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="font-bold text-xl mb-2 tracking-tight group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="mt-auto space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/80"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="pt-4 border-t border-border/50 flex items-center justify-between">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group/link"
            >
              <Github className="h-4 w-4" />
              <span>Ver código</span>
              <ExternalLink className="h-3 w-3 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("sobre")
  const [scrolled, setScrolled] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)

  const typingWords = ["Backend", "Automação", "APIs REST", "Integrações"]
  const typedText = useTypingEffect(typingWords, 150, 100, 2000)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = navItems.map((item) => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 150

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id)
          break
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const elementPosition = element.offsetTop - offset
      window.scrollTo({ top: elementPosition, behavior: "smooth" })
    }
  }


  // Filter projects by selected tag
  const filteredProjects = selectedFilter
    ? projects.filter(project => project.tags.includes(selectedFilter))
    : projects

  // Get all unique tags from projects
  const allTags = Array.from(new Set(projects.flatMap(p => p.tags)))

  return (
    <div className="min-h-screen bg-background relative">
      <ScrollProgress />

      {/* Gradient cursor follower - only on desktop */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden lg:block"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(56, 189, 248, 0.06), transparent 40%)`
        }}
      />

      {/* Background - Dot Pattern with Vignette */}
      <div className="fixed inset-0 z-0 h-full w-full bg-background">
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50" : ""}`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="h-16 lg:h-20 flex items-center justify-between">
            <button
              onClick={() => scrollToSection("sobre")}
              className="flex items-center gap-3 group"
            >
              <div className="relative h-10 w-10 overflow-hidden rounded-xl shadow-sm ring-1 ring-border/50 group-hover:ring-primary/50 transition-all bg-background">
                <Image
                  src="/logo.png"
                  alt="Logo Jean Correa"
                  fill
                  className="object-cover scale-125"
                />
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">Jean Correa</span>
                <span className="text-[10px] text-muted-foreground font-medium tracking-[0.2em] uppercase">Portfolio</span>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors ${activeSection === item.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                  )}
                </button>
              ))}
              <ThemeToggle />
            </nav>

            {/* Mobile Header Actions */}
            <div className="md:hidden">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section id="sobre" className="min-h-screen flex items-center pt-24 pb-12 lg:pt-20">
          <div className="container mx-auto px-4 lg:px-8 py-0 lg:py-0">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Left Column - Text */}
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span className="text-xs font-medium text-primary">Disponivel para projetos</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                  Desenvolvedor{" "}
                  <span className="text-primary inline-block min-w-[200px]">
                    {typedText}
                    <span className="animate-pulse">|</span>
                  </span>
                </h1>

                <p className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg">
                  Graduando em <span className="text-foreground font-medium">Engenharia de Software</span> com foco em Backend, Automação e Integrações.
                  Especialista em <span className="text-foreground font-medium">Supabase</span>, <span className="text-foreground font-medium">PostgreSQL</span>, <span className="text-foreground font-medium">APIs REST</span> e <span className="text-foreground font-medium">PM2</span>.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center p-3 rounded-lg bg-card/50 border border-border/50">
                      <div className="text-2xl font-bold text-primary">{stat.value}</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <Button size="lg" onClick={() => scrollToSection("projetos")} className="group w-full sm:w-auto h-12 text-base shadow-lg shadow-primary/20 active-scale">
                    Ver Projetos
                    <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => scrollToSection("contato")} className="bg-background/50 backdrop-blur w-full sm:w-auto h-12 text-base active-scale">
                    <Mail className="mr-2 h-4 w-4" />
                    Contato
                  </Button>
                </div>
              </div>

              {/* Right Column - Visual */}
              <div className="order-1 lg:order-2 flex justify-center">
                <div className="relative">
                  {/* Decorative elements */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/5 to-transparent rounded-3xl blur-2xl" />

                  {/* About Card */}
                  <Card className="relative bg-card/80 backdrop-blur border-border/50 max-w-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
                          <Code2 className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Jean Correa</h3>
                          <p className="text-sm text-muted-foreground">Backend Developer</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                            <Database className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Banco de Dados</p>
                            <p className="text-xs text-muted-foreground">PostgreSQL, Supabase, SQL</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                            <Server className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Backend</p>
                            <p className="text-xs text-muted-foreground">Node.js, Python, REST APIs</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                            <Terminal className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">DevOps</p>
                            <p className="text-xs text-muted-foreground">PM2, Linux, Git</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-border/50">
                        <p className="text-xs text-muted-foreground mb-3">Graduando em Engenharia de Software</p>
                        <div className="flex gap-2">
                          <a href="https://github.com/seu-usuario" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors">
                            <Github className="h-4 w-4" />
                          </a>
                          <a href="https://linkedin.com/in/seu-perfil" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors">
                            <Linkedin className="h-4 w-4" />
                          </a>
                          <a href="mailto:seu-email@exemplo.com" className="p-2 rounded-lg bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors">
                            <Mail className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projetos" className="py-12 md:py-24 lg:py-32 scroll-mt-20">
          <div className="container mx-auto px-4 lg:px-8">
            <AnimatedSection animation="fade-up">
              <div className="max-w-2xl mb-8">
                <span className="text-primary text-sm font-medium tracking-wider uppercase">Portfolio</span>
                <h2 className="text-3xl lg:text-4xl font-bold mt-2 mb-4">Projetos em Destaque</h2>
                <p className="text-muted-foreground">
                  Uma selecao dos meus trabalhos mais recentes e relevantes
                </p>
              </div>
            </AnimatedSection>

            {/* Filter Tags */}
            <AnimatedSection animation="fade-up" delay={100}>
              <div className="relative mb-10">
                <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide -mx-4 px-4 md:flex-wrap md:justify-center md:mx-0 md:px-0 md:overflow-visible">
                  <button
                    onClick={() => setSelectedFilter(null)}
                    className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${selectedFilter === null
                      ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                      : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground hover:bg-muted/30"
                      }`}
                  >
                    Todos
                  </button>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedFilter(tag)}
                      className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border flex items-center gap-2 ${selectedFilter === tag
                        ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                        : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground hover:bg-muted/30"
                        }`}
                    >
                      {tag}
                      {selectedFilter === tag && <X className="h-3 w-3" />}
                    </button>
                  ))}
                </div>
                <div className="absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none md:hidden" />
              </div>
            </AnimatedSection>

            {/* Projects Container - Horizontal Scroll on Mobile, Grid on Desktop */}
            <div className="flex overflow-x-auto snap-x-mandatory gap-4 -mx-4 px-4 pb-4 md:pb-0 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 scrollbar-hide md:overflow-visible">
              {filteredProjects.map((project, index) => (
                <div key={index} className="flex-none w-[85vw] md:w-auto snap-center">
                  <AnimatedSection key={index} animation="fade-up" delay={index * 100} className="h-full">
                    <ProjectCard project={project} index={index} />
                  </AnimatedSection>
                </div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhum projeto encontrado com essa tecnologia.</p>
              </div>
            )}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-12 md:py-24 lg:py-32 bg-card/30 scroll-mt-20">
          <div className="container mx-auto px-4 lg:px-8">
            <AnimatedSection animation="fade-up">
              <div className="max-w-2xl mb-12 text-center mx-auto">
                <span className="text-primary text-sm font-medium tracking-wider uppercase">Habilidades</span>
                <h2 className="text-3xl lg:text-4xl font-bold mt-2 mb-4">Stack Tecnologico</h2>
                <p className="text-muted-foreground">
                  Tecnologias e ferramentas que domino e utilizo no dia a dia
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div className="relative">
                {/* Decorative gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent blur-3xl" />

                <SkillsCarousel skills={skills} />
              </div>
            </AnimatedSection>

            {/* Category Legend */}
            <AnimatedSection animation="fade-up" delay={400}>
              <div className="flex flex-wrap justify-center gap-3 mt-12">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/50">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-xs font-medium">Frontend</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/50">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs font-medium">Backend</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/50">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span className="text-xs font-medium">Database</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/50">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  <span className="text-xs font-medium">DevOps</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Certificates Section */}
        <section id="certificados" className="py-12 md:py-24 lg:py-32 scroll-mt-20">
          <div className="container mx-auto px-4 lg:px-8">
            <AnimatedSection animation="fade-up">
              <div className="max-w-2xl mb-12">
                <span className="text-primary text-sm font-medium tracking-wider uppercase">Formacao</span>
                <h2 className="text-3xl lg:text-4xl font-bold mt-2 mb-4">Certificados</h2>
                <p className="text-muted-foreground">
                  Cursos e certificacoes que complementam minha formacao
                </p>
              </div>
            </AnimatedSection>

            <div className="flex overflow-x-auto snap-x-mandatory gap-4 -mx-4 px-4 pb-4 md:pb-0 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 scrollbar-hide md:overflow-visible">
              {certificates.map((cert, index) => (
                <div key={index} className="flex-none w-[70vw] md:w-auto snap-center">
                  <AnimatedSection animation="fade-up" delay={index * 100} className="h-full">
                    <Card className="group bg-card/50 backdrop-blur border-border/50 hover:border-primary/30 transition-all duration-300 h-full">
                      <CardContent className="p-5 flex flex-col h-full">
                        <div className="p-2.5 rounded-xl bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors shrink-0">
                          <Award className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">{cert.title}</h3>
                        <p className="text-xs text-muted-foreground mb-4 flex-grow">{cert.institution}</p>
                        <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full w-fit self-start">{cert.date}</span>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contato" className="py-20 lg:py-32 bg-card/30">
          <div className="container mx-auto px-4 lg:px-8">
            <AnimatedSection animation="fade-up">
              <div className="max-w-2xl mx-auto text-center">
                <span className="text-primary text-sm font-medium tracking-wider uppercase">Contato</span>
                <h2 className="text-3xl lg:text-4xl font-bold mt-2 mb-4">Vamos Trabalhar Juntos?</h2>
                <p className="text-muted-foreground mb-8">
                  Estou sempre aberto para discutir novos projetos, ideias criativas ou oportunidades de fazer parte de suas visoes.
                </p>

                <AnimatedSection animation="scale" delay={200}>
                  <Card className="bg-card/50 backdrop-blur border-border/50 max-w-md mx-auto">
                    <CardContent className="p-6">
                      <a
                        href="mailto:seu-email@exemplo.com"
                        className="block p-4 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors mb-4 group"
                      >
                        <Mail className="h-6 w-6 text-primary mx-auto mb-2" />
                        <p className="font-medium group-hover:text-primary transition-colors">seu-email@exemplo.com</p>
                      </a>

                      <div className="flex gap-3">
                        <a
                          href="https://github.com/seu-usuario"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all"
                        >
                          <Github className="h-5 w-5" />
                          <span className="text-sm font-medium">GitHub</span>
                        </a>
                        <a
                          href="https://linkedin.com/in/seu-perfil"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all"
                        >
                          <Linkedin className="h-5 w-5" />
                          <span className="text-sm font-medium">LinkedIn</span>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-16 md:mb-0">
            <p className="text-sm text-muted-foreground">
              Desenvolvido por <span className="text-primary font-medium">Jean Correa</span>
            </p>
            <p className="text-xs text-muted-foreground">
              2024 - Todos os direitos reservados
            </p>
          </div>
        </div>
      </footer>

      <MobileNav />
    </div>
  )
}
