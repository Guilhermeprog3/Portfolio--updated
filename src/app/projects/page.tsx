"use client"

import React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, ArrowUp, ExternalLink, Github, Code, Layers, Globe, Star, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { projectsData } from "@/lib/projects-data"
import { Project, ProjectCategory } from "@/lib/types"
import Image from "next/image"
import { StarryBackground } from "@/componentes/starry-background"
import { InteractiveParticles } from "@/componentes/interactive-particles"
import { Footer } from "@/componentes/footer"
import { ProjectsPageHeader } from "@/componentes/projects-header"
import { ProjectModal } from "@/componentes/projetct-modal"

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all")
  const [, setHoveredProject] = useState<string | null>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Todos os Projetos
            </h1>
            <div className="mt-6 md:mt-0 relative max-w-md w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-blue-300" />
              </div>
              <Input
                type="text"
                placeholder="Buscar projetos..."
                className="pl-10 bg-blue-950/20 border border-purple-900/50 text-white w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8 mt-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
                    : "bg-blue-950/30 text-blue-200 hover:bg-blue-900/40"
                }`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>

          {activeCategory === "all" && (
            <div className="mb-16">
              <h3 className="text-xl text-purple-300 mb-6 font-medium flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" /> Projetos em Destaque
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
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
                      className={`h-64 sm:h-72 ${project.image} rounded-lg overflow-hidden relative group-hover:shadow-[0_0_25px_rgba(139,92,246,0.3)] transition-all duration-300`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 flex items-end justify-start p-6">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                          <p className="text-blue-200 mb-4 line-clamp-2">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tech.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="text-xs bg-purple-900/60 text-purple-200 px-2 py-1 rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.tech.length > 3 && (
                              <span className="text-xs bg-blue-900/60 text-blue-200 px-2 py-1 rounded-full">
                                +{project.tech.length - 3}
                              </span>
                            )}
                          </div>
                          <div className="flex gap-3">
                            {project.demoUrl && (
                              <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm bg-purple-600/80 hover:bg-purple-600 text-white flex items-center gap-1 px-3 py-1 rounded-full transition-colors"
                              >
                                <ExternalLink className="w-4 h-4" /> Demo
                              </a>
                            )}
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm bg-blue-800/80 hover:bg-blue-800 text-white flex items-center gap-1 px-3 py-1 rounded-full transition-colors"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <Card className="bg-blue-950/20 border border-purple-900/50 backdrop-blur-sm overflow-hidden h-full transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:translate-y-[-5px]">
                  <CardContent className="p-0">
                    <div className={`relative ${project.image.startsWith("bg-gradient") ? project.image : ""}`}>
                      {!project.image.startsWith("bg-gradient") ? (
                        <>
                          <div className="h-48 w-full overflow-hidden">
                            <Image
                              src={project.image || "/placeholder.svg"}
                              alt={project.title}
                              width={500}
                              height={300}
                              className="w-full h-full object-cover object-top"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent group-hover:from-black/90 transition-all duration-300">
                            <div className="absolute bottom-0 left-0 p-4 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              {project.tech.slice(0, 3).map((tech) => (
                                <span
                                  key={tech}
                                  className="text-xs bg-purple-900/60 text-purple-200 px-2 py-1 rounded-full"
                                >
                                  {tech}
                                </span>
                              ))}
                              {project.tech.length > 3 && (
                                <span className="text-xs bg-blue-900/60 text-blue-200 px-2 py-1 rounded-full">
                                  +{project.tech.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="h-48 w-full flex items-center justify-center p-4">
                          <div className="flex flex-wrap gap-2 justify-center">
                            {project.tech.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="text-xs bg-purple-900/60 text-purple-200 px-2 py-1 rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.tech.length > 3 && (
                              <span className="text-xs bg-blue-900/60 text-blue-200 px-2 py-1 rounded-full">
                                +{project.tech.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-bold mb-2 text-purple-300 group-hover:text-purple-200 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-blue-100 mb-4 text-sm ">{project.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-3">
                          {project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs bg-purple-600/80 hover:bg-purple-600 text-white flex items-center gap-1 px-2 py-1 rounded-full transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="w-3 h-3" />
                              Demo
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs bg-blue-800/80 hover:bg-blue-800 text-white flex items-center gap-1 px-2 py-1 rounded-full transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Github className="w-3 h-3" />
                              Código
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
          {filteredProjects.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <Search className="w-12 h-12 text-purple-400/50 mb-4" />
              <h3 className="text-xl font-medium text-purple-300 mb-2">Nenhum projeto encontrado</h3>
              <p className="text-blue-200 max-w-md">
                Não encontramos nenhum projeto que corresponda aos seus critérios de busca. Tente outros termos ou
                categorias.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("")
                  setActiveCategory("all")
                }}
                className="mt-6 flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Limpar filtros
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg shadow-purple-900/20 transition-colors"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}

      {selectedProject && (
        <ProjectModal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} project={selectedProject} />
      )}
    </div>
  )
}