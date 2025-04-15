export type ProjectCategory = "all" | "web" | "mobile" | "backend" | "design";
import AnyRecipe from "../../public/AnyRecipe.png";
import Eccomerce from "../../public/Eccomerce.png";
import Food from "../../public/Food.png";
import PrototipoHidro from "../../public/PrototipoHidro.png";
import PrototipoTask from "../../public/PrototipoTask.png";
import TaskPage from "../../public/TaskPage.png";
import Taskapp from "../../public/Taskapp.png";
import Eventos from "../../public/Eventos.png";
import prototipo_recipes from "../../public/prototipo_recipes.png";

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
    title: "Food Share",
    description: "Plataforma web de doação de alimentos conectando doadores e vulneráveis. Inclui sistema de agendamento de coletas, cadastro de alimentos disponiveis para doação, rastreamento de doações e histórico de contribuições.",
    tech: ["React", "Shadcn", "Tailwind CSS"],
    image: Food.src,
    category: ["web"],
    demoUrl: "https://food-share-ochre.vercel.app/",
    githubUrl: "https://github.com/Guilhermeprog3/Food-Share",
    featured: true,
  },
  {
    title: "Hidro Watch - Protótipo",
    description: "Design de interface moderno para aplicativo mobile de monitoramento de qualidade de água, com foco em usabilidade e experiência do usuário no gerenciamento de dispositivos voltados a medição da qualidade da água.",
    tech: ["Figma"],
    image: PrototipoHidro.src,
    category: ["design"],
    featured: true,
  },
  {
    title: "AnyRecipe",
    description: "Site completo para criação e compartilhamento de receitas. Inclui sistema de busca, categorização e favoritos.",
    tech: ["React", "Next.js", "Tailwind CSS"],
    image: AnyRecipe.src,
    category: ["web"],
    demoUrl: "#",
    githubUrl:"https://github.com/LPeter-nm/recipe-front-end",
    featured: false,
  },
  {
    title: "Gerenciador de Tarefas",
    description: "Sistema completo para organização pessoal com autenticação de usuários, criação de tarefas, pastas de tarefas e tarefas com prazos.",
    tech: ["React", "Material MUI", "ReactQuery"],
    image: TaskPage.src,
    category: ["web"],
    demoUrl: "https://todo-list-front-dev.netlify.app/",
    githubUrl:"https://github.com/DeveloperCommunitty/to-do-list_font-end",
    featured: false,
  },
  {
    title: "Protótipo - Gerenciador de Tarefas",
    description: "Conceito visual para site de produtividade, explorando diferentes abordagens de organização e visualização de tarefas.",
    tech: ["Figma"],
    image: PrototipoTask.src,
    category: ["design"],
    featured: false,
  },
  {
    title: "Plataforma E-commerce",
    description: "Loja virtual completa com catálogo de produtos, carrinho de compras, checkout seguro e painel administrativo para gestão de pedidos.",
    tech: ["React","Material MUI"],
    image: Eccomerce.src,
    category: ["web"],
    demoUrl: "https://developerecommerce.netlify.app/",
    githubUrl:"https://github.com/DeveloperCommunitty/E-commerce-front-end" ,
    featured: false,
  },
  {
    title: "Protótipo - AnyRecipe",
    description: "Design de interface moderno para Site culinário, com foco em usabilidade e experiência do usuário na criação e edição de receitas.",
    tech: ["Figma"],
    image: prototipo_recipes.src,
    category: ["design"],
    featured: false,
  },
  {
    title: "Task-App (Site de Tarefas)",
    description: "Solução robusta para gerenciamento de atividades com categorização, prazos e lembretes de listas de tarefas.",
    tech: ["React","Material MUI"],
    image: Taskapp.src,
    category: ["web"],
    demoUrl: "https://front-task-spi.vercel.app/",
    githubUrl:"https://github.com/Guilhermeprog3/Front-Task",
    featured: false,
  },
  {
    title: "API de Gerenciamento de Eventos",
    description: "API desenvolvida para organização e gestão de eventos, permitindo o cadastro de usuários, criação de eventos, envio de convites e participação em eventos.",
    tech: ["NestJS","PostgreSQL"],
    image: Eventos.src,
    category: ["backend"],
    demoUrl: "https://event-manager-back-end.onrender.com/",
    githubUrl:"https://github.com/DeveloperCommunitty/event-manager-back-end",
    featured: false,
  },
  
];