"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Download, Mail } from "lucide-react"

export function HeroSection() {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contato")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16">
      <div className="container mx-auto px-4 py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 text-transparent bg-clip-text">
            Desenvolvedor Full Stack
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-200 max-w-2xl mx-auto">
            Transformando ideias em experiências digitais incríveis em todas as plataformas
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex justify-center space-x-4"
        >
          <Button className="bg-purple-700 hover:bg-purple-800">
  <a 
    href="../public/meucurriculo.pdf"
    download="Guilherme-Curriculo.pdf" 
    className="flex items-center gap-2"
  >
    <Download className="w-4 h-4" /> DOWNLOAD CV
  </a>
</Button>
          <Button
            variant="outline"
            className="border-purple-700 text-purple-400 hover:bg-purple-900/30"
            onClick={scrollToContact}
          >
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> CONTACT-ME
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}