"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, ExternalLink, Github, Code, Layers, Globe, Star, Search } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { projectsData } from "@/lib/projects-data"
import type { ProjectCategory } from "@/lib/projects-data"
import { StarryBackground } from "@/componentes/starry-background"
import { InteractiveParticles } from "@/componentes/interactive-particles"
import { Footer } from "@/componentes/footer"
import { ProjectsPageHeader } from "@/componentes/projects-header"

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all")
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  const filteredProjects = projectsData.filter(
    (project) =>
      (activeCategory === "all" || project.category.includes(activeCategory)) &&
      (project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()))),
  )

  const featuredProjects = projectsData.filter((project) => project.featured)

  const categories: { id: ProjectCategory; name: string; icon: React.ReactNode }[] = [
    { id: "all", name: "Todos", icon: <Layers className="w-4 h-4" /> },
    { id: "web", name: "Web", icon: <Globe className="w-4 h-4" /> },
    { id: "mobile", name: "Mobile", icon: <Star className="w-4 h-4" /> },
    { id: "backend", name: "Backend", icon: <Code className="w-4 h-4" /> },
    { id: "design", name: "Design", icon: <Layers className="w-4 h-4" /> },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0">
          <StarryBackground />
        </div>
      </div>

      <InteractiveParticles />

      <ProjectsPageHeader />

      <main className="relative z-10 pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                Todos os Projetos
              </h1>
            </div>

            <div className="mt-6 md:mt-0 relative max-w-md w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-blue-300" />
              </div>
              <Input
                type="text"
                placeholder="Buscar projetos por nome, descrição ou tecnologia..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-blue-950/20 border border-purple-900/50 text-white"
              />
            </div>
          </div>

          {activeCategory === "all" && (
            <div className="mb-16">
              <h3 className="text-xl text-purple-300 mb-6 font-medium">Projetos em Destaque</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredProjects.slice(0, 2).map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                    onHoverStart={() => setHoveredProject(project.title)}
                    onHoverEnd={() => setHoveredProject(null)}
                  >
                    <div
                      className={`h-64 ${project.image} rounded-lg overflow-hidden relative group-hover:shadow-[0_0_25px_rgba(139,92,246,0.3)] transition-all duration-300`}
                    >
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-6">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                          <p className="text-blue-200 mb-4">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tech.map((tech) => (
                              <span
                                key={tech}
                                className="text-xs bg-purple-900/60 text-purple-200 px-2 py-1 rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-3">
                            {project.demoUrl && (
                              <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-white flex items-center gap-1 hover:text-purple-300 transition-colors"
                              >
                                <ExternalLink className="w-4 h-4" /> Demo
                              </a>
                            )}
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-white flex items-center gap-1 hover:text-purple-300 transition-colors"
                              >
                                <Github className="w-4 h-4" /> Código
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                    : "bg-blue-950/30 hover:bg-blue-900/40 text-white/70"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.icon}
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="bg-blue-950/20 border border-purple-900/50 backdrop-blur-sm overflow-hidden h-full transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                    <CardContent className="p-0">
                      <div className={`h-32 ${project.image} relative`}>
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex flex-wrap gap-2 justify-center p-4">
                            {project.tech.map((tech) => (
                              <span
                                key={tech}
                                className="text-xs bg-purple-900/60 text-purple-200 px-2 py-1 rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 text-purple-300 group-hover:text-purple-200 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-blue-100 mb-4 text-sm">{project.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex gap-3">
                            {project.demoUrl && (
                              <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-white flex items-center gap-1 hover:text-purple-300 transition-colors"
                              >
                                <ExternalLink className="w-3 h-3" /> Demo
                              </a>
                            )}
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-white flex items-center gap-1 hover:text-purple-300 transition-colors"
                              >
                                <Github className="w-3 h-3" /> Código
                              </a>
                            )}
                          </div>
                          <motion.div
                            animate={{ x: 0 }}
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 300, damping: 10 }}
                          >
                            <ArrowRight className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-blue-300 text-lg">Nenhum projeto encontrado para "{searchQuery}"</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
