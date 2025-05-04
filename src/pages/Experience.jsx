import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const experiences = [
  {
    title: "Full Stack Developer Co-op",
    company: "Rocket Innovation Studio",
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
    company: "Rocket Innovation Studio",
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
  return (
    <mesh scale={1} position={[0, 0, 0]}>
      <torusKnotGeometry args={[1, 0.4, 100, 16]} /> {/* Torus Knot Geometry */}
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
            className="bg-white dark:bg-[#333] rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={experience.image}
              alt={experience.company}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              {experience.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-[#f5f4f2] mb-2">
              {experience.company}
            </p>
            <p className="text-sm text-gray-500 dark:text-[#f5f4f2] mb-4">
              {experience.duration}
            </p>
            <p className="text-gray-600 dark:text-[#f5f4f2] mb-4">
              {experience.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 bg-purple-100 dark:bg-purple-700 text-purple-700 dark:text-purple-100 text-sm font-medium rounded-lg"
                >
                  {tech}
                </span>
              ))}
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
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
        </Canvas>
      </div>

      {/* Lilac Torus */}
      <div className="absolute bottom-8 right-8 w-64 h-64 opacity-60 dark:opacity-90 z-0">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[0, 0, 5]} />
          <LilacTorus />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
        </Canvas>
      </div>
    </section>
  );
}
