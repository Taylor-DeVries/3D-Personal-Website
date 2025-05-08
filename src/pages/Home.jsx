import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";

function LilacTorus() {
  const [color, setColor] = useState("#BC86F7");

  const handleClick = () => {
    const newColor = color === "#BC86F7" ? "#BF40BF" : "#BC86F7";
    setColor(newColor);
  };

  return (
    <mesh onClick={handleClick} rotation={[0, 0, Math.PI / 4]}>
      <torusGeometry args={[1.5, 0.4, 16, 100]} />
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
    </mesh>
  );
}

function LilacKnot() {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState([0, Math.PI / 4, Math.PI / 4]);

  const handleClick = () => {
    setScale(scale === 1 ? 1.25 : 1);
    setRotation([Math.PI / 2, Math.PI / 2, Math.PI / 2]);
  };

  return (
    <mesh onClick={handleClick} scale={scale} rotation={rotation}>
      <torusKnotGeometry args={[1, 0.3, 100, 16]} />
      <meshStandardMaterial color="#BC86F7" metalness={0.5} roughness={0.3} />
    </mesh>
  );
}

export default function Home() {
  const [animationState, setAnimationState] = useState(false);

  const handleTorusClick = () => {
    setAnimationState(!animationState);
  };

  const handleKnotClick = () => {
    setAnimationState(!animationState);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Headshot */}
      <motion.div
        className="relative lg:w-40 md:w-32 w-24 lg:h-40 md:h-32 h-24 rounded-full overflow-hidden shadow-lg border-4 border-purple-400 hover:scale-50 transition-transform duration-300 z-10"
        variants={itemVariants}
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <img
          src="/images/Taylor_Headshot.jpg"
          alt="Taylor's Headshot"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <motion.h1
        className="lg:text-5xl md:text-4xl text-2xl font-bold text-[#333] dark:text-[#f5f4f2] mb-4 text-center"
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
      >
        Hi, I'm Taylor
      </motion.h1>
      <motion.p
        className="lg:text-xl md:text-lg text-md text-gray-600 dark:text-[#f5f4f2] max-w-xl text-center mb-8 z-10"
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
      >
        A passionate software engineer focused on simplifying complex problems
        through intuitive and innovative technology.
      </motion.p>

      {/* Learn About Me Button */}
      <motion.button
        className="px-6 py-3 bg-purple-400 text-white dark:text-[#333] font-semibold rounded-lg shadow-md hover:bg-purple-500 transition duration-300 z-10"
        variants={itemVariants}
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)"
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' })}
      >
        Learn About Me
      </motion.button>

      {/* 3D Torus background */}
      <motion.div 
        className="absolute bottom-4 sm:bottom-10 left-10 w-64 h-64 opacity-80 dark:opacity-100 z-0"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Canvas camera={{ position: [0, 0, 4] }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[0, 0, 5]} />
          <LilacTorus onClick={handleTorusClick} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />
        </Canvas>
      </motion.div>

      {/* 3D Knot at the top right */}
      <motion.div 
        className="absolute top-10 right-10 w-64 h-64 opacity-60 dark:opacity-100 z-0"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Canvas camera={{ position: [0, 0, 4] }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[0, 0, 5]} />
          <LilacKnot onClick={handleKnotClick} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />
        </Canvas>
      </motion.div>
    </motion.div>
  );
}
