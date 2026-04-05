"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Server,
  Globe,
  Smartphone,
  Wrench,
  Paintbrush,
  CodepenIcon as ReactIcon,
  FileCode,
  Wind,
  Database,
  Figma,
  Monitor,
  Cloud,
  Github,
  Terminal,
  SmartphoneIcon as AndroidIcon,
  Code,
  Coffee,
  HardDrive,
  Box,
  SmartphoneIcon as MobileIcon,
  PenTool,
  Layers,
  Sparkles,
  X,
} from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

type Tech = { name: string; icon: React.ReactNode }

type GalaxyDef = {
  id: string
  label: string
  navIcon: React.ReactNode
  // galaxy visual identity
  coreColor: string        // center star color
  coreRgb: string
  armColor: string         // arm star color
  armRgb: string
  nebulaColor: string      // nebula rgba
  description: string
  techs: Tech[]
  // canvas position (% of canvas)
  cx: number
  cy: number
  radius: number
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const GALAXIES: GalaxyDef[] = [
  {
    id: "backend",
    label: "Backend",
    navIcon: <Server className="w-4 h-4" />,
    coreColor: "#c084fc",
    coreRgb: "192,132,252",
    armColor: "#818cf8",
    armRgb: "129,140,248",
    nebulaColor: "rgba(139,92,246,0.18)",
    description: "APIs, servidores e banco de dados",
    techs: [
      { name: "AdonisJS",   icon: <Server   className="w-5 h-5 text-yellow-400" /> },
      { name: "NestJS",     icon: <Server   className="w-5 h-5 text-red-400"    /> },
      { name: "Node.js",    icon: <Server   className="w-5 h-5 text-green-400"  /> },
      { name: "PostgreSQL", icon: <Database className="w-5 h-5 text-blue-400"   /> },
      { name: "Express",    icon: <Server   className="w-5 h-5 text-gray-300"   /> },
      { name: "Supabase",   icon: <Database className="w-5 h-5 text-green-300"  /> },
    ],
    cx: 20, cy: 35, radius: 14,
  },
  {
    id: "web",
    label: "Web",
    navIcon: <Globe className="w-4 h-4" />,
    coreColor: "#38bdf8",
    coreRgb: "56,189,248",
    armColor: "#67e8f9",
    armRgb: "103,232,249",
    nebulaColor: "rgba(14,165,233,0.15)",
    description: "Frameworks e bibliotecas web frontend",
    techs: [
      { name: "React",       icon: <ReactIcon className="w-5 h-5 text-cyan-400"  /> },
      { name: "Tailwind",    icon: <Wind      className="w-5 h-5 text-teal-400"  /> },
      { name: "Next.js",     icon: <FileCode  className="w-5 h-5 text-gray-200"  /> },
      { name: "shadcn/ui",   icon: <Box       className="w-5 h-5 text-blue-300"  /> },
    ],
    cx: 65, cy: 22, radius: 13,
  },
  {
    id: "mobile",
    label: "Mobile",
    navIcon: <Smartphone className="w-4 h-4" />,
    coreColor: "#4ade80",
    coreRgb: "74,222,128",
    armColor: "#86efac",
    armRgb: "134,239,172",
    nebulaColor: "rgba(34,197,94,0.14)",
    description: "Aplicativos iOS e Android nativos",
    techs: [
      { name: "React Native", icon: <ReactIcon  className="w-5 h-5 text-cyan-400"   /> },
      { name: "Expo",         icon: <MobileIcon className="w-5 h-5 text-gray-200"   /> },
      { name: "NativeBase",   icon: <MobileIcon className="w-5 h-5 text-purple-300" /> },
    ],
    cx: 82, cy: 60, radius: 11,
  },
  {
    id: "design",
    label: "Design",
    navIcon: <Paintbrush className="w-4 h-4" />,
    coreColor: "#f472b6",
    coreRgb: "244,114,182",
    armColor: "#f9a8d4",
    armRgb: "249,168,212",
    nebulaColor: "rgba(236,72,153,0.15)",
    description: "UI/UX, prototipagem e design de sistemas",
    techs: [
      { name: "Figma",       icon: <Figma    className="w-5 h-5 text-purple-300" /> },
      { name: "UI/UX Design",icon: <Monitor  className="w-5 h-5 text-indigo-300" /> },
      { name: "Miro",        icon: <PenTool  className="w-5 h-5 text-orange-300" /> },
    ],
    cx: 38, cy: 72, radius: 11,
  },
  {
    id: "tools",
    label: "Tools",
    navIcon: <Wrench className="w-4 h-4" />,
    coreColor: "#fb923c",
    coreRgb: "251,146,60",
    armColor: "#fed7aa",
    armRgb: "254,215,170",
    nebulaColor: "rgba(249,115,22,0.14)",
    description: "Ferramentas de produtividade e DevOps",
    techs: [
      { name: "Android Studio", icon: <AndroidIcon className="w-5 h-5 text-green-400" /> },
      { name: "VS Code",        icon: <Code        className="w-5 h-5 text-blue-400"  /> },
      { name: "Docker",         icon: <Cloud       className="w-5 h-5 text-sky-400"   /> },
      { name: "Insomnia",       icon: <Coffee      className="w-5 h-5 text-purple-300"/> },
      { name: "GitHub",         icon: <Github      className="w-5 h-5 text-gray-200"  /> },
      { name: "Notion",         icon: <HardDrive   className="w-5 h-5 text-gray-300"  /> },
      { name: "Trello",         icon: <Terminal    className="w-5 h-5 text-blue-400"  /> },
    ],
    cx: 52, cy: 50, radius: 13,
  },
]

// ─── StarField canvas ─────────────────────────────────────────────────────────

function StarField() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext("2d"); if (!ctx) return
    let id: number
    const s: { x:number;y:number;r:number;o:number;sp:number }[] = []
    const resize = () => {
      c.width = c.offsetWidth; c.height = c.offsetHeight
      s.length = 0
      for (let i = 0; i < 160; i++) s.push({
        x: Math.random()*c.width, y: Math.random()*c.height,
        r: Math.random()*1.1+0.15, o: Math.random(), sp: Math.random()*0.004+0.001,
      })
    }
    resize(); window.addEventListener("resize", resize)
    let t = 0
    const draw = () => {
      ctx.clearRect(0,0,c.width,c.height); t++
      s.forEach(p => {
        const op = 0.1 + 0.5*Math.abs(Math.sin(t*p.sp+p.o*10))
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
        ctx.fillStyle = `rgba(180,190,255,${op})`; ctx.fill()
      })
      id = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize",resize) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />
}

// ─── Galaxy canvas (each galaxy rendered individually) ────────────────────────

type GalaxyCanvasProps = {
  g: GalaxyDef
  active: boolean
  canvasW: number
  canvasH: number
  onClick: () => void
}

function GalaxyCanvas({ g, active, canvasW, canvasH, onClick }: GalaxyCanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  const tRef = useRef(0)
  const idRef = useRef<number>(0)

  // star positions relative to center (generated once)
  const starsRef = useRef<{ dx:number; dy:number; r:number; phase:number; arm:number }[]>([])
  useEffect(() => {
    const ARM_COUNT = 3
    const STARS_PER_ARM = 28
    const stars = []
    for (let a = 0; a < ARM_COUNT; a++) {
      for (let i = 0; i < STARS_PER_ARM; i++) {
        const t = (i / STARS_PER_ARM)
        const angle = (a / ARM_COUNT) * Math.PI * 2 + t * Math.PI * 3.5
        const dist = t * 0.85 + Math.random() * 0.12
        const spread = (Math.random() - 0.5) * 0.22
        stars.push({
          dx: Math.cos(angle + spread) * dist,
          dy: Math.sin(angle + spread) * dist,
          r: Math.random() * 1.3 + 0.3,
          phase: Math.random() * Math.PI * 2,
          arm: a,
        })
      }
    }
    // scattered halo
    for (let i = 0; i < 18; i++) {
      const ang = Math.random() * Math.PI * 2
      const d = 0.6 + Math.random() * 0.35
      stars.push({ dx: Math.cos(ang)*d, dy: Math.sin(ang)*d, r: Math.random()*0.8+0.2, phase: Math.random()*Math.PI*2, arm: -1 })
    }
    starsRef.current = stars
  }, [])

  const draw = useCallback(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext("2d"); if (!ctx) return
    const W = c.width, H = c.height
    const cx = W/2, cy = H/2
    const R = Math.min(W,H) * 0.42
    tRef.current += active ? 0.006 : 0.003
    const t = tRef.current

    ctx.clearRect(0,0,W,H)

    // Rotation
    const rot = t * (active ? 0.18 : 0.06)

    // Nebula glow
    const nebulaR = R * (active ? 1.35 : 1.1)
    const grad = ctx.createRadialGradient(cx,cy,0,cx,cy,nebulaR)
    grad.addColorStop(0, g.nebulaColor.replace("0.18", active ? "0.35" : "0.18").replace("0.15", active ? "0.3" : "0.15").replace("0.14", active ? "0.28" : "0.14"))
    grad.addColorStop(0.5, g.nebulaColor.replace("0.18","0.08").replace("0.15","0.06").replace("0.14","0.06"))
    grad.addColorStop(1, "transparent")
    ctx.beginPath(); ctx.arc(cx,cy,nebulaR,0,Math.PI*2)
    ctx.fillStyle = grad; ctx.fill()

    // Arm stars
    starsRef.current.forEach(s => {
      const ang = Math.atan2(s.dy, s.dx) + rot
      const dist = Math.sqrt(s.dx*s.dx + s.dy*s.dy)
      const sx = cx + Math.cos(ang)*dist*R
      const sy = cy + Math.sin(ang)*dist*R
      const pulse = 0.5 + 0.5*Math.sin(t*1.4 + s.phase)
      const isHalo = s.arm === -1
      const baseAlpha = isHalo ? 0.15 : (active ? 0.65 : 0.38)
      const alpha = baseAlpha * (0.6 + 0.4*pulse)
      const col = isHalo
        ? `rgba(${g.armRgb},${alpha * 0.5})`
        : `rgba(${s.arm === 0 ? g.coreRgb : g.armRgb},${alpha})`
      ctx.beginPath()
      ctx.arc(sx, sy, s.r * (active ? 1.1 : 0.85), 0, Math.PI*2)
      ctx.fillStyle = col; ctx.fill()
    })

    // Core glow layers
    const coreR = R * 0.18 * (active ? 1.4 : 1)
    ;[3,2,1].forEach((layer) => {
      const lr = coreR * layer * (1 + 0.05*Math.sin(t*2))
      const cg = ctx.createRadialGradient(cx,cy,0,cx,cy,lr)
      cg.addColorStop(0, `rgba(255,255,255,${layer===1 ? 0.9 : 0.0})`)
      cg.addColorStop(0.2, `rgba(${g.coreRgb},${layer===1 ? 0.8 : layer===2 ? 0.35 : 0.12})`)
      cg.addColorStop(1, `rgba(${g.coreRgb},0)`)
      ctx.beginPath(); ctx.arc(cx,cy,lr,0,Math.PI*2)
      ctx.fillStyle = cg; ctx.fill()
    })

    // Cross-flare on active
    if (active) {
      const fl = R * 0.32 * (1 + 0.06*Math.sin(t*3))
      ;[[1,0],[0,1],[-1,0],[0,-1]].forEach(([dx,dy]) => {
        const fg = ctx.createLinearGradient(cx,cy,cx+dx*fl,cy+dy*fl)
        fg.addColorStop(0, `rgba(${g.coreRgb},0.55)`)
        fg.addColorStop(1, `rgba(${g.coreRgb},0)`)
        ctx.beginPath()
        ctx.moveTo(cx-dy*2,cy-dx*2)
        ctx.lineTo(cx+dx*fl,cy+dy*fl)
        ctx.lineTo(cx+dy*2,cy+dx*2)
        ctx.closePath(); ctx.fillStyle = fg; ctx.fill()
      })
    }

    // Label
    const labelY = cy + R * 0.68 + 14
    ctx.font = `${active ? "600" : "400"} 11px 'DM Mono', monospace`
    ctx.textAlign = "center"
    ctx.fillStyle = active ? g.coreColor : `rgba(${g.armRgb},0.55)`
    ctx.fillText(g.label, cx, labelY)

    idRef.current = requestAnimationFrame(draw)
  }, [g, active])

  useEffect(() => {
    const c = ref.current; if (!c) return
    c.width = c.offsetWidth; c.height = c.offsetHeight
    idRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(idRef.current)
  }, [draw])

  return (
    <canvas
      ref={ref}
      onClick={onClick}
      className="cursor-pointer w-full h-full"
      style={{ display: "block" }}
    />
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────


export function TechStack() {
  const [active, setActive] = useState<string | null>(null)
  const activeGalaxy = GALAXIES.find(g => g.id === active) ?? null

  return (
    <section
      id="tecnologias"
      className="py-20 relative overflow-hidden"
      style={{ background: "#050816" }}
    >
      <StarField />

      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(139,92,246,0.4),transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(99,102,241,0.4),transparent)" }} />

      <div className="container mx-auto px-4 py-4 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: "linear-gradient(90deg,transparent,#6366f1)" }} />
            <span className="text-indigo-400 text-[11px] font-medium uppercase tracking-[0.2em] flex items-center gap-2"
              style={{ fontFamily: "'DM Mono', monospace" }}>
              <Layers className="w-3.5 h-3.5" /> Stack
            </span>
            <div className="h-px w-12" style={{ background: "linear-gradient(90deg,#8b5cf6,transparent)" }} />
          </div>
          <h2
            className="font-black leading-tight pb-1"
            style={{
              fontSize: "clamp(32px,5.5vw,48px)",
              fontFamily: "'Syne', sans-serif",
              background: "linear-gradient(135deg,#818cf8,#c084fc,#67e8f9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Tecnologias
          </h2>
          <div className="w-20 h-[3px] mx-auto mt-4 rounded-full"
            style={{ background: "linear-gradient(90deg,#6366f1,#8b5cf6)" }} />
          <p className="mt-4 text-[11px] tracking-widest"
            style={{ color: "rgba(100,116,139,0.8)", fontFamily: "'DM Mono', monospace" }}>
            ✦ Clique em uma galáxia para explorar as stacks
          </p>
        </motion.div>

        {/* Galaxies — all side by side at the same height */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex items-stretch justify-center mb-6 rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.01)",
            border: "1px solid rgba(255,255,255,0.04)",
            height: "clamp(160px, 20vw, 220px)",
          }}
        >
          {GALAXIES.map((g, idx) => (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
              viewport={{ once: true }}
              style={{ flex: "1 1 0", minWidth: 0, position: "relative" }}
            >
              <GalaxyCanvas
                g={g}
                active={active === g.id}
                canvasW={0}
                canvasH={0}
                onClick={() => setActive(prev => prev === g.id ? null : g.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Stack detail panel */}
        <AnimatePresence mode="wait">
          {activeGalaxy && (
            <motion.div
              key={activeGalaxy.id}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.4,0,0.2,1] }}
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: "rgba(5,8,22,0.7)",
                backdropFilter: "blur(20px)",
                border: `1px solid rgba(${activeGalaxy.coreRgb},0.2)`,
                boxShadow: `0 0 50px rgba(${activeGalaxy.coreRgb},0.08)`,
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: `linear-gradient(90deg,${activeGalaxy.coreColor},rgba(${activeGalaxy.coreRgb},0.2),transparent)` }} />

              <div className="p-5 md:p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{
                        background: `radial-gradient(circle, rgba(${activeGalaxy.coreRgb},0.25), rgba(${activeGalaxy.coreRgb},0.05))`,
                        border: `1px solid rgba(${activeGalaxy.coreRgb},0.35)`,
                        boxShadow: `0 0 14px rgba(${activeGalaxy.coreRgb},0.3)`,
                        color: activeGalaxy.coreColor,
                      }}
                    >
                      {activeGalaxy.navIcon}
                    </div>
                    <div>
                      <h3 className="font-bold text-white leading-tight"
                        style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(15px,2vw,18px)" }}>
                        {activeGalaxy.label}
                      </h3>
                      <p className="text-[11px] mt-0.5"
                        style={{ color: `rgba(${activeGalaxy.armRgb},0.65)`, fontFamily: "'DM Mono', monospace" }}>
                        {activeGalaxy.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActive(null)}
                    className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#475569" }}
                    onMouseEnter={e => { e.currentTarget.style.background = `rgba(${activeGalaxy.coreRgb},0.12)`; e.currentTarget.style.color = activeGalaxy.coreColor }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#475569" }}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="h-px w-full mb-5"
                  style={{ background: `linear-gradient(90deg,rgba(${activeGalaxy.coreRgb},0.3),transparent)` }} />

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {activeGalaxy.techs.map((tech, i) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.85, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.3 }}
                      className="group relative rounded-xl p-4 flex flex-col items-center gap-2.5 text-center cursor-default transition-all duration-200"
                      style={{
                        background: `rgba(${activeGalaxy.coreRgb},0.05)`,
                        border: `1px solid rgba(${activeGalaxy.coreRgb},0.12)`,
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLDivElement
                        el.style.background = `rgba(${activeGalaxy.coreRgb},0.12)`
                        el.style.borderColor = `rgba(${activeGalaxy.coreRgb},0.3)`
                        el.style.transform = "translateY(-3px)"
                        el.style.boxShadow = `0 8px 24px rgba(${activeGalaxy.coreRgb},0.15)`
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLDivElement
                        el.style.background = `rgba(${activeGalaxy.coreRgb},0.05)`
                        el.style.borderColor = `rgba(${activeGalaxy.coreRgb},0.12)`
                        el.style.transform = "translateY(0)"
                        el.style.boxShadow = "none"
                      }}
                    >
                      <div className="p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.04)" }}>
                        {tech.icon}
                      </div>
                      <span className="text-xs font-medium text-white leading-tight"
                        style={{ fontFamily: "'DM Mono', monospace" }}>
                        {tech.name}
                      </span>
                      <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Sparkles className="w-3 h-3" style={{ color: activeGalaxy.coreColor }} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}