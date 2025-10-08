import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial } from "@react-three/drei";
import { FaReact, FaAws, FaNodeJs, FaAngular } from "react-icons/fa"; 
import {
  SiTailwindcss,
  SiTypescript,
  SiCplusplus,
  SiNextdotjs,
  SiExpress,
  SiPython,
} from "react-icons/si"; 
import { useState, useEffect } from "react";

function LilacTorusKnot() {
  const [distort, setDistort] = useState(0.2);
  const [speed, setSpeed] = useState(2.5);

  const handleClick = () => {
    setDistort(distort === 0.2 ? 0.5 : 0.2);
    setSpeed(speed === 2.5 ? 5 : 2.5);
  };

  return (
    <mesh onClick={handleClick}>
      <torusKnotGeometry args={[1.5, 0.5, 100, 16]} />
      <MeshDistortMaterial
        color="#BC86F7"
        distort={distort}
        speed={speed}
        metalness={0.7}
        roughness={0.2}
      />
    </mesh>
  );
}

function LilacTorus() {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState([0, 0, 0]);

  const handleClick = () => {
    setScale(scale === 1 ? 1.3 : 1);
    setRotation([Math.PI / 2, Math.PI / 2, 0]);
  };

  return (
    <mesh onClick={handleClick} scale={scale} rotation={rotation}>
      <torusGeometry args={[1.7, 0.4, 16, 100]} />
      <meshStandardMaterial color="#BC86F7" flatShading />
    </mesh>
  );
}

export default function About() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const galleryImages = [
    "/images/gallery/cat.png",
    "/images/gallery/city.png",
    "/images/gallery/rome.png",
    "/images/gallery/waterfall.png",
    "/images/gallery/waterloo.png",
    "/images/gallery/velocity.png",
  ];

  const skills = [
    { name: "React", icon: <FaReact className="text-blue-500 w-8 h-8" /> },
    { name: "Angular", icon: <FaAngular className="text-red-500 w-8 h-8" /> },
    {
      name: "TypeScript",
      icon: <SiTypescript className="text-blue-600 w-8 h-8" />,
    },
    {
      name: "Node.js",
      icon: <FaNodeJs className="text-green-500 w-8 h-8" />,
    },
    { name: "Next.js", icon: <SiNextdotjs className="text-black w-8 h-8" /> },
    {
      name: "Express.js",
      icon: <SiExpress className="text-gray-500 w-8 h-8" />,
    },
    {
      name: "Tailwind",
      icon: <SiTailwindcss className="text-teal-500 w-8 h-8" />,
    },
    { name: "AWS", icon: <FaAws className="text-orange-500 w-8 h-8" /> },
    { name: "C++", icon: <SiCplusplus className="text-blue-400 w-8 h-8" /> },
    { name: "Python", icon: <SiPython className="text-blue-500 w-8 h-8" /> },
  ];

  return (
    <section id="about-section" className="relative min-h-screen mt-6 px-6 py-16 flex flex-col items-center justify-center overflow-hidden">
      <motion.h2
        className="text-4xl font-semibold text-[#333] dark:text-white mb-6 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About me
      </motion.h2>

      <motion.p
        className="text-sm md:text-base text-gray-600 dark:text-[#f5f4f2] max-w-3xl text-center mb-12 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        I'm a Software Engineering student at the University of Waterloo with a
        passion for building impactful technology. I have hands-on experience in
        full-stack and mobile development, working with a variety of technologies to create
        seamless user experiences and powerful back-end solutions. I'm always
        looking for opportunities to learn and grow.
      </motion.p>

      {/* Buttons */}
      <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 mb-12 z-10 flex-wrap">
        <motion.button
          className="px-6 py-3 bg-purple-400 text-white dark:text-[#333] font-semibold rounded-lg shadow-md hover:bg-purple-500 transition duration-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Contact me
        </motion.button>
        <motion.button
          className="px-6 py-3 bg-purple-400 text-white dark:text-[#333] font-semibold rounded-lg shadow-md hover:bg-purple-500 transition duration-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onClick={() => document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' })}
        >
          My projects
        </motion.button>
        <motion.button
          className="px-6 py-3 bg-purple-400 text-white dark:text-[#333] font-semibold rounded-lg shadow-md hover:bg-purple-500 transition duration-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          onClick={() => document.getElementById('experience-section')?.scrollIntoView({ behavior: 'smooth' })}
        >
          My experience
        </motion.button>
      </div>

      {/* Skills Section */}
      <div className="w-full max-w-4xl mb-12 z-10">
        <motion.h3
          className="text-3xl font-semibold text-[#333] dark:text-[#f5f4f2] mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Top skills
        </motion.h3>
        <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-10 gap-4 justify-items-center">
          {skills.map((skill, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {skill.icon}
              <p className="mt-2 text-sm font-medium text-gray-700 dark:text-[#f5f4f2] hidden sm:block">
                {skill.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Picture Gallery */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-4xl w-full z-10">
        {galleryImages.map((image, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-md">
            <img
              src={image}
              alt={`Gallery ${index + 1}`}
              className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {/* Top Right Torus */}
      <div className="absolute top-10 right-10 w-60 h-60 z-0 opacity-70 dark:opacity-90 hidden sm:block">
        {mounted && (
          <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 0, 5]} />
            <LilacTorus />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />
          </Canvas>
        )}
      </div>

      {/* Bottom Left Torus Knot */}
      <div className="absolute bottom-10 left-10 w-60 h-60 z-0 opacity-80 dark:opacity-90">
        {mounted && (
          <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 0, 5]} />
            <LilacTorusKnot />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />
          </Canvas>
        )}
      </div>
    </section>
  );
}
