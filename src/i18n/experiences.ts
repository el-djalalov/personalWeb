import type { Language } from "@/content.config";

export interface Experience {
  dates: string;
  role: string;
  company: string;
  description: string;
  logo: string;
  website: string;
  content: null;
}

export const experiences: Record<Language, Experience[]> = {
  en: [
    {
      dates: "Nov. 2025 - Present",
      role: "Sr. Software Engineer",
      company: "Vention",
      description:
        "Working on a platform for automating manufacturing equipment. Building new features and improving existing ones.",
      logo: "/images/experiences/vention_logo.jpeg",
      website: "https://ventionteams.com/",
      content: null,
    },
    {
      dates: "Dec. 2024 - Apr. 2025",
      role: "Sr. Front-end Developer / TL",
      company: "Valletta Software Development",
      description:
        "Building complex systems, working on a large-scale projects for major clients in Transport and Agro sectors.",
      logo: "/images/experiences/valletta.jpeg",
      website: "https://www.vallettasoftware.com/",
      content: null,
    },
    {
      dates: "Sep. 2022 - Nov. 2024",
      role: "Sr. Front-end Developer",
      company: "Soft-Control",
      description:
        "Completed 2 projects: Project Management System and CIMP (Cross-industrial marketing platform)",
      logo: "/images/experiences/SoftControl.png",
      website: "https://www.soft-control.ru/",
      content: null,
    },
    {
      dates: "July 2021 - May 2022",
      role: "Front-end Developer",
      company: "Intelligent Learning Centre",
      description:
        "Completed 2 projects: Student Management System and landing page for online courses",
      logo: "/images/experiences/Intelligent.webp",
      website: "https://intelligent-lc.uz/",
      content: null,
    },
    {
      dates: "Oct 2018 - June 2021",
      role: "Front-end Developer (Freelancer)",
      company: "Home",
      description:
        "Project description: Management system for construction company (front-end part) and landing pages for different businesses",
      logo: "/images/experiences/home.png",
      website: "https://www.elyor.dev/",
      content: null,
    },
  ],
  uz: [
    {
      dates: "Noy. 2025 - Hozir",
      role: "Katta Dasturchi",
      company: "Vention",
      description:
        "Ishlab chiqarish uskunalarini avtomatlashtirish platformasi ustida ishlash. Yangi funksiyalar qo'shish va mavjudlarini yaxshilash.",
      logo: "/images/experiences/vention_logo.jpeg",
      website: "https://ventionteams.com/",
      content: null,
    },
    {
      dates: "Dek. 2024 - Apr. 2025",
      role: "Katta Front-end Dasturchi / Jamoa rahbari",
      company: "Valletta Software Development",
      description:
        "Murakkab tizimlarni yaratish, Transport va Agro sektorlaridagi yirik mijozlar uchun keng miqyosli loyihalar ustida ishlash.",
      logo: "/images/experiences/valletta.jpeg",
      website: "https://www.vallettasoftware.com/",
      content: null,
    },
    {
      dates: "Sen. 2022 - Noy. 2024",
      role: "Katta Front-end Dasturchi",
      company: "Soft-Control",
      description:
        "2 ta loyihani yakunladim: Loyihalarni boshqarish tizimi va CIMP (Sanoatlararo marketing platformasi)",
      logo: "/images/experiences/SoftControl.png",
      website: "https://www.soft-control.ru/",
      content: null,
    },
    {
      dates: "Iyul 2021 - May 2022",
      role: "Front-end Dasturchi",
      company: "Intelligent Learning Centre",
      description:
        "2 ta loyihani yakunladim: Talabalarni boshqarish tizimi va onlayn kurslar uchun landing sahifa",
      logo: "/images/experiences/Intelligent.webp",
      website: "https://intelligent-lc.uz/",
      content: null,
    },
    {
      dates: "Okt 2018 - Iyun 2021",
      role: "Front-end Dasturchi (Frilanser)",
      company: "Uy",
      description:
        "Loyiha tavsifi: Qurilish kompaniyasi uchun boshqaruv tizimi (front-end qismi) va turli bizneslar uchun landing sahifalar",
      logo: "/images/experiences/home.png",
      website: "https://www.elyor.dev/",
      content: null,
    },
  ],
  ru: [
    {
      dates: "Ноя. 2025 - Настоящее время",
      role: "Старший разработчик",
      company: "Vention",
      description:
        "Работа над платформой автоматизации производственного оборудования. Создание новых функций и улучшение существующих.",
      logo: "/images/experiences/vention_logo.jpeg",
      website: "https://ventionteams.com/",
      content: null,
    },
    {
      dates: "Дек. 2024 - Апр. 2025",
      role: "Старший Front-end разработчик / Тимлид",
      company: "Valletta Software Development",
      description:
        "Создание сложных систем, работа над крупными проектами для клиентов в транспортном и аграрном секторах.",
      logo: "/images/experiences/valletta.jpeg",
      website: "https://www.vallettasoftware.com/",
      content: null,
    },
    {
      dates: "Сен. 2022 - Ноя. 2024",
      role: "Старший Front-end разработчик",
      company: "Soft-Control",
      description:
        "Завершил 2 проекта: Система управления проектами и CIMP (Кросс-индустриальная маркетинговая платформа)",
      logo: "/images/experiences/SoftControl.png",
      website: "https://www.soft-control.ru/",
      content: null,
    },
    {
      dates: "Июль 2021 - Май 2022",
      role: "Front-end разработчик",
      company: "Intelligent Learning Centre",
      description:
        "Завершил 2 проекта: Система управления студентами и лендинг для онлайн-курсов",
      logo: "/images/experiences/Intelligent.webp",
      website: "https://intelligent-lc.uz/",
      content: null,
    },
    {
      dates: "Окт 2018 - Июнь 2021",
      role: "Front-end разработчик (Фрилансер)",
      company: "Дом",
      description:
        "Описание проекта: Система управления для строительной компании (front-end часть) и лендинги для различных бизнесов",
      logo: "/images/experiences/home.png",
      website: "https://www.elyor.dev/",
      content: null,
    },
  ],
};

export function getExperiences(lang: Language): Experience[] {
  return experiences[lang] || experiences.en;
}
