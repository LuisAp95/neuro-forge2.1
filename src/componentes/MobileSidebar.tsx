import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { INTERNAL_NAV_LINKS, CONTACT_LABEL } from "../data/navLinks";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  contactUrl: string | null;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const sidebarVariants = {
  hidden: { x: "100%" },
  visible: { x: 0 },
  exit: { x: "100%" },
};

export function MobileSidebar({
  isOpen,
  onClose,
  contactUrl,
}: MobileSidebarProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleLinkClick = () => onClose();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            role="presentation"
            aria-hidden="true"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 0.25, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-[min(85vw,320px)] bg-black/95 border-l border-white/10 z-50 md:hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <span className="text-white font-medium text-lg">Menú</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar menú"
                className="p-2 -m-2 text-white hover:text-purple-400 transition-colors rounded-lg hover:bg-white/5"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col p-6 gap-1">
              {INTERNAL_NAV_LINKS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={handleLinkClick}
                  className="py-3 px-4 text-white hover:text-purple-400 hover:bg-white/5 rounded-lg transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ))}
              {contactUrl ? (
                <a
                  href={contactUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="py-3 px-4 text-white hover:text-purple-400 hover:bg-white/5 rounded-lg transition-colors font-medium"
                >
                  {CONTACT_LABEL}
                </a>
              ) : (
                <Link
                  to="/"
                  onClick={handleLinkClick}
                  className="py-3 px-4 text-white hover:text-purple-400 hover:bg-white/5 rounded-lg transition-colors font-medium"
                >
                  {CONTACT_LABEL}
                </Link>
              )}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
