import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FloatingPaper } from "./floating-paper";
import { RoboAnimation } from "./robo-animation";
import { useHomeData } from "../hooks/useHomeData";
import { useContactDirections } from "../hooks/useContactDirections";
import { HeroSkeleton } from "./skeletons";

export default function Hero() {
  const { data, loading } = useHomeData();
  const { primaryUrl } = useContactDirections();
  const hero = data.hero || {};

  if (loading) {
    return <HeroSkeleton />;
  }

  return (
    <div className="relative min-h-[calc(100vh-76px)] flex items-center">
      {/* Floating papers background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingPaper count={6} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              {hero.titleLine1}
              <span className="text-gradient ml-4">{hero.titleHighlight}</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link to="/services" className="btn-primary">
              {hero.ctaPrimary}
            </Link>
            {primaryUrl ? (
              <a
                href={primaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                {hero.ctaSecondary}
              </a>
            ) : (
              <span
                className="btn-secondary opacity-70 cursor-not-allowed"
                title="Configura la URL en Supabase"
              >
                {hero.ctaSecondary}
              </span>
            )}
          </motion.div>
        </div>
      </div>

      {/* Animated robot */}
      <div className="absolute bottom-0 right-0 w-96 h-96">
        <RoboAnimation />
      </div>
    </div>
  );
}
