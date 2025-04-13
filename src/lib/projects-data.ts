export type ProjectCategory = "all" | "web" | "mobile" | "backend" | "design";
import AnyRecipe from "../public/AnyRecipe.png";
import Eccomerce from "../public/Eccomerce.png";
import Food from "../public/Food.png";
import PrototipoHidro from "../public/PrototipoHidro.png";
import PrototipoTask from "../public/PrototipoTask.png";
import TaskPage from "../public/TaskPage.png";
import Taskapp from "../public/Taskapp.png";

export type Project = {
  title: string;
  description: string;
  tech: string[];
  image: string;
  category: ProjectCategory[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
};

export const projectsData: Project[] = [
  {
    title: "App de Receitas Culinárias",
    description: "Aplicativo completo para criação e compartilhamento de receitas. Inclui sistema de busca, categorização, favoritos e compartilhamento nas redes sociais.",
    tech: ["React", "Node.js", "Express"],
    image: Food.src, // Vinculei a imagem Food.png
    category: ["web"],
    demoUrl: "#",
    featured: true,
  },
  {
    title: "Gerenciador de Tarefas",
    description: "Sistema completo para organização pessoal com autenticação de usuários, criação de projetos, tarefas com prazos e notificações em tempo real.",
    tech: ["React", "Node.js", "Express"],
    image: TaskPage.src, // Vinculei a imagem TaskPage.png
    category: ["web"],
    demoUrl: "#",
    featured: true,
  },
  {
    title: "Hidro Watch - Protótipo",
    description: "Sistema de monitoramento de consumo de água com dashboard interativo, histórico de uso e alertas personalizáveis para economia de recursos.",
    tech: ["React", "Node.js", "MongoDB"],
    image: PrototipoHidro.src, // Vinculei a imagem PrototipoHidro.png
    category: ["design", "web"],
    demoUrl: "#",
    featured: false,
  },
  {
    title: "Protótipo - Criação de Receitas",
    description: "Design de interface moderno para aplicativo culinário, com foco em usabilidade e experiência do usuário na criação e edição de receitas.",
    tech: ["React", "Figma"],
    image: AnyRecipe.src, // Vinculei a imagem AnyRecipe.png
    category: ["design"],
    demoUrl: "#",
    featured: false,
  },
  {
    title: "Protótipo - Gerenciador de Tarefas",
    description: "Conceito visual para aplicativo de produtividade, explorando diferentes abordagens de organização e visualização de tarefas.",
    tech: ["React", "Figma"],
    image: PrototipoTask.src, // Vinculei a imagem PrototipoTask.png
    category: ["design"],
    demoUrl: "#",
    featured: false,
  },
  {
    title: "Plataforma E-commerce",
    description: "Loja virtual completa com catálogo de produtos, carrinho de compras, checkout seguro e painel administrativo para gestão de pedidos.",
    tech: ["React", "Node.js", "MongoDB"],
    image: Eccomerce.src, // Vinculei a imagem Eccomerce.png
    category: ["web", "backend"],
    demoUrl: "#",
    featured: true,
  },
  {
    title: "Task-App (Aplicativo de Tarefas)",
    description: "Solução robusta para gerenciamento de atividades com categorização, prazos, lembretes e sincronização em múltiplos dispositivos.",
    tech: ["React", "Node.js", "Express"],
    image: Taskapp.src, // Vinculei a imagem Taskapp.png
    category: ["web"],
    demoUrl: "#",
    featured: false,
  },
  {
    title: "App E-commerce",
    description: "Plataforma completa de comércio eletrônico com integração de pagamentos, gestão de estoque e painel administrativo avançado.",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "bg-gradient-to-br from-blue-600 to-purple-800", // Mantido o gradiente pois não há imagem específica
    category: ["web", "backend"],
    demoUrl: "https://ecommerce.example.com",
    githubUrl: "https://github.com/joaosilva/ecommerce",
    featured: true,
  },
];