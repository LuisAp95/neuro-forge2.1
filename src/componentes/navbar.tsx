import { useState } from "react";
import { Bot, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useContactDirections } from "../hooks/useContactDirections";
import { INTERNAL_NAV_LINKS, CONTACT_LABEL } from "../data/navLinks";
import { MobileSidebar } from "./MobileSidebar";

export default function Navbar() {
  const { primaryUrl } = useContactDirections();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isAuthActive = false;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="flex items-center justify-between fixed px-6 py-4 backdrop-blur-sm border-b border-white/10 w-screen z-30 "
      >
        <Link to="/" className="flex items-center space-x-2">
          <Bot className="w-8 h-8 text-purple-500" />
          <span className="text-white font-medium text-xl">Neuro Forgue</span>
        </Link>
        <div className="hidden md:flex items-center space-x-8 text-white">
          {INTERNAL_NAV_LINKS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-white hover:text-white/90 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          {primaryUrl ? (
            <a
              href={primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white/90 transition-colors"
            >
              {CONTACT_LABEL}
            </a>
          ) : (
            <Link
              to="/"
              className="text-white hover:text-white/90 transition-colors"
            >
              {CONTACT_LABEL}
            </Link>
          )}
        </div>

        {isAuthActive && (
          <div className="hidden md:flex items-center space-x-4">
            <button className="btn-secondary">Sign In</button>
            <button className="btn-primary">Get Started</button>
          </div>
        )}

        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Abrir menú"
          className="md:hidden p-2 -m-2 text-white hover:text-purple-400 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </motion.nav>

      <MobileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        contactUrl={primaryUrl}
      />
    </>
  );
}
