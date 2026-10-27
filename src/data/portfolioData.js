// Single source of truth for the portfolio's written content.
//
// Every string here was moved verbatim out of the page components
// (About.jsx, Experience.jsx, the previous notebook component, Contact.jsx) so
// the scrolling sections and the 3D fieldbook notebook can never drift apart.
//
// `tracks` and `note` are additive presentation metadata only — they do not
// replace or alter any of the original copy.

export const bio =
  "I love building. I've worked at the intersection of engineering, data, and product strategy: shipping code, digging into user telemetry, and figuring out whats worth building.";

export const philosophy =
  "I like the messy middle: talking to users, digging through telemetry, then shipping the thing that actually moves the number.";

export const links = {
  email: "mailto:t2devrie@uwaterloo.ca",
  linkedin: "https://www.linkedin.com/in/taylor-r-devries/",
  github: "https://github.com/Taylor-DeVries",
};

export const toolkit = [
  {
    title: "Product & Strategy",
    track: "product",
    accent: "forest",
    items: [
      "User Research & Analyst Interviews",
      "Adoption Metrics",
      "Unit Economics Modeling",
      "Technical Specs & API Contracts",
      "Figma Prototyping",
    ],
  },
  {
    title: "Data & Observability",
    track: "data",
    accent: "emerald",
    items: [
      "SQL",
      "Python",
      "Datadog",
      "Telemetry & Time-Series Visualization",
      "Fraud & Risk Analytics",
    ],
  },
  {
    title: "Engineering Foundation",
    track: "engineering",
    accent: "amber",
    items: [
      "TypeScript",
      "React / React Native",
      "Swift",
      "Ruby on Rails",
      "C++",
      "Cloudflare Developer Platform",
    ],
  },
];

export const experiences = [
  {
    title: "Fraud Analytics Intern",
    company: "Wealthsimple",
    team: "Fraud Countermeasures",
    duration: "Incoming Jan 2027",
    image: "/images/experience/wealthsimple.svg",
    technologies: [],
    tracks: ["data", "product"],
    note: "fraud + analytics",
  },
  {
    title: "Software Engineering Intern",
    company: "Shopify",
    team: "Commerce Trust & Integrity",
    duration: "May 2026 - August 2026",
    image: "/images/experience/shopify.png",
    technologies: [
      "Ruby",
      "Rails",
      "GraphQL",
      "Trust & Integrity",
      "Graphite",
      "Pi",
      "Claude Code",
    ],
    tracks: ["engineering", "data"],
    note: "trust & integrity",
  },
  {
    title: "Mobile Software Engineering Intern",
    company: "Vivid Seats",
    duration: "Sept 2025 - Dec 2025",
    image: "/images/experience/vividSeats.png",
    technologies: [
      "React Native",
      "Typescript",
      "iOS Dev",
      "Android Dev",
      "Xcode",
      "Expo",
    ],
    tracks: ["engineering", "product"],
    note: "shipped to iOS + Android",
  },
  {
    title: "Full Stack Developer Intern II",
    company: "Rocket",
    duration: "Jan 2025 - April 2025",
    image: "/images/experience/rocket.png",
    technologies: [
      "Angular",
      "React",
      "Typescript",
      "Node.js",
      "Express.js",
      "CircleCI",
      "Dynatrace",
    ],
    tracks: ["engineering", "data"],
    note: "returned to the team",
  },
  {
    title: "Co-Founder, Technical Product Lead",
    company: "FinBud",
    duration: "July 2024 - April 2026",
    image: "/images/experience/finLogo.png",
    technologies: [
      "Product Management",
      "Product Design",
      "Product Strategy",
      "Next.js",
      "Typescript",
      "React",
      "C#",
      "Tailwind",
      "Docker",
      "Auth0",
      "AWS",
    ],
    tracks: ["product", "engineering"],
    note: "owned the roadmap",
  },
  {
    title: "Full Stack Developer Intern",
    company: "Rocket",
    duration: "May 2024 - Aug 2024",
    image: "/images/experience/rocket.png",
    technologies: [
      "Angular",
      "Typescript",
      "Node.js",
      "Express.js",
      "Cypress",
      "Bootstrap",
      "Figma",
    ],
    tracks: ["engineering"],
    note: "first co-op term",
  },
];

