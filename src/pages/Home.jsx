import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LilacTorus() {
  const [color, setColor] = useState("#BC86F7");

  const handleClick = () => {
    const newColor = color === "#BC86F7" ? "#FF10F0" : "#BC86F7";
    setColor(newColor);
    onClick();
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
    onClick();
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
  const navigate = useNavigate(); // Initialize navigation

  const handleTorusClick = () => {
    setAnimationState(!animationState);
  };

  const handleKnotClick = () => {
    setAnimationState(!animationState);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-br from-[#f8f9fa] to-[#eaeafc] overflow-hidden">
      {/* Headshot */}
      <motion.div
        className="relative w-40 h-40 rounded-full overflow-hidden shadow-lg border-4 border-purple-400 hover:scale-50 transition-transform duration-300 z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <img
          src="/images/Taylor_Headshot.jpg"
          alt="Taylor's Headshot"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <motion.h1
        className="text-5xl font-bold text-[#333] mb-4 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Hi, I'm Taylor
      </motion.h1>
      <motion.p
        className="text-xl text-gray-600 max-w-xl text-center mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        A passionate software engineer focused on simplifying complex problems
        through intuitive and innovative technology.
      </motion.p>

      {/* Learn About Me Button */}
      <motion.button
        className="px-6 py-3 bg-purple-400 text-white font-semibold rounded-lg shadow-md hover:bg-purple-500 transition duration-300 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        onClick={() => navigate("/about")}
      >
        Learn About Me
      </motion.button>

      {/* 3D Torus background */}
      <div className="absolute bottom-4 sm:bottom-10 left-10 w-64 h-64 opacity-60 z-0">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[0, 0, 5]} />
          <LilacTorus onClick={handleTorusClick} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
        </Canvas>
      </div>

      {/* 3D Knot at the top right */}
      <div className="absolute top-10 right-10 w-64 h-64 opacity-60 z-0">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[0, 0, 5]} />
          <LilacKnot onClick={handleKnotClick} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
        </Canvas>
      </div>
    </div>
  );
}
