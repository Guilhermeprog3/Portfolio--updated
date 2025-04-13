"use client"

import { useState } from "react"
import { Moon, Code, User } from "lucide-react"
import { motion } from "framer-motion"

export function AboutSection() {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <section id="sobre" className="py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-block mb-8 mx-auto text-center w-full">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-blue-500"></div>
              <span className="text-blue-400 text-sm font-medium uppercase tracking-wider">Conheça</span>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-purple-500"></div>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold relative inline-block bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 text-transparent bg-clip-text pb-2">
              Sobre Mim
            </h2>
            <div className="h-1 w-24 mx-auto mt-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              className="w-full md:w-1/3 flex justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              onHoverStart={() => setIsHovering(true)}
              onHoverEnd={() => setIsHovering(false)}
            >
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-blue-700 p-1 shadow-lg shadow-purple-500/20">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden relative">
                  <motion.div
                    animate={{
                      rotate: isHovering ? 360 : 0,
                      scale: isHovering ? 1.1 : 1,
                    }}
                    transition={{ duration: 5, ease: "linear", repeat: isHovering ? Number.POSITIVE_INFINITY : 0 }}
                  >
                    <Moon className="w-32 h-32 text-purple-400" />
                  </motion.div>

                  {/* Orbit effect */}
                  <motion.div
                    className="absolute w-full h-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-purple-400 rounded-full"></div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-purple-400 rounded-full"></div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="w-full md:w-2/3"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-purple-400" />
                <h3 className="text-xl font-semibold text-white">Desenvolvedor Full Stack</h3>
              </div>

              <p className="text-lg mb-5 text-blue-100 leading-relaxed">
                Olá! Sou Guilherme, um desenvolvedor Full Stack apaixonado por desenvolvimento web e mobile.
              </p>
              <p className="text-lg mb-5 text-blue-100 leading-relaxed">
                Com experiência em desenvolvimento front-end e back-end, trabalho com as tecnologias mais modernas para
                entregar projetos de alta qualidade.
              </p>
              <p className="text-lg text-blue-100 leading-relaxed">
                Meu objetivo é transformar ideias em realidade digital. Minha dedicação e capacidade de resolução de
                problemas me tornam um talento promissor na indústria de tecnologia.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-300 flex items-center gap-2">
                  <Code className="w-4 h-4" /> Desenvolvimento Web
                </div>
                <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-300 flex items-center gap-2">
                  <Code className="w-4 h-4" /> Desenvolvimento Mobile
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
