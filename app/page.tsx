"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Github, Linkedin, Mail, Star, Award, ExternalLink, ChevronRight, Code2, Database, Server, Terminal, Filter, X, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { ScrollProgress } from "@/components/scroll-progress"
import { AnimatedSection } from "@/components/animated-section"
import { useTypingEffect } from "@/hooks/use-typing-effect"
import { SkillsCarousel } from "@/components/skills-carousel"
import { ProjectCarousel } from "@/components/project-carousel"
import { MobileNav } from "@/components/mobile-nav"
import LogoLoop from "@/components/logo-loop"
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiPython, SiPostgresql, SiSupabase, SiN8N, SiJavascript, SiHtml5, SiCss3, SiGit, SiMysql } from 'react-icons/si';
import { toast, Toaster } from "sonner"

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiPython />, title: "Python", href: "https://www.python.org" },
  { node: <SiPostgresql />, title: "PostgreSQL", href: "https://www.postgresql.org" },
  { node: <SiSupabase />, title: "Supabase", href: "https://supabase.com" },
  { node: <SiN8N />, title: "n8n", href: "https://n8n.io" },
  { node: <SiJavascript />, title: "JavaScript", href: "https://javascript.info" },
  { node: <SiHtml5 />, title: "HTML5", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { node: <SiCss3 />, title: "CSS3", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { node: <SiGit />, title: "Git", href: "https://git-scm.com" },
  { node: <SiMysql />, title: "MySQL", href: "https://www.mysql.com" },
];

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
    title: "Módulo de Solicitação de Compras",
    description: "Sistema de criação de SCs com motor de validação inteligente que previne erros de classificação contábil. Interface master-detail para múltiplos itens, validação cruzada entre tipos de material/centros de custo/naturezas, e integração bidirecional com TOTVS Protheus (SC1).",
    images: ["/images/purchase1.png", "/images/purchase2.png"],
    tags: ["Next.js", "TOTVS Protheus", "ERP Integration", "TypeScript"],
    github: "#",
  },
  {
    title: "Módulo de Transferência de Estoque",
    description: "Sistema full-stack para orquestrar movimentações internas de estoque com integração TOTVS Protheus. Validações em tempo real de saldos (SB2), controle de rastro/endereçamento (bins), formulários condicionais e execução de rotinas automáticas (ExecAuto) para efetivação no ERP.",
    images: ["/images/transfer1.png", "/images/transfer2.png"],
    tags: ["Next.js", "TOTVS Protheus", "ERP Integration", "TypeScript"],
    github: "#",
  },
  {
    title: "Controle de Produção Industrial (Shop Floor)",
    description: "Sistema web para apontamento de produção em chão de fábrica com integração ERP TOTVS Protheus. Controle de OPs, perdas, setup de máquinas e impressão térmica de etiquetas ZPL. Interface otimizada para tablets industriais com validações robustas e sincronização em tempo real.",
    images: ["/images/shopfloor1.png", "/images/shopfloor2.png", "/images/shopfloor3.png", "/images/shopfloor4.png", "/images/shopfloor5.png", "/images/shopfloor6.png"],
    tags: ["Next.js", "TOTVS Protheus", "ERP Integration", "TypeScript"],
    github: "#",
  },
  {
    title: "Sistema de Gestão de Projetos (PMS)",
    description: "Plataforma avançada de gerenciamento com 3 visualizações interativas (Kanban drag-and-drop, Gantt customizado e Lista editável). Colaboração em tempo real via Socket.io, hierarquia infinita de sub-projetos e controle granular de permissões ACL.",
    images: ["/images/pms1.png", "/images/pms2.png", "/images/pms3.png", "/images/pms4.png"],
    tags: ["Next.js", "TypeScript", "Real-time"],
    github: "#",
  },
  {
    title: "Sistema de Gestão de Frota",
    description: "Plataforma completa para gerenciamento de solicitações de veículos com fluxo de aprovação multinível, check-in/out, upload de comprovantes e exportação de relatórios. Interface responsiva com tabelas no desktop e cards otimizados para mobile.",
    images: ["/images/frota1.png", "/images/frota2.png"],
    tags: ["Next.js", "TypeScript", "ERP Integration"],
    github: "#",
  },
  {
    title: "Gerador de SVG Interativo",
    description: "Aplicativo desktop que processa arquivos SVG e gera versões interativas e dinâmicas para web, facilitando visualização de dados gráficos.",
    images: ["/images/svg1.png", "/images/svg2.png"],
    tags: ["Python", "JavaScript"],
    github: "#",
  },
  {
    title: "Gerenciador PM2 via Web",
    description: "Interface web para monitorar, subir, parar e reiniciar processos Node.js com PM2. Backend em Python e frontend moderno sem uso de terminal.",
    images: ["/images/pm21.png", "/images/pm22.png", "/images/pm23.png", "/images/pm24.png", "/images/pm25.png"],
    tags: ["Python", "Dashboard"],
    github: "#",
  },
  {
    title: "Auth & API Supabase",
    description: "Sistema completo de autenticação, gestão de perfis e validação. APIs desenvolvidas em Supabase e consumidas por frontend próprio.",
    images: ["/images/supa1.png", "/images/supa2.png"],
    tags: ["Supabase", "PostgreSQL", "Auth"],
    github: "#",
  },
  {
    title: "Consulta Chassi (Zoho CRM)",
    description: "Sistema de consulta integrada ao Zoho CRM via API Deluge, retornando informações de chassi em tempo real.",
    images: [],
    tags: ["Python", "ERP Integration"],
    github: "#",
  },
  {
    title: "Migração SQL Server → PostgreSQL",
    description: "Automação ETL com n8n para migração massiva de dados (Produtos, Clientes, Financeiro) entre bancos diferentes.",
    images: [],
    tags: ["PostgreSQL", "Automation"],
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

// Local ProjectCard removed as it's replaced by @/components/project-card.tsx

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("sobre")
  const [scrolled, setScrolled] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)
  const [isCopied, setIsCopied] = useState(false)

  const typingWords = ["Backend", "Automação", "APIs REST", "Integrações"]
  const typedText = useTypingEffect(typingWords, 150, 100, 2000)

  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    const email = "seu-email@exemplo.com"
    navigator.clipboard.writeText(email)
    setIsCopied(true)
    toast.success("E-mail copiado!", {
      description: email,
      icon: <Check className="h-4 w-4 text-primary" />,
    })
    setTimeout(() => setIsCopied(false), 2000)
  }

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


  // Main stacks that people look for in a dev
  const mainStacks = ["Next.js", "TypeScript", "Python", "TOTVS Protheus", "ERP Integration", "PostgreSQL", "Supabase"]

  // Filter projects by selected tag
  const filteredProjects = selectedFilter
    ? projects.filter(project => project.tags.includes(selectedFilter))
    : projects

  // Use main stacks for the filter options
  const allTags = mainStacks

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Toaster position="top-center" richColors />
      <ScrollProgress />
      <div className="noise-bg opacity-[0.08]" />

      {/* Gradient cursor follower - only on desktop */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden lg:block"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(56, 189, 248, 0.08), transparent 45%)`
        }}
      />

      {/* Background - Dot Pattern with Vignette */}
      <div className="fixed inset-0 z-0 h-full w-full bg-background overflow-hidden">
        {/* Animated Blobs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />

        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />
      </div>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "py-3 bg-background/60 backdrop-blur-xl border-b border-border/40 shadow-lg"
        : "py-6 bg-transparent"
        }`}>
        <div className="container mx-auto px-4 lg:px-12">
          <div className="flex items-center justify-between">
            <button
              onClick={() => scrollToSection("sobre")}
              className="flex items-center gap-4 group"
            >
              <div className="relative h-12 w-12 overflow-hidden rounded-2xl shadow-xl ring-1 ring-border/50 group-hover:ring-primary/50 transition-all duration-500 bg-card/80 backdrop-blur-sm group-hover:shadow-primary/20 group-hover:-translate-y-1">
                <Image
                  src="/logo.png"
                  alt="Logo Jean Correa"
                  fill
                  className="object-cover scale-110 group-hover:scale-125 transition-transform duration-700"
                />
              </div>
              <div className="flex flex-col items-start -space-y-0.5">
                <span className="text-xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">Jean Correa</span>
                <span className="text-[10px] text-primary/60 font-bold tracking-[0.4em] uppercase">Developer</span>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-muted/20 backdrop-blur-md border border-white/5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-6 py-2.5 text-sm font-semibold transition-all duration-300 rounded-full ${activeSection === item.id
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span
                      className="absolute inset-0 bg-primary/5 rounded-full ring-1 ring-inset ring-primary/20"
                    />
                  )}
                </button>
              ))}
              <div className="w-px h-5 bg-border/50 mx-2" />
              <ThemeToggle />
            </nav>

            {/* Mobile Header Actions */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section id="sobre" className="min-h-[100svh] flex items-center pt-24 pb-12 lg:pt-0">
          <div className="container mx-auto px-4 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left Column - Text */}
              <div className="order-2 lg:order-1 text-center lg:text-left">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
                  Desenvolvedor{" "}<br className="hidden sm:block" />
                  <span className="text-gradient inline-block min-w-[200px]">
                    {typedText}
                    <span className="animate-pulse">|</span>
                  </span>
                </h1>

                <p className="text-lg lg:text-2xl text-muted-foreground/80 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Graduando em <span className="text-foreground font-bold underline decoration-primary/30 underline-offset-4">Engenharia de Software</span>. Transformo desafios técnicos em soluções robustas de <span className="text-foreground font-bold">Backend e Automação</span>.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex flex-col p-4 rounded-2xl bg-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 group">
                      <div className="text-2xl lg:text-3xl font-black text-primary group-hover:scale-110 transition-transform">{stat.value}</div>
                      <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" onClick={() => scrollToSection("projetos")} className="group h-14 px-8 text-base font-bold shadow-xl shadow-primary/20 active-scale rounded-2xl">
                    Explorar Trabalho
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => scrollToSection("contato")} className="glass h-14 px-8 text-base font-bold active-scale rounded-2xl">
                    <Mail className="mr-2 h-5 w-5" />
                    Vamos Conversar
                  </Button>
                </div>
              </div>

              {/* Right Column - Visual */}
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative animate-in fade-in zoom-in duration-1000">
                  {/* Subtle Background Glow */}
                  <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full opacity-50" />

                  {/* About Card Wrapper */}
                  <div className="relative">
                    <Card className="glass-card p-8 rounded-[2rem] border border-white/10 max-w-sm sm:max-w-md w-full shadow-2xl backdrop-blur-md bg-white/[0.02]">
                      <div className="space-y-6 text-left relative z-10">
                        <div className="flex items-center gap-6">
                          <div className="relative">
                            <div className="h-20 w-20 rounded-full bg-primary/20 p-[2px]">
                              <div className="h-full w-full rounded-full bg-background overflow-hidden relative">
                                <Image
                                  src="/logo.png"
                                  alt="Jean Correa Logo"
                                  fill
                                  className="object-cover"
                                  priority
                                />
                              </div>
                            </div>
                            <div className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-background shadow-lg" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-black tracking-tight mb-1 text-foreground">Jean Correa</h2>
                          </div>
                        </div>

                        <div className="space-y-5">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Especialista em construir <span className="text-foreground font-bold">experiências digitais resilientes</span> e arquiteturas backend modernas integradas ao <span className="text-primary/90 font-bold">ERP Protheus</span>.
                          </p>
                          <div className="flex gap-3">
                            <Button
                              variant="outline"
                              className="rounded-xl font-bold bg-white/5 hover:bg-white/10 border-white/10 flex-1 h-11 text-xs transition-all"
                              onClick={copyEmail}
                            >
                              {isCopied ? <Check className="mr-2 h-4 w-4 text-green-400" /> : <Copy className="mr-2 h-4 w-4" />}
                              {isCopied ? "Copiado!" : "E-mail"}
                            </Button>
                            <Button className="rounded-xl font-bold flex-1 h-11 text-xs bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                              Hire Me
                            </Button>
                          </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                          {[
                            { icon: Github, href: "https://github.com/jeanvst" },
                            { icon: Linkedin, href: "https://linkedin.com/in/jean-victor-dev" }
                          ].map((social, i) => (
                            <a
                              key={i}
                              href={social.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300"
                            >
                              <social.icon className="h-4 w-4" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        < section id="projetos" className="py-12 md:py-24 lg:py-32 scroll-mt-20" >
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
            {/* Filter Tags - Modern Scrollable Bar */}
            <AnimatedSection animation="fade-up" delay={100}>
              <div className="relative mb-10 group">
                {/* Mobile Gradient Fades */}
                <div className="absolute left-0 top-0 bottom-2 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none md:hidden" />
                <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none md:hidden" />

                <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-hide -mx-4 px-4 md:flex-wrap md:justify-center md:mx-0 md:px-0 md:overflow-visible">
                  <button
                    onClick={() => setSelectedFilter(null)}
                    className={`whitespace-nowrap px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 border ${selectedFilter === null
                      ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 scale-105"
                      : "bg-card/80 backdrop-blur-sm hover:bg-muted text-muted-foreground border-border/50 hover:border-primary/50 hover:text-foreground"
                      }`}
                  >
                    Todos
                  </button>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedFilter(tag)}
                      className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 border flex items-center gap-2 ${selectedFilter === tag
                        ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 scale-105"
                        : "bg-card/80 backdrop-blur-sm hover:bg-muted text-muted-foreground border-border/50 hover:border-primary/50 hover:text-foreground"
                        }`}
                    >
                      {tag}
                      {/* {selectedFilter === tag && <Check className="h-3 w-3" />} */}
                    </button>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Projects Container - Horizontal Scroll on Mobile, Grid on Desktop */}
            {/* Projects Carousel */}
            <div className="w-full">
              {filteredProjects.length > 0 ? (
                <ProjectCarousel filteredProjects={filteredProjects} />
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Nenhum projeto encontrado com essa tecnologia.</p>
                </div>
              )}
            </div>
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

                <div className="py-8">
                  <LogoLoop
                    logos={techLogos}
                    speed={40}
                    direction="left"
                    logoHeight={50}
                    gap={100}
                    hoverSpeed={0}
                    scaleOnHover
                    fadeOut
                    ariaLabel="Tecnologias"
                  />
                </div>

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

            <div className="flex overflow-x-auto snap-x-mandatory gap-6 -mx-4 px-4 pb-6 md:pb-0 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 scrollbar-hide md:overflow-visible">
              {certificates.map((cert, index) => (
                <div key={index} className="flex-none w-[80vw] md:w-auto snap-center">
                  <AnimatedSection animation="fade-up" delay={index * 100} className="h-full">
                    <Card className="glass-card group hover:-translate-y-2 rounded-[2rem] overflow-hidden h-full">
                      <CardContent className="p-8 flex flex-col h-full gap-4">
                        <div className="p-4 rounded-2xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors shadow-inner">
                          <Award className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-black text-lg tracking-tight group-hover:text-primary transition-colors leading-tight mb-2">{cert.title}</h3>
                          <p className="text-sm text-muted-foreground/80 font-medium mb-4">{cert.institution}</p>
                        </div>
                        <div className="mt-auto">
                          <span className="text-[10px] font-black tracking-widest uppercase text-primary bg-primary/10 px-3 py-1.5 rounded-full">{cert.date}</span>
                        </div>
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
                  <Card className="glass-card max-w-lg mx-auto rounded-[2.5rem] overflow-hidden">
                    <CardContent className="p-8 sm:p-12">
                      <a
                        href="#"
                        onClick={copyEmail}
                        className="flex flex-col items-center p-8 rounded-3xl bg-primary/5 hover:bg-primary/10 border border-primary/10 transition-all duration-300 mb-6 group active:scale-95 shadow-inner relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform relative z-10">
                          {isCopied ? <Check className="h-8 w-8 text-primary animate-in zoom-in" /> : <Mail className="h-8 w-8 text-primary" />}
                        </div>
                        <p className="text-lg font-black group-hover:text-primary transition-colors tracking-tight relative z-10">seu-email@exemplo.com</p>
                        <div className="flex items-center gap-2 mt-2 relative z-10">
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{isCopied ? "Copiado!" : "Clique para copiar"}</p>
                          {!isCopied && <Copy className="h-3 w-3 text-muted-foreground" />}
                        </div>
                      </a>

                      <div className="flex gap-4">
                        {[
                          { icon: Github, label: "GitHub", href: "https://github.com/seu-usuario" },
                          { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/seu-perfil" }
                        ].map((social, i) => (
                          <a
                            key={i}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex flex-col items-center gap-2 p-6 rounded-3xl bg-muted/40 hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all duration-300 group hover:shadow-xl active:scale-90"
                          >
                            <social.icon className="h-6 w-6 group-hover:text-primary transition-colors" />
                            <span className="text-xs font-black uppercase tracking-widest">{social.label}</span>
                          </a>
                        ))}
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
