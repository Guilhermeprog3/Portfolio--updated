"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  Server,
  Globe,
  Smartphone,
  Wrench,
  Paintbrush,
  CodepenIcon as ReactIcon,
  Train,
  FileCode,
  Wind,
  Database,
  GitBranch,
  Figma,
  Monitor,
  Cpu,
  Cloud,
  Github,
  Terminal,
  Smartphone as AndroidIcon,
  Code,
  Coffee,
  HardDrive,
  Box,
  Smartphone as MobileIcon,
  PenTool,
} from "lucide-react"

type TechCategory = {
  name: string
  icon: React.ReactNode
  color: string
  techs: {
    name: string
    icon: React.ReactNode
  }[]
}

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState("backend")

  const categories: TechCategory[] = [
    {
      name: "backend",
      icon: <Server className="w-6 h-6" />,
      color: "from-purple-600 to-purple-800",
      techs: [
        { name: "AdonisJS", icon: <Server className="w-5 h-5 text-yellow-500" /> },
        { name: "NestJS", icon: <Server className="w-5 h-5 text-red-500" /> },
        { name: "Node.js", icon: <Server className="w-5 h-5 text-green-500" /> },
        { name: "PostgreSQL", icon: <Database className="w-5 h-5 text-blue-700" /> },
        { name: "Express", icon: <Server className="w-5 h-5 text-gray-400" /> },
      ],
    },
    {
      name: "web",
      icon: <Globe className="w-6 h-6" />,
      color: "from-blue-600 to-blue-800",
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

  return (
    <section id="tech-stack" className="py-20 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      <div className="container mx-auto px-4 py-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Tech Stack
        </h2>
        <p className="text-center text-blue-300 mb-12 max-w-2xl mx-auto">
          Tecnologias organizadas por área de especialização.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                activeCategory === category.name
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                  : "bg-blue-950/30 hover:bg-blue-900/40 text-white/70"
              }`}
              whileHover={{ scale: activeCategory === category.name ? 1.05 : 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.icon}
              <span className="capitalize">{category.name}</span>
            </motion.button>
          ))}
        </div>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {currentCategory.techs.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`bg-gradient-to-br ${currentCategory.color} p-0.5 rounded-lg shadow-lg hover:shadow-xl transition-all`}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="bg-black/80 h-full rounded-lg p-6 flex flex-col items-center justify-center text-center">
                <div className="mb-3 text-white">{tech.icon}</div>
                <h3 className="text-sm font-medium text-white">{tech.name}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}