import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function EditorialHeader({ activePerspective, setActivePerspective, blueprintMode, setBlueprintMode }) {
  const perspectives = [
    { id: "all", label: "All", emoji: "" },
    { id: "product", label: "Product", emoji: "🎯" },
    { id: "data", label: "Data & Analytics", emoji: "📊" },
    { id: "engineering", label: "Engineering", emoji: "⚡" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-ivory/90 backdrop-blur-md border-b border-stone">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left: Name + Social Links */}
        <div className="flex items-center gap-6">
          <h1 className="font-serif text-2xl font-bold text-ink tracking-tight">
            Taylor DeVries
          </h1>
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/taylor-r-devries/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-forest transition-colors duration-200"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/Taylor-DeVries"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-forest transition-colors duration-200"
            >
              <FaGithub className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Center: Perspective Switcher */}
        <div className="hidden md:flex items-center bg-card border border-stone rounded-sm p-1">
          {perspectives.map((perspective) => (
            <button
              key={perspective.id}
              onClick={() => setActivePerspective(perspective.id)}
              className={`px-3 py-1.5 rounded-sm text-sm font-mono font-medium transition-all duration-200 ${
                activePerspective === perspective.id
                  ? "bg-forest text-ivory"
                  : "text-muted hover:text-ink"
              }`}
            >
              {perspective.emoji} {perspective.label}
            </button>
          ))}
        </div>

        {/* Right: Blueprint Mode Toggle */}
        <button
          onClick={() => setBlueprintMode(!blueprintMode)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-sm text-sm font-mono font-medium border transition-all duration-200 ${
            blueprintMode
              ? "bg-amber text-ivory border-amber"
              : "bg-transparent text-muted border-stone hover:border-forest hover:text-ink"
          }`}
        >
          {blueprintMode ? "📐 Blueprint Mode" : "💬 Field Notes"}
        </button>
      </div>

      {/* Mobile Perspective Switcher */}
      <div className="md:hidden px-6 pb-3 flex overflow-x-auto gap-2 hide-scrollbar">
        {perspectives.map((perspective) => (
          <button
            key={perspective.id}
            onClick={() => setActivePerspective(perspective.id)}
            className={`px-3 py-1.5 rounded-sm text-xs font-mono font-medium whitespace-nowrap transition-all duration-200 ${
              activePerspective === perspective.id
                ? "bg-forest text-ivory"
                : "bg-card text-muted border border-stone"
            }`}
          >
            {perspective.emoji} {perspective.label}
          </button>
        ))}
      </div>
    </header>
  );
}
