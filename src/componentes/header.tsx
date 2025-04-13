"use client"

import { useState, useEffect } from "react"
import { Menu, X, ChevronDown, GraduationCap, Home, User, Code, Layers, FolderKanban, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)

  const navItems = [
    { name: "Home", id: "home", icon: <Home className="w-4 h-4" /> },
    { name: "Sobre", id: "sobre", icon: <User className="w-4 h-4" /> },
    { name: "Formação", id: "formacao", icon: <GraduationCap className="w-4 h-4" /> },
    { name: "Habilidades", id: "habilidades", icon: <Code className="w-4 h-4" /> },
    { name: "Tecnologias", id: "tecnologias", icon: <Layers className="w-4 h-4" /> },
    { name: "Projetos", id: "projetos", icon: <FolderKanban className="w-4 h-4" /> },
    { name: "Contato", id: "contato", icon: <Mail className="w-4 h-4" /> },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY

      // Handle header visibility on scroll
      const isScrolledDown = prevScrollPos < currentScrollPos
      const isScrolledUp = prevScrollPos > currentScrollPos
      const isAtTop = currentScrollPos < 10

      if (isScrolledDown && currentScrollPos > 80 && !mobileMenuOpen) {
        setVisible(false)
      } else if (isScrolledUp || isAtTop) {
        setVisible(true)
      }

      setPrevScrollPos(currentScrollPos)

      // Handle background change
      if (currentScrollPos > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // Handle active section
      for (const item of navItems) {
        const element = document.getElementById(item.id)
        if (!element) continue

        const rect = element.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(item.id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [navItems, prevScrollPos, mobileMenuOpen])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    if (!mobileMenuOpen) {
      setVisible(true)
    }
  }

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-purple-900/30 py-2 shadow-lg shadow-purple-900/5"
          : "bg-black/60 backdrop-blur-sm py-4",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <motion.div
          className="flex-shrink-0 mr-4"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <h1 className="font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 text-transparent bg-clip-text">
            <span className="hidden sm:inline text-2xl">Guilherme Silva Rios</span>
            <span className="inline sm:hidden text-2xl">GR</span>
          </h1>
        </motion.div>

        <nav className="hidden md:flex flex-grow justify-center items-center">
          <div className="flex flex-wrap justify-center gap-x-1 lg:gap-x-2">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(item.id)
                }}
                className={cn(
                  "transition-all hover:text-purple-400 py-2 px-3 relative rounded-full group flex items-center gap-2",
                  activeSection === item.id
                    ? "text-white font-medium bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-purple-500/30"
                    : "text-blue-100 hover:bg-blue-900/20",
                )}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span
                  className={cn(
                    "transition-colors",
                    activeSection === item.id ? "text-purple-400" : "text-blue-400 group-hover:text-purple-400",
                  )}
                >
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </motion.a>
            ))}
          </div>
        </nav>

        <div className="flex items-center gap-3 flex-shrink-0">
          <motion.a
            whileHover={{ scale: 1.05, backgroundColor: "rgba(30, 64, 175, 0.6)" }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            href="https://portifolio-taupe-two-68.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 bg-blue-900/50 text-white rounded-full border border-blue-700/50 text-sm transition-all whitespace-nowrap flex items-center gap-1 shadow-sm shadow-blue-900/30"
          >
            <span>v1</span>
            <ChevronDown className="w-3 h-3 opacity-70" />
          </motion.a>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "md:hidden text-white transition-all",
              mobileMenuOpen ? "bg-purple-900/50" : "hover:bg-purple-900/30",
            )}
            onClick={toggleMobileMenu}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mobileMenuOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: mobileMenuOpen ? -90 : 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: mobileMenuOpen ? 90 : -90 }}
                transition={{ duration: 0.2 }}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.div>
            </AnimatePresence>
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-b border-purple-900/30 bg-gradient-to-b from-black/95 to-blue-950/95"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.id)
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "transition-colors hover:text-purple-400 py-3 px-4 flex items-center gap-3",
                    activeSection === item.id
                      ? "text-purple-400 font-medium bg-purple-900/20 rounded-lg border-l-4 border-purple-500"
                      : "text-white border-l-4 border-transparent",
                  )}
                >
                  <span className={cn(activeSection === item.id ? "text-purple-400" : "text-blue-400")}>
                    {item.icon}
                  </span>
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
