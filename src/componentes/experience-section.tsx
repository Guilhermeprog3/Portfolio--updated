"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Briefcase, Clock, MapPin, X, Zap, ChevronRight } from "lucide-react"

type Experience = {
  role: string
  company: string
  period: string
  location: string
  desc: string
  stack: string[]
  current?: boolean
  color: string
  size: number
}

const experiences: Experience[] = [
  {
    role: "Desenvolvedor Full Stack & Líder de Front-end",
    company: "Developer Community",
    period: "Mar. 2024 – Abr. 2025",
    location: "Remoto",
    desc: "Atuação no ciclo completo de desenvolvimento de software para produtos comerciais. Liderança técnica do front-end em diversos projetos, garantindo interfaces de alta performance e escalabilidade, além de arquitetar soluções robustas no back-end para sistemas de venda.",
    stack: ["TypeScript", "React", "Next.js", "NestJS", "PostgreSQL", "Prisma", "Git", "Linux"],
    color: "#ffd080",
    size: 8,
  },
  {
    role: "Desenvolvedor de Software",
    company: "ATI — Agência de Tecnologia",
    period: "Jun. – Ago. 2025",
    location: "Timon, MA · Híbrido",
    desc: "Desenvolvedor Full Stack no projeto SEI Timon, peça fundamental na transformação digital do município. Implementei módulos críticos para modernização de serviços públicos e transparência governamental, sendo indicado pelo IFMA pelo alto desempenho técnico.",
    stack: ["React", "Next.js", "TypeScript", "NestJS", "WordPress", "PostgreSQL", "Prisma"],
    color: "#80e8d0",
    size: 8,
  },
  {
    role: "Analista de Suporte Técnico & IA",
    company: "INFOG2",
    period: "Set. 2025 – Fev. 2026",
    location: "Teresina, PI · Híbrido",
    desc: "Especialista em suporte ao cliente em sistemas ERP, conduzindo treinamentos e consultoria de usabilidade. Inovei na infraestrutura de qualidade ao integrar projetos ao SonarQube para code-review automatizado e desenvolvi uma IA de triagem via n8n para otimização do atendimento.",
    stack: ["n8n", "SonarQube", "Vue.js", "FastAPI", "PostgreSQL", "ERP", "IA"],
    color: "#c4a8ff",
    size: 8,
  },
  {
    role: "Analista de Qualidade e Dados",
    company: "DPL Construções",
    period: "Fev. 2026 – Presente",
    location: "Teresina, PI · Presencial",
    desc: "Foco em Business Intelligence e automação de processos. Desenvolvo dashboards estratégicos e KPIs para suporte à decisão executiva, além de criar sistemas internos que automatizam fluxos de gestão, eliminando gargalos operacionais da empresa.",
    stack: ["Power BI", "DAX", "Power Query", "PostgreSQL", "Automação", "Processos"],
    current: true,
    color: "#a0c8ff",
    size: 10,
  },
]

// Alternating wave layout
const yOffsets = [-60, 60, -60, 60]

type NodeData = Experience & { x: number; y: number; hover: boolean }

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

// ─── StarField ────────────────────────────────────────────────────────────────
function StarField({ canvasRef }: { canvasRef: React.RefObject<HTMLCanvasElement | null> }) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    const stars: { x: number; y: number; r: number; o: number; speed: number }[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      stars.length = 0
      for (let i = 0; i < 110; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.1 + 0.15,
          o: Math.random(),
          speed: Math.random() * 0.004 + 0.001,
        })
      }
    }
    resize()
    window.addEventListener("resize", resize)

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t++
      stars.forEach((s) => {
        const opacity = 0.12 + 0.5 * Math.abs(Math.sin(t * s.speed + s.o * 10))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180,190,255,${opacity})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [canvasRef])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

export function ExperienceSection() {
  const starCanvasRef = useRef<HTMLCanvasElement>(null)
  const constellationRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const nodesRef = useRef<NodeData[]>([])
  const animRef = useRef<number>(0)
  const tRef = useRef(0)
  const selectedRef = useRef<number | null>(null)
  const [selected, setSelected] = useState<number | null>(null)

  const buildNodes = useCallback((W: number, H: number) => {
    const centerY = H / 2
    const padX = W * 0.12
    const step = (W - padX * 2) / (experiences.length - 1)
    nodesRef.current = experiences.map((e, i) => ({
      ...e,
      x: padX + i * step,
      y: centerY + yOffsets[i],
      hover: false,
    }))
  }, [])

  const draw = useCallback(() => {
    const canvas = constellationRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const W = canvas.width
    const H = canvas.height
    tRef.current += 0.008
    const t = tRef.current
    const sel = selectedRef.current
    const nodes = nodesRef.current

    ctx.clearRect(0, 0, W, H)

    // ── Connection lines between nodes ──
    for (let i = 0; i < nodes.length - 1; i++) {
      const a = nodes[i]
      const b = nodes[i + 1]
      const isActive = sel === null || sel === i || sel === i + 1
      const alpha = isActive ? 0.22 : 0.05

      // Dashed constellation line
      ctx.save()
      ctx.setLineDash([4, 8])
      ctx.lineDashOffset = -(t * 18)
      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.strokeStyle = isActive
        ? `rgba(140, 170, 255, ${alpha})`
        : `rgba(80, 100, 180, 0.04)`
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.restore()

      // Solid dim underline
      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.strokeStyle = `rgba(80, 100, 200, ${alpha * 0.5})`
      ctx.lineWidth = 0.5
      ctx.stroke()

      // Traveling energy dot
      if (isActive) {
        const prog = ((t * 0.15 + i * 0.3) % 1)
        const lx = a.x + (b.x - a.x) * prog
        const ly = a.y + (b.y - a.y) * prog

        // Glow around the dot
        const dotGrad = ctx.createRadialGradient(lx, ly, 0, lx, ly, 6)
        dotGrad.addColorStop(0, "rgba(180, 210, 255, 0.9)")
        dotGrad.addColorStop(1, "rgba(100, 140, 255, 0)")
        ctx.beginPath()
        ctx.arc(lx, ly, 6, 0, Math.PI * 2)
        ctx.fillStyle = dotGrad
        ctx.fill()

        ctx.beginPath()
        ctx.arc(lx, ly, 2, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(220, 235, 255, 0.95)"
        ctx.fill()
      }
    }

    // ── Nodes ──
    nodes.forEach((n, i) => {
      const pulse = Math.sin(t * 1.8 + i * 1.4) * 0.5 + 0.5
      const isSel = sel === i
      const isHov = n.hover
      const col = n.color

      // Outer nebula glow
      const nebulaR = n.size + 28 + pulse * 10
      const nebulaGrad = ctx.createRadialGradient(n.x, n.y, n.size, n.x, n.y, nebulaR)
      nebulaGrad.addColorStop(0, hexToRgba(col, isSel ? 0.28 : isHov ? 0.18 : 0.08))
      nebulaGrad.addColorStop(0.5, hexToRgba(col, isSel ? 0.10 : 0.03))
      nebulaGrad.addColorStop(1, hexToRgba(col, 0))
      ctx.beginPath()
      ctx.arc(n.x, n.y, nebulaR, 0, Math.PI * 2)
      ctx.fillStyle = nebulaGrad
      ctx.fill()

      // Outer ring (selected / hover)
      if (isSel || isHov) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.size + 7 + pulse * 3, 0, Math.PI * 2)
        ctx.strokeStyle = hexToRgba(col, isSel ? 0.55 : 0.28)
        ctx.lineWidth = isSel ? 1.5 : 1
        ctx.stroke()
      }

      // Current-job pulsing ring
      if (n.current) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.size + 12 + pulse * 6, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(80, 230, 160, ${0.2 + pulse * 0.3})`
        ctx.lineWidth = 1
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(n.x, n.y, n.size + 4 + pulse * 2, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(80, 230, 160, ${0.35 + pulse * 0.35})`
        ctx.lineWidth = 1.2
        ctx.stroke()
      }

      // Core star — multi-layer radial gradient
      const coreR = isSel ? n.size + 2 : n.size
      const coreGrad = ctx.createRadialGradient(
        n.x - coreR * 0.25, n.y - coreR * 0.25, coreR * 0.05,
        n.x, n.y, coreR
      )
      coreGrad.addColorStop(0, "#ffffff")
      coreGrad.addColorStop(0.35, hexToRgba(col, 1))
      coreGrad.addColorStop(0.75, hexToRgba(col, 0.85))
      coreGrad.addColorStop(1, hexToRgba(col, 0.6))
      ctx.beginPath()
      ctx.arc(n.x, n.y, coreR, 0, Math.PI * 2)
      ctx.fillStyle = coreGrad
      ctx.fill()

      // Star cross-flare (4-pointed)
      const flareLen = coreR * (isSel ? 2.8 : 1.8) + pulse * coreR * 0.5
      const flareAlpha = isSel ? 0.6 : isHov ? 0.4 : 0.2
      ;[[1, 0], [0, 1], [-1, 0], [0, -1]].forEach(([dx, dy]) => {
        const gf = ctx.createLinearGradient(
          n.x, n.y,
          n.x + dx * flareLen, n.y + dy * flareLen
        )
        gf.addColorStop(0, hexToRgba(col, flareAlpha))
        gf.addColorStop(1, hexToRgba(col, 0))
        ctx.beginPath()
        ctx.moveTo(n.x - dy * 1.5, n.y - dx * 1.5)
        ctx.lineTo(n.x + dx * flareLen, n.y + dy * flareLen)
        ctx.lineTo(n.x + dy * 1.5, n.y + dx * 1.5)
        ctx.closePath()
        ctx.fillStyle = gf
        ctx.fill()
      })

      // Number inside core
      ctx.font = `700 ${Math.round(n.size * 0.9)}px 'DM Mono', monospace`
      ctx.fillStyle = "rgba(0,0,0,0.7)"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(`${i + 1}`, n.x, n.y + 0.5)
      ctx.textBaseline = "alphabetic"

      // ── Label ──
      const above = yOffsets[i] < 0
      const labelY = above ? n.y - coreR - 18 : n.y + coreR + 22
      const subY = above ? labelY - 14 : labelY + 14

      // Company name
      ctx.font = `${isSel || isHov ? "600" : "400"} 11.5px 'Syne', sans-serif`
      ctx.fillStyle = isSel ? col : `rgba(200,215,255,${isHov ? 0.9 : 0.45})`
      ctx.textAlign = "center"
      ctx.fillText(n.company, n.x, labelY)

      // Period below company
      ctx.font = `400 9.5px 'DM Mono', monospace`
      ctx.fillStyle = isSel
        ? hexToRgba(col, 0.65)
        : `rgba(140,160,210,${isHov ? 0.65 : 0.28})`
      ctx.fillText(n.period, n.x, subY)

      // Tick line
      const tickA = above ? n.y - coreR - 3 : n.y + coreR + 3
      const tickB = above ? labelY + 2 : labelY - 12
      ctx.beginPath()
      ctx.moveTo(n.x, tickA)
      ctx.lineTo(n.x, tickB)
      ctx.strokeStyle = hexToRgba(col, isSel ? 0.35 : 0.1)
      ctx.lineWidth = 0.6
      ctx.setLineDash([2, 3])
      ctx.stroke()
      ctx.setLineDash([])
    })

    animRef.current = requestAnimationFrame(draw)
  }, [])

  const resize = useCallback(() => {
    const container = containerRef.current
    if (!container || !constellationRef.current) return
    const W = container.clientWidth
    const H = container.clientHeight
    constellationRef.current.width = W
    constellationRef.current.height = H
    buildNodes(W, H)
  }, [buildNodes])

  useEffect(() => {
    resize()
    draw()
    window.addEventListener("resize", resize)
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [resize, draw])

  const getHit = (mx: number, my: number) => {
    for (let i = 0; i < nodesRef.current.length; i++) {
      const n = nodesRef.current[i]
      if (Math.hypot(mx - n.x, my - n.y) < n.size + 22) return i
    }
    return -1
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = constellationRef.current!
    const rect = canvas.getBoundingClientRect()
    const sx = canvas.width / rect.width
    const sy = canvas.height / rect.height
    const hit = getHit((e.clientX - rect.left) * sx, (e.clientY - rect.top) * sy)
    nodesRef.current.forEach((n, i) => (n.hover = i === hit))
    canvas.style.cursor = hit >= 0 ? "pointer" : "default"
  }

  const handleClick = (e: React.MouseEvent) => {
    const canvas = constellationRef.current!
    const rect = canvas.getBoundingClientRect()
    const sx = canvas.width / rect.width
    const sy = canvas.height / rect.height
    const hit = getHit((e.clientX - rect.left) * sx, (e.clientY - rect.top) * sy)
    if (hit >= 0 && hit === selectedRef.current) { selectedRef.current = null; setSelected(null) }
    else if (hit >= 0) { selectedRef.current = hit; setSelected(hit) }
    else { selectedRef.current = null; setSelected(null) }
  }

  const handleTouch = (e: React.TouchEvent) => {
    e.preventDefault()
    const touch = e.changedTouches[0]
    const canvas = constellationRef.current!
    const rect = canvas.getBoundingClientRect()
    const sx = canvas.width / rect.width
    const sy = canvas.height / rect.height
    const hit = getHit((touch.clientX - rect.left) * sx, (touch.clientY - rect.top) * sy)
    if (hit >= 0 && hit === selectedRef.current) { selectedRef.current = null; setSelected(null) }
    else if (hit >= 0) { selectedRef.current = hit; setSelected(hit) }
    else { selectedRef.current = null; setSelected(null) }
  }

  const closePanel = () => { selectedRef.current = null; setSelected(null) }
  const exp = selected !== null ? experiences[selected] : null

  const navigate = (dir: number) => {
    const next = (selected ?? 0) + dir
    if (next >= 0 && next < experiences.length) {
      selectedRef.current = next
      setSelected(next)
    }
  }

  return (
    <section
      id="experiencia"
      className="py-[clamp(60px,10vw,100px)] px-4 sm:px-8 md:px-16 relative overflow-hidden"
      style={{ background: "#050816" }}
    >
      {/* StarField */}
      <StarField canvasRef={starCanvasRef} />

      {/* Border lines */}
      <div className="absolute top-0 left-0 right-0 h-px z-10"
        style={{ background: "linear-gradient(90deg,transparent,rgba(139,92,246,0.4),transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px z-10"
        style={{ background: "linear-gradient(90deg,transparent,rgba(99,102,241,0.4),transparent)" }} />

      {/* Ambient glows */}
      <div className="absolute pointer-events-none"
        style={{ width: 500, height: 500, top: "10%", right: "-15%",
          background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)", borderRadius: "50%" }} />
      <div className="absolute pointer-events-none"
        style={{ width: 400, height: 400, bottom: "5%", left: "-12%",
          background: "radial-gradient(circle, rgba(192,132,252,0.05) 0%, transparent 70%)", borderRadius: "50%" }} />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-[clamp(32px,6vw,52px)]"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: "linear-gradient(90deg,transparent,#6366f1)" }} />
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-indigo-400 flex items-center gap-2"
              style={{ fontFamily: "'DM Mono', monospace" }}>
              <Briefcase className="w-3.5 h-3.5" /> Trajetória
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
            Experiência Profissional
          </h2>
          <div className="w-20 h-[3px] mx-auto mt-4 rounded-full"
            style={{ background: "linear-gradient(90deg,#6366f1,#8b5cf6)" }} />
          <p className="mt-4 text-[11px] tracking-widest text-slate-600"
            style={{ fontFamily: "'DM Mono', monospace" }}>
            ✦ Clique em cada estrela para explorar
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {/* Constellation canvas */}
          <div
            ref={containerRef}
            className="relative rounded-2xl overflow-hidden"
            style={{
              width: "100%",
              height: 260,
            }}
          >
            <canvas
              ref={constellationRef}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
              onMouseMove={handleMouseMove}
              onClick={handleClick}
              onTouchEnd={handleTouch}
            />
          </div>

          {/* Detail card */}
          <AnimatePresence mode="wait">
            {exp && (
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="mt-4 rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(5, 8, 22, 0.7)",
                  backdropFilter: "blur(28px)",
                  border: `1px solid ${hexToRgba(exp.color, 0.22)}`,
                  boxShadow: `0 0 40px ${hexToRgba(exp.color, 0.08)}`,
                }}
              >
                {/* Accent bar */}
                <div style={{
                  height: 2,
                  background: `linear-gradient(90deg, ${exp.color}cc, ${exp.color}33, transparent)`,
                }} />

                <div className="p-5 md:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-0">
                      {/* Number badge */}
                      <div
                        className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{
                          background: hexToRgba(exp.color, 0.1),
                          border: `1px solid ${hexToRgba(exp.color, 0.3)}`,
                          color: exp.color,
                          fontFamily: "'DM Mono', monospace",
                        }}
                      >
                        {(selected ?? 0) + 1}
                      </div>

                      <div className="min-w-0">
                        {exp.current && (
                          <div className="inline-flex items-center gap-1.5 text-[10px] px-2.5 py-0.5 rounded-full mb-2"
                            style={{ background: "rgba(50,200,120,0.08)", color: "#50d890", border: "0.5px solid rgba(50,200,120,0.25)" }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                            <Zap className="w-2.5 h-2.5" /> Emprego atual
                          </div>
                        )}
                        <h3
                          className="font-bold leading-snug"
                          style={{ color: exp.color, fontSize: "clamp(14px,1.8vw,17px)", fontFamily: "'Syne', sans-serif" }}
                        >
                          {exp.role}
                        </h3>
                        <p className="text-sm mt-0.5" style={{ color: "rgba(160,180,220,0.65)", fontFamily: "'DM Mono', monospace", fontSize: 11 }}>
                          {exp.company}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={closePanel}
                      className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200"
                      style={{ background: "rgba(255,255,255,0.04)", color: "#475569", border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#94a3b8" }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#475569" }}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 mt-3 mb-3">
                    <span className="flex items-center gap-1.5 text-[11px]" style={{ color: "rgba(120,140,190,0.6)", fontFamily: "'DM Mono', monospace" }}>
                      <Clock className="w-3 h-3" /> {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px]" style={{ color: "rgba(120,140,190,0.6)", fontFamily: "'DM Mono', monospace" }}>
                      <MapPin className="w-3 h-3" /> {exp.location}
                    </span>
                  </div>

                  <div style={{ height: "0.5px", background: `linear-gradient(90deg, ${hexToRgba(exp.color, 0.22)}, transparent)`, marginBottom: 14 }} />

                  <p className="leading-relaxed mb-4" style={{ color: "rgba(160,175,215,0.72)", fontSize: "clamp(12px,1.4vw,13.5px)" }}>
                    {exp.desc}
                  </p>

                  {/* Stack tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {exp.stack.map(s => (
                      <span
                        key={s}
                        className="text-[11px] px-2.5 py-1 rounded-full"
                        style={{
                          background: hexToRgba(exp.color, 0.07),
                          color: hexToRgba(exp.color, 0.85),
                          border: `0.5px solid ${hexToRgba(exp.color, 0.2)}`,
                          fontFamily: "'DM Mono', monospace",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center pt-4"
                    style={{ borderTop: "0.5px solid rgba(255,255,255,0.05)" }}>
                    <button
                      onClick={() => navigate(-1)}
                      disabled={(selected ?? 0) === 0}
                      className="flex items-center gap-1 text-[11px] transition-opacity disabled:opacity-20 disabled:cursor-not-allowed"
                      style={{ color: "rgba(160,180,220,0.5)", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Mono', monospace" }}
                    >
                      <ChevronRight className="w-3.5 h-3.5 rotate-180" /> anterior
                    </button>

                    <div className="flex gap-2 items-center">
                      {experiences.map((e, i) => (
                        <button
                          key={i}
                          onClick={() => { selectedRef.current = i; setSelected(i) }}
                          style={{
                            width: i === selected ? 20 : 6,
                            height: 6,
                            borderRadius: 999,
                            background: i === selected ? e.color : "rgba(255,255,255,0.12)",
                            border: "none",
                            cursor: "pointer",
                            transition: "all 0.25s ease",
                            boxShadow: i === selected ? `0 0 8px ${e.color}88` : "none",
                          }}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => navigate(1)}
                      disabled={(selected ?? 0) === experiences.length - 1}
                      className="flex items-center gap-1 text-[11px] transition-opacity disabled:opacity-20 disabled:cursor-not-allowed"
                      style={{ color: "rgba(160,180,220,0.5)", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Mono', monospace" }}
                    >
                      próxima <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}