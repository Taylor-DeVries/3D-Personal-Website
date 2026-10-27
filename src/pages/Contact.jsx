import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaMountain } from "react-icons/fa";

export default function Contact() {
  return (
    <section
      id="contact-section"
      className="relative min-h-screen px-6 py-16 flex flex-col items-center justify-center"
      style={{ backgroundColor: 'transparent', zIndex: 1 }}
    >
      {/* Title */}
      <motion.h2
        className="text-5xl font-serif font-bold text-ink mb-6 z-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Contact Me
      </motion.h2>

      <motion.p
        className="text-lg text-muted mb-12 text-center z-10 max-w-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Feel free to reach out if you'd like to chat, collaborate, or grab a
        coffee.
      </motion.p>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full z-10 mb-16">
        {/* Email Card */}
        <motion.a
          href="mailto:t2devrie@uwaterloo.ca"
          className="bg-card border-2 border-stone rounded-sm p-6 shadow-[4px_4px_0px_#DCD7CD] hover:shadow-[6px_6px_0px_#1E4631] hover:-translate-x-1 hover:-translate-y-1 transition-all group relative"
          initial={{ opacity: 0, y: 20, rotate: -0.5 }}
          animate={{ opacity: 1, y: 0, rotate: -0.5 }}
          whileHover={{ rotate: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {/* Washi tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-forest/20 border border-forest/10 -rotate-1 shadow-sm" />
          
          <div className="flex flex-col items-center space-y-3 pt-2">
            <div className="bg-forest/10 p-4 rounded-sm group-hover:bg-forest/20 transition-colors">
              <FaEnvelope className="text-3xl text-forest" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-serif font-bold text-ink">Email</h3>
              <p className="text-muted text-sm mt-1">Say hi!</p>
            </div>
          </div>
        </motion.a>

        {/* LinkedIn Card */}
        <motion.a
          href="https://www.linkedin.com/in/taylor-r-devries/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-card border-2 border-stone rounded-sm p-6 shadow-[4px_4px_0px_#DCD7CD] hover:shadow-[6px_6px_0px_#2A7B57] hover:-translate-x-1 hover:-translate-y-1 transition-all group relative"
          initial={{ opacity: 0, y: 20, rotate: 0.7 }}
          animate={{ opacity: 1, y: 0, rotate: 0.7 }}
          whileHover={{ rotate: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          {/* Washi tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-emerald/20 border border-emerald/10 rotate-1 shadow-sm" />
          
          <div className="flex flex-col items-center space-y-3 pt-2">
            <div className="bg-emerald/10 p-4 rounded-sm group-hover:bg-emerald/20 transition-colors">
              <FaLinkedin className="text-3xl text-emerald" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-serif font-bold text-ink">LinkedIn</h3>
              <p className="text-muted text-sm mt-1">Connect with me</p>
            </div>
          </div>
        </motion.a>

        {/* GitHub Card */}
        <motion.a
          href="https://github.com/Taylor-DeVries"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-card border-2 border-stone rounded-sm p-6 shadow-[4px_4px_0px_#DCD7CD] hover:shadow-[6px_6px_0px_#D97736] hover:-translate-x-1 hover:-translate-y-1 transition-all group relative"
          initial={{ opacity: 0, y: 20, rotate: -0.3 }}
          animate={{ opacity: 1, y: 0, rotate: -0.3 }}
          whileHover={{ rotate: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          {/* Washi tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-amber/20 border border-amber/10 -rotate-2 shadow-sm" />
          
          <div className="flex flex-col items-center space-y-3 pt-2">
            <div className="bg-amber/10 p-4 rounded-sm group-hover:bg-amber/20 transition-colors">
              <FaGithub className="text-3xl text-amber" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-serif font-bold text-ink">GitHub</h3>
              <p className="text-muted text-sm mt-1">Check out my code</p>
            </div>
          </div>
        </motion.a>
      </div>

      {/* Play Interactive Climb Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <Link to="/climb">
          <motion.div
            className="group relative flex items-center gap-2 px-6 py-3 rounded-sm font-semibold text-ivory shadow-md overflow-hidden cursor-pointer font-mono bg-forest"
            whileHover={{
              scale: 1.05,
              boxShadow: "6px 6px 0px #1E4631"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <FaMountain className="text-lg" />
            <span>Play Interactive Climb</span>
            <span className="absolute -right-1 -top-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-amber" />
            </span>
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}
