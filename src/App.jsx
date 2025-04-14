import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#f5f4f2] text-[#333] font-sans">
        <nav className="p-4 bg-purple-400 text-[#f5f4f2] shadow-lg fixed top-0 left-0 w-full z-20 flex justify-between items-center">
          <div className="space-x-4">
            <Link
              to="/"
              className="text-lg font-bold hover:text-gray-300 transform hover:scale-110 transition-all duration-300"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-lg font-bold hover:text-gray-300 transform hover:scale-110 transition-all duration-300"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="text-lg font-bold hover:text-gray-300 transform hover:scale-110 transition-all duration-300"
            >
              Contact
            </Link>
            <Link
              to="/projects"
              className="text-lg font-bold hover:text-gray-300 transform hover:scale-110 transition-all duration-300"
            >
              Projects
            </Link>
            <Link
              to="/experience"
              className="text-lg font-bold hover:text-gray-300 transform hover:scale-110 transition-all duration-300"
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
