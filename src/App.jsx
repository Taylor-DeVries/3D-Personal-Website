import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa"; // Import icons from react-icons
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode === "true") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <Router>
      <div className="min-h-screen bg-[#f5f4f2] dark:bg-[#1a1a1a] text-[#333] dark:text-[#f5f4f2] font-sans">
        <nav className="p-4 bg-purple-400 text-[#f5f4f2] dark:text-[#333] shadow-lg fixed top-0 left-0 w-full z-20 flex justify-between items-center">
          {/* Menu Toggle Button */}
          <button
            className="sm:hidden text-lg font-bold hover:text-gray-300 transform hover:scale-110 transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>

          {/* Navigation Links */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } sm:flex space-x-4 absolute sm:static top-16 left-0 w-full sm:w-auto bg-purple-400 sm:bg-transparent p-4 sm:p-0 shadow-lg sm:shadow-none`}
          >
            <Link
              to="/"
              className="block sm:inline text-lg font-bold hover:text-gray-300 transform hover:scale-110 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
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

          {/* Dark Mode Toggle */}
          <input
            type="checkbox"
            className="peer sr-only opacity-0"
            id="toggle"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <label
            htmlFor="toggle"
            className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:bg-[#333] peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-[#333]"
          >
            <span className="sr-only">Enable</span>
            <div className="absolute top-0.2 left-0 dark:left-5 w-6 h-6 rounded-full shadow-md flex items-center justify-center transform transition-transform peer-checked:translate-x-5">
              {darkMode ? (
                <FaSun className="text-yellow-600" size={12} />
              ) : (
                <FaMoon className="text-purple-600" size={12} />
              )}
            </div>
          </label>
        </nav>

        {/* Routes */}
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
