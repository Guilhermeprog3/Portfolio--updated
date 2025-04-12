"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
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
} from "lucide-react"

type Skill = {
  name: string
  color: string
  icon: React.ReactNode
  level: number
  description: string
}

export function SkillsSection() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null)

  const skills: Skill[] = [
    {
      name: "JavaScript",
      color: "from-yellow-500 to-yellow-700",
      icon: <FileJson className="w-6 h-6 text-yellow-400" />,
      level: 5,
      description: "Desenvolvimento avançado de aplicações web com JavaScript moderno (ES6+).",
    },
    {
      name: "TypeScript",
      color: "from-blue-500 to-blue-700",
      icon: <FileType className="w-6 h-6 text-blue-400" />,
      level: 4,
      description: "Tipagem estática para desenvolvimento mais seguro e produtivo.",
    },
    {
      name: "React/React Native",
      color: "from-cyan-500 to-cyan-700",
      icon: <ReactIcon className="w-6 h-6 text-cyan-400" />,
      level: 4,
      description: "Criação de interfaces modernas e reativas com React e React Native.",
    },
    {
      name: "Node.js",
      color: "from-green-500 to-green-700",
      icon: <Server className="w-6 h-6 text-green-400" />,
      level: 4,
      description: "Desenvolvimento de APIs RESTful e aplicações server-side com Node.js.",
    },
    {
      name: "Python",
      color: "from-blue-400 to-blue-600",
      icon: <FlaskConical className="w-6 h-6 text-blue-300" />,
      level: 5,
      description: "Desenvolvimento de scripts, automações e aplicações com Python.",
    },
    {
      name: "Ruby",
      color: "from-red-500 to-red-700",
      icon: <Gem className="w-6 h-6 text-red-400" />,
      level: 2,
      description: "Conhecimento básico de Ruby para desenvolvimento web.",
    },
    {
      name: "Ruby on Rails",
      color: "from-red-600 to-red-800",
      icon: <Train className="w-6 h-6 text-red-500" />,
      level: 2,
      description: "Conhecimento básico do framework Rails para desenvolvimento web.",
    },
    {
      name: "HTML5",
      color: "from-orange-500 to-orange-700",
      icon: <FileCode className="w-6 h-6 text-orange-400" />,
      level: 5,
      description: "Estruturação semântica e acessível de conteúdo web.",
    },
    {
      name: "CSS3",
      color: "from-blue-600 to-blue-800",
      icon: <Paintbrush className="w-6 h-6 text-blue-500" />,
      level: 5,
      description: "Estilização avançada com CSS moderno, incluindo Flexbox e Grid.",
    },
    {
      name: "Tailwind CSS",
      color: "from-teal-500 to-teal-700",
      icon: <Wind className="w-6 h-6 text-teal-400" />,
      level: 5,
      description: "Desenvolvimento rápido com o framework utility-first Tailwind CSS.",
    },
    {
      name: "PostgreSQL",
      color: "from-blue-700 to-blue-900",
      icon: <Database className="w-6 h-6 text-blue-600" />,
      level: 4,
      description: "Banco de dados relacional robusto para aplicações empresariais.",
    },
    {
      name: "MySQL",
      color: "from-blue-500 to-blue-700",
      icon: <MysqlIcon className="w-6 h-6 text-blue-400" />,
      level: 3,
      description: "Banco de dados relacional para aplicações web e sistemas.",
    },
    {
      name: "Git",
      color: "from-orange-600 to-orange-800",
      icon: <GitBranch className="w-6 h-6 text-orange-500" />,
      level: 5,
      description: "Controle de versão e colaboração em equipe com Git.",
    },
    {
      name: "Next.js",
      color: "from-gray-500 to-gray-700",
      icon: <FileCode className="w-6 h-6 text-gray-300" />,
      level: 5,
      description: "Framework React para aplicações SSR, SSG e rotas dinâmicas.",
    },
    {
      name: "NestJS",
      color: "from-red-500 to-red-700",
      icon: <Server className="w-6 h-6 text-red-400" />,
      level: 3,
      description: "Framework Node.js para construção de aplicações server-side escaláveis.",
    },
    {
      name: "AdonisJS",
      color: "from-yellow-600 to-yellow-800",
      icon: <Server className="w-6 h-6 text-yellow-500" />,
      level: 5,
      description: "Framework Node.js completo para desenvolvimento web.",
    },
    {
      name: "Arduino",
      color: "from-teal-600 to-teal-800",
      icon: <Cpu className="w-6 h-6 text-teal-500" />,
      level: 2,
      description: "Conhecimento básico de programação para microcontroladores Arduino.",
    },
  ]

  const handleSkillHover = (skillName: string | null) => {
    setActiveSkill(skillName)
  }

  const SkillLevel = ({ level }: { level: number }) => {
    return (
      <div className="flex space-x-1 mt-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`h-1.5 w-5 rounded-full ${i <= level ? "bg-purple-400" : "bg-gray-600"}`}></div>
        ))}
      </div>
    )
  }

  return (
    <section id="habilidades" className="py-20 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      <div className="container mx-auto px-4 py-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Habilidades
        </h2>
        <p className="text-center text-blue-300 mb-12 max-w-2xl mx-auto">
          Tecnologias e ferramentas que tenho conhecimento para criar soluções digitais de alta qualidade.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              className="relative"
              onHoverStart={() => handleSkillHover(skill.name)}
              onHoverEnd={() => handleSkillHover(null)}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <div className={`bg-gradient-to-br ${skill.color} p-0.5 rounded-lg shadow-lg`}>
                <div className="bg-black/80 rounded-lg p-6 h-full">
                  <div className="flex items-center mb-3">
                    <div className="mr-3">{skill.icon}</div>
                    <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                  </div>
                  <SkillLevel level={skill.level} />

                  <div
                    className={`mt-3 text-sm text-blue-200 transition-opacity duration-200 ${
                      activeSkill === skill.name ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {skill.description}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}