"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ExternalLink, Github, FolderKanban, Sparkles } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { projectsData } from "@/lib/projects-data"
import { ProjectModal } from "@/componentes/projetct-modal"

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<any | null>(null)
  const glowPositions = ["top-1/4 right-1/4", "bottom-1/4 left-1/4", "top-3/4 left-1/3", "bottom-1/3 right-1/3"]

  return (
    <section id="projetos" className="py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

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
              <FolderKanban className="w-4 h-4" /> Portfólio
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-purple-500"></div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 text-transparent bg-clip-text">
            Projetos
          </h2>
          <p className="text-base sm:text-lg text-center text-blue-200 mb-2 max-w-2xl mx-auto">
            Conheça alguns dos meus trabalhos mais recentes e relevantes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.slice(0, 6).map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8 }}
              className="group"
              onClick={() => setSelectedProject(project)}
            >
              <Card className="bg-gradient-to-br from-blue-950/20 to-purple-950/20 border border-purple-900/50 backdrop-blur-sm overflow-hidden h-full transition-all duration-300 group-hover:shadow-[0_10px_25px_rgba(139,92,246,0.2)] rounded-xl cursor-pointer">
                <CardContent className="p-0">
                  <div className={`relative ${project.image.startsWith("bg-gradient") ? project.image : ""}`}>
                    {!project.image.startsWith("bg-gradient") ? (
                      <>
                        <div className="h-52 w-full overflow-hidden">
                          <img
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 group-hover:from-black/90 group-hover:to-black/40 transition-all duration-300 flex items-end justify-start p-4">
                          <div className="flex flex-wrap gap-2">
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
                      <div className="h-52 w-full flex items-center justify-center p-4">
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

                    {project.featured && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                        <Sparkles className="w-3 h-3" /> Destaque
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-purple-200 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-blue-100 mb-4 text-sm line-clamp-3">{project.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-3">
                        {project.demoUrl && project.demoUrl !== "#" && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs bg-purple-600/80 hover:bg-purple-600 text-white flex items-center gap-1 px-3 py-1 rounded-full transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-3 h-3" /> Demo
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs bg-blue-800/80 hover:bg-blue-800 text-white flex items-center gap-1 px-3 py-1 rounded-full transition-colors"
                            onClick={(e) => e.stopPropagation()}
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

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Button
            asChild
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 rounded-full shadow-lg shadow-purple-900/20 hover:shadow-xl hover:shadow-purple-900/30 transition-all"
          >
            <Link href="/projects" className="flex items-center gap-2 text-base">
              Ver Todos os Projetos <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>

      {selectedProject && (
        <ProjectModal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} project={selectedProject} />
      )}
    </section>
  )
}