export const projects = [
  {
    title: "Taylor's Travel Diary",
    description:
      "An interactive 3D globe with photo journals from 9 countries — spin, zoom, and click a pin to explore travels.",
    link: "https://tays-travel-diary.vercel.app/",
    image: "/images/projects/travel-diary.png",
    width: 3328,
    height: 2082,
    technologies: ["React", "Vite", "react-globe.gl", "Vercel"],
    role: "Design + build",
    highlight: "392 photos across 9 countries",
    tracks: ["engineering", "product"],
    note: "vibe coded in ~1 hour",
  },
  {
    title: "F1 Telemetry Dashboard",
    description:
      "Real-time F1 telemetry: speed, RPM, throttle, brake and track mapping with live driver performance metrics.",
    link: "https://f1-telemetry-dashboard.vercel.app/",
    image: "/images/projects/f1-dashboard.png",
    width: 1372,
    height: 1570,
    technologies: ["React", "TypeScript", "D3.js", "Chart.js"],
    role: "Data visualization",
    highlight: "Live time-series telemetry",
    tracks: ["data", "engineering"],
    note: "my favourite data problem",
  },
  {
    title: "FinBud",
    description:
      "A platform that simplifies personal finance for young people with a decision-tree model for tailored advice.",
    link: "https://finbud.ca/",
    image: "/images/projects/finbud.png",
    width: 2381,
    height: 1331,
    technologies: ["React", "Next.js", "C#", "DynamoDB", "AWS"],
    role: "Co-founder, product lead",
    highlight: "Led a team of 4 from discovery to launch",
    tracks: ["product", "data", "engineering"],
    note: "the startup one",
  },
  {
    title: "Personal Finance Dashboard",
    description:
      "A lightweight Streamlit dashboard that visualizes personal spending data with interactive charts.",
    link: "https://personal-dashboard.streamlit.app/",
    image: "/images/projects/dashboard.png",
    width: 2233,
    height: 1146,
    technologies: ["Streamlit", "Python", "Pandas", "Matplotlib"],
    role: "Analytics",
    highlight: "Upload a CSV, explore spend by category",
    tracks: ["data"],
    note: "python + pandas",
  },
  {
    title: "Plant Pal",
    description:
      "A cozy virtual desk plant that grows as you focus and work — watch it react to your care in real-time!",
    link: "https://plantpal-relax.vercel.app/",
    image: "/images/projects/plant.png",
    width: 1874,
    height: 960,
    technologies: ["React", "TypeScript", "Vite", "Tailwind"],
    role: "Design + build",
    highlight: "Real-time care state in local storage",
    tracks: ["engineering", "product"],
    note: "calm productivity",
  },
  {
    title: "Flappy Pal",
    description:
      "A cute, pastel Flappy Bird–style web game — tap or press space to flap through pixel pipes.",
    link: "https://flappy-pal.vercel.app/",
    image: "/images/projects/flappy.png",
    width: 2385,
    height: 1331,
    technologies: ["React", "TypeScript", "Tailwind", "Vercel"],
    role: "Game loop + build",
    highlight: "Hand-tuned collision and scoring",
    tracks: ["engineering"],
    note: "pastel arcade",
  },
  {
    title: "Focus Cat",
    description:
      "A minimalist Chrome extension for study/break modes with a cat companion that keeps you on track.",
    link: "https://github.com/Taylor-DeVries/focus-cat",
    image: "/images/projects/focus.png",
    width: 1242,
    height: 554,
    technologies: ["React", "TypeScript", "Tailwind", "Chrome Extension"],
    role: "Extension build",
    highlight: "Shipped as a Chrome extension",
    tracks: ["engineering", "product"],
    note: "study / break modes",
  },
  {
    title: "AR Headset",
    description:
      "An AR headset that shows resumes beside applicants using facial recognition technology.",
    link: "https://www.youtube.com/watch?v=sjttNGrEmtk",
    image: "/images/projects/AR.png",
    width: 920,
    height: 359,
    technologies: ["Unity", "C#", "AR Foundation", "Fusion 360"],
    role: "Hardware + software",
    highlight: "Built for SE101",
    tracks: ["engineering"],
    note: "hardware build",
  },
  {
    title: "BrainScape",
    description:
      "A virtual study space revolutionizing collaborative learning for students with real-time features.",
    link: "https://devpost.com/software/brainscape",
    image: "/images/projects/brainscape2.png",
    width: 2396,
    height: 1321,
    technologies: ["JavaScript", "HTML", "CSS", "Figma"],
    role: "Front end + design",
    highlight: "MLH hackathon winner",
    tracks: ["product", "engineering"],
    note: "hackathon winner",
  },
  {
    title: "AutoRithm Robot",
    description:
      "A Lego EV3 robot that sorts through food items using automated sorting algorithms.",
    link: "https://devpost.com/software/handsfree-y7lsbq",
    image: "/images/projects/robot.png",
    width: 1164,
    height: 723,
    technologies: ["Lego EV3", "Robot-C"],
    role: "Robotics",
    highlight: "Automated food packaging sort",
    tracks: ["engineering"],
    note: "robotics fun",
  },
];

export const tracks = [
  { id: "product", label: "Product" },
  { id: "data", label: "Data" },
  { id: "engineering", label: "Engineering" },
];
