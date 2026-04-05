"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import ProfileImage from "../../public/Perfil.jpeg"

function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let animId: number
    const stars: { x: number; y: number; r: number; o: number; speed: number }[] = []
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener("resize", resize)
    for (let i = 0; i < 130; i++) {
      stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.2, o: Math.random(), speed: Math.random() * 0.004 + 0.001 })
    }
    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t++
      stars.forEach((s) => {
        const opacity = 0.15 + 0.55 * Math.abs(Math.sin(t * s.speed + s.o * 10))
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180,190,255,${opacity})`; ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

const planets = [
  {
    emoji: "⚡",
    color: "#f59e0b",
    bgColor: "rgba(245,158,11,0.13)",
    borderActive: "rgba(245,158,11,0.25)",
    accentColor: "#fbbf24",
    tagBg: "rgba(245,158,11,0.1)",
    tagBorder: "rgba(245,158,11,0.2)",
    orbitPct: 0.48,
    duration: 10,
    dir: 1,
    startDeg: 50,
    title: "Técnico em Eletroeletrônica",
    sub: "Hardware & Automação Industrial",
    body: "Montagem e programação de sistemas de automação com ESP32 e Arduino, com experiência em instalações elétricas completas. TCC premiado: sistema embarcado de monitoramento hídrico em tempo real, medindo turbidez, pH, temperatura e condutividade via sensores integrados com dashboard IoT.",
    tags: ["ESP32", "Arduino", "Automação Elétrica", "IoT", "Sensores"],
    barFrom: "#f59e0b",
    barTo: "#d97706",
  },
  {
    emoji: "💻",
    color: "#818cf8",
    bgColor: "rgba(99,102,241,0.13)",
    borderActive: "rgba(99,102,241,0.25)",
    accentColor: "#a5b4fc",
    tagBg: "rgba(99,102,241,0.1)",
    tagBorder: "rgba(99,102,241,0.2)",
    orbitPct: 0.62,
    duration: 15,
    dir: -1,
    startDeg: 160,
    title: "Tecnólogo em Sistemas para Internet",
    sub: "Engenharia de Software & Arquitetura",
    body: "Formação completa no ciclo de vida de software — da concepção ao deploy. Domínio de backend, frontend, arquitetura de sistemas distribuídos e documentação técnica com UML (diagramas de classe, sequência e deploy). Experiência com metodologias ágeis e padrões de projeto.",
    tags: ["React", "Node.js", "React Native", "TypeScript", "UML", "Arquitetura de Software"],
    barFrom: "#6366f1",
    barTo: "#8b5cf6",
  },
  {
    emoji: "🚀",
    color: "#10b981",
    bgColor: "rgba(16,185,129,0.13)",
    borderActive: "rgba(16,185,129,0.25)",
    accentColor: "#6ee7b7",
    tagBg: "rgba(16,185,129,0.1)",
    tagBorder: "rgba(16,185,129,0.2)",
    orbitPct: 0.78,
    duration: 21,
    dir: 1,
    startDeg: 270,
    title: "Full Stack Developer & Analista de Dados",
    sub: "Dev Community · ATI · Infog2 · DPL",
    body: "Na Developer Community liderei squads e construí sistemas do zero em ambiente ágil. Na ATI atuei em sistemas de grande porte com times sênior, ganhando visão de arquitetura escalável. Na Infog2 gerenciei demandas e capacitei usuários em soluções SaaS. Na DPL desenvolvi dashboards executivos com Power BI para suporte à decisão estratégica.",
    tags: ["Liderança Técnica", "Sistemas Escaláveis", "Power BI", "Análise de Dados", "Gestão Ágil"],
    barFrom: "#10b981",
    barTo: "#059669",
  },
  {
    emoji: "📱",
    color: "#38bdf8",
    bgColor: "rgba(56,189,248,0.13)",
    borderActive: "rgba(56,189,248,0.25)",
    accentColor: "#7dd3fc",
    tagBg: "rgba(56,189,248,0.1)",
    tagBorder: "rgba(56,189,248,0.2)",
    orbitPct: 0.94,
    duration: 28,
    dir: -1,
    startDeg: 10,
    title: "Desenvolvedor Mobile & Web",
    sub: "Apps, Interfaces & APIs",
    body: "Desenvolvimento end-to-end de aplicações mobile com React Native e web com React, Next.js e Node.js. Entrego desde a arquitetura da API até a experiência do usuário final — com foco em performance, acessibilidade e código limpo pronto para produção.",
    tags: ["React Native", "Next.js", "React", "Node.js", "REST API", "UI/UX"],
    barFrom: "#38bdf8",
    barTo: "#0ea5e9",
  },
]

function useSolarSize() {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState(320)
  useEffect(() => {
    const update = () => {
      if (ref.current) setSize(ref.current.offsetWidth)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])
  return { ref, size }
}

function Planet({
  planet,
  size,
  active,
  onClick,
}: {
  planet: (typeof planets)[0]
  size: number
  active: boolean
  onClick: () => void
}) {
  const r = planet.orbitPct * (size / 2)
  const angleRef = useRef(planet.startDeg)
  const rafRef = useRef<number>(0)
  const rotatorRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)
  const lastTs = useRef<number | null>(null)

  useEffect(() => {
    const step = (ts: number) => {
      if (lastTs.current === null) lastTs.current = ts
      const dt = (ts - lastTs.current) / 1000
      lastTs.current = ts
      angleRef.current += planet.dir * (360 / planet.duration) * dt
      if (rotatorRef.current) {
        rotatorRef.current.style.transform = `rotate(${angleRef.current}deg)`
      }
      if (pillRef.current) {
        pillRef.current.style.transform = `translate(-50%, -50%) rotate(${-angleRef.current}deg)`
      }
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [planet.dir, planet.duration])

  return (
    <div
      className="absolute rounded-full pointer-events-none z-20"
      style={{
        width: r * 2,
        height: r * 2,
        top: "50%",
        left: "50%",
        marginLeft: -r,
        marginTop: -r,
      }}
    >
      <div ref={rotatorRef} className="absolute inset-0">
        <div
          ref={pillRef}
          onClick={onClick}
          className="absolute top-0 left-1/2 w-[42px] h-[42px] rounded-full
                     flex items-center justify-center text-lg border border-white/10
                     cursor-pointer pointer-events-auto z-20
                     transition-all duration-300 hover:scale-110"
          style={{
            background: planet.bgColor,
            boxShadow: active
              ? `0 0 22px ${planet.color}88, 0 0 8px ${planet.color}44`
              : "none",
            border: active
              ? `1px solid ${planet.color}66`
              : "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {planet.emoji}
        </div>
      </div>
    </div>
  )
}

export function AboutSection() {
  const { ref: solarRef, size } = useSolarSize()
  const [active, setActive] = useState<number | null>(null)

  const handleToggle = (i: number) => {
    setActive((prev) => (prev === i ? null : i))
  }

  return (
    <section id="sobre" className="py-[clamp(60px,10vw,100px)] px-4 sm:px-8 md:px-16 relative overflow-hidden" style={{ background: "#050816" }}>
      <StarField />
      {/* Borders */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(139,92,246,0.4),transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(99,102,241,0.4),transparent)" }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-[clamp(40px,7vw,70px)]"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: "linear-gradient(90deg,transparent,#6366f1)" }} />
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-indigo-400">Conheça</span>
            <div className="h-px w-12" style={{ background: "linear-gradient(90deg,#8b5cf6,transparent)" }} />
          </div>
          <h2
            className="font-black leading-tight pb-1"
            style={{
              fontSize: "clamp(36px,6vw,52px)",
              fontFamily: "'Syne',sans-serif",
              background: "linear-gradient(135deg,#818cf8,#c084fc,#67e8f9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Sobre Mim
          </h2>
          <div
            className="w-20 h-[3px] mx-auto mt-4 rounded-full"
            style={{ background: "linear-gradient(90deg,#6366f1,#8b5cf6)" }}
          />
        </motion.div>

        {/* Body */}
        <div className="flex flex-col md:flex-row items-center gap-[clamp(40px,7vw,70px)]">
          {/* Solar System */}
          <motion.div
            ref={solarRef}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-shrink-0 relative"
            style={{
              width: "clamp(300px,46vw,420px)",
              height: "clamp(300px,46vw,420px)",
            }}
          >
            {/* Orbit rings */}
            {planets.map((p, i) => {
              const r = p.orbitPct * (size / 2)
              return (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 rounded-full pointer-events-none transition-all duration-500"
                  style={{
                    width: r * 2,
                    height: r * 2,
                    marginLeft: -r,
                    marginTop: -r,
                    border: `1px ${i % 2 === 0 ? "solid" : "dashed"} ${
                      active === i ? `${p.color}22` : "rgba(255,255,255,0.05)"
                    }`,
                  }}
                />
              )
            })}

            {/* Planets */}
            {planets.map((p, i) => (
              <Planet
                key={i}
                planet={p}
                size={size}
                active={active === i}
                onClick={() => handleToggle(i)}
              />
            ))}

            {/* Sun */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              style={{
                width: "clamp(96px,17vw,140px)",
                height: "clamp(96px,17vw,140px)",
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: "conic-gradient(from 0deg,#6366f1,#8b5cf6,#c084fc,#6366f1)" }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              />
              <div className="absolute inset-[4px] rounded-full bg-[#0d0f1f] overflow-hidden">
                <Image
                  src={ProfileImage}
                  alt="Guilherme Silva Rios"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <div
                className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-green-400
                           border-2 border-[#050816] z-20 animate-pulse"
                style={{ boxShadow: "0 0 8px rgba(74,222,128,0.6)" }}
              />
            </div>
          </motion.div>

          {/* Cards */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="flex-1 flex flex-col gap-3 w-full"
          >
            {/* Hint text when nothing is selected */}
            <AnimatePresence>
              {active === null && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="text-[11px] text-slate-500 tracking-wide text-center mb-1"
                >
                  Clique em um planeta ou card para explorar
                </motion.p>
              )}
            </AnimatePresence>

            {planets.map((p, i) => (
              <div
                key={i}
                onClick={() => handleToggle(i)}
                className="relative rounded-2xl border cursor-pointer overflow-hidden transition-all duration-300"
                style={{
                  background:
                    active === i ? "rgba(255,255,255,0.045)" : "rgba(255,255,255,0.02)",
                  borderColor:
                    active === i ? p.borderActive : "rgba(255,255,255,0.06)",
                  transform: active === i ? "translateX(4px)" : "translateX(0)",
                }}
              >
                {/* Left bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(180deg,${p.barFrom},${p.barTo})`,
                    opacity: active === i ? 1 : 0.4,
                  }}
                />

                {/* Header row — always visible */}
                <div className="flex items-center gap-3 px-5 py-4">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 transition-all duration-300"
                    style={{
                      background: p.bgColor,
                      boxShadow: active === i ? `0 0 12px ${p.color}44` : "none",
                    }}
                  >
                    {p.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className="font-bold text-slate-100 leading-tight"
                      style={{ fontSize: "clamp(13px,1.6vw,15px)", fontFamily: "'Syne',sans-serif" }}
                    >
                      {p.title}
                    </div>
                    <div
                      className="text-[10px] uppercase tracking-[0.08em] mt-0.5"
                      style={{ color: p.accentColor }}
                    >
                      {p.sub}
                    </div>
                  </div>
                  {/* Chevron */}
                  <div
                    className="flex-shrink-0 w-5 h-5 flex items-center justify-center transition-transform duration-300"
                    style={{
                      color: p.accentColor,
                      transform: active === i ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 4L6 8L10 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Expandable body */}
                <AnimatePresence initial={false}>
                  {active === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-5 pb-4">
                        <div
                          className="h-px w-full mb-3"
                          style={{
                            background: `linear-gradient(90deg,${p.barFrom}33,transparent)`,
                          }}
                        />
                        <p
                          className="leading-relaxed font-light text-slate-400/80"
                          style={{ fontSize: "clamp(12px,1.4vw,13px)" }}
                        >
                          {p.body}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {p.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded-full text-[11px]"
                              style={{
                                background: p.tagBg,
                                color: p.accentColor,
                                border: `1px solid ${p.tagBorder}`,
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}