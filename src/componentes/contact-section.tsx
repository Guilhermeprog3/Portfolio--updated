"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Send,
  CheckCircle,
  AlertCircle,
  Instagram,
  MessageSquare,
  Sparkles,
} from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { motion } from "framer-motion"

type FormStatus = "idle" | "submitting" | "success" | "error"

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
      stars.length = 0
      for (let i = 0; i < 130; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.2 + 0.2,
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
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

export function ContactSection() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle")
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFormStatus("error")
      setTimeout(() => setFormStatus("idle"), 3000)
      return
    }
    setFormStatus("submitting")
    const { name, email, subject, message } = formData
    const emailBody = `========================\nCONTATO VIA PORTFÓLIO\n========================\n\n📅 Data: ${new Date().toLocaleDateString("pt-BR")}\n⏰ Hora: ${new Date().toLocaleTimeString("pt-BR")}\n\n👤 Remetente:\nNome: ${name}\nEmail: ${email}\n\n📌 Assunto:\n${subject}\n\n✉️ Mensagem:\n=========================\n${message}\n=========================\n\nAtenciosamente,\n${name}`
      .replace(/\n/g, "%0D%0A").trim()
    setTimeout(() => {
      window.location.href = `mailto:guilhermeriosprog@gmail.com?subject=${encodeURIComponent(`[Portfólio] ${subject}`)}&body=${emailBody}`
      setFormStatus("success")
      setTimeout(() => {
        setFormStatus("idle")
        setFormData({ name: "", email: "", subject: "", message: "" })
      }, 3000)
    }, 800)
  }

  const inputClass = "rounded-lg text-white placeholder:text-slate-600 transition-all duration-200 focus:ring-1"
  const inputStyle = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(99,102,241,0.2)",
    outline: "none",
  }

  const socialLinks = [
    { href: "https://github.com/guilhermeprog3", icon: <Github className="w-5 h-5 text-white" />, label: "GitHub" },
    { href: "https://www.linkedin.com/in/guilherme-s-rios-dev", icon: <Linkedin className="w-5 h-5 text-white" />, label: "LinkedIn" },
    { href: "https://instagram.com/guilherme_rios_03", icon: <Instagram className="w-5 h-5 text-white" />, label: "Instagram" },
    { href: "https://wa.me/5599984869491", icon: <FaWhatsapp className="w-5 h-5 text-white" />, label: "WhatsApp" },
  ]

  return (
    <section
      id="contato"
      className="py-20 relative overflow-hidden"
      style={{ background: "#050816" }}
    >
      <StarField />

      {/* Border lines */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(139,92,246,0.4),transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(99,102,241,0.4),transparent)" }} />

      {/* Ambient globs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)", filter: "blur(40px)", borderRadius: "50%" }} />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(192,132,252,0.06) 0%, transparent 70%)", filter: "blur(40px)", borderRadius: "50%" }} />

      <div className="container mx-auto px-4 py-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: "linear-gradient(90deg,transparent,#6366f1)" }} />
            <span className="text-indigo-400 text-[11px] font-medium uppercase tracking-[0.2em] flex items-center gap-2"
              style={{ fontFamily: "'DM Mono', monospace" }}>
              <MessageSquare className="w-3.5 h-3.5" /> Mensagem
            </span>
            <div className="h-px w-12" style={{ background: "linear-gradient(90deg,#8b5cf6,transparent)" }} />
          </div>
          <h2
            className="font-black leading-tight pb-1 text-center"
            style={{
              fontSize: "clamp(32px,5.5vw,48px)",
              fontFamily: "'Syne', sans-serif",
              background: "linear-gradient(135deg,#818cf8,#c084fc,#67e8f9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Entre em Contato
          </h2>
          <div className="w-20 h-[3px] mx-auto mt-4 rounded-full"
            style={{ background: "linear-gradient(90deg,#6366f1,#8b5cf6)" }} />
          <p className="text-center mt-4 max-w-xl mx-auto" style={{ color: "rgba(148,163,184,0.6)", fontSize: "clamp(13px,1.5vw,15px)" }}>
            Tem um projeto em mente ou quer conversar sobre oportunidades? Entre em contato!
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-10 max-w-5xl mx-auto">
          {/* Form */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl p-6 md:p-8"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(99,102,241,0.15)",
                boxShadow: "0 0 40px rgba(99,102,241,0.05)",
              }}
            >
              {/* Top bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                style={{ background: "linear-gradient(90deg,#6366f1,#8b5cf6,transparent)" }} />

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Envie uma mensagem
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { id: "name", label: "Nome", type: "text", placeholder: "Seu nome" },
                  { id: "email", label: "Email", type: "email", placeholder: "seu.email@exemplo.com" },
                  { id: "subject", label: "Assunto", type: "text", placeholder: "Assunto da mensagem" },
                ].map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="block text-xs font-medium mb-1.5 tracking-wide"
                      style={{ color: "#a5b4fc", fontFamily: "'DM Mono', monospace" }}>
                      {field.label}
                    </label>
                    <Input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      value={formData[field.id as keyof typeof formData]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="message" className="block text-xs font-medium mb-1.5 tracking-wide"
                    style={{ color: "#a5b4fc", fontFamily: "'DM Mono', monospace" }}>
                    Mensagem
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Sua mensagem..."
                    rows={5}
                    required
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "submitting" || formStatus === "success"}
                  className="w-full rounded-xl py-3 font-semibold text-sm text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: formStatus === "success"
                      ? "linear-gradient(135deg,#10b981,#059669)"
                      : formStatus === "error"
                      ? "linear-gradient(135deg,#ef4444,#dc2626)"
                      : "linear-gradient(135deg,#6366f1,#8b5cf6)",
                    boxShadow: "0 0 24px rgba(99,102,241,0.25)",
                    fontFamily: "'Syne', sans-serif",
                  }}
                >
                  <span className="flex items-center justify-center gap-2">
                    {formStatus === "submitting" ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Preparando e-mail...
                      </>
                    ) : formStatus === "success" ? (
                      <><CheckCircle className="w-4 h-4" /> E-mail aberto!</>
                    ) : formStatus === "error" ? (
                      <><AlertCircle className="w-4 h-4" /> Preencha todos os campos</>
                    ) : (
                      <><Send className="w-4 h-4" /> Enviar Mensagem</>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            className="w-full md:w-1/2 flex flex-col"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl p-6 md:p-8 h-full flex flex-col"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(99,102,241,0.15)",
                boxShadow: "0 0 40px rgba(99,102,241,0.04)",
              }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#8b5cf6,#6366f1)" }}>
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Informações de Contato
                </h3>
              </div>

              <div className="space-y-4 flex-grow">
                {[
                  { icon: <Mail className="w-5 h-5 text-white" />, label: "Email", value: "guilhermeriosprog@gmail.com", href: "mailto:guilhermeriosprog@gmail.com" },
                  { icon: <Phone className="w-5 h-5 text-white" />, label: "Telefone", value: "+55 (99) 8486-9491", href: "tel:+559984869491" },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    className="flex items-start gap-4 p-4 rounded-xl transition-all duration-200"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(99,102,241,0.12)" }}
                    whileHover={{ y: -3, borderColor: "rgba(99,102,241,0.3)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", boxShadow: "0 0 14px rgba(99,102,241,0.3)" }}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-0.5" style={{ color: "#a5b4fc", fontFamily: "'DM Mono', monospace" }}>
                        {item.label}
                      </h4>
                      <a href={item.href} className="text-sm transition-colors"
                        style={{ color: "rgba(203,213,225,0.7)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#a5b4fc")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(203,213,225,0.7)")}>
                        {item.value}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-8" style={{ borderTop: "1px solid rgba(99,102,241,0.15)" }}>
                <h4 className="text-sm font-semibold mb-4 flex items-center gap-2 text-white"
                  style={{ fontFamily: "'Syne', sans-serif" }}>
                  <Sparkles className="w-4 h-4 text-indigo-400" /> Redes Sociais
                </h4>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((s) => (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                      whileHover={{ y: -4, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.6), transparent)", filter: "blur(8px)" }} />
                      <div className="w-12 h-12 rounded-full flex items-center justify-center relative z-10 transition-all duration-200"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(99,102,241,0.25)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "rgba(99,102,241,0.6)"
                          e.currentTarget.style.background = "rgba(99,102,241,0.12)"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "rgba(99,102,241,0.25)"
                          e.currentTarget.style.background = "rgba(255,255,255,0.04)"
                        }}
                      >
                        {s.icon}
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}