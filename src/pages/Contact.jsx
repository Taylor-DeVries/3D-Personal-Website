import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial } from "@react-three/drei";
import { useState } from "react";
import {
  FaInstagram,
  FaLinkedin,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

function LilacKnot() {
  const [scale, setScale] = useState(1.6);
  const [color, setColor] = useState("#BC86F7");

  const handleClick = () => {
    setScale(scale === 1.6 ? 2 : 1.6);
    setColor(color === "#BC86F7" ? "#BF40BF" : "#BC86F7");
  };

  return (
    <mesh onClick={handleClick} scale={scale} position={[0, 0, 0]}>
      <torusKnotGeometry args={[1, 0.4, 100, 16]} />
      <meshStandardMaterial color={color} flatShading />
    </mesh>
  );
}

function LilacCapsule() {
  const [rotation, setRotation] = useState([Math.PI / 4, Math.PI / 4, 0]);
  const [distort, setDistort] = useState(0.3);

  const handleClick = () => {
    setRotation([Math.PI / 2, Math.PI / 2, Math.PI / 2]);
    setDistort(distort === 0.3 ? 0.6 : 0.3);
  };

  return (
    <mesh onClick={handleClick} rotation={rotation}>
      <capsuleGeometry args={[2.5, 0.5, 16, 32]} />
      <MeshDistortMaterial color="#BC86F7" distort={distort} speed={2} />
    </mesh>
  );
}

export default function Contact() {
  return (
    <section id="contact-section" className="relative min-h-screen px-6 py-16 flex flex-col items-center justify-center overflow-hidden">
      <motion.h2
        className="text-4xl font-semibold text-[#333] dark:text-white mb-4 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Contact Me
      </motion.h2>

      <motion.p
        className="text-lg text-gray-600 dark:text-[#f5f4f2] mb-6 text-center z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Feel free to reach out if you'd like to chat, collaborate, or grab a
        coffee.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full z-10">
        <motion.a
          href="https://www.linkedin.com/in/taylor-r-devries/"
          target="_blank"
          className="bg-white/80 dark:bg-[#333]/80 backdrop-blur-md rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 dark:border-purple-800 group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors duration-300">
              <FaLinkedin className="text-2xl text-purple-600 dark:text-purple-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">LinkedIn</h3>
              <p className="text-gray-600 dark:text-gray-300">Connect with me</p>
            </div>
          </div>
        </motion.a>

        <motion.a
          href="https://github.com/Taylor-DeVries"
          target="_blank"
          className="bg-white/80 dark:bg-[#333]/80 backdrop-blur-md rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 dark:border-purple-800 group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors duration-300">
              <FaGithub className="text-2xl text-purple-600 dark:text-purple-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">GitHub</h3>
              <p className="text-gray-600 dark:text-gray-300">Check out my code</p>
            </div>
          </div>
        </motion.a>
      </div>

      {/* Top Right Blob */}
      <div className="absolute top-10 right-10 w-72 h-72 z-0 opacity-70 dark:opacity-90">
        <Canvas camera={{ position: [0, 0, 6] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 0, 5]} />
          <LilacKnot />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />
        </Canvas>
      </div>

      {/* Bottom Left Capsule */}
      <div className="absolute bottom-10 left-10 w-72 h-72 z-0 opacity-50 dark:opacity-80">
        <Canvas camera={{ position: [0, 0, 6] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 0, 5]} />
          <LilacCapsule />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />
        </Canvas>
      </div>
    </section>
  );
}
