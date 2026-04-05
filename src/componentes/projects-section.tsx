"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ExternalLink, Github, FolderKanban, Sparkles } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { projectsData } from "@/lib/projects-data"
import { ProjectModal } from "@/componentes/projetct-modal"
import Image from "next/image"
import { Project } from "@/lib/types"

function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let animId: number
    const stars: { x: number; y: number; r: number; o: number; speed: number }[] = []
    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      stars.length = 0
      for (let i = 0; i < 130; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.2 + 0.2,
          o: Math.random(),
          speed: Math.random() * 0.004 + 0.001,
        })
      }
    }
    resize()
    window.addEventListener("resize", resize)
    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t++
      stars.forEach((s) => {
        const opacity = 0.12 + 0.5 * Math.abs(Math.sin(t * s.speed + s.o * 10))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180,190,255,${opacity})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section
      id="projetos"
      className="py-20 relative overflow-hidden"
      style={{ background: "#050816" }}
    >
      <StarField />

      {/* Border lines */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(139,92,246,0.4),transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(99,102,241,0.4),transparent)" }} />

      {/* Ambient globs */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)", filter: "blur(40px)", borderRadius: "50%" }} />
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(192,132,252,0.06) 0%, transparent 70%)", filter: "blur(40px)", borderRadius: "50%" }} />

      <div className="container mx-auto px-4 py-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: "linear-gradient(90deg,transparent,#6366f1)" }} />
            <span className="text-indigo-400 text-[11px] font-medium uppercase tracking-[0.2em] flex items-center gap-2"
              style={{ fontFamily: "'DM Mono', monospace" }}>
              <FolderKanban className="w-3.5 h-3.5" /> Portfólio
            </span>
            <div className="h-px w-12" style={{ background: "linear-gradient(90deg,#8b5cf6,transparent)" }} />
          </div>
          <h2
            className="font-black leading-tight pb-1 text-center"
            style={{
              fontSize: "clamp(32px,5.5vw,48px)",
              fontFamily: "'Syne', sans-serif",
              background: "linear-gradient(135deg,#818cf8,#c084fc,#67e8f9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Projetos
          </h2>
          <div className="w-20 h-[3px] mx-auto mt-4 mb-4 rounded-full"
            style={{ background: "linear-gradient(90deg,#6366f1,#8b5cf6)" }} />
          <p className="text-center max-w-xl mx-auto" style={{ color: "rgba(148,163,184,0.6)", fontSize: "clamp(13px,1.5vw,15px)" }}>
            Conheça alguns dos meus trabalhos mais recentes e relevantes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.slice(0, 6).map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -6 }}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <Card className="overflow-hidden h-full rounded-xl transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(99,102,241,0.15)",
                  backdropFilter: "blur(8px)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 12px 40px rgba(99,102,241,0.18)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                <CardContent className="p-0">
                  <div className={`relative ${project.image.startsWith("bg-gradient") ? project.image : ""}`}>
                    {!project.image.startsWith("bg-gradient") ? (
                      <>
                        <div className="h-52 w-full overflow-hidden">
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            width={500}
                            height={300}
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 group-hover:from-black/90 transition-all duration-300 flex items-end justify-start p-4">
                          <div className="flex flex-wrap gap-2">
                            {project.tech.slice(0, 3).map((tech) => (
                              <span key={tech} className="text-xs px-2 py-1 rounded-full"
                                style={{ background: "rgba(99,102,241,0.5)", color: "#c4b5fd" }}>
                                {tech}
                              </span>
                            ))}
                            {project.tech.length > 3 && (
                              <span className="text-xs px-2 py-1 rounded-full"
                                style={{ background: "rgba(139,92,246,0.4)", color: "#ddd6fe" }}>
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
                            <span key={tech} className="text-xs px-2 py-1 rounded-full"
                              style={{ background: "rgba(99,102,241,0.4)", color: "#c4b5fd" }}>
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span className="text-xs px-2 py-1 rounded-full"
                              style={{ background: "rgba(139,92,246,0.4)", color: "#ddd6fe" }}>
                              +{project.tech.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {project.featured && (
                      <div className="absolute top-3 right-3 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1"
                        style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", boxShadow: "0 0 12px rgba(99,102,241,0.4)" }}>
                        <Sparkles className="w-3 h-3" /> Destaque
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-white transition-colors group-hover:text-indigo-300"
                      style={{ fontFamily: "'Syne', sans-serif" }}>
                      {project.title}
                    </h3>
                    <p className="mb-4 text-sm line-clamp-3" style={{ color: "rgba(148,163,184,0.7)" }}>
                      {project.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        {project.demoUrl && project.demoUrl !== "#" && (
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                            className="text-xs text-white flex items-center gap-1 px-3 py-1 rounded-full transition-all duration-200"
                            style={{ background: "rgba(99,102,241,0.6)" }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(99,102,241,0.9)")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(99,102,241,0.6)")}
                            onClick={(e) => e.stopPropagation()}>
                            <ExternalLink className="w-3 h-3" /> Demo
                          </a>
                        )}
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                            className="text-xs text-white flex items-center gap-1 px-3 py-1 rounded-full transition-all duration-200"
                            style={{ background: "rgba(139,92,246,0.4)", border: "1px solid rgba(139,92,246,0.3)" }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(139,92,246,0.7)")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(139,92,246,0.4)")}
                            onClick={(e) => e.stopPropagation()}>
                            <Github className="w-3 h-3" /> Código
                          </a>
                        )}
                      </div>
                      <ArrowRight className="w-4 h-4 text-indigo-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
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
          <Button asChild className="text-white px-8 py-6 rounded-full transition-all duration-300 hover:scale-[1.03]"
            style={{
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              boxShadow: "0 0 30px rgba(99,102,241,0.3)",
              fontFamily: "'Syne', sans-serif",
            }}>
            <Link href="/projects" className="flex items-center gap-2 text-base">
              Ver Todos os Projetos <ArrowRight className="w-4 h-4" />
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