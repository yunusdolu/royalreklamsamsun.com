import type { Locale } from "@/i18n/routing";

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
  {
    id: "proje-1",
    slug: { tr: "proje-1", en: "project-1" },
    serviceId: "kutu-harf-tabela",
    year: 2024,
    cover: "/images/portfolio/proje-1.jpg",
    copy: {
      tr: {
        title: "Referans Proje 1",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 1",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-10",
    slug: { tr: "proje-10", en: "project-10" },
    serviceId: "kurumsal-kimlik",
    year: 2024,
    cover: "/images/portfolio/proje-10.jpg",
    copy: {
      tr: {
        title: "Referans Proje 10",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 10",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-11",
    slug: { tr: "proje-11", en: "project-11" },
    serviceId: "cephe-giydirme",
    year: 2024,
    cover: "/images/portfolio/proje-11.jpg",
    copy: {
      tr: {
        title: "Referans Proje 11",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 11",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-12",
    slug: { tr: "proje-12", en: "project-12" },
    serviceId: "kutu-harf-tabela",
    year: 2024,
    cover: "/images/portfolio/proje-12.jpg",
    copy: {
      tr: {
        title: "Referans Proje 12",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 12",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-13",
    slug: { tr: "proje-13", en: "project-13" },
    serviceId: "cephe-giydirme",
    year: 2024,
    cover: "/images/portfolio/proje-13.jpg",
    copy: {
      tr: {
        title: "Referans Proje 13",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 13",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-14",
    slug: { tr: "proje-14", en: "project-14" },
    serviceId: "dijital-baski",
    year: 2024,
    cover: "/images/portfolio/proje-14.jpg",
    copy: {
      tr: {
        title: "Referans Proje 14",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 14",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-15",
    slug: { tr: "proje-15", en: "project-15" },
    serviceId: "dijital-baski",
    year: 2024,
    cover: "/images/portfolio/proje-15.jpg",
    copy: {
      tr: {
        title: "Referans Proje 15",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 15",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-16",
    slug: { tr: "proje-16", en: "project-16" },
    serviceId: "kutu-harf-tabela",
    year: 2024,
    cover: "/images/portfolio/proje-16.jpg",
    copy: {
      tr: {
        title: "Referans Proje 16",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 16",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-17",
    slug: { tr: "proje-17", en: "project-17" },
    serviceId: "kurumsal-kimlik",
    year: 2024,
    cover: "/images/portfolio/proje-17.jpg",
    copy: {
      tr: {
        title: "Referans Proje 17",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 17",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-18",
    slug: { tr: "proje-18", en: "project-18" },
    serviceId: "isikli-tabela",
    year: 2024,
    cover: "/images/portfolio/proje-18.jpg",
    copy: {
      tr: {
        title: "Referans Proje 18",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 18",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-19",
    slug: { tr: "proje-19", en: "project-19" },
    serviceId: "isikli-tabela",
    year: 2024,
    cover: "/images/portfolio/proje-19.jpg",
    copy: {
      tr: {
        title: "Referans Proje 19",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 19",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-20",
    slug: { tr: "proje-20", en: "project-20" },
    serviceId: "dijital-baski",
    year: 2024,
    cover: "/images/portfolio/proje-20.jpg",
    copy: {
      tr: {
        title: "Referans Proje 20",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 20",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-21",
    slug: { tr: "proje-21", en: "project-21" },
    serviceId: "kutu-harf-tabela",
    year: 2024,
    cover: "/images/portfolio/proje-21.jpg",
    copy: {
      tr: {
        title: "Referans Proje 21",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 21",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-22",
    slug: { tr: "proje-22", en: "project-22" },
    serviceId: "dijital-baski",
    year: 2024,
    cover: "/images/portfolio/proje-22.jpg",
    copy: {
      tr: {
        title: "Referans Proje 22",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 22",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-23",
    slug: { tr: "proje-23", en: "project-23" },
    serviceId: "dijital-baski",
    year: 2024,
    cover: "/images/portfolio/proje-23.jpg",
    copy: {
      tr: {
        title: "Referans Proje 23",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 23",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-24",
    slug: { tr: "proje-24", en: "project-24" },
    serviceId: "kutu-harf-tabela",
    year: 2024,
    cover: "/images/portfolio/proje-24.jpg",
    copy: {
      tr: {
        title: "Referans Proje 24",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 24",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-25",
    slug: { tr: "proje-25", en: "project-25" },
    serviceId: "imalat-tasarim-montaj",
    year: 2024,
    cover: "/images/portfolio/proje-25.jpg",
    copy: {
      tr: {
        title: "Referans Proje 25",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 25",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-26",
    slug: { tr: "proje-26", en: "project-26" },
    serviceId: "dijital-baski",
    year: 2024,
    cover: "/images/portfolio/proje-26.jpg",
    copy: {
      tr: {
        title: "Referans Proje 26",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 26",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-27",
    slug: { tr: "proje-27", en: "project-27" },
    serviceId: "lightbox-tabela",
    year: 2024,
    cover: "/images/portfolio/proje-27.jpg",
    copy: {
      tr: {
        title: "Referans Proje 27",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 27",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-28",
    slug: { tr: "proje-28", en: "project-28" },
    serviceId: "dijital-baski",
    year: 2024,
    cover: "/images/portfolio/proje-28.jpg",
    copy: {
      tr: {
        title: "Referans Proje 28",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 28",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-29",
    slug: { tr: "proje-29", en: "project-29" },
    serviceId: "isikli-tabela",
    year: 2024,
    cover: "/images/portfolio/proje-29.jpg",
    copy: {
      tr: {
        title: "Referans Proje 29",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 29",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-3",
    slug: { tr: "proje-3", en: "project-3" },
    serviceId: "lightbox-tabela",
    year: 2024,
    cover: "/images/portfolio/proje-3.jpg",
    copy: {
      tr: {
        title: "Referans Proje 3",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 3",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-30",
    slug: { tr: "proje-30", en: "project-30" },
    serviceId: "cephe-giydirme",
    year: 2024,
    cover: "/images/portfolio/proje-30.jpg",
    copy: {
      tr: {
        title: "Referans Proje 30",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 30",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-31",
    slug: { tr: "proje-31", en: "project-31" },
    serviceId: "cephe-giydirme",
    year: 2024,
    cover: "/images/portfolio/proje-31.jpg",
    copy: {
      tr: {
        title: "Referans Proje 31",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 31",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-32",
    slug: { tr: "proje-32", en: "project-32" },
    serviceId: "totem-tabela",
    year: 2024,
    cover: "/images/portfolio/proje-32.jpg",
    copy: {
      tr: {
        title: "Referans Proje 32",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 32",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-33",
    slug: { tr: "proje-33", en: "project-33" },
    serviceId: "imalat-tasarim-montaj",
    year: 2024,
    cover: "/images/portfolio/proje-33.jpg",
    copy: {
      tr: {
        title: "Referans Proje 33",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 33",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-34",
    slug: { tr: "proje-34", en: "project-34" },
    serviceId: "cephe-giydirme",
    year: 2024,
    cover: "/images/portfolio/proje-34.jpg",
    copy: {
      tr: {
        title: "Referans Proje 34",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 34",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-35",
    slug: { tr: "proje-35", en: "project-35" },
    serviceId: "dijital-baski",
    year: 2024,
    cover: "/images/portfolio/proje-35.jpg",
    copy: {
      tr: {
        title: "Referans Proje 35",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 35",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-36",
    slug: { tr: "proje-36", en: "project-36" },
    serviceId: "imalat-tasarim-montaj",
    year: 2024,
    cover: "/images/portfolio/proje-36.jpg",
    copy: {
      tr: {
        title: "Referans Proje 36",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 36",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-37",
    slug: { tr: "proje-37", en: "project-37" },
    serviceId: "isikli-tabela",
    year: 2024,
    cover: "/images/portfolio/proje-37.jpg",
    copy: {
      tr: {
        title: "Referans Proje 37",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 37",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-38",
    slug: { tr: "proje-38", en: "project-38" },
    serviceId: "cephe-giydirme",
    year: 2024,
    cover: "/images/portfolio/proje-38.jpg",
    copy: {
      tr: {
        title: "Referans Proje 38",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 38",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-39",
    slug: { tr: "proje-39", en: "project-39" },
    serviceId: "cephe-giydirme",
    year: 2024,
    cover: "/images/portfolio/proje-39.jpg",
    copy: {
      tr: {
        title: "Referans Proje 39",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 39",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-4",
    slug: { tr: "proje-4", en: "project-4" },
    serviceId: "kutu-harf-tabela",
    year: 2024,
    cover: "/images/portfolio/proje-4.jpg",
    copy: {
      tr: {
        title: "Referans Proje 4",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 4",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-40",
    slug: { tr: "proje-40", en: "project-40" },
    serviceId: "cephe-giydirme",
    year: 2024,
    cover: "/images/portfolio/proje-40.jpg",
    copy: {
      tr: {
        title: "Referans Proje 40",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 40",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-41",
    slug: { tr: "proje-41", en: "project-41" },
    serviceId: "etiket-sticker",
    year: 2024,
    cover: "/images/portfolio/proje-41.jpg",
    copy: {
      tr: {
        title: "Referans Proje 41",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 41",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-42",
    slug: { tr: "proje-42", en: "project-42" },
    serviceId: "etiket-sticker",
    year: 2024,
    cover: "/images/portfolio/proje-42.jpg",
    copy: {
      tr: {
        title: "Referans Proje 42",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 42",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-43",
    slug: { tr: "proje-43", en: "project-43" },
    serviceId: "lightbox-tabela",
    year: 2024,
    cover: "/images/portfolio/proje-43.jpg",
    copy: {
      tr: {
        title: "Referans Proje 43",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 43",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-44",
    slug: { tr: "proje-44", en: "project-44" },
    serviceId: "kutu-harf-tabela",
    year: 2024,
    cover: "/images/portfolio/proje-44.jpg",
    copy: {
      tr: {
        title: "Referans Proje 44",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 44",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-45",
    slug: { tr: "proje-45", en: "project-45" },
    serviceId: "cephe-giydirme",
    year: 2024,
    cover: "/images/portfolio/proje-45.jpg",
    copy: {
      tr: {
        title: "Referans Proje 45",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 45",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-46",
    slug: { tr: "proje-46", en: "project-46" },
    serviceId: "imalat-tasarim-montaj",
    year: 2024,
    cover: "/images/portfolio/proje-46.jpg",
    copy: {
      tr: {
        title: "Referans Proje 46",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 46",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-47",
    slug: { tr: "proje-47", en: "project-47" },
    serviceId: "imalat-tasarim-montaj",
    year: 2024,
    cover: "/images/portfolio/proje-47.jpg",
    copy: {
      tr: {
        title: "Referans Proje 47",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 47",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-48",
    slug: { tr: "proje-48", en: "project-48" },
    serviceId: "kutu-harf-tabela",
    year: 2024,
    cover: "/images/portfolio/proje-48.jpg",
    copy: {
      tr: {
        title: "Referans Proje 48",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 48",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-49",
    slug: { tr: "proje-49", en: "project-49" },
    serviceId: "cephe-giydirme",
    year: 2024,
    cover: "/images/portfolio/proje-49.jpg",
    copy: {
      tr: {
        title: "Referans Proje 49",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 49",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-5",
    slug: { tr: "proje-5", en: "project-5" },
    serviceId: "kutu-harf-tabela",
    year: 2024,
    cover: "/images/portfolio/proje-5.jpg",
    copy: {
      tr: {
        title: "Referans Proje 5",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 5",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-50",
    slug: { tr: "proje-50", en: "project-50" },
    serviceId: "etiket-sticker",
    year: 2024,
    cover: "/images/portfolio/proje-50.jpg",
    copy: {
      tr: {
        title: "Referans Proje 50",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 50",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-52",
    slug: { tr: "proje-52", en: "project-52" },
    serviceId: "dijital-baski",
    year: 2024,
    cover: "/images/portfolio/proje-52.jpg",
    copy: {
      tr: {
        title: "Referans Proje 52",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 52",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-6",
    slug: { tr: "proje-6", en: "project-6" },
    serviceId: "imalat-tasarim-montaj",
    year: 2024,
    cover: "/images/portfolio/proje-6.jpg",
    copy: {
      tr: {
        title: "Referans Proje 6",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 6",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-7",
    slug: { tr: "proje-7", en: "project-7" },
    serviceId: "kutu-harf-tabela",
    year: 2024,
    cover: "/images/portfolio/proje-7.jpg",
    copy: {
      tr: {
        title: "Referans Proje 7",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 7",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-8",
    slug: { tr: "proje-8", en: "project-8" },
    serviceId: "kutu-harf-tabela",
    year: 2024,
    cover: "/images/portfolio/proje-8.jpg",
    copy: {
      tr: {
        title: "Referans Proje 8",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 8",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
  {
    id: "proje-9",
    slug: { tr: "proje-9", en: "project-9" },
    serviceId: "cephe-giydirme",
    year: 2024,
    cover: "/images/portfolio/proje-9.jpg",
    copy: {
      tr: {
        title: "Referans Proje 9",
        summary: "Royal Reklam referans projesi.",
        description: ["Royal Reklam referans projesi detayları."],
        scope: ["Tasarım", "İmalat", "Montaj"],
      },
      en: {
        title: "Reference Project 9",
        summary: "Royal Reklam reference project.",
        description: ["Royal Reklam reference project details."],
        scope: ["Design", "Production", "Installation"],
      }
    }
  },
];

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
