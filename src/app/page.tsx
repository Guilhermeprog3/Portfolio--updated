"use client"

import { Header } from "@/componentes/header"
import { HeroSection } from "@/componentes/hero-section"
import { AboutSection } from "@/componentes/about-section"
import { SkillsSection } from "@/componentes/skills-section"
import { TechStack } from "@/componentes/tech-stack"
import { ProjectsSection } from "@/componentes/projects-section"
import { ContactSection } from "@/componentes/contact-section"
import { Footer } from "@/componentes/footer"
import { StarryBackground } from "@/componentes/starry-background"
import { InteractiveParticles } from "@/componentes/interactive-particles"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0">
          <StarryBackground />
        </div>
      </div>

      <InteractiveParticles />

      <Header />

      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <TechStack />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}
