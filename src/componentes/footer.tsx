"use client"

import { useRef, useEffect } from "react"

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
      for (let i = 0; i < 60; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.0 + 0.15,
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
        const opacity = 0.1 + 0.4 * Math.abs(Math.sin(t * s.speed + s.o * 10))
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

export function Footer() {
  const lastModifiedDate = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

  return (
    <footer className="py-6 relative z-10 overflow-hidden" style={{ background: "#050816" }}>
      <StarField />

      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(99,102,241,0.4),transparent)" }}
      />

      <div className="container mx-auto px-4 text-center relative z-10">
        <p style={{ color: "rgba(148,163,184,0.55)", fontFamily: "'DM Mono', monospace", fontSize: 12 }}>
          © {new Date().getFullYear()} Guilherme Rios. Todos os direitos reservados.
        </p>
        <p style={{ color: "rgba(99,102,241,0.45)", fontFamily: "'DM Mono', monospace", fontSize: 11, marginTop: 4 }}>
          Última atualização: {lastModifiedDate}
        </p>
      </div>
    </footer>
  )
}