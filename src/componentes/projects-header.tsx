"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ProjectsPageHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-sm border-b border-purple-900/30">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 text-transparent bg-clip-text">
          <span className="hidden sm:inline text-2xl">Guilherme Silva Rios</span>
          <span className="sm:hidden text-xl">GR</span>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-blue-300 hover:text-purple-300 hover:bg-transparent"
          >
            <Link href="/">Voltar ao Início</Link>
          </Button>

          <a
            href="https://v1.joaosilva.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-blue-900/50 hover:bg-blue-800/60 text-white rounded-md border border-blue-700/50 text-sm transition-colors"
          >
            v1
          </a>
        </div>
      </div>
    </header>
  )
}
