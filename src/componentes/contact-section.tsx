"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
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

export function ContactSection() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

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
    const emailBody = `
      ========================
      CONTATO VIA PORTFÓLIO
      ========================
      
      📅 Data: ${new Date().toLocaleDateString("pt-BR")}
      ⏰ Hora: ${new Date().toLocaleTimeString("pt-BR")}
      
      👤 Remetente:
      Nome: ${name}
      Email: ${email}
      
      📌 Assunto:
      ${subject}
      
      ✉️ Mensagem:
      =========================
      ${message}
      =========================
      
      Atenciosamente,
      ${name}
    `
      .replace(/\n/g, "%0D%0A")
      .trim()

    setTimeout(() => {
      window.location.href = `mailto:guilhermeriosprog@gmail.com?subject=${encodeURIComponent(`[Portfólio] ${subject}`)}&body=${emailBody}`
      setFormStatus("success")

      setTimeout(() => {
        setFormStatus("idle")
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      }, 3000)
    }, 800)
  }

  // Background glow effects
  const glowPositions = ["top-1/4 left-1/4", "bottom-1/4 right-1/4", "top-3/4 right-1/3", "bottom-1/3 left-1/3"]

  return (
    <section id="contato" className="py-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      {/* Background glow effects */}
      {glowPositions.map((position, index) => (
        <div
          key={index}
          className={`absolute ${position} w-64 h-64 rounded-full blur-3xl opacity-20 ${
            index % 2 === 0 ? "bg-blue-500" : "bg-purple-500"
          }`}
        ></div>
      ))}

      <div className="container mx-auto px-4 py-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-blue-500"></div>
            <span className="text-blue-400 text-sm font-medium uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> Mensagem
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-purple-500"></div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 text-transparent bg-clip-text">
            Entre em Contato
          </h2>
          <p className="text-base sm:text-lg text-center text-blue-200 mb-2 max-w-2xl mx-auto">
            Tem um projeto em mente ou quer conversar sobre oportunidades? Entre em contato comigo!
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 max-w-6xl mx-auto">
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gradient-to-br from-blue-900/10 to-purple-900/10 backdrop-blur-sm border border-purple-900/30 rounded-2xl p-6 md:p-8 shadow-lg shadow-purple-900/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Envie uma mensagem</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-blue-300 mb-1">
                    Nome
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Seu nome"
                    required
                    className="bg-blue-950/30 border border-purple-900/50 text-white placeholder:text-blue-300/50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-blue-300 mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu.email@exemplo.com"
                    required
                    className="bg-blue-950/30 border border-purple-900/50 text-white placeholder:text-blue-300/50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-blue-300 mb-1">
                    Assunto
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Assunto da mensagem"
                    required
                    className="bg-blue-950/30 border border-purple-900/50 text-white placeholder:text-blue-300/50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-blue-300 mb-1">
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
                    className="bg-blue-950/30 border border-purple-900/50 text-white placeholder:text-blue-300/50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={formStatus === "submitting" || formStatus === "success"}
                  className={`w-full relative overflow-hidden group rounded-xl cursor-pointer ${
                    formStatus === "success"
                      ? "bg-green-600 hover:bg-green-700"
                      : formStatus === "error"
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  }`}
                >
                  <span className="flex items-center justify-center gap-2 py-1">
                    {formStatus === "submitting" ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Preparando e-mail...
                      </>
                    ) : formStatus === "success" ? (
                      <>
                        <CheckCircle className="w-4 h-4" /> E-mail aberto!
                      </>
                    ) : formStatus === "error" ? (
                      <>
                        <AlertCircle className="w-4 h-4" /> Preencha todos os campos
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> Enviar Mensagem
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600/40 to-purple-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                </Button>
              </form>
            </div>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 flex flex-col justify-between"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-purple-900/10 to-blue-900/10 backdrop-blur-sm border border-purple-900/30 rounded-2xl p-6 md:p-8 shadow-lg shadow-purple-900/5 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Informações de Contato</h3>
              </div>

              <div className="space-y-8 flex-grow">
                <motion.div
                  className="flex items-start gap-4 bg-blue-950/20 p-4 rounded-xl border border-blue-900/30 hover:border-blue-500/30 transition-colors"
                  whileHover={{ y: -5, x: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-purple-900/20">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-purple-300">Email</h4>
                    <a
                      href="mailto:guilhermeriosprog@gmail.com"
                      className="text-blue-200 hover:text-purple-300 transition-colors"
                    >
                      guilhermeriosprog@gmail.com
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4 bg-blue-950/20 p-4 rounded-xl border border-blue-900/30 hover:border-blue-500/30 transition-colors"
                  whileHover={{ y: -5, x: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-purple-900/20">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-purple-300">Telefone</h4>
                    <a href="tel:+559984869491" className="text-blue-200 hover:text-purple-300 transition-colors">
                      +55 (99) 8486-9491
                    </a>
                  </div>
                </motion.div>
              </div>

              <div className="mt-8 pt-8 border-t border-purple-900/30">
                <h4 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" /> Redes Sociais
                </h4>
                <div className="flex flex-wrap gap-4">
                  <motion.a
                    href="https://github.com/guilhermeprog3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-blue-600/50 rounded-full blur-md opacity-0 group-hover:opacity-70 transition-opacity"></div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-900/80 to-purple-900/80 border border-purple-900/50 flex items-center justify-center hover:border-purple-500/50 transition-colors relative z-10">
                      <Github className="w-5 h-5 text-white" />
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://www.linkedin.com/in/guilherme-s-rios-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-blue-600/50 rounded-full blur-md opacity-0 group-hover:opacity-70 transition-opacity"></div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-900/80 to-purple-900/80 border border-purple-900/50 flex items-center justify-center hover:border-purple-500/50 transition-colors relative z-10">
                      <Linkedin className="w-5 h-5 text-white" />
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://instagram.com/guilherme_rios_03"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-blue-600/50 rounded-full blur-md opacity-0 group-hover:opacity-70 transition-opacity"></div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-900/80 to-purple-900/80 border border-purple-900/50 flex items-center justify-center hover:border-purple-500/50 transition-colors relative z-10">
                      <Instagram className="w-5 h-5 text-white" />
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://wa.me/5599984869491"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-blue-600/50 rounded-full blur-md opacity-0 group-hover:opacity-70 transition-opacity"></div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-900/80 to-purple-900/80 border border-purple-900/50 flex items-center justify-center hover:border-purple-500/50 transition-colors relative z-10">
                      <FaWhatsapp className="w-5 h-5 text-white" />
                    </div>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
