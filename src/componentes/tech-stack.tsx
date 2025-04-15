"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Server,
  Globe,
  Smartphone,
  Wrench,
  Paintbrush,
  CodepenIcon as ReactIcon,
  FileCode,
  Wind,
  Database,
  Figma,
  Monitor,
  Cloud,
  Github,
  Terminal,
  SmartphoneIcon as AndroidIcon,
  Code,
  Coffee,
  HardDrive,
  Box,
  SmartphoneIcon as MobileIcon,
  PenTool,
  Layers,
  Sparkles,
} from "lucide-react"

type TechCategory = {
  name: string
  icon: React.ReactNode
  color: string
  gradient: string
  description: string
  techs: {
    name: string
    icon: React.ReactNode
  }[]
}

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState("backend")
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)

  const categories: TechCategory[] = [
    {
      name: "backend",
      icon: <Server className="w-6 h-6" />,
      color: "from-purple-600 to-purple-800",
      gradient: "from-purple-500/20 via-purple-600/10 to-transparent",
      description: "Tecnologias para desenvolvimento de APIs, servidores e bancos de dados",
      techs: [
        { name: "AdonisJS", icon: <Server className="w-5 h-5 text-yellow-500" /> },
        { name: "NestJS", icon: <Server className="w-5 h-5 text-red-500" /> },
        { name: "Node.js", icon: <Server className="w-5 h-5 text-green-500" /> },
        { name: "PostgreSQL", icon: <Database className="w-5 h-5 text-blue-700" /> },
        { name: "Express", icon: <Server className="w-5 h-5 text-gray-400" /> },
        { name: "Supabase", icon: <Database className="w-5 h-5 text-green-400" /> },
      ],
    },
    {
      name: "web",
      icon: <Globe className="w-6 h-6" />,
      color: "from-blue-600 to-blue-800",
      gradient: "from-blue-500/20 via-blue-600/10 to-transparent",
      description: "Frameworks e bibliotecas para desenvolvimento web frontend",
      techs: [
        { name: "React", icon: <ReactIcon className="w-5 h-5 text-blue-400" /> },
        { name: "Tailwind CSS", icon: <Wind className="w-5 h-5 text-teal-400" /> },
        { name: "Next.js", icon: <FileCode className="w-5 h-5 text-gray-300" /> },
        { name: "shadcn/ui", icon: <Box className="w-5 h-5 text-blue-300" /> },
      ],
    },
    {
      name: "mobile",
      icon: <Smartphone className="w-6 h-6" />,
      color: "from-green-600 to-green-800",
      gradient: "from-green-500/20 via-green-600/10 to-transparent",
      description: "Tecnologias para desenvolvimento de aplicativos móveis",
      techs: [
        { name: "React Native", icon: <ReactIcon className="w-5 h-5 text-blue-400" /> },
        { name: "Expo", icon: <MobileIcon className="w-5 h-5 text-gray-300" /> },
        { name: "NativeBase", icon: <MobileIcon className="w-5 h-5 text-purple-400" /> },
      ],
    },
    {
      name: "design",
      icon: <Paintbrush className="w-6 h-6" />,
      color: "from-pink-600 to-pink-800",
      gradient: "from-pink-500/20 via-pink-600/10 to-transparent",
      description: "Ferramentas e conceitos para design de interfaces e experiência do usuário",
      techs: [
        { name: "Figma", icon: <Figma className="w-5 h-5 text-purple-400" /> },
        { name: "UI/UX Design", icon: <Monitor className="w-5 h-5 text-indigo-400" /> },
        { name: "Miro", icon: <PenTool className="w-5 h-5 text-orange-400" /> },
      ],
    },
    {
      name: "tools",
      icon: <Wrench className="w-6 h-6" />,
      color: "from-orange-600 to-orange-800",
      gradient: "from-orange-500/20 via-orange-600/10 to-transparent",
      description: "Ferramentas para produtividade e desenvolvimento de software",
      techs: [
        { name: "Android Studio", icon: <AndroidIcon className="w-5 h-5 text-green-500" /> },
        { name: "VS Code", icon: <Code className="w-5 h-5 text-blue-500" /> },
        { name: "Docker", icon: <Cloud className="w-5 h-5 text-blue-400" /> },
        { name: "Insomnia", icon: <Coffee className="w-5 h-5 text-purple-400" /> },
        { name: "GitHub", icon: <Github className="w-5 h-5 text-gray-300" /> },
        { name: "Notion", icon: <HardDrive className="w-5 h-5 text-gray-400" /> },
        { name: "Trello", icon: <Terminal className="w-5 h-5 text-blue-600" /> },
      ],
    },
  ]

  const currentCategory = categories.find((cat) => cat.name === activeCategory) || categories[0]

  // Background glow effects
  const glowPositions = ["top-1/4 left-1/4", "bottom-1/4 right-1/4", "top-3/4 right-1/3", "bottom-1/3 left-1/3"]

  return (
    <section id="tecnologias" className="py-20 relative overflow-hidden">
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
              <Layers className="w-4 h-4" /> Stack
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-purple-500"></div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 text-transparent bg-clip-text">
            Tecnologias
          </h2>
          <p className="text-base sm:text-lg text-center text-blue-200 mb-2 max-w-2xl mx-auto">
            Tecnologias organizadas por área de especialização.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
          {categories.map((category) => (
            <motion.button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all cursor-pointer ${
                activeCategory === category.name
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg shadow-${category.color.split(" ")[0]}/20`
                  : "bg-blue-950/30 hover:bg-blue-900/40 text-white/80 hover:text-white"
              }`}
              whileHover={{ scale: activeCategory === category.name ? 1.05 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={activeCategory === category.name ? "text-white" : "text-blue-300"}>{category.icon}</span>
              <span className="capitalize">{category.name}</span>
            </motion.button>
          ))}
        </div>

        <motion.div
          key={`description-${activeCategory}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-10"
        >
          <p className="text-blue-200 max-w-2xl mx-auto">{currentCategory.description}</p>
        </motion.div>

        <div className={`relative rounded-3xl p-8 mb-12 overflow-hidden bg-gradient-to-br ${currentCategory.gradient}`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-transparent to-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-transparent to-purple-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 relative z-10"
            >
              {currentCategory.techs.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="relative group cursor-pointer"
                  onHoverStart={() => setHoveredTech(tech.name)}
                  onHoverEnd={() => setHoveredTech(null)}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${currentCategory.color} rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300`}
                  ></div>
                  <div
                    className={`bg-gradient-to-br ${currentCategory.color} p-0.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative`}
                  >
                    <div className="bg-gradient-to-b from-black/90 to-black/70 backdrop-blur-sm h-full rounded-xl p-6 flex flex-col items-center justify-center text-center">
                      <div className="mb-3 p-3 bg-black/30 rounded-lg">{tech.icon}</div>
                      <h3 className="text-sm font-medium text-white">{tech.name}</h3>

                      {hoveredTech === tech.name && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute -top-1 -right-1"
                        >
                          <Sparkles className="w-4 h-4 text-yellow-400" />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}