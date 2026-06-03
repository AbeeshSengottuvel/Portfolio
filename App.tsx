import React, { useState, useEffect } from "react";
import { ArrowUp, Terminal } from "lucide-react";
import { CloudBackground } from "./components/CloudBackground";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { QAPlayground } from "./components/QAPlayground";
import { AutomationSimulator } from "./components/AutomationSimulator";
import { Experience } from "./components/Experience";
import { Education } from "./components/Education";
import { Contact } from "./components/Contact";

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${
        isDarkMode ? "bg-[#0a0c10] text-white" : "bg-white text-slate-900"
      }`}
    >
      {/* Glow Blur Background Blobs */}
      <CloudBackground isDarkMode={isDarkMode} />

      {/* Floating Navigation Menu */}
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        scrollToSection={scrollToSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrolled={scrolled}
      />

      <main className="max-w-7xl mx-auto px-5 md:px-6 relative z-10">
        {/* Hero Section */}
        <Hero isDarkMode={isDarkMode} scrollToSection={scrollToSection} />

        {/* Skills Section */}
        <Skills isDarkMode={isDarkMode} />

        {/* Projects Section */}
        <Projects isDarkMode={isDarkMode} />

        {/* QA Sandbox Playground */}
        <QAPlayground />

        {/* Automation Runner Simulator */}
        <AutomationSimulator />

        {/* Work Experience */}
        <Experience isDarkMode={isDarkMode} />

        {/* Education History */}
        <Education isDarkMode={isDarkMode} />

        {/* Contact Form & Connections */}
        <Contact isDarkMode={isDarkMode} />
      </main>

      {/* Footer */}
      <footer
        className={`py-12 md:py-16 border-t relative z-10 ${
          isDarkMode ? "border-white/5 bg-[#0a0c10]" : "border-black/5 bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Terminal size={18} className="md:size-20" />
            </div>
            <span className="font-display font-black text-xl md:text-2xl tracking-tighter hover:text-blue-500 transition-colors">
              Abeesh S.
            </span>
          </div>
          
          <p
            className={`text-xs md:text-sm font-bold text-center ${
              isDarkMode ? "text-slate-500" : "text-slate-400"
            }`}
          >
            &copy; {new Date().getFullYear()} Abeesh Sengottuvel. Crafted for perfection.
          </p>
          
          <div className="group flex gap-6 items-center cursor-pointer">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, "#home")}
              className="group w-auto px-5 h-14 md:h-16 rounded-xl md:rounded-2xl
                  bg-blue-600/10 flex items-center gap-2 text-blue-600
                  font-display font-black text-xl md:text-2xl tracking-tighter
                  transition-all duration-300 hover:-translate-y-1 hover:text-blue-600"
            >
              <ArrowUp
                size={28}
                className="transition-transform duration-300 group-hover:-translate-y-1"
              />
              <span>Top</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
