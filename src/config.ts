export const config = {
  meta: {
    siteTitle: "Mohamed Elfarsisi - Full Stack Developer",
    siteDescription:
      "Portfolio of Mohamed Elfarsisi (Ferso), a Full Stack Developer specializing in Angular, Node.js, Express.js, and Laravel.",
  },
  developer: {
    name: "Ferso",
    fullName: "Mohamed Yasser Elfarsisi",
    title: "Full Stack Developer",
    // Optional: a base64 data-URL uploaded from /admin overrides the
    // bundled src/assets/mypic.png used across the site.
    profileImage: "",
    description:
      "Full Stack Developer specializing in Angular, Node.js, Express.js, and Laravel. I build responsive, database-driven web applications with clean architecture and a strong focus on real-world impact.",
  },
  social: {
    github: "mohamed-elfrsisi",
    email: "mohamedelfarsisi@outlook.com",
    location: "Tanta, Egypt",
  },
  about: {
    title: "About Me",
    description:
      "I'm a Computer Science student at Tanta University and a full stack developer working across the MEAN stack (MongoDB, Express.js, Angular, Node.js) and Laravel/PHP. I've built production platforms used by hundreds of concurrent users, been selected among thousands of applicants for competitive programs with Google, Microsoft, and NTI, and ranked in the top 1% globally at NASA's Space Apps Challenge. I care about writing maintainable code and shipping things that actually get used.",
  },
  experiences: [
    {
      position: "MEAN Stack Development Intern",
      company: "ITIDA & National Telecommunication Institute (NTI)",
      period: "07-2026 - Present",
      location: "Egypt (Remote)",
      description:
        "Selected for the competitive ITIDA/NTI MEAN Stack Development Internship. Building reusable Angular components and services, and integrating Node.js/Express.js REST APIs with MongoDB/Mongoose.",
      responsibilities: [
        "Built reusable Angular components and services to cut duplicate front-end code across feature modules",
        "Integrated Node.js/Express.js REST APIs with MongoDB and Mongoose",
        "Used Postman collections to automate endpoint testing and reduce manual QA time",
      ],
      technologies: [
        "Angular",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Mongoose",
        "Postman",
      ],
    },
    {
      position: "Selected Developer, Google Cloud & AI Programme Egypt",
      company: "Google — Build with AI: Masr Edition",
      period: "04-2026 - 05-2026",
      location: "Egypt (Remote)",
      description:
        "Selected as 1 of 5,000+ developers across Egypt for Google's official AI & Cloud programme, run in partnership with ITI.",
      responsibilities: [
        "Completed hands-on Google Cloud Platform labs covering cloud architecture and applied AI",
        "Delivered deployable labs and projects over the course of the 1-month programme",
      ],
      technologies: ["Google Cloud Platform", "Applied AI", "Cloud Architecture"],
    },
    {
      position: "Full-Stack Trainee & Frontend Lead",
      company: "National Telecommunication Institute (NTI) — Career Platform Egypt",
      period: "01-2026 - 03-2026",
      location: "Tanta, Egypt",
      description:
        "Led front-end development for a 3-member team, delivering trainee profiles, company dashboards, and job-search features for the NTI Career Platform, which went on to support 500+ concurrent users in production.",
      responsibilities: [
        "Led a 3-member team delivering trainee profiles, company dashboards, and job-search features on schedule",
        "Built Laravel/MySQL backend features under an MVC architecture powering the platform's dashboards",
        "Shipped a platform that went on to support 500+ concurrent users in production",
      ],
      technologies: ["Laravel", "PHP", "MySQL", "Bootstrap", "MVC", "Git"],
    },
    {
      position: "Research Intern",
      company: "Undergraduate Researchers Initiative (URI)",
      period: "01-2026 - 03-2026",
      location: "Remote",
      description:
        "Completed Scientific Research Training (SRT), applying formal research methodology and technical writing to a system-performance study.",
      responsibilities: [
        "Applied formal research methodology and technical writing to a system-performance study",
        "Conducted a system performance analysis and presented findings in a technical report",
      ],
      technologies: ["Research Methodology", "Technical Writing", "System Performance Analysis"],
    },
    {
      position: "Software Engineering Intern",
      company: "Microsoft & Ministry of Youth and Sports",
      period: "06-2025 - 08-2025",
      location: "Egypt",
      description:
        "Earned Microsoft certification in System Analysis using AI & Generative AI, and gained hands-on exposure to Microsoft Azure while contributing to enterprise digital-transformation initiatives.",
      responsibilities: [
        "Earned Microsoft certification in System Analysis using AI & Generative AI",
        "Gained hands-on exposure to Microsoft Azure alongside an enterprise engineering team",
        "Contributed to enterprise digital-transformation initiatives",
      ],
      technologies: ["Microsoft Azure", "System Analysis", "Generative AI"],
    },
  ],
  projects: [
    {
      id: 1,
      title: "NASA Space Habitat — Smart Sustainable Living Module",
      category: "Full Stack",
      technologies: "PHP, Python, AI, NASA APIs",
      image: "/images/placeholder.webp",
      description:
        "Global Nominee at NASA Space Apps Challenge, ranked in the top 1% globally as 1 of 280 finalist teams selected from 28,000+ teams across 150+ countries. Built an AI-powered planning system for sustainable Moon and Mars habitats, integrating NASA public APIs for environmental data, and presented the solution live to an international panel of judges.",
      link: "",
    },
    {
      id: 2,
      title: "NTI Career Platform",
      category: "Full Stack",
      technologies: "Laravel, PHP, MySQL, Bootstrap, Git",
      image: "/images/placeholder.webp",
      description:
        "A production-ready job portal supporting 500+ concurrent users, including trainee profiles and company dashboards. Implemented end-to-end job-listing and application workflows using Laravel MVC and MySQL.",
      link: "",
    },
    {
      id: 3,
      title: "MEAN Stack Web Application",
      category: "Full Stack",
      technologies: "Angular 16, Node.js, Express.js, MongoDB",
      image: "/images/placeholder.webp",
      description:
        "A full-stack application built with reusable Angular components and Mongoose-backed MongoDB models, with RESTful APIs built using Express.js. In progress.",
      link: "",
    },
    {
      id: 4,
      title: "Grand Egyptian Museum Website",
      category: "Frontend",
      technologies: "HTML5, CSS3",
      image: "/images/placeholder.webp",
      description:
        "A fully responsive museum website built with pure CSS3 (no JavaScript), including custom animations and 3D transforms, following WCAG accessibility principles throughout.",
      link: "",
    },
  ],
  contact: {
    email: "mohamedelfarsisi@outlook.com",
    github: "https://github.com/mohamed-elfrsisi",
    linkedin: "https://linkedin.com/in/mohamed-elfarsisi",
    twitter: "https://x.com/",
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
  },
  skills: {
    develop: {
      title: "FULL STACK DEVELOPER",
      description: "MEAN stack & Laravel development for real-world platforms",
      details:
        "Building responsive, database-driven web applications across the MEAN stack (MongoDB, Express.js, Angular, Node.js) and Laravel/PHP. Experienced with REST APIs, MVC architecture, authentication & authorization, and cloud platforms like Azure and GCP.",
      tools: [
        "Angular",
        "Node.js",
        "Express.js",
        "Laravel",
        "TypeScript",
        "MongoDB",
        "MySQL",
        "REST APIs",
        "Git",
      ],
    },
  },
};
