import { motion } from "framer-motion";
import { FloatingPaper } from "./floating-paper";
import fundadoraImage from "../assets/fundadora.jpeg";
import { useAboutData } from "../hooks/useAboutData";
import { useEffect, useState } from "react";
import { FundadoraSkeleton } from "./skeletons";

// Componente para las estrellas brillantes
const SparkleStars = () => {
  const [sparkles, setSparkles] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);

  useEffect(() => {
    const newSparkles = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z"
              fill="currentColor"
              className="text-cyan-400"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

// Componente para el contenedor de la imagen (Supabase imageUrl o imagen local)
const FounderImageContainer = ({ founder }: { founder: any }) => {
  const imageSrc = founder.imageUrl || fundadoraImage;
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative w-full h-[600px] flex items-center justify-center">
        <div className="relative w-full max-w-[500px] h-full flex items-center justify-center">
          {/* Borde azul brillante similar a AboutMeSection */}
          <div className="absolute inset-0 rounded-lg ">
            {/* Contenedor interno para la imagen */}
            <div className="absolute inset-2 rounded-md overflow-hidden ">
              <img
                src={imageSrc}
                alt={founder.imageAlt || "Fundadora de Neuro Forge"}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Estrellas brillantes flotantes */}
            <SparkleStars />
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente para el contenido textual
const FounderContent = ({ founder }: { founder: any }) => {
  return (
    <div className="flex flex-col justify-center space-y-6 h-full">
      {/* Título Principal */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient"
      >
        {founder.title}
      </motion.h2>

      {/* Primer párrafo */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-white text-lg md:text-xl leading-relaxed"
      >
        {founder.paragraph1}
      </motion.p>

      {/* Segundo párrafo */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-white text-lg md:text-xl leading-relaxed"
      >
        {founder.paragraph2}
      </motion.p>

      {/* Tercer párrafo */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-white text-lg md:text-xl leading-relaxed"
      >
        {founder.paragraph3}
      </motion.p>

      {/* Frase destacada */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-xl md:text-2xl font-medium italic pt-4 border-l-4 border-cyan-400/60 pl-6 text-gradient"
      >
        {founder.highlightQuote}
      </motion.p>
    </div>
  );
};

export default function Fundadora() {
  const { data, loading } = useAboutData();
  const founder = data.founder || {};

  if (loading) {
    return <FundadoraSkeleton />;
  }

  return (
    <section
      id="sobre-la-fundadora"
      className="relative w-full min-h-screen text-white"
    >
      {/* Floating papers background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingPaper count={6} />
      </div>

      {/* Contenedor principal */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Columna izquierda: Imagen */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center"
          >
            <FounderImageContainer founder={founder} />
          </motion.div>

          {/* Columna derecha: Contenido textual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center"
          >
            <FounderContent founder={founder} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
