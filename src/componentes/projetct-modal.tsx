"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { X, ChevronLeft, ChevronRight, ExternalLink, Github, ListChecks, Cpu, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Project } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: Project
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0)
    }
  }, [isOpen])
  
  const images = project.images?.length ? project.images : [project.image]
  const hasMultipleImages = images.length > 1

  const changeImage = (newIndex: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentImageIndex(newIndex)
    setTimeout(() => setIsAnimating(false), 500)
  }
  
  const nextImage = () => {
    changeImage((currentImageIndex + 1) % images.length)
  }

  const prevImage = () => {
    changeImage((currentImageIndex - 1 + images.length) % images.length)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      {/* --- MUDANÇA PRINCIPAL: Layout vertical e largura ajustada --- */}
      <DialogContent 
        className="max-w-3xl w-[95vw] h-[90vh] bg-gray-900/50 backdrop-blur-xl border border-purple-800/40 rounded-2xl p-0 flex flex-col shadow-2xl shadow-purple-900/20 overflow-hidden"
      >
        <DialogTitle className="sr-only">{project.title}</DialogTitle>

        {/* --- Coluna da Imagem (AGORA EM CIMA) --- */}
        <div className="w-full h-[40%] md:h-[45%] relative overflow-hidden rounded-t-2xl flex-shrink-0 group">
          {images.map((src, index) => (
            <Image
              key={src || index}
              src={src || "/placeholder.svg"}
              alt={`${project.title} - Imagem ${index + 1}`}
              fill
              className={cn(
                "object-cover transition-opacity duration-500 ease-in-out",
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              )}
              priority={index === 0}
            />
          ))}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

          {hasMultipleImages && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full z-10 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                onClick={prevImage}
                aria-label="Imagem anterior"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full z-10 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                onClick={nextImage}
                aria-label="Próxima imagem"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-2.5 h-2.5 rounded-full transition-all duration-300",
                      index === currentImageIndex ? "bg-white scale-125" : "bg-white/40 hover:bg-white/70"
                    )}
                    onClick={() => changeImage(index)}
                    aria-label={`Ir para imagem ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* --- Seção de Detalhes (AGORA EMBAIXO E ROLÁVEL) --- */}
        <div className="w-full flex-1 flex flex-col p-6 md:p-8 overflow-y-auto relative scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-800/50 hover:scrollbar-thumb-purple-700">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            // Este botão agora está posicionado em relação a esta seção de detalhes
            className="absolute top-4 right-4 bg-black/30 hover:bg-black/60 text-gray-300 hover:text-white rounded-full z-50 transition-colors"
            aria-label="Fechar modal"
          >
            <X className="h-5 w-5" />
          </Button>

          <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 text-transparent bg-clip-text mb-3 pr-10">
            {project.title}
          </h2>
          <p className="text-gray-300 mb-6 text-base leading-relaxed">{project.description}</p>

          <div className="space-y-6 flex-grow">
            {project.functionalities && project.functionalities.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-purple-300 mb-3 flex items-center gap-2"><ListChecks className="w-5 h-5"/> Funcionalidades</h3>
                <ul className="space-y-2.5">
                  {project.functionalities.map((func, index) => (
                    <li key={index} className="text-gray-300/90 text-sm flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span>{func}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold text-purple-300 mb-3 flex items-center gap-2"><Cpu className="w-5 h-5"/> Tecnologias</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="bg-blue-900/60 text-blue-200 text-xs font-medium px-3 py-1.5 rounded-full border border-blue-700/60 transition-colors hover:bg-blue-900 hover:border-blue-600 cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-auto pt-8 flex flex-col sm:flex-row gap-4">
            {project.demoUrl && project.demoUrl !== "#" && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-transform hover:scale-105">
                  <ExternalLink className="w-4 h-4 mr-2"/>
                  Ver Demo
                </Button>
              </a>
            )}
             {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="outline" className="w-full border-purple-700 text-purple-300 hover:bg-purple-900/40 hover:text-purple-200 hover:border-purple-600 font-semibold transition-transform hover:scale-105">
                  <Github className="w-4 h-4 mr-2"/>
                  Código Fonte
                </Button>
              </a>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}