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

      <ul className="space-y-4 text-center mb-10 z-10">
        <li>
          <a
            href="https://www.linkedin.com/in/taylor-r-devries/"
            target="_blank"
            className="text-lg text-[#333] dark:text-[#f5f4f2] hover:underline flex items-center justify-center space-x-2"
          >
            <FaLinkedin className="text-2xl text-purple-600" />
            <span>Taylor | LinkedIn</span>
          </a>
        </li>
        <li>
          <a
            href="https://github.com/Taylor-DeVries"
            target="_blank"
            className="text-lg text-[#333] dark:text-[#f5f4f2] hover:underline flex items-center justify-center space-x-2"
          >
            <FaGithub className="text-2xl text-purple-600" />
            <span>Taylor | Github</span>
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/fin_bud_/"
            target="_blank"
            className="text-lg text-[#333] dark:text-[#f5f4f2] hover:underline flex items-center justify-center space-x-2"
          >
            <FaInstagram className="text-2xl text-purple-600" />
            <span>FinBud | Instagram</span>
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/company/fin-bud/"
            target="_blank"
            className="text-lg text-[#333] dark:text-[#f5f4f2] hover:underline flex items-center justify-center space-x-2"
          >
            <FaLinkedinIn className="text-2xl text-purple-600" />
            <span>FinBud | LinkedIn</span>
          </a>
        </li>
      </ul>

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
