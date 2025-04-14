import { useState } from "react"; // Import useState
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu

  return (
    <Router>
      <div className="min-h-screen bg-[#f5f4f2] text-[#333] font-sans">
        <nav className="p-4 bg-purple-400 text-[#f5f4f2] shadow-lg fixed top-0 left-0 w-full z-20 flex justify-between items-center">
          <button
            className="sm:hidden text-lg font-bold hover:text-gray-300 transform hover:scale-110 transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu visibility
          >
            ☰
          </button>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } sm:flex space-x-4 absolute sm:static top-16 left-0 w-full sm:w-auto bg-purple-400 sm:bg-transparent p-4 sm:p-0 shadow-lg sm:shadow-none`}
          >
            <Link
              to="/"
              className="block sm:inline text-lg font-bold hover:text-gray-300 transform hover:scale-110 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)} // Close menu on click
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block sm:inline text-lg font-bold hover:text-gray-300 transform hover:scale-110 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block sm:inline text-lg font-bold hover:text-gray-300 transform hover:scale-110 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/projects"
              className="block sm:inline text-lg font-bold hover:text-gray-300 transform hover:scale-110 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              to="/experience"
              className="block sm:inline text-lg font-bold hover:text-gray-300 transform hover:scale-110 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Experience
            </Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
        </Routes>
      </div>
    </Router>
  );
}
