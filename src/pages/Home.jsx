import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaMountain } from "react-icons/fa";

// Hand-drawn SVG doodles
const SparkleDoodle = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-amber">
    <path
      d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const ArrowDoodle = () => (
  <svg width="60" height="30" viewBox="0 0 60 30" fill="none" className="text-emerald">
    <path
      d="M5 15C15 15 25 10 30 15C35 20 45 15 55 15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M50 10L55 15L50 20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const DownArrowDoodle = () => (
  <svg width="34" height="42" viewBox="0 0 34 42" fill="none" className="text-emerald" aria-hidden="true">
    <path
      d="M17 3C16.5 13 18 23 17 34"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M9 27L17 36L25 27"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Draggable skill sticker component
const SkillSticker = ({ skill, index }) => {
  const [rotation] = useState(() => (Math.random() - 0.5) * 6);
  const colors = [
    "bg-white border-ink",
    "bg-mint border-forest",
    "bg-card border-emerald",
    "bg-amber/10 border-amber",
  ];
  const color = colors[index % colors.length];

  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 0 }}
      whileTap={{ scale: 0.95 }}
      style={{ rotate: rotation }}
      className={`${color} border-2 rounded-full px-4 py-2 shadow-[3px_3px_0px_#DCD7CD] font-mono text-sm`}
    >
      {skill}
    </motion.div>
  );
};

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
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
    <>
    <motion.div 
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16"
      style={{ backgroundColor: "transparent" }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Headshot with washi tape */}
      <motion.div
        className="relative mb-8"
        variants={itemVariants}
      >
        {/* Washi tape accent */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-mint/80 border border-forest/10 -rotate-2 shadow-sm z-10" />
        
        <motion.div
          className="relative w-48 h-64 md:w-64 md:h-80 rounded-sm overflow-hidden shadow-[4px_4px_0px_#DCD7CD] border-2 border-stone bg-white p-2"
          whileHover={{ 
            scale: 1.02, 
            rotate: 0.5,
            boxShadow: "6px 6px 0px #1E4631"
          }}
        >
          <img
            src="/images/Taylor_Headshot.png"
            alt="Taylor's Headshot"
            className="h-full w-full rounded-sm object-cover"
            width="3144"
            height="4192"
            decoding="async"
            fetchPriority="high"
          />
        </motion.div>
      </motion.div>

      {/* Title with serif font */}
      <motion.h1
        className="text-4xl md:text-5xl font-serif font-bold text-ink mb-4 text-center tracking-tight"
        variants={itemVariants}
      >
        Hi, I'm Taylor
      </motion.h1>
      
      <motion.p
        className="text-xl text-muted max-w-xl text-center mb-12 z-10 font-sans"
        variants={itemVariants}
      >
        a Software Engineering student at the University of Waterloo
      </motion.p>
      <motion.div
        className="mt-8 flex flex-col items-center gap-2"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <SparkleDoodle />
        <span className="font-handwriting text-xl text-amber md:text-2xl">
          scroll down to learn more :)
        </span>
        <DownArrowDoodle />
      </motion.div>
    </motion.div>
    </>
  );
}
