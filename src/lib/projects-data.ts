import { Project } from "./types";
import AnyRecipe from "../../public/AnyRecipe.png";
import Eccomerce from "../../public/Eccomerce.png";
import Food from "../../public/Food.png";
import PrototipoHidro from "../../public/PrototipoHidro.png";
import Hidro from "../../public/Hidro-watch.png";
import PrototipoTask from "../../public/PrototipoTask.png";
import TaskPage from "../../public/TaskPage.png";
import Taskapp from "../../public/Taskapp.png";
import Eventos from "../../public/Eventos.png";
import prototipo_recipes from "../../public/prototipo_recipes.png";
import Juriszap from "../../public/juriszap.png";
import Juriszap2 from "../../public/juriszap (2).png";
import Zelus from "../../public/Zelus.png";

export const projectsData: Project[] = [
  {
    title: "Juriszap",
    description: "SaaS inovador com uma IA de assistência para estudantes de direito, otimizando o aprendizado e a preparação para a carreira jurídica.",
    tech: ["React", "Next.js", "Tailwind CSS", "Node.js", "PostgreSQL", "Stripe", "Prisma"],
    image: Juriszap.src,
    images: [Juriszap.src, Juriszap2.src],
    category: ["web", "backend"],
    demoUrl: "#",
    githubUrl: "#",
    featured: true,
    functionalities: [
      "Assistente de IA integrado ao WhatsApp para dúvidas jurídicas.",
      "Geração de resumos automáticos e modelos de peças.",
      "Exercícios interativos para fixação de conteúdo.",
      "Sistema de planos e assinaturas com checkout seguro (Stripe).",
      "Autenticação de usuários e gerenciamento de contas.",
    ],
  },
  {
    title: "Hidro Watch",
    description: "Aplicação mobile para monitoramento da qualidade da água, permitindo o acompanhamento de dados em tempo real e a geração de relatórios.",
    tech: ["React Native", "Expo", "TypeScript", "Node.js", "PostgreSQL"],
    image: Hidro.src,
    images: [Hidro.src, PrototipoHidro.src],
    category: ["mobile", "backend"],
    demoUrl: "#",
    githubUrl: "#",
    featured: true,
    functionalities: [
        "Visualização de dados de sensores em tempo real (pH, Turbidez, TDS, etc.).",
        "Cadastro e gerenciamento de múltiplos dispositivos de medição.",
        "Geração de gráficos e relatórios semanais/mensais.",
        "Sistema de alertas para parâmetros fora do padrão de qualidade.",
        "Histórico de medições por dispositivo.",
    ],
  },
  {
    title: "Food Share",
    description: "Plataforma web de doação de alimentos conectando doadores e vulneráveis. Inclui sistema de agendamento de coletas, cadastro de alimentos disponiveis para doação, rastreamento de doações e histórico de contribuições.",
    tech: ["React", "Shadcn", "Tailwind CSS", "Leaflet.js"],
    image: Food.src,
    images: [Food.src],
    category: ["web"],
    demoUrl: "https://food-share-ochre.vercel.app/",
    githubUrl: "https://github.com/Guilhermeprog3/Food-Share",
    functionalities: [
        "Cadastro de doadores e instituições de caridade.",
        "Registro de alimentos disponíveis para doação.",
        "Mapa interativo para especificar pontos de doação.",
        "Histórico de doações com status (entregue, cancelado).",
        "Paginação para visualização de grandes volumes de dados.",
    ],
  },
  {
    title: "Zelus - Gestão Participativa",
    description: "Plataforma de gestão que conecta a comunidade local com os departamentos públicos, permitindo o registro e acompanhamento de reclamações e demandas da cidade.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "AdonisJS"],
    image: Zelus.src,
    images: [Zelus.src],
    category: ["web", "backend"],
    githubUrl: "https://github.com/Guilhermeprog3/Zelus-FrontEnd",
    functionalities: [
      "Dashboard administrativo para visualização de métricas.",
      "Abertura de reclamações pelos cidadãos com geolocalização.",
      "Acompanhamento do status das reclamações (Pendente, Em Andamento, Resolvida).",
      "Gerenciamento de usuários, departamentos e tipos de reclamação.",
      "Painel com ranking de reclamações mais denunciadas.",
    ],
  },
  {
    title: "Hidro Watch - Protótipo",
    description: "Design de interface moderno para aplicativo mobile de monitoramento de qualidade de água, com foco em usabilidade e experiência do usuário no gerenciamento de dispositivos voltados a medição da qualidade da água.",
    tech: ["Figma"],
    image: PrototipoHidro.src,
    images: [PrototipoHidro.src],
    category: ["design"],
    functionalities: [
      "Fluxo de onboarding para novos usuários.",
      "Dashboard principal com resumo dos dispositivos.",
      "Tela de detalhes do dispositivo com gráficos de medições.",
      "Histórico de medições e visualização de alertas.",
      "Design System coeso para componentes reutilizáveis."
    ]
  },
  {
    title: "AnyRecipe",
    description: "Site completo para criação e compartilhamento de receitas. Inclui sistema de busca, categorização e favoritos.",
    tech: ["React", "Next.js", "Tailwind CSS"],
    image: AnyRecipe.src,
    images: [AnyRecipe.src, prototipo_recipes.src],
    category: ["web"],
    demoUrl: "#",
    githubUrl:"https://github.com/LPeter-nm/recipe-front-end",
    functionalities: [
      "Criação, edição e exclusão de receitas.",
      "Busca de receitas por nome ou ingredientes.",
      "Filtro por categorias e favoritos.",
      "Interface amigável para adicionar novas receitas.",
      "Design responsivo para acesso em desktop e mobile."
    ]
  },
  {
    title: "Gerenciador de Tarefas",
    description: "Sistema completo para organização pessoal com autenticação de usuários, criação de tarefas, pastas de tarefas e tarefas com prazos.",
    tech: ["React", "Material UI", "ReactQuery"],
    image: TaskPage.src,
    images: [TaskPage.src, PrototipoTask.src],
    category: ["web"],
    demoUrl: "https://todo-list-front-dev.netlify.app/",
    githubUrl:"https://github.com/DeveloperCommunitty/to-do-list_font-end",
    functionalities: [
      "Autenticação de usuários para acesso seguro.",
      "Criação de tarefas com data de vencimento.",
      "Organização de tarefas em pastas personalizadas.",
      "Marcação de tarefas como concluídas.",
      "Interface limpa para gerenciamento de produtividade."
    ]
  },
  {
    title: "Protótipo - Gerenciador de Tarefas",
    description: "Conceito visual para site de produtividade, explorando diferentes abordagens de organização e visualização de tarefas.",
    tech: ["Figma"],
    image: PrototipoTask.src,
    images: [PrototipoTask.src],
    category: ["design"],
    functionalities: [
        "Design de interface para lista de tarefas e pastas.",
        "Componentes visuais para status de tarefas (cores).",
        "Prototipagem de interações como busca e paginação.",
        "Exploração de layouts claro e escuro (não implementado).",
        "Foco em usabilidade e clareza na organização."
    ]
  },
  {
    title: "Plataforma E-commerce",
    description: "Loja virtual completa com catálogo de produtos, carrinho de compras, checkout seguro e painel administrativo para gestão de pedidos.",
    tech: ["React","Material UI"],
    image: Eccomerce.src,
    images: [Eccomerce.src],
    category: ["web"],
    demoUrl: "https://developerecommerce.netlify.app/",
    githubUrl:"https://github.com/DeveloperCommunitty/E-commerce-front-end",
    functionalities: [
      "Visualização de catálogo de produtos.",
      "Funcionalidade de carrinho de compras.",
      "Barra de busca para encontrar produtos.",
      "Layout responsivo para compras em qualquer dispositivo.",
      "(Em desenvolvimento) Checkout e painel de gestão."
    ]
  },
  {
    title: "Protótipo - AnyRecipe",
    description: "Design de interface moderno para Site culinário, com foco em usabilidade e experiência do usuário na criação e edição de receitas.",
    tech: ["Figma"],
    image: prototipo_recipes.src,
    images: [prototipo_recipes.src],
    category: ["design"],
    functionalities: [
        "UI para listagem de receitas cadastradas.",
        "Componente de card de receita com interações (hover).",
        "Botões de ação para adicionar, filtrar e buscar.",
        "Paleta de cores e tipografia consistentes.",
        "Foco em uma experiência de usuário intuitiva."
    ]
  },
  {
    title: "Task-App (Site de Tarefas)",
    description: "Solução robusta para gerenciamento de atividades com categorização, prazos e lembretes de listas de tarefas.",
    tech: ["React","Material UI"],
    image: Taskapp.src,
    images: [Taskapp.src],
    category: ["web"],
    demoUrl: "https://front-task-spi.vercel.app/",
    githubUrl:"https://github.com/Guilhermeprog3/Front-Task",
    functionalities: [
      "Criação de tarefas com status (Incompleta).",
      "Visualização de tarefas em formato de cards.",
      "Botões para adicionar, editar e excluir tarefas.",
      "Design com gradiente e tema escuro.",
      "Foco na simplicidade e rapidez de uso."
    ]
  },
  {
    title: "API de Gerenciamento de Eventos",
    description: "API desenvolvida para organização e gestão de eventos, permitindo o cadastro de usuários, criação de eventos, envio de convites e participação em eventos.",
    tech: ["NestJS","PostgreSQL", "Swagger"],
    image: Eventos.src,
    images: [Eventos.src],
    category: ["backend"],
    demoUrl: "https://event-manager-back-end.onrender.com/",
    githubUrl:"https://github.com/DeveloperCommunitty/event-manager-back-end",
    functionalities: [
      "Endpoints para autenticação e cadastro de usuários (JWT).",
      "CRUD completo para Usuários e Eventos.",
      "Sistema de convites e confirmação de presença.",
      "Documentação da API gerada automaticamente com Swagger (OAS 3.0).",
      "Estrutura modular e escalável utilizando NestJS."
    ]
  },
];