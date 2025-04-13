"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FileJson,
  FileType,
  CodepenIcon as ReactIcon,
  Server,
  Gem,
  Train,
  FileCode,
  Paintbrush,
  Wind,
  Database,
  GitBranch,
  Cpu,
  DatabaseIcon as MysqlIcon,
  FlaskConical,
  Key,
  Sparkles,
} from "lucide-react"

type Skill = {
  name: string
  color: string
  icon: React.ReactNode
  level: number
  description: string
}

// Hook de media query integrado diretamente no componente
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Verificar se estamos no navegador para evitar erros durante SSR
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query)

      // Atualizar o estado inicialmente
      setMatches(media.matches)

      // Definir uma função de callback para lidar com mudanças
      const listener = (e: MediaQueryListEvent) => {
        setMatches(e.matches)
      }

      // Adicionar o callback como um listener para mudanças na media query
      media.addEventListener("change", listener)

      // Limpeza
      return () => {
        media.removeEventListener("change", listener)
      }
    }

    // Valor padrão para SSR
    return () => {}
  }, [query])

  return matches
}

export function SkillsSection() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isSmallScreen = useMediaQuery("(max-width: 640px)")

  // Reset active skill when screen size changes to prevent UI issues
  useEffect(() => {
    setActiveSkill(null)
  }, [isMobile, isSmallScreen])

  const skills: Skill[] = [
    {
      name: "JavaScript",
      color: "from-yellow-500 to-yellow-700",
      icon: <FileJson className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />,
      level: 5,
      description: "Desenvolvimento avançado de aplicações web com JavaScript moderno (ES6+).",
    },
    {
      name: "TypeScript",
      color: "from-blue-500 to-blue-700",
      icon: <FileType className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />,
      level: 4,
      description: "Tipagem estática para desenvolvimento mais seguro e produtivo.",
    },
    {
      name: "React/React Native",
      color: "from-cyan-500 to-cyan-700",
      icon: <ReactIcon className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />,
      level: 4,
      description: "Criação de interfaces modernas e reativas com React e React Native.",
    },
    {
      name: "Node.js",
      color: "from-green-500 to-green-700",
      icon: <Server className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />,
      level: 4,
      description: "Desenvolvimento de APIs RESTful e aplicações server-side com Node.js.",
    },
    {
      name: "Python",
      color: "from-blue-400 to-blue-600",
      icon: <FlaskConical className="w-5 h-5 sm:w-6 sm:h-6 text-blue-300" />,
      level: 5,
      description: "Desenvolvimento de scripts, automações e aplicações com Python.",
    },
    {
      name: "Ruby",
      color: "from-red-500 to-red-700",
      icon: <Gem className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />,
      level: 2,
      description: "Conhecimento básico de Ruby para desenvolvimento web.",
    },
    {
      name: "Ruby on Rails",
      color: "from-red-600 to-red-800",
      icon: <Train className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />,
      level: 2,
      description: "Conhecimento básico do framework Rails para desenvolvimento web.",
    },
    {
      name: "HTML5",
      color: "from-orange-500 to-orange-700",
      icon: <FileCode className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />,
      level: 5,
      description: "Estruturação semântica e acessível de conteúdo web.",
    },
    {
      name: "CSS3",
      color: "from-blue-600 to-blue-800",
      icon: <Paintbrush className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />,
      level: 5,
      description: "Estilização avançada com CSS moderno, incluindo Flexbox e Grid.",
    },
    {
      name: "Tailwind CSS",
      color: "from-teal-500 to-teal-700",
      icon: <Wind className="w-5 h-5 sm:w-6 sm:h-6 text-teal-400" />,
      level: 5,
      description: "Desenvolvimento rápido com o framework utility-first Tailwind CSS.",
    },
    {
      name: "PostgreSQL",
      color: "from-blue-700 to-blue-900",
      icon: <Database className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />,
      level: 4,
      description: "Banco de dados relacional robusto para aplicações empresariais.",
    },
    {
      name: "MySQL",
      color: "from-blue-500 to-blue-700",
      icon: <MysqlIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />,
      level: 3,
      description: "Banco de dados relacional para aplicações web e sistemas.",
    },
    {
      name: "Git",
      color: "from-orange-600 to-orange-800",
      icon: <GitBranch className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />,
      level: 5,
      description: "Controle de versão e colaboração em equipe com Git.",
    },
    {
      name: "Next.js",
      color: "from-gray-500 to-gray-700",
      icon: <FileCode className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />,
      level: 5,
      description: "Framework React para aplicações SSR, SSG e rotas dinâmicas.",
    },
    {
      name: "NestJS",
      color: "from-red-500 to-red-700",
      icon: <Server className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />,
      level: 3,
      description: "Framework Node.js para construção de aplicações server-side escaláveis.",
    },
    {
      name: "AdonisJS",
      color: "from-yellow-600 to-yellow-800",
      icon: <Server className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />,
      level: 5,
      description: "Framework Node.js completo para desenvolvimento web.",
    },
    {
      name: "Arduino",
      color: "from-teal-600 to-teal-800",
      icon: <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-teal-500" />,
      level: 2,
      description: "Conhecimento básico de programação para microcontroladores Arduino.",
    },
    {
      name: "Supabase",
      color: "from-green-400 to-green-600",
      icon: <Key className="w-5 h-5 sm:w-6 sm:h-6 text-green-300" />,
      level: 4,
      description: "Plataforma de backend como serviço com banco de dados PostgreSQL e autenticação.",
    },
  ]

  const handleSkillHover = (skillName: string | null) => {
    setActiveSkill(skillName)
  }

  const handleSkillClick = (skillName: string) => {
    if (isMobile) {
      setActiveSkill(activeSkill === skillName ? null : skillName)
    }
  }

  const SkillLevel = ({ level, color }: { level: number; color: string }) => {
    return (
      <div className="flex space-x-1 mt-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-1.5 sm:h-2 w-full rounded-full ${
              i <= level ? `bg-gradient-to-r ${color} shadow-sm` : "bg-gray-700"
            }`}
          ></div>
        ))}
      </div>
    )
  }

  // Background glow effects
  const glowPositions = ["top-1/4 left-1/4", "bottom-1/4 right-1/4", "top-3/4 right-1/3", "bottom-1/3 left-1/3"]

  return (
    <section id="habilidades" className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
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
              <Sparkles className="w-4 h-4" /> Competências
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-purple-500"></div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 text-transparent bg-clip-text">
            Habilidades
          </h2>
          <p className="text-base sm:text-lg text-center text-blue-200 mb-2 max-w-2xl mx-auto">
            Tecnologias e ferramentas que domino para criar soluções digitais de alta qualidade.
          </p>
          <p className="text-sm text-center text-blue-300/70 max-w-xl mx-auto italic">
            {isMobile ? "Toque nos cards para ver detalhes" : "Passe o mouse sobre os cards para ver detalhes"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative"
              onHoverStart={() => !isMobile && handleSkillHover(skill.name)}
              onHoverEnd={() => !isMobile && handleSkillHover(null)}
              onClick={() => handleSkillClick(skill.name)}
              whileHover={!isMobile ? { scale: 1.05, y: -5 } : {}}
              whileTap={isMobile ? { scale: 0.98 } : {}}
            >
              <div
                className={`bg-gradient-to-br ${skill.color} p-0.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <div className="bg-gradient-to-b from-black/90 to-black/70 backdrop-blur-sm rounded-xl p-4 sm:p-5 h-full">
                  <div className="flex items-center mb-3">
                    <div className="mr-3 p-2 rounded-lg bg-black/50">{skill.icon}</div>
                    <h3 className="text-base sm:text-lg font-semibold text-white">{skill.name}</h3>
                  </div>
                  <SkillLevel level={skill.level} color={skill.color} />

                  <AnimatePresence>
                    {(activeSkill === skill.name || !isMobile) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                          opacity: activeSkill === skill.name ? 1 : isMobile ? 0 : 0.7,
                          height: "auto",
                        }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`mt-3 text-sm text-blue-200 overflow-hidden ${
                          activeSkill !== skill.name && !isMobile ? "group-hover:opacity-100" : ""
                        }`}
                      >
                        {skill.description}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {isMobile && activeSkill === skill.name && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="mt-2 text-xs text-purple-300 text-center italic"
                    >
                      Toque para fechar
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
