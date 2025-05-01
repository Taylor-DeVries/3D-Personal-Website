import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial } from "@react-three/drei";
import {
  FaInstagram,
  FaLinkedin,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

function LilacKnot() {
  return (
    <mesh scale={1.6} position={[0, 0, 0]}>
      <torusKnotGeometry args={[1, 0.4, 100, 16]} /> {/* Torus Knot Geometry */}
      <meshStandardMaterial color="#BC86F7" flatShading />
    </mesh>
  );
}

function LilacCapsule() {
  return (
    <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
      <capsuleGeometry args={[2.5, 0.5, 16, 32]} />
      <MeshDistortMaterial color="#BC86F7" distort={0.3} speed={2} />
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
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.6} />
        </Canvas>
      </div>

      {/* Bottom Left Capsule */}
      <div className="absolute bottom-10 left-10 w-72 h-72 z-0 opacity-50 dark:opacity-80">
        <Canvas camera={{ position: [0, 0, 6] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 0, 5]} />
          <LilacCapsule />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.6} />
        </Canvas>
      </div>
    </section>
  );
}
