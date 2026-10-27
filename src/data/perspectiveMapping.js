// Maps experiences and projects to perspective categories
// This enables the interactive perspective filter in the editorial header

export const perspectiveCategories = {
  product: {
    label: "Product",
    keywords: [
      "Product Management",
      "Product Design",
      "Product Strategy",
      "User Research",
      "Figma",
      "Adoption Metrics",
      "Unit Economics",
      "Technical Specs",
      "API Contracts",
      "Figma Prototyping",
      "User Interviews",
      "Roadmap",
      "Backlog",
    ],
  },
  data: {
    label: "Data & Analytics",
    keywords: [
      "SQL",
      "Python",
      "Datadog",
      "Telemetry",
      "Time-Series Visualization",
      "Fraud & Risk Analytics",
      "Data Visualization",
      "Real-time Data",
      "D3.js",
      "Chart.js",
      "Analytics",
      "Metrics",
      "Dashboard",
      "Streamlit",
      "Pandas",
      "Matplotlib",
    ],
  },
  engineering: {
    label: "Engineering",
    keywords: [
      "TypeScript",
      "React",
      "React Native",
      "Swift",
      "Ruby on Rails",
      "Rails",
      "C++",
      "Cloudflare",
      "Node.js",
      "Angular",
      "GraphQL",
      "AWS",
      "Docker",
      "Next.js",
      "C#",
      "Express.js",
      "Cypress",
      "CircleCI",
      "Dynatrace",
      "Unity",
      "AR Foundation",
    ],
  },
};

// Helper function to determine which categories an item belongs to
export function getPerspectiveTags(technologies = [], description = "") {
  const tags = [];
  const allText = [...technologies, description].join(" ").toLowerCase();

  Object.entries(perspectiveCategories).forEach(([categoryId, category]) => {
    const hasKeyword = category.keywords.some((keyword) =>
      allText.includes(keyword.toLowerCase())
    );
    if (hasKeyword) {
      tags.push(categoryId);
    }
  });

  return tags;
}

// Experience-to-perspective mapping based on existing data
export const experiencePerspectives = {
  shopify: ["engineering", "data"],
  vividseats: ["engineering", "product"],
  wealthsimple: ["product", "data"],
  rocket: ["engineering"],
  finbud: ["product", "engineering", "data"],
};

// Project-to-perspective mapping
export const projectPerspectives = {
  "travel-diary": ["engineering"],
  "f1-dashboard": ["data", "engineering"],
  finbud: ["product", "engineering", "data"],
  "personal-dashboard": ["data"],
  "plant-pal": ["engineering"],
  "flappy-pal": ["engineering"],
  "focus-cat": ["engineering"],
  "ar-headset": ["engineering"],
  brainscape: ["engineering"],
  robot: ["engineering"],
};
