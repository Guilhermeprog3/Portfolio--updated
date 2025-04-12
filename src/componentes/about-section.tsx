import { Moon } from "lucide-react"

export function AboutSection() {
  return (
    <section id="sobre" className="py-20 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      <div className="container mx-auto px-4 py-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Sobre Mim
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-blue-700 p-1">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                <Moon className="w-32 h-32 text-purple-400" />
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <p className="text-lg mb-4 text-blue-100">
              Olá! Sou um desenvolvedor Full Stack apaixonado por desenvolvimento web, mobile e desktop.
            </p>
            <p className="text-lg mb-4 text-blue-100">
              Com experiência em desenvolvimento front-end e back-end, trabalho com as tecnologias mais modernas para
              entregar projetos de alta qualidade.
            </p>
            <p className="text-lg text-blue-100">
              Meu objetivo é transformar ideias em realidade digital, Minha dedicação e capacidade de resolução de problemas me
               tornam um talento promissor na indústria de tecnologia.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
