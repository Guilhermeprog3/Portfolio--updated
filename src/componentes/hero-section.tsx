"use client"

import { motion } from "framer-motion"
import { Download, Mail, ArrowDown } from "lucide-react"
import { useEffect, useRef } from "react"

const ROLES = ["Full Stack Developer", "Analista de Dados", "Mobile Developer", "UI Engineer"]

function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
    }
    resize()
    window.addEventListener("resize", resize)

    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.2,
        o: Math.random(),
        speed: Math.random() * 0.004 + 0.001,
      })
    }

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 1
      stars.forEach((s) => {
        const opacity = 0.2 + 0.6 * Math.abs(Math.sin(t * s.speed + s.o * 10))
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
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

export function HeroSection() {
  const scrollToContact = () => {
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#050816" }}
    >
      <StarField />

      {/* Ambient blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 300,
          height: 300,
          top: "20%",
          right: "10%",
          background: "radial-gradient(circle, rgba(192,132,252,0.08) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 250,
          height: 250,
          bottom: "15%",
          left: "8%",
          background: "radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg,transparent,rgba(99,102,241,0.4),transparent)" }}
        animate={{ top: ["20%", "80%", "20%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto pt-20">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border text-xs tracking-widest uppercase font-medium"
          style={{
            border: "1px solid rgba(99,102,241,0.3)",
            background: "rgba(99,102,241,0.08)",
            color: "#a5b4fc",
            fontFamily: "'DM Mono', monospace",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"
            style={{ boxShadow: "0 0 6px rgba(74,222,128,0.8)" }}
          />
          Disponível para projetos
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <p
            className="text-xs tracking-[0.3em] uppercase mb-3 font-medium"
            style={{ color: "#6366f1", fontFamily: "'DM Mono', monospace" }}
          >
            Guilherme Silva Rios
          </p>
          <h1
            className="font-black leading-[0.95] mb-2"
            style={{
              fontSize: "clamp(44px, 9vw, 96px)",
              fontFamily: "'Syne', sans-serif",
              background: "linear-gradient(135deg, #e0e7ff 0%, #a5b4fc 40%, #c084fc 70%, #67e8f9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.02em",
            }}
          >
            Full Stack
          </h1>
          <h1
            className="font-black leading-[0.95] mb-6"
            style={{
              fontSize: "clamp(44px, 9vw, 96px)",
              fontFamily: "'Syne', sans-serif",
              background: "linear-gradient(135deg, #a5b4fc 0%, #818cf8 50%, #6366f1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.02em",
              opacity: 0.7,
            }}
          >
            Developer
          </h1>
        </motion.div>

        {/* Roles ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {ROLES.map((role, i) => (
            <motion.span
              key={role}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
              className="px-3 py-1 rounded-full text-[11px] tracking-wide"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#94a3b8",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              {role}
            </motion.span>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-base md:text-lg leading-relaxed mb-10 max-w-xl font-light"
          style={{ color: "#94a3b8" }}
        >
          Transformo dados em decisões e ideias em produtos —
          do backend ao mobile, da análise à interface.
        </motion.p>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-24 h-px mb-10"
          style={{ background: "linear-gradient(90deg, transparent, #6366f1, transparent)" }}
        />

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          {/* Primary CTA */}
          <a
            href="/meucurriculo.pdf"
            download="Guilherme-Curriculo.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-3 px-7 py-3.5 rounded-xl font-semibold text-sm overflow-hidden transition-all duration-300 hover:scale-[1.03]"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff",
              fontFamily: "'Syne', sans-serif",
              boxShadow: "0 0 30px rgba(99,102,241,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
          >
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)" }}
            />
            <Download className="w-4 h-4 relative z-10 group-hover:-translate-y-0.5 transition-transform duration-200" />
            <span className="relative z-10 tracking-wide">Download CV</span>
          </a>

          {/* Secondary CTA */}
          <button
            onClick={scrollToContact}
            className="group flex items-center gap-3 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.03]"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(99,102,241,0.35)",
              color: "#a5b4fc",
              fontFamily: "'Syne', sans-serif",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(99,102,241,0.1)"
              e.currentTarget.style.borderColor = "rgba(99,102,241,0.6)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.03)"
              e.currentTarget.style.borderColor = "rgba(99,102,241,0.35)"
            }}
          >
            <Mail className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            <span className="tracking-wide">Entrar em Contato</span>
          </button>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-12"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1.5 cursor-pointer opacity-40 hover:opacity-70 transition-opacity"
            onClick={() => document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth" })}
          >
            <span
              className="text-[9px] tracking-[0.25em] uppercase"
              style={{ color: "#64748b", fontFamily: "'DM Mono', monospace" }}
            >
              Scroll
            </span>
            <ArrowDown className="w-3.5 h-3.5 text-slate-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}