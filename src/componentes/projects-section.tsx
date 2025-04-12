"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { projectsData } from "@/lib/projects-data"

export function ProjectsSection() {
  return (
    <section id="projetos" className="py-20 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      <div className="container mx-auto px-4 py-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Projetos
        </h2>
        <p className="text-center text-blue-300 mb-12 max-w-2xl mx-auto">
          Conheça alguns dos meus trabalhos mais recentes e relevantes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.slice(0, 6).map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="bg-blue-950/20 border border-purple-900/50 backdrop-blur-sm overflow-hidden h-full transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                <CardContent className="p-0">
                  <div className={`h-32 ${project.image} relative`}>
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex flex-wrap gap-2 justify-center p-4">
                        {project.tech.map((tech) => (
                          <span key={tech} className="text-xs bg-purple-900/60 text-purple-200 px-2 py-1 rounded-full">
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
                            <span className="sr-only">Demo</span>
                            Demo
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-white flex items-center gap-1 hover:text-purple-300 transition-colors"
                          >
                            <span className="sr-only">Código</span>
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

        <div className="mt-12 text-center">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6">
            <Link href="/projects" className="flex items-center gap-2">
              Ver Todos os Projetos <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
