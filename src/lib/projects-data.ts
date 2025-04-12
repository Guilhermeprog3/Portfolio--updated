export type ProjectCategory = "all" | "web" | "mobile" | "backend" | "design"

export type Project = {
  title: string
  description: string
  tech: string[]
  image: string
  category: ProjectCategory[]
  demoUrl?: string
  githubUrl?: string
  featured: boolean
}

export const projectsData: Project[] = [
  {
    title: "E-commerce App",
    description: "Plataforma de e-commerce completa com pagamentos, carrinho e painel de administração.",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "bg-gradient-to-br from-blue-600 to-purple-800",
    category: ["web", "backend"],
    demoUrl: "https://ecommerce.example.com",
    githubUrl: "https://github.com/joaosilva/ecommerce",
    featured: true,
  },
  {
    title: "Sistema de Gestão",
    description: "Sistema para gerenciamento de recursos empresariais com dashboard analítico.",
    tech: ["TypeScript", "React", "PostgreSQL", "Chart.js"],
    image: "bg-gradient-to-br from-purple-600 to-indigo-800",
    category: ["web", "backend"],
    demoUrl: "https://erp.example.com",
    githubUrl: "https://github.com/joaosilva/erp-system",
    featured: true,
  },
  {
    title: "App de Finanças",
    description: "Aplicativo para controle financeiro pessoal com gráficos e relatórios.",
    tech: ["React Native", "Firebase", "Redux"],
    image: "bg-gradient-to-br from-green-600 to-teal-800",
    category: ["mobile"],
    demoUrl: "https://finance.example.com",
    githubUrl: "https://github.com/joaosilva/finance-app",
    featured: false,
  },
  {
    title: "Rede Social",
    description: "Plataforma de rede social com feed personalizado e mensagens em tempo real.",
    tech: ["Ruby on Rails", "React", "PostgreSQL", "WebSockets"],
    image: "bg-gradient-to-br from-pink-600 to-red-800",
    category: ["web", "backend"],
    demoUrl: "https://social.example.com",
    githubUrl: "https://github.com/joaosilva/social-network",
    featured: true,
  },
  {
    title: "Blog Tech",
    description: "Blog sobre tecnologia com sistema de comentários e painel administrativo.",
    tech: ["Next.js", "Tailwind CSS", "Prisma", "Vercel"],
    image: "bg-gradient-to-br from-cyan-600 to-blue-800",
    category: ["web", "design"],
    demoUrl: "https://blog.example.com",
    githubUrl: "https://github.com/joaosilva/tech-blog",
    featured: false,
  },
  {
    title: "API RESTful",
    description: "API completa para integração de serviços com autenticação JWT.",
    tech: ["Node.js", "Express", "MongoDB", "JWT"],
    image: "bg-gradient-to-br from-yellow-600 to-orange-800",
    category: ["backend"],
    githubUrl: "https://github.com/joaosilva/rest-api",
    featured: false,
  },
  {
    title: "Aplicativo de Delivery",
    description: "App para entrega de comida com rastreamento em tempo real.",
    tech: ["Flutter", "Firebase", "Google Maps API"],
    image: "bg-gradient-to-br from-red-600 to-orange-700",
    category: ["mobile"],
    demoUrl: "https://delivery.example.com",
    githubUrl: "https://github.com/joaosilva/delivery-app",
    featured: false,
  },
  {
    title: "Dashboard Analytics",
    description: "Painel de análise de dados com visualizações interativas.",
    tech: ["Vue.js", "D3.js", "Express", "MongoDB"],
    image: "bg-gradient-to-br from-blue-500 to-cyan-700",
    category: ["web", "backend"],
    demoUrl: "https://analytics.example.com",
    githubUrl: "https://github.com/joaosilva/analytics-dashboard",
    featured: false,
  },
  {
    title: "Portfólio Pessoal",
    description: "Site de portfólio com animações e design responsivo.",
    tech: ["Next.js", "Framer Motion", "Tailwind CSS"],
    image: "bg-gradient-to-br from-purple-500 to-pink-700",
    category: ["web", "design"],
    demoUrl: "https://portfolio.example.com",
    githubUrl: "https://github.com/joaosilva/portfolio",
    featured: false,
  },
]
