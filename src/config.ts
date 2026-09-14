// import erbThumb from "./assets/erb-thumb.jpg";
import erbVideo from "./assets/erb.mp4";

import nasaImage from "./assets/nasaSpaceChallenge.png";

// import ntiThumb from "./assets/nti-career-thumb.jpg";
import ntiVideo from "./assets/nti-career.mp4";

import clarioImage from "./assets/clario.jpg";
export const config = {
  meta: {
    siteTitle: "Mohamed Elfarsisi — Software Engineer",
    siteDescription:
      "Mohamed Elfarsisi is a Computer Science student and .NET-focused software engineer building backend systems with C#, .NET, REST APIs, and databases, with additional experience across Angular, Node.js, Laravel, and AI/ML.",
  },

  developer: {
    name: "Elfarsisi",
    fullName: "Mohamed Yasser Elfarsisi",
    title: "Software Engineer",
    profileImage: "",
    description:
      "Computer Science student focused on C# and .NET development, with experience building backend systems, REST APIs, database-backed applications, and full-stack web platforms. Also exploring AI/ML, cloud technologies, open source, and hackathons.",
  },

  social: {
    github: "mohamed-elfrsisi",
    email: "mohamedelfrsisi@gmail.com",
    location: "Tanta, Egypt",
  },

about: {
  title: "About Me",

  description: `I’ve always been curious about how things work. My journey into programming started with a simple suggestion from my mother: “Try programming.” I did — and that mindset took me from joining NASA Space Apps Challenge 2025 with only a tablet to becoming a Global Nominee, then starting my real software engineering journey with my first laptop. I’m still learning, still building, and still asking the same question: Why not just try?`
},

  experiences: [
    {
      position: ".NET Development Intern",
      company: "Digital Egypt Pioneers Initiative (DEPI)",
      period: "Jul. 2026 – Present",
      location: "Hybrid",
      description:
        "Developing backend applications using C# and .NET, with a focus on object-oriented programming, RESTful API development, database integration, maintainable architecture, and production-oriented development.",
      technologies: ["C#", ".NET", "OOP", "REST APIs", "Databases"],
    },

    {
      position: "MEAN Stack Development Intern",
      company: "ITIDA & National Telecommunication Institute (NTI)",
      period: "Jul. 2026 – Aug. 2026",
      location: "Remote",
      description:
        "Selected out of 35,000 applicants for the competitive programme. Built reusable Angular components and services, integrated Node.js/Express.js REST APIs with MongoDB/Mongoose, and used Postman collections for endpoint testing.",
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
      position: "Full-Stack Trainee & Frontend Lead",
      company: "National Telecommunication Institute (NTI)",
      period: "Jan. 2026 – Mar. 2026",
      location: "Zagazig, Egypt",
      description:
        "Led front-end development for a 3-member team on the NTI Career Platform, delivering trainee profiles, company dashboards, and job-search features.",
      responsibilities: [
        "Led front-end development for a 3-member team",
        "Built Laravel/MySQL backend features under MVC architecture",
        "Worked on RESTful APIs consumed by platform dashboards",
      ],
      technologies: ["Laravel", "PHP", "MySQL", "Bootstrap", "MVC"],
    },

    {
      position: "Research Intern",
      company: "Undergraduate Researchers Initiative (URI)",
      period: "Jan. 2026 – Mar. 2026",
      location: "Remote",
      description:
        "Applied formal research methodology and technical writing to a system-performance study.",
      technologies: [
        "Research Methodology",
        "Technical Writing",
        "System Performance Analysis",
      ],
    },

    {
      position: "Software Engineering Intern",
      company: "Microsoft & Ministry of Youth and Sports",
      period: "Jun. 2025 – Aug. 2025",
      location: "Egypt",
      description:
        "Gained hands-on exposure to Microsoft Azure, earned Microsoft certification in System Analysis using AI & Generative AI, and contributed to enterprise digital-transformation initiatives.",
      technologies: [
        "Microsoft Azure",
        "System Analysis",
        "Generative AI",
      ],
    },
  ],

 projects: [
  {
    id: 1,
    title: "Clario — AI-Powered Career Intelligence Platform",
    category: "AI / Backend",
    technologies: "Python, PostgreSQL, NLP",
    image: clarioImage,
    description:
      "Building an ML-first platform that parses resumes, structures career profiles, and evaluates Opportunity Fit, Skill Gaps, and Career Alignment. Designing a database-first PostgreSQL architecture and an intelligence pipeline using NLP, embeddings, semantic matching, and LLM-based reasoning.",
    link: "https://github.com/mohamed-elfrsisi/Clario",
  },

  {
    id: 2,
    title: "ERB System",
    category: "Full Stack",
    technologies: "Angular 16, Node.js, Express.js, MongoDB",
    // image: erbThumb,
    video: erbVideo,
    description:
      "Worked on HR, Sales, and Inventory modules as part of a 4-person team, covering 15 CRUD modules across 83 RESTful endpoints.",
    link: "https://github.com/OnlyReal-LLC/ERB-System",
  },

  {
    id: 3,
    title: "NASA Space Habitat",
    category: "AI / Full Stack",
    technologies: "PHP, Python, AI, NASA APIs",
    image: nasaImage,
    description:
      "Global Nominee at NASA Space Apps Challenge 2025 and ranked in the top 1% globally as 1 of 280 finalist teams from 28,000+ teams across 150+ countries. Built an AI-powered planning system for sustainable Moon and Mars habitats using NASA public APIs.",
    link: "",
  },

  {
    id: 4,
    title: "NTI Career Platform",
    category: "Full Stack",
    technologies: "Laravel, PHP, MySQL, Bootstrap, Git",
    // image: ntiThumb,
    video: ntiVideo,
    description:
      "Worked on a production job platform with trainee profiles, company dashboards, and job-search workflows using Laravel MVC and MySQL.",
    link: "https://github.com/MahmoudEbrahimmm/ForsaHub",
  },
],

  contact: {
    email: "mohamedelfrsisi@gmail.com",
    github: "https://github.com/mohamed-elfrsisi",
    linkedin: "https://linkedin.com/in/mohamed-elfarsisi",
    x: "https://x.com/M_Elfasisi",
  },

  skills: {
    develop: {
      title: "SOFTWARE ENGINEER",
      description:
        "C#/.NET development with full-stack and AI/ML experience",
      details:
        "Focused on C# and .NET backend development, with experience in REST APIs, databases, MVC architecture, Angular, Node.js, Express.js, Laravel, and cloud platforms.",
      tools: [
        "C#",
        ".NET",
        "TypeScript",
        "JavaScript",
        "Angular",
        "Node.js",
        "Express.js",
        "Laravel",
        "Python",
        "PostgreSQL",
        "MongoDB",
        "MySQL",
        "SQL Server",
        "Git",
        "GitHub",
        "Postman",
        "Microsoft Azure",
        "Google Cloud Platform",
      ],
    },
  },
};
