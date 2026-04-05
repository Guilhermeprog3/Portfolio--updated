"use client"

import React, { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft, ArrowRight, ArrowUp, ExternalLink, Github,
  Code, Layers, Globe, Star, Search, X, Target,
} from "lucide-react"
import { projectsData } from "@/lib/projects-data"
import { Project, ProjectCategory } from "@/lib/types"
import Image from "next/image"
import { Footer } from "@/componentes/footer"
import { ProjectsPageHeader } from "@/componentes/projects-header"
import { ProjectModal } from "@/componentes/projetct-modal"

// ─── StarField ────────────────────────────────────────────────────────────────
function StarField() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext("2d"); if (!ctx) return
    let animId: number
    const stars: { x: number; y: number; r: number; o: number; sp: number; twinkle: number }[] = []
    const resize = () => {
      c.width = c.offsetWidth; c.height = c.offsetHeight
      stars.length = 0
      for (let i = 0; i < 220; i++) {
        stars.push({
          x: Math.random() * c.width, y: Math.random() * c.height,
          r: Math.random() * 1.4 + 0.1, o: Math.random(),
          sp: Math.random() * 0.003 + 0.0005,
          twinkle: Math.random() * Math.PI * 2,
        })
      }
    }
    resize(); window.addEventListener("resize", resize)
    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height); t++
      stars.forEach(s => {
        const op = 0.1 + 0.6 * Math.abs(Math.sin(t * s.sp + s.twinkle))
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200,210,255,${op})`; ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />
}

// ─── Telescope Vignette Overlay ───────────────────────────────────────────────
function TelescopeVignette() {
  return (
    <div className="fixed inset-0 pointer-events-none z-20" style={{ mixBlendMode: "multiply" }}>
      {/* Circular vignette — darkens corners, simulating telescope view */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(2,4,18,0.55) 70%, rgba(1,2,10,0.92) 100%)",
      }} />
      {/* Subtle chromatic aberration ring at edges */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 72% 72% at 50% 50%, transparent 68%, rgba(99,102,241,0.06) 80%, transparent 100%)",
      }} />
    </div>
  )
}

// ─── Crosshair / Reticle HUD ──────────────────────────────────────────────────
function ReticleHUD() {
  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex items-center justify-center">
      {/* Center crosshair */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
        {/* Horizontal */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 40, height: 1, background: "rgba(99,102,241,0.2)" }} />
        {/* Vertical */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 1, height: 40, background: "rgba(99,102,241,0.2)" }} />
        {/* Center dot */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 4, height: 4, borderRadius: "50%", background: "rgba(99,102,241,0.35)" }} />
      </div>

      {/* Corner brackets */}
      {[
        { top: "8%", left: "4%", borderTop: "1px solid rgba(99,102,241,0.25)", borderLeft: "1px solid rgba(99,102,241,0.25)" },
        { top: "8%", right: "4%", borderTop: "1px solid rgba(99,102,241,0.25)", borderRight: "1px solid rgba(99,102,241,0.25)" },
        { bottom: "8%", left: "4%", borderBottom: "1px solid rgba(99,102,241,0.25)", borderLeft: "1px solid rgba(99,102,241,0.25)" },
        { bottom: "8%", right: "4%", borderBottom: "1px solid rgba(99,102,241,0.25)", borderRight: "1px solid rgba(99,102,241,0.25)" },
      ].map((s, i) => (
        <div key={i} style={{ position: "absolute", width: 24, height: 24, ...s }} />
      ))}

      {/* Scan line — slow horizontal sweep */}
      <motion.div
        style={{
          position: "absolute", left: 0, right: 0, height: 1,
          background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.12), rgba(129,140,248,0.08), transparent)",
        }}
        animate={{ top: ["10%", "90%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* HUD text labels */}
      <div style={{ position: "absolute", top: "9%", left: "5%", fontSize: 9, color: "rgba(99,102,241,0.4)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.12em" }}>
        OBSERVATÓRIO ✦ PORTFÓLIO
      </div>
      <div style={{ position: "absolute", top: "9%", right: "5%", fontSize: 9, color: "rgba(99,102,241,0.35)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em" }}>
        FOCO: PROJETOS
      </div>
      <div style={{ position: "absolute", bottom: "9%", left: "5%", fontSize: 9, color: "rgba(99,102,241,0.3)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em" }}>
        MODO: EXPLORAÇÃO
      </div>
      <motion.div
        style={{ position: "absolute", bottom: "9%", right: "5%", fontSize: 9, color: "rgba(99,102,241,0.3)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em" }}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        ● TRANSMITINDO
      </motion.div>
    </div>
  )
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      onClick={onClick}
      className="group cursor-pointer relative"
    >
      {/* Card */}
      <div
        className="relative rounded-xl overflow-hidden transition-all duration-350"
        style={{
          background: "rgba(5,8,22,0.75)",
          border: "1px solid rgba(99,102,241,0.12)",
          backdropFilter: "blur(12px)",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.border = "1px solid rgba(99,102,241,0.35)"
          e.currentTarget.style.boxShadow = "0 0 30px rgba(99,102,241,0.15), 0 0 60px rgba(99,102,241,0.06)"
          e.currentTarget.style.transform = "translateY(-4px)"
        }}
        onMouseLeave={e => {
          e.currentTarget.style.border = "1px solid rgba(99,102,241,0.12)"
          e.currentTarget.style.boxShadow = "none"
          e.currentTarget.style.transform = "translateY(0)"
        }}
      >
        {/* Image / gradient area */}
        <div className="relative h-44 overflow-hidden">
          {!project.image.startsWith("bg-gradient") ? (
            <>
              <Image src={project.image || "/placeholder.svg"} alt={project.title}
                width={500} height={300} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
              {/* Telescope scan overlay on image */}
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, rgba(5,8,22,0.15) 0%, rgba(5,8,22,0.7) 100%)" }} />
              {/* Crosshair on image */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <div style={{ width: 28, height: 28, position: "relative" }}>
                  <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "rgba(129,140,248,0.6)" }} />
                  <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "rgba(129,140,248,0.6)" }} />
                  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 6, height: 6, borderRadius: "50%", border: "1px solid rgba(129,140,248,0.8)" }} />
                </div>
              </div>
            </>
          ) : (
            <div className={`w-full h-full ${project.image} flex items-center justify-center`}>
              <div className="flex flex-wrap gap-2 justify-center p-4">
                {project.tech.slice(0, 3).map(t => (
                  <span key={t} className="text-xs px-2 py-1 rounded-full"
                    style={{ background: "rgba(99,102,241,0.4)", color: "#c4b5fd" }}>{t}</span>
                ))}
              </div>
            </div>
          )}

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full"
              style={{ background: "rgba(245,158,11,0.2)", border: "1px solid rgba(245,158,11,0.35)", color: "#fbbf24", fontFamily: "'DM Mono', monospace" }}>
              <Star className="w-2.5 h-2.5" /> DESTAQUE
            </div>
          )}

          {/* Tech tags on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-wrap gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.tech.slice(0, 3).map(t => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded-full"
                style={{ background: "rgba(99,102,241,0.5)", color: "#c4b5fd", fontFamily: "'DM Mono', monospace" }}>{t}</span>
            ))}
            {project.tech.length > 3 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full"
                style={{ background: "rgba(139,92,246,0.4)", color: "#ddd6fe", fontFamily: "'DM Mono', monospace" }}>
                +{project.tech.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Coord-style index */}
          <div className="text-[9px] mb-1.5 tracking-widest" style={{ color: "rgba(99,102,241,0.45)", fontFamily: "'DM Mono', monospace" }}>
            OBJ-{String(index + 1).padStart(3, "0")}
          </div>
          <h3 className="font-bold text-white mb-1.5 leading-tight group-hover:text-indigo-300 transition-colors"
            style={{ fontSize: "clamp(13px,1.6vw,15px)", fontFamily: "'Syne', sans-serif" }}>
            {project.title}
          </h3>
          <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: "rgba(148,163,184,0.65)" }}>
            {project.description}
          </p>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {project.demoUrl && project.demoUrl !== "#" && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                  className="text-[11px] text-white flex items-center gap-1 px-2.5 py-1 rounded-full transition-all duration-200"
                  style={{ background: "rgba(99,102,241,0.55)", fontFamily: "'DM Mono', monospace" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(99,102,241,0.9)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(99,102,241,0.55)")}
                  onClick={e => e.stopPropagation()}>
                  <ExternalLink className="w-3 h-3" /> Demo
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="text-[11px] text-white flex items-center gap-1 px-2.5 py-1 rounded-full transition-all duration-200"
                  style={{ background: "rgba(139,92,246,0.35)", border: "1px solid rgba(139,92,246,0.3)", fontFamily: "'DM Mono', monospace" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(139,92,246,0.7)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(139,92,246,0.35)")}
                  onClick={e => e.stopPropagation()}>
                  <Github className="w-3 h-3" /> Código
                </a>
              )}
            </div>
            <Target className="w-3.5 h-3.5 text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
        </div>

        {/* Bottom scan line accent */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.6), transparent)" }} />
      </div>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all")
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    const fn = () => setShowScrollTop(window.scrollY > 400)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const filteredProjects = projectsData.filter(p =>
    (activeCategory === "all" || p.category.includes(activeCategory)) &&
    (p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())))
  )

  const categories: { id: ProjectCategory; label: string; icon: React.ReactNode }[] = [
    { id: "all",     label: "Todos",   icon: <Layers className="w-3.5 h-3.5" /> },
    { id: "web",     label: "Web",     icon: <Globe  className="w-3.5 h-3.5" /> },
    { id: "mobile",  label: "Mobile",  icon: <Star   className="w-3.5 h-3.5" /> },
    { id: "backend", label: "Backend", icon: <Code   className="w-3.5 h-3.5" /> },
    { id: "design",  label: "Design",  icon: <Layers className="w-3.5 h-3.5" /> },
  ]

  return (
    <div className="min-h-screen text-white relative" style={{ background: "#020410" }}>

      {/* ── Fixed layers ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <StarField />
      </div>

      {/* Telescope illustration — fixed bottom-right corner */}
      <div className="fixed pointer-events-none z-0"
        style={{ bottom: "-40px", right: "-60px", width: "clamp(380px,45vw,580px)", opacity: 0.18 }}>
        <svg width="100%" viewBox="0 0 680 520" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="tLensGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1a2060" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#050816" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="tLensRef" cx="35%" cy="30%" r="45%">
              <stop offset="0%" stopColor="#5563ff" stopOpacity="0.35"/>
              <stop offset="100%" stopColor="#0d1440" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="tEyepiece" cx="45%" cy="35%" r="55%">
              <stop offset="0%" stopColor="#8899ff" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#2030a0" stopOpacity="0.1"/>
            </radialGradient>
            <linearGradient id="tTube" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2233aa"/>
              <stop offset="40%" stopColor="#0d1850"/>
              <stop offset="100%" stopColor="#060c28"/>
            </linearGradient>
            <linearGradient id="tShine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6677ee" stopOpacity="0.35"/>
              <stop offset="15%" stopColor="#aabbff" stopOpacity="0.15"/>
              <stop offset="50%" stopColor="#1a2255" stopOpacity="0"/>
              <stop offset="100%" stopColor="#000410" stopOpacity="0.5"/>
            </linearGradient>
            <linearGradient id="tMount" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3040a0"/>
              <stop offset="100%" stopColor="#0d1438"/>
            </linearGradient>
            <linearGradient id="tTripod" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4455cc"/>
              <stop offset="100%" stopColor="#1a2255"/>
            </linearGradient>
          </defs>
          <polygon points="290,430 310,430 350,510 320,510" fill="url(#tTripod)" opacity="0.9"/>
          <polygon points="370,430 390,430 420,510 390,510" fill="url(#tTripod)" opacity="0.9"/>
          <polygon points="325,430 345,430 335,510 315,510" fill="url(#tMount)" opacity="0.75"/>
          <rect x="275" y="420" width="130" height="22" rx="4" fill="url(#tMount)"/>
          <rect x="275" y="420" width="130" height="22" rx="4" fill="url(#tShine)" opacity="0.5"/>
          <ellipse cx="340" cy="420" rx="68" ry="18" fill="url(#tMount)"/>
          <rect x="252" y="370" width="32" height="70" rx="6" fill="url(#tMount)"/>
          <rect x="252" y="370" width="32" height="70" rx="6" fill="url(#tShine)" opacity="0.6"/>
          <rect x="396" y="370" width="32" height="70" rx="6" fill="url(#tMount)"/>
          <rect x="396" y="370" width="32" height="70" rx="6" fill="url(#tShine)" opacity="0.6"/>
          <circle cx="268" cy="378" r="9" fill="#1a2255" stroke="#5566dd" strokeWidth="1.5"/>
          <circle cx="268" cy="378" r="5" fill="#2a3580"/>
          <circle cx="412" cy="378" r="9" fill="#1a2255" stroke="#5566dd" strokeWidth="1.5"/>
          <circle cx="412" cy="378" r="5" fill="#2a3580"/>
          <g transform="rotate(-34, 340, 370)">
            <rect x="130" y="340" width="422" height="62" rx="8" fill="url(#tTube)"/>
            <rect x="130" y="340" width="422" height="62" rx="8" fill="url(#tShine)"/>
            <rect x="135" y="342" width="412" height="8" rx="4" fill="#5566dd" opacity="0.2"/>
            <rect x="220" y="340" width="10" height="62" rx="2" fill="#2a3580" opacity="0.9"/>
            <rect x="340" y="340" width="10" height="62" rx="2" fill="#2a3580" opacity="0.9"/>
            <rect x="440" y="340" width="10" height="62" rx="2" fill="#2a3580" opacity="0.9"/>
            <rect x="430" y="330" width="40" height="82" rx="4" fill="#2a3580"/>
            <rect x="432" y="332" width="36" height="78" rx="3" fill="#1a2255"/>
            <rect x="470" y="355" width="24" height="12" rx="4" fill="#3040a0"/>
            <circle cx="482" cy="361" r="6" fill="#5566dd" opacity="0.8"/>
            <ellipse cx="130" cy="371" rx="10" ry="31" fill="#0a1235" stroke="#2a3580" strokeWidth="1"/>
            <rect x="542" y="348" width="14" height="45" rx="4" fill="#2a3580"/>
            <rect x="545" y="345" width="8" height="52" rx="3" fill="#1a2255"/>
            <polygon points="540,345 560,345 568,371 548,371" fill="#1a2050"/>
            <polygon points="540,345 560,345 568,371 548,371" fill="url(#tShine)" opacity="0.4"/>
            <ellipse cx="556" cy="370" rx="16" ry="7" fill="#2a3580" stroke="#5566dd" strokeWidth="1"/>
            <ellipse cx="556" cy="370" rx="11" ry="4" fill="url(#tEyepiece)"/>
            <rect x="240" y="325" width="110" height="18" rx="5" fill="#1a2050" opacity="0.9"/>
            <rect x="240" y="325" width="110" height="18" rx="5" fill="url(#tShine)" opacity="0.5"/>
            <ellipse cx="240" cy="334" rx="7" ry="9" fill="#0d1438" stroke="#2a3580" strokeWidth="1"/>
            <ellipse cx="350" cy="334" rx="5" ry="7" fill="#1a2255" stroke="#2a3580" strokeWidth="0.5"/>
          </g>
          <ellipse cx="174" cy="246" rx="58" ry="58" fill="#050a20" stroke="#2a3580" strokeWidth="2.5"/>
          <ellipse cx="174" cy="246" rx="52" ry="52" fill="url(#tLensGlow)"/>
          <ellipse cx="174" cy="246" rx="48" ry="48" fill="#050e38"/>
          <ellipse cx="174" cy="246" rx="48" ry="48" fill="url(#tLensRef)"/>
          <ellipse cx="158" cy="234" rx="26" ry="17" fill="#4455ee" opacity="0.1"/>
          <ellipse cx="190" cy="260" rx="16" ry="10" fill="#6677ff" opacity="0.07"/>
          <ellipse cx="174" cy="246" rx="48" ry="48" fill="none" stroke="#3344aa" strokeWidth="2.5"/>
          <ellipse cx="174" cy="246" rx="43" ry="43" fill="none" stroke="#1a2255" strokeWidth="1"/>
          <ellipse cx="174" cy="246" rx="36" ry="36" fill="none" stroke="#2030a0" strokeWidth="0.5" opacity="0.5"/>
          <circle cx="174" cy="246" r="8" fill="#0d1840" stroke="#4455cc" strokeWidth="0.8"/>
          <circle cx="174" cy="246" r="4" fill="#1a2860" opacity="0.8"/>
          <ellipse cx="174" cy="246" rx="57" ry="57" fill="none" stroke="#5566cc" strokeWidth="0.5" opacity="0.5"/>
        </svg>
      </div>

      {/* Deep space radial gradient — makes center brighter like a telescope focal point */}
      <div className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 65% 65% at 50% 42%, rgba(8,12,40,0) 0%, rgba(2,4,16,0.6) 60%, rgba(1,2,8,0.95) 100%)" }} />

      <TelescopeVignette />
      <ReticleHUD />

      <ProjectsPageHeader />

      <main className="relative z-10 pt-28 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            {/* Eyepiece label */}
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10" style={{ background: "linear-gradient(90deg,transparent,#6366f1)" }} />
              <span className="text-[10px] tracking-[0.25em] uppercase" style={{ color: "rgba(99,102,241,0.7)", fontFamily: "'DM Mono', monospace" }}>
                Observatório Digital
              </span>
              <div className="h-px flex-1" style={{ background: "linear-gradient(90deg,#6366f1,transparent)" }} />
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="font-black leading-none mb-1"
                  style={{
                    fontSize: "clamp(36px,6vw,64px)",
                    fontFamily: "'Syne', sans-serif",
                    background: "linear-gradient(135deg,#e0e7ff 0%,#a5b4fc 40%,#c084fc 70%,#67e8f9 100%)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                    letterSpacing: "-0.02em",
                  }}>
                  Projetos
                </h1>
                <p className="text-xs tracking-widest" style={{ color: "rgba(99,102,241,0.5)", fontFamily: "'DM Mono', monospace" }}>
                  {filteredProjects.length} OBJETOS CATALOGADOS
                </p>
              </div>

              {/* Search — styled as telescope coordinates input */}
              <div className="relative max-w-sm w-full">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-3.5 w-3.5" style={{ color: "rgba(99,102,241,0.5)" }} />
                </div>
                <input
                  type="text"
                  placeholder="Buscar objeto..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl text-white text-xs outline-none transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(99,102,241,0.2)",
                    fontFamily: "'DM Mono', monospace",
                    letterSpacing: "0.04em",
                  }}
                  onFocus={e => (e.currentTarget.style.border = "1px solid rgba(99,102,241,0.5)")}
                  onBlur={e => (e.currentTarget.style.border = "1px solid rgba(99,102,241,0.2)")}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </motion.div>

          {/* ── Category filters ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] transition-all duration-250"
                style={{
                  background: activeCategory === cat.id ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.03)",
                  border: activeCategory === cat.id ? "1px solid rgba(99,102,241,0.5)" : "1px solid rgba(255,255,255,0.07)",
                  color: activeCategory === cat.id ? "#a5b4fc" : "rgba(148,163,184,0.55)",
                  boxShadow: activeCategory === cat.id ? "0 0 14px rgba(99,102,241,0.2)" : "none",
                  fontFamily: "'DM Mono', monospace",
                  letterSpacing: "0.06em",
                }}
              >
                {cat.icon}
                {cat.label.toUpperCase()}
              </button>
            ))}

            {/* Live count badge */}
            <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px]"
              style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", color: "#6ee7b7", fontFamily: "'DM Mono', monospace" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
              {filteredProjects.length} VISÍVEIS
            </div>
          </motion.div>

          {/* ── Grid ── */}
          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              <motion.div
                key={activeCategory + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filteredProjects.map((project, i) => (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    index={i}
                    onClick={() => setSelectedProject(project)}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.2)" }}>
                    <Search className="w-8 h-8" style={{ color: "rgba(99,102,241,0.4)" }} />
                  </div>
                  <div className="absolute inset-0 rounded-full animate-ping"
                    style={{ border: "1px solid rgba(99,102,241,0.15)", animationDuration: "2s" }} />
                </div>
                <h3 className="text-xl font-bold mb-2"
                  style={{ color: "#a5b4fc", fontFamily: "'Syne', sans-serif" }}>
                  Objeto não encontrado
                </h3>
                <p className="text-sm max-w-sm mb-6" style={{ color: "rgba(148,163,184,0.55)", fontFamily: "'DM Mono', monospace", fontSize: 11 }}>
                  Nenhum projeto corresponde ao campo de busca. Tente reajustar os filtros.
                </p>
                <button
                  onClick={() => { setSearchQuery(""); setActiveCategory("all") }}
                  className="flex items-center gap-2 text-white px-5 py-2 rounded-full text-sm transition-all duration-200"
                  style={{
                    background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.4)",
                    fontFamily: "'DM Mono', monospace", fontSize: 11,
                  }}
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> LIMPAR FILTROS
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />

      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 z-50 text-white p-3 rounded-full transition-all duration-200"
            style={{
              background: "rgba(99,102,241,0.2)",
              border: "1px solid rgba(99,102,241,0.4)",
              boxShadow: "0 0 20px rgba(99,102,241,0.3)",
              backdropFilter: "blur(8px)",
            }}
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {selectedProject && (
        <ProjectModal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} project={selectedProject} />
      )}

      {/* Global style overrides */}
      <style>{`
        ::placeholder { color: rgba(99,102,241,0.3) !important; }
      `}</style>
    </div>
  )
}