export function Footer() {
  const lastModifiedDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <footer className="py-6 relative z-10">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
      <div className="container mx-auto px-4 text-center">
        <p className="text-blue-300">© {new Date().getFullYear()} Guilherme Rios. Todos os direitos reservados.</p>
        <p className="text-blue-400/70 text-sm mt-1">Última atualização: {lastModifiedDate}</p>
      </div>
    </footer>
  )
}