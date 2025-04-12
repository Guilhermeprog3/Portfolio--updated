"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "sobre", "habilidades", "tecnologias", "projetos", "contato"]

      for (const section of sections) {
        const element = document.getElementById(section)
        if (!element) continue

        const rect = element.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-sm border-b border-purple-900/30">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 text-transparent bg-clip-text w-1/4">
          Guilherme Silva Rios
        </div>

        <nav className="hidden md:flex justify-center items-center w-2/4">
          <div className="flex space-x-8">
            {["Home", "Sobre", "Habilidades", "Tecnologias", "Projetos", "Contato"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className={`transition-colors hover:text-purple-400 ${
                  activeSection === item.toLowerCase().replace(" ", "-") ? "text-purple-400 font-medium" : "text-white"
                }`}
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        <div className="flex items-center justify-end gap-2 w-1/4">
          <a
            href="https://portifolio-taupe-two-68.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-blue-900/50 hover:bg-blue-800/60 text-white rounded-md border border-blue-700/50 text-sm transition-colors"
          >
            v1
          </a>

          <Button variant="ghost" size="icon" className="md:hidden ml-2 text-white" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-purple-900/30">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {["Home", "Sobre", "Habilidades", "Tech Stack", "Projetos", "Contato"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className={`transition-colors hover:text-purple-400 text-center ${
                  activeSection === item.toLowerCase().replace(" ", "-") ? "text-purple-400 font-medium" : "text-white"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
