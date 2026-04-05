"use client"

import { MapPin, Calendar, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"

const FORMATIONS = [
  {
    id: 0,
    emoji: "🎓",
    label: "Sistemas para Internet",
    title: "Tecnólogo em Sistemas para Internet",
    institution: "IFMA – Instituto Federal do Maranhão",
    period: "2023 – 2025",
    color: "#818cf8",
    colorRgb: "99,102,241",
    glow: "rgba(99,102,241,0.55)",
    barFrom: "#6366f1",
    barTo: "#8b5cf6",
    tagBg: "rgba(99,102,241,0.12)",
    tagColor: "#a5b4fc",
    tagBorder: "rgba(99,102,241,0.25)",
    description:
      "Formação superior com imersão completa no ciclo de desenvolvimento de software — da arquitetura ao deploy. Cobriu desenvolvimento web e mobile, engenharia de software, modelagem UML, banco de dados e metodologias ágeis.",
    tags: ["React", "Node.js", "React Native", "TypeScript", "SQL", "UML", "Scrum"],
    highlights: [
      "Desenvolvimento full stack com React e Node.js",
      "Arquitetura e modelagem de sistemas com UML",
      "Projetos reais em equipes multidisciplinares",
    ],
  },
  {
    id: 1,
    emoji: "⚡",
    label: "Eletroeletrônica",
    title: "Técnico em Eletroeletrônica",
    institution: "IFMA – Instituto Federal do Maranhão",
    period: "2020 – 2022",
    color: "#f59e0b",
    colorRgb: "245,158,11",
    glow: "rgba(245,158,11,0.55)",
    barFrom: "#f59e0b",
    barTo: "#d97706",
    tagBg: "rgba(245,158,11,0.1)",
    tagColor: "#fbbf24",
    tagBorder: "rgba(245,158,11,0.25)",
    description:
      "Formação técnica em eletrônica analógica e digital, automação industrial e sistemas embarcados. TCC: sistema IoT de monitoramento hídrico em tempo real com ESP32, medindo pH, turbidez, temperatura e condutividade.",
    tags: ["ESP32", "Arduino", "IoT", "Automação", "Circuitos", "Sensores"],
    highlights: [
      "TCC: Sistema IoT de monitoramento de qualidade da água",
      "Automações elétricas residenciais e industriais",
      "Programação de microcontroladores ESP32 e Arduino",
    ],
  },
]

// ─── StarField ────────────────────────────────────────────────────────────────
function StarField() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext("2d"); if (!ctx) return
    let id: number
    const stars: { x: number; y: number; r: number; o: number; sp: number }[] = []
    const resize = () => {
      c.width = c.offsetWidth; c.height = c.offsetHeight
      stars.length = 0
      for (let i = 0; i < 130; i++)
        stars.push({ x: Math.random()*c.width, y: Math.random()*c.height,
          r: Math.random()*1.2+0.2, o: Math.random(), sp: Math.random()*0.004+0.001 })
    }
    resize(); window.addEventListener("resize", resize)
    let t = 0
    const draw = () => {
      ctx.clearRect(0,0,c.width,c.height); t++
      stars.forEach(s => {
        const op = 0.15 + 0.55*Math.abs(Math.sin(t*s.sp+s.o*10))
        ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2)
        ctx.fillStyle = `rgba(180,190,255,${op})`; ctx.fill()
      })
      id = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize",resize) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />
}

