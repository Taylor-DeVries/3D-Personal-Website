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
  },
  {
    title: "AR Headset",
    description:
      "Made for the SE101 course, this AR headset displays resumes next to job applicants. It uses facial recognition and AR technology to enhance the hiring process.",
    link: "https://www.youtube.com/watch?v=sjttNGrEmtk",
    image: "/images/projects/AR.png",
  },
  {
    title: "BrainScape - MLH Winner 🏆",
    description:
      "a virtual study space revolutionizing collaborative learning. BrainScape fosters a dynamic online environment for students in the same courses to study together. ",
    link: "https://devpost.com/software/brainscape",
    image: "/images/projects/brainscape2.png",
  },
  {
    title: "AutoRithm Robot - WiE Hackathon",
    description:
      "Constructed AutoRithm robot made with Lego EV3 coded in robot-c that sorts through food items and autonomizes food packaging.",
    link: "https://devpost.com/software/handsfree-y7lsbq",
    image: "/images/projects/robot.png",
  },
];

export default function Projects() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#eaeafc] mt-16 px-6 py-16 flex flex-col items-center lg:overflow-y-hidden overflow-y-scroll">
      <motion.h2
        className="text-4xl font-semibold text-[#333] mb-12"
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
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {project.title}
            </h3>
            <p className="text-gray-600">{project.description}</p>
          </motion.a>
        ))}
      </div>

      {/* Floating 3D object background - Top Right */}
      <div className="absolute top-8 right-8 w-64 h-64 opacity-60 z-0">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[0, 0, 5]} />
          <LilacBlob />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
        </Canvas>
      </div>

      {/* Floating 3D object background - Bottom Left */}
      <div className="absolute bottom-8 left-8 w-64 h-64 opacity-60 z-0 hidden sm:block">
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
