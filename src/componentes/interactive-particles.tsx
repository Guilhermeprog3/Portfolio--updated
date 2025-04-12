"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  originalSize: number
  color: string
  hovered: boolean
}

export function InteractiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0, radius: 80 })
  const animationFrameIdRef = useRef<number | null>(null)

  const initParticles = (canvas: HTMLCanvasElement) => {
    const particles: Particle[] = []
    const numberOfParticles = (canvas.width * canvas.height) / 30000
    const colors = ["#8b5cf6", "#3b82f6", "#ffffff"]

    for (let i = 0; i < numberOfParticles; i++) {
      const size = Math.random() * 1.5 + 0.5
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: size,
        originalSize: size,
        color: colors[Math.floor(Math.random() * colors.length)],
        hovered: false,
      })
    }

    particlesRef.current = particles
  }

  const drawParticle = (ctx: CanvasRenderingContext2D, p: Particle) => {
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.closePath()

    if (p.hovered) {
      ctx.shadowBlur = 15
      ctx.shadowColor = p.color
    } else {
      ctx.shadowBlur = 0
    }

    ctx.fillStyle = p.color
    ctx.fill()
  }

  const checkHover = (p: Particle) => {
    const mouse = mouseRef.current
    const dx = mouse.x - p.x
    const dy = mouse.y - p.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < mouse.radius) {
      p.hovered = true
      p.size = p.originalSize * 2
    } else {
      p.hovered = false
      p.size = p.originalSize
    }
  }

  const connectParticles = (ctx: CanvasRenderingContext2D) => {
    const particles = particlesRef.current
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const opacity = particles[i].hovered || particles[j].hovered ? 0.5 : 0.2 * (1 - distance / 100)

          ctx.beginPath()
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
          ctx.lineWidth = 0.2
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }
  }

  const animate = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particlesRef.current.forEach((p) => {
      checkHover(p)
      drawParticle(ctx, p)
    })

    connectParticles(ctx)
    animationFrameIdRef.current = requestAnimationFrame(() => animate(ctx, canvas))
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles(canvas)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    handleResize()
    animate(ctx, canvas)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-10 pointer-events-none" />
}