// ─── Comet with tail nodes ────────────────────────────────────────────────────
function CometWithTail({
  active,
  onSelect,
  containerWidth,
}: {
  active: number | null
  onSelect: (id: number) => void
  containerWidth: number
}) {
  const haloRef = useRef<HTMLDivElement>(null)

  // Pulse the head halo
  useEffect(() => {
    let t = 0; let id: number
    const tick = () => {
      t += 0.025
      if (haloRef.current) {
        haloRef.current.style.opacity = String(0.35 + 0.25*Math.sin(t))
        haloRef.current.style.transform = `scale(${1 + 0.07*Math.sin(t)})`
      }
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [])

  // Tail stretches most of the container width
  const HEAD_SIZE = 58
  const TAIL_W = Math.max(180, containerWidth - HEAD_SIZE - 40)

  // Each formation node sits at a % along the tail
  const NODE_POSITIONS = [0.72, 0.38] // first node closer to head, second further

  return (
    <div className="relative flex items-center select-none" style={{ height: 80 }}>

      {/* ── Tail ─────────────────────────────────────────────── */}
      <div style={{ position: "relative", width: TAIL_W, height: 80, flexShrink: 0 }}>

        {/* Glow blur */}
        <div style={{
          position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
          width: "100%", height: 18,
          background: "linear-gradient(90deg, transparent 0%, rgba(192,132,252,0.15) 40%, rgba(129,140,248,0.35) 100%)",
          borderRadius: 9999, filter: "blur(9px)",
        }} />

        {/* Main tail line */}
        <div style={{
          position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
          width: "100%", height: 2,
          background: "linear-gradient(90deg, transparent 0%, rgba(129,140,248,0.4) 30%, rgba(192,132,252,0.9) 100%)",
          borderRadius: 9999,
        }} />

        {/* Sparkle particles along tail */}
        {[0.12, 0.28, 0.50, 0.82].map((p, i) => (
          <div key={i} style={{
            position: "absolute", left: `${p*100}%`, top: "50%", transform: "translateY(-50%)",
            width: i === 3 ? 3.5 : 2, height: i === 3 ? 3.5 : 2,
            borderRadius: "50%",
            background: i < 2 ? "rgba(167,139,250,0.5)" : "rgba(192,132,252,0.75)",
            boxShadow: `0 0 5px rgba(192,132,252,0.6)`,
          }} />
        ))}

        {/* ── Formation nodes ── */}
        {FORMATIONS.map((f, idx) => {
          const posX = NODE_POSITIONS[idx] * TAIL_W
          const isActive = active === f.id
          return (
            <div
              key={f.id}
              style={{
                position: "absolute",
                left: posX,
                top: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 5,
              }}
            >
              {/* Node glow halo */}
              <div style={{
                position: "absolute", inset: -10, borderRadius: "50%",
                background: `radial-gradient(circle, ${f.glow} 0%, transparent 70%)`,
                opacity: isActive ? 0.8 : 0.3,
                transition: "opacity 0.3s",
                pointerEvents: "none",
              }} />

              {/* Clickable node */}
              <button
                onClick={() => onSelect(f.id)}
                style={{
                  width: 38, height: 38, borderRadius: "50%",
                  background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.18), rgba(${f.colorRgb},0.2))`,
                  border: `2px solid ${isActive ? f.color : f.color+"66"}`,
                  boxShadow: isActive
                    ? `0 0 18px ${f.glow}, 0 0 36px ${f.glow}`
                    : `0 0 8px ${f.glow}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, cursor: "pointer",
                  transition: "all 0.25s",
                  position: "relative", zIndex: 6,
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.18)" }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)" }}
              >
                {f.emoji}
              </button>

              {/* Label below node */}
              <div style={{
                position: "absolute",
                top: "calc(100% + 7px)",
                left: "50%", transform: "translateX(-50%)",
                whiteSpace: "nowrap", textAlign: "center",
              }}>
                <div style={{
                  fontSize: 10, color: isActive ? f.color : `rgba(${f.colorRgb},0.55)`,
                  fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em",
                  textShadow: isActive ? `0 0 10px ${f.glow}` : "none",
                  transition: "color 0.3s",
                }}>{f.label}</div>
                <div style={{
                  fontSize: 9, color: `rgba(${f.colorRgb},0.35)`,
                  fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em", marginTop: 1,
                }}>{f.period}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Head ─────────────────────────────────────────────── */}
      <div style={{ position: "relative", flexShrink: 0, zIndex: 10 }}>
        {/* Outer halo */}
        <div ref={haloRef} style={{
          position: "absolute", inset: -12, borderRadius: "50%",
          border: "1.5px solid rgba(192,132,252,0.35)",
          pointerEvents: "none",
        }} />
        {/* Nebula glow */}
        <div style={{
          position: "absolute", inset: -20, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        {/* Core */}
        <div style={{
          width: HEAD_SIZE, height: HEAD_SIZE, borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.25), rgba(139,92,246,0.3))",
          border: "2.5px solid rgba(192,132,252,0.9)",
          boxShadow: "0 0 28px rgba(139,92,246,0.7), 0 0 60px rgba(139,92,246,0.35), inset 0 0 18px rgba(192,132,252,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 28,
          position: "relative",
        }}>
          ☄️
          {/* Cross flare */}
          {[
            { deg: 0 }, { deg: 90 }, { deg: 180 }, { deg: 270 },
            { deg: 45 }, { deg: 135 }, { deg: 225 }, { deg: 315 },
          ].map(({ deg }, i) => (
            <div key={i} style={{
              position: "absolute", top: "50%", left: "50%",
              width: i < 4 ? 22 : 12, height: 1.5,
              background: `linear-gradient(90deg, rgba(192,132,252,${i < 4 ? 0.7 : 0.35}), transparent)`,
              transformOrigin: "left center",
              transform: `translateY(-50%) rotate(${deg}deg)`,
              pointerEvents: "none",
            }} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Detail Panel ──────────────────────────────────────────────────────────────
function DetailPanel({ formation, onClose }: { formation: typeof FORMATIONS[0]; onClose: () => void }) {
  return (
    <motion.div
      key={formation.id}
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
      className="relative rounded-2xl border overflow-hidden"
      style={{
        background: `rgba(${formation.colorRgb},0.05)`,
        borderColor: `rgba(${formation.colorRgb},0.28)`,
        boxShadow: `0 0 50px rgba(${formation.colorRgb},0.1)`,
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, ${formation.barFrom}, ${formation.barTo}, transparent)` }} />

      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center z-10 transition-all duration-200"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#64748b" }}
        onMouseEnter={e => { e.currentTarget.style.background = `rgba(${formation.colorRgb},0.15)`; e.currentTarget.style.color = formation.color }}
        onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#64748b" }}
      >
        <X className="w-3.5 h-3.5" />
      </button>

      <div className="px-6 py-6">
        <div className="flex items-center gap-4 mb-5 pr-8">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{
              background: `radial-gradient(circle, rgba(${formation.colorRgb},0.2), rgba(${formation.colorRgb},0.05))`,
              border: `1px solid rgba(${formation.colorRgb},0.3)`,
              boxShadow: `0 0 16px rgba(${formation.colorRgb},0.2)`,
            }}>
            {formation.emoji}
          </div>
          <div>
            <h3 className="font-bold text-white leading-tight"
              style={{ fontSize: "clamp(14px,1.8vw,17px)", fontFamily: "'Syne', sans-serif" }}>
              {formation.title}
            </h3>
            <div className="flex flex-wrap items-center gap-3 mt-1">
              <span className="flex items-center gap-1 text-[11px]"
                style={{ color: formation.color, fontFamily: "'DM Mono', monospace" }}>
                <MapPin className="w-3 h-3" /> {formation.institution}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-slate-500"
                style={{ fontFamily: "'DM Mono', monospace" }}>
                <Calendar className="w-3 h-3" /> {formation.period}
              </span>
            </div>
          </div>
        </div>

        <div className="h-px w-full mb-5"
          style={{ background: `linear-gradient(90deg, ${formation.barFrom}44, transparent)` }} />

        <p className="text-slate-400 leading-relaxed mb-5 font-light"
          style={{ fontSize: "clamp(12px,1.4vw,13.5px)" }}>
          {formation.description}
        </p>

        <div className="flex flex-col gap-2.5 mb-5">
          {formation.highlights.map((h, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              className="flex items-start gap-2.5 text-[12.5px] text-slate-300">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                style={{ background: formation.color, boxShadow: `0 0 6px ${formation.glow}` }} />
              {h}
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {formation.tags.map(tag => (
            <span key={tag} className="px-2.5 py-1 rounded-full text-[11px]"
              style={{ background: formation.tagBg, color: formation.tagColor,
                border: `1px solid ${formation.tagBorder}`, fontFamily: "'DM Mono', monospace" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function AcademicSection() {
  const [active, setActive] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [containerWidth, setContainerWidth] = useState(600)

  useEffect(() => {
    const update = () => {
      if (sectionRef.current) {
        const maxW = Math.min(sectionRef.current.offsetWidth - 64, 672)
        setContainerWidth(maxW)
      }
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const activeFormation = active !== null ? FORMATIONS[active] : null

  return (
    <section
      ref={sectionRef}
      id="formacao"
      className="py-[clamp(60px,10vw,100px)] px-4 sm:px-8 md:px-16 relative overflow-hidden"
      style={{ background: "#050816" }}
    >
      <StarField />

      {/* Borders */}
      <div className="absolute top-0 left-0 right-0 h-px z-10"
        style={{ background: "linear-gradient(90deg,transparent,rgba(139,92,246,0.4),transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px z-10"
        style={{ background: "linear-gradient(90deg,transparent,rgba(99,102,241,0.4),transparent)" }} />

      {/* Ambient blobs */}
      <div className="absolute pointer-events-none"
        style={{ width: 500, height: 500, top: "10%", right: "-15%",
          background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)", borderRadius: "50%" }} />
      <div className="absolute pointer-events-none"
        style={{ width: 400, height: 400, bottom: "10%", left: "-12%",
          background: "radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)", borderRadius: "50%" }} />

      <div className="max-w-2xl mx-auto relative z-10">

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
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-indigo-400"
              style={{ fontFamily: "'DM Mono', monospace" }}>
              Trajetória
            </span>
            <div className="h-px w-12" style={{ background: "linear-gradient(90deg,#8b5cf6,transparent)" }} />
          </div>

          <h2 className="font-black leading-tight pb-1"
            style={{
              fontSize: "clamp(32px,5.5vw,48px)",
              fontFamily: "'Syne', sans-serif",
              background: "linear-gradient(135deg,#818cf8,#c084fc,#67e8f9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
            Formação Acadêmica
          </h2>

          <div className="w-20 h-[3px] mx-auto mt-4 rounded-full"
            style={{ background: "linear-gradient(90deg,#6366f1,#8b5cf6)" }} />

          <p className="text-[11px] text-slate-600 tracking-wide mt-5"
            style={{ fontFamily: "'DM Mono', monospace" }}>
            ✦ Clique em um nó da cauda para ver os detalhes da formação
          </p>
        </motion.div>

        {/* Single comet */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-10"
          style={{ paddingBottom: 28 }} // space for labels below nodes
        >
          <CometWithTail
            active={active}
            onSelect={(id) => setActive(prev => prev === id ? null : id)}
            containerWidth={containerWidth}
          />
        </motion.div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          {activeFormation && (
            <DetailPanel
              key={activeFormation.id}
              formation={activeFormation}
              onClose={() => setActive(null)}
            />
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}