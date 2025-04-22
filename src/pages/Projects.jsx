import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function LilacBlob() {
  return (
    <mesh scale={1.5} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial color="#BC86F7" flatShading />
    </mesh>
  );
}

function LilacTorus() {
  return (
    <mesh scale={1.5} position={[0, 0, 0]}>
      <torusGeometry args={[1, 0.4, 16, 100]} />
      <meshStandardMaterial color="#BC86F7" flatShading />
    </mesh>
  );
}

const projects = [
  {
    title: "FinBud",
    description:
      "FinBud is an innovative platform designed to simplify personal finance for young people. It offers an easy-to-use interface that guides users through their financial journey with step-by-step instructions.",
    link: "https://finbud.ca/",
    image: "/images/projects/finbud.png",
    technologies: [
      "React",
      "Next.js",
      "C#",
      "DynamoDB",
      "Auth0",
      "TailwindCSS",
      "AWS",
      "Docker",
    ],
  },
  {
    title: "Personal Finance Dashboard",
    description:
      "A lightweight Streamlit dashboard that visualizes personal spending data. Users can upload a CSV of expenses to explore trends by category, track total spending over time, and filter by custom date ranges, all in an interactive, browser-based app.",
    link: "https://personal-dashboard.streamlit.app/",
    image: "/images/projects/dashboard.png",
    technologies: ["Streamlit", "Python", "Pandas", "Matplotlib", "Seaborn"],
  },
  {
    title: "Plant Pal",
    description:
      "Plant Pal is a cozy virtual desk plant web app built with React, TypeScript, and Tailwind CSS. Take care of your plant while you study or work—watch it grow and react to your care in real-time!",
    link: "https://plantpal-relax.vercel.app/",
    image: "/images/projects/plant.png",
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "TailwindCSS",
      "Local Storage",
      "Vercel",
    ],
  },
  {
    title: "Flappy Pal",
    description:
      "A cute, pastel-themed Flappy Bird–style web game built with React, TypeScript, and Tailwind CSS. Tap or press space to flap your way through pink pixel pipes and beat your high score!",
    link: "https://flappy-pal.vercel.app/",
    image: "/images/projects/flappy.png",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vercel"],
  },
  {
    title: "Focus Cat",
    description:
      "Focus Cat is a minimalist Chrome extension that lets you switch between study and break modes, complete with a visual timer, cat moods, and adorable animations.",
    link: "https://github.com/Taylor-DeVries/focus-cat",
    image: "/images/projects/focus.png",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Chrome Extension"],
  },
  {
    title: "AR Headset",
    description:
      "Made for the SE101 course, this AR headset displays resumes next to job applicants. It uses facial recognition and AR technology to enhance the hiring process.",
    link: "https://www.youtube.com/watch?v=sjttNGrEmtk",
    image: "/images/projects/AR.png",
    technologies: ["Unity", "C#", "AR Foundation", "Fusion 360", "Figma"],
  },
  {
    title: "BrainScape - MLH Winner 🏆",
    description:
      "a virtual study space revolutionizing collaborative learning. BrainScape fosters a dynamic online environment for students in the same courses to study together. ",
    link: "https://devpost.com/software/brainscape",
    image: "/images/projects/brainscape2.png",
    technologies: ["JavaScript", "Html", "CSS", "Figma"],
  },
  {
    title: "AutoRithm Robot - WiE Hackathon",
    description:
      "Constructed AutoRithm robot made with Lego EV3 coded in robot-c that sorts through food items and autonomizes food packaging.",
    link: "https://devpost.com/software/handsfree-y7lsbq",
    image: "/images/projects/robot.png",
    technologies: ["Lego EV3", "Robot-C"],
  },
];

export default function Projects() {
  return (
    <div className="relative min-h-screen mt-14 px-6 py-16 flex flex-col items-center lg:overflow-y-hidden overflow-y-scroll">
      <motion.h2
        className="text-4xl font-semibold text-[#333] dark:text-[#f5f4f2] mb-12 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Projects
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl w-full z-10">
        {projects.map((project, index) => (
          <motion.a
            href={project.link}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white dark:bg-[#333] rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              {project.title}
            </h3>
            <p className="text-gray-600 dark:text-[#f5f4f2] mb-4">
              {project.description}
            </p>
            {project.technologies && (
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-purple-100 dark:bg-purple-700 text-purple-700 dark:text-purple-100 text-sm font-medium rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </motion.a>
        ))}
      </div>

      {/* Floating 3D object background - Top Right */}
      <div className="absolute top-8 right-8 w-64 h-64 opacity-60 dark:opacity-90 z-0">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[0, 0, 5]} />
          <LilacBlob />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
        </Canvas>
      </div>

      {/* Floating 3D object background - Bottom Left */}
      <div className="absolute bottom-8 left-8 w-64 h-64 opacity-60 dark:opacity-90 z-0 hidden sm:block">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[0, 0, 5]} />
          <LilacTorus />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
        </Canvas>
      </div>

      {/* Torus for Mobile */}
      <div className="w-full mt-4 opacity-60 sm:hidden">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[0, 0, 5]} />
          <LilacTorus />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
        </Canvas>
      </div>
    </div>
  );
}
