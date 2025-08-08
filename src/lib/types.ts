export type ProjectCategory = "all" | "web" | "mobile" | "backend" | "design";

export interface Project {
  title: string;
  description: string;
  tech: string[];
  category: ProjectCategory[];
  featured?: boolean;
  demoUrl?: string;
  githubUrl?: string;
  image: string;
  images?: string[];
  functionalities?: string[];
}