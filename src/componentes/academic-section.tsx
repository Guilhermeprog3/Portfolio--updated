"use client"

import { GraduationCap, Cpu } from "lucide-react"
import { motion } from "framer-motion"

export function AcademicSection() {
  return (
    <section id="formacao" className="py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>

      {/* Background glow effects */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-block mb-12 mx-auto text-center w-full">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-purple-500"></div>
              <span className="text-purple-400 text-sm font-medium uppercase tracking-wider">Educação</span>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-blue-500"></div>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold relative inline-block bg-gradient-to-r from-purple-400 via-blue-500 to-purple-400 text-transparent bg-clip-text pb-2">
              Formação Acadêmica
            </h2>
            <div className="h-1 w-24 mx-auto mt-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(91, 33, 182, 0.1), 0 10px 10px -5px rgba(91, 33, 182, 0.04)",
              }}
              className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 rounded-2xl border border-blue-500/20 backdrop-blur-sm hover:border-blue-400/30 transition-all duration-300"
            >
              <div className="flex items-center gap-5 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Tecnólogo em Sistemas para Internet</h3>
                  <p className="text-blue-300 text-sm">2023 - 2025</p>
                </div>
              </div>
              <p className="text-blue-100 leading-relaxed">
                Formação superior com foco em desenvolvimento web, programação, banco de dados, e tecnologias para
                criação e manutenção de sistemas online.
              </p>
              <div className="mt-6 pt-6 border-t border-blue-500/20">
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">Web Development</span>
                  <span className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
                    Mobile development
                  </span>
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full">
                    Banco de Dados
                  </span>
                  <span className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">UX/UI</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(91, 33, 182, 0.1), 0 10px 10px -5px rgba(91, 33, 182, 0.04)",
              }}
              className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 rounded-2xl border border-blue-500/20 backdrop-blur-sm hover:border-purple-400/30 transition-all duration-300"
            >
              <div className="flex items-center gap-5 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <Cpu className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Técnico em Eletroeletrônica</h3>
                  <p className="text-purple-300 text-sm">2020 - 2022</p>
                </div>
              </div>
              <p className="text-blue-100 leading-relaxed">
                Formação técnica com conhecimentos em circuitos eletrônicos, sistemas elétricos, automação e manutenção
                de equipamentos eletrônicos.
              </p>
              <div className="mt-6 pt-6 border-t border-purple-500/20">
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full">Eletrônica</span>
                  <span className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">Automação</span>
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full">Circuitos</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
