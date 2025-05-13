import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";

const experiences = [
  {
    title: "Full Stack Developer Co-op",
    company: "Rocket",
    description:
      "Developing and optimizing core features for Rocket.com ensuring a seamless user experience across the platform. Collaborating with cross-functional Agile teams to gather requirements, analyze technical challenges, and implement scalable solutions that meet business objectives.",
    duration: "Jan 2025 - April 2025",
    image: "/images/experience/rocket2.png",
    technologies: [
      "Angular",
      "React",
      "Typescript",
      "Node.js",
      "Express.js",
      "CircleCI",
      "Dynatrace",
    ],
  },
  {
    title: "Co-Founder, Lead Software Engineer",
    company: "FinBud",
    description:
      "Created a user-centric decision tree model to deliver tailored financial advice. Directing a team of 4 developers in creating a web application using React, Next.js, Docker, and AWS. Implemented a CI/CD pipeline in AWS and hosted the application with AWS Amplify",
    duration: "July 2024 - Present",
    image: "/images/experience/finLogo.png",
    technologies: [
      "React",
      "Typescript",
      "Next.js",
      "C#",
      "Tailwind",
      "AWS",
      "Docker",
      "Auth0",
    ],
  },
  {
    title: "Full Stack Developer Co-op",
    company: "Rocket",
    description:
      "Developed and thoroughly tested full stack web applications while writing 97% coverage unit and e2e tests with Cypress. Wrote robust and maintainable code while adhering to best practices, contributing to the team's goal of maintaining high code quality and reliability",
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
  },
];

function LilacKnot() {
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [color, setColor] = useState("#BC86F7");
  const [metalness, setMetalness] = useState(0.7);
  const [roughness, setRoughness] = useState(0.3);

  const handleClick = () => {
    setRotation([Math.PI / 2, Math.PI / 2, Math.PI / 2]);
    
    setColor(color === "#BC86F7" ? "#9B4DCA" : "#BC86F7");
    
    setMetalness(metalness === 0.7 ? 0.3 : 0.7);
    setRoughness(roughness === 0.3 ? 0.7 : 0.3);
  };

  return (
    <mesh onClick={handleClick} rotation={rotation} position={[0, 0, 0]}>
      <torusKnotGeometry args={[1, 0.4, 100, 16]} />
      <meshStandardMaterial color={color} flatShading metalness={metalness} roughness={roughness} />
    </mesh>
  );
}

function LilacTorus() {
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [color, setColor] = useState("#BC86F7");
  const [metalness, setMetalness] = useState(0.5);
  const [roughness, setRoughness] = useState(0.3);

  const handleClick = () => {
    setRotation([Math.PI / 2, Math.PI / 2, Math.PI / 2]);
    
    setColor(color === "#BC86F7" ? "#BF40BF" : "#BC86F7");
    
    setMetalness(metalness === 0.5 ? 0.9 : 0.5);
    setRoughness(roughness === 0.3 ? 0.7 : 0.3);
  };

  return (
    <mesh onClick={handleClick} rotation={rotation} scale={1.5} position={[0, 0, 0]}>
      <torusGeometry args={[1, 0.4, 16, 100]} />
      <meshStandardMaterial color={color} flatShading metalness={metalness} roughness={roughness} />
    </mesh>
  );
}

export default function Experience() {
  return (
    <section id="experience-section" className="relative min-h-screen mt-14 px-6 py-16 flex flex-col items-center overflow-hidden">
      <motion.h2
        className="text-4xl font-semibold text-[#333] dark:text-[#f5f4f2] mb-12 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Experience
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full z-10">
        {experiences.map((experience, index) => (
          <motion.div
            key={index}
            className="bg-white/80 dark:bg-[#333]/80 backdrop-blur-md rounded-2xl p-6 transition-all duration-300 border border-purple-100 dark:border-purple-800 group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ 
              scale: 1.03
            }}
          >
            <div className="relative overflow-hidden rounded-lg mb-4 group">
              <img
                src={experience.image}
                alt={experience.company}
                className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                {experience.title}
              </h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                  {experience.company}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {experience.duration}
                </span>
              </div>
              <p className="text-gray-600 dark:text-[#f5f4f2]">
                {experience.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {experience.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-sm font-medium rounded-full transition-colors duration-300 group-hover:bg-purple-200 dark:group-hover:bg-purple-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lilac Knot */}
      <div className="absolute top-8 left-8 w-64 h-64 opacity-60 dark:opacity-90 z-0">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[0, 0, 5]} />
          <LilacKnot />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />
        </Canvas>
      </div>

      {/* Lilac Torus */}
      <div className="absolute bottom-8 right-8 w-64 h-64 opacity-60 dark:opacity-90 z-0">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[0, 0, 5]} />
          <LilacTorus />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />
        </Canvas>
      </div>
    </section>
  );
}
