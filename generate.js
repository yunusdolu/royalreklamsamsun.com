const fs = require('fs');
const path = require('path');

const dir = 'public/images/portfolio';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png') || f.endsWith('.webp'));

let projectsCode = `import type { Locale } from "@/i18n/routing";

export interface ProjectCopy {
  title: string;
  client?: string;
  summary: string;
  description: string[];
  scope: string[];
}

export interface Project {
  id: string;
  slug: Record<Locale, string>;
  serviceId: string;
  regionId?: string;
  year: number;
  cover: string;
  gallery?: string[];
  copy: Record<Locale, ProjectCopy>;
}

export const projects: Project[] = [
`;

files.forEach((file, idx) => {
  const num = file.split('-')[1].split('.')[0];
  projectsCode += `  {
    id: "proje-${num}",
    slug: { tr: "proje-${num}", en: "project-${num}" },
    serviceId: "kutu-harf-tabela",
    year: 2024,
    cover: "/images/portfolio/${file}",
    copy: {
      tr: {
        title: "Referans Proje ${num}",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project ${num}",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
`;
});

projectsCode += `];

export const hasProjects = projects.length > 0;

export function getProjectBySlug(slug: string, locale: Locale): Project | undefined {
  return projects.find((project) => project.slug[locale] === slug);
}

export function allProjectSlugs(locale: Locale): string[] {
  return projects.map((project) => project.slug[locale]);
}

export function projectServiceIds(): string[] {
  return Array.from(new Set(projects.map((project) => project.serviceId)));
}
`;

fs.writeFileSync('src/content/projects.ts', projectsCode);
console.log('projects.ts generated successfully with ' + files.length + ' projects.');
