import { motion } from "framer-motion";
import { FloatingPaper } from "./floating-paper";
import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useHomeData } from "../hooks/useHomeData";
import { AboutMeSectionSkeleton } from "./skeletons";

// Componente para las estrellas brillantes dentro del marco de la imagen
const SparkleStars = () => {
  const [sparkles, setSparkles] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);

  useEffect(() => {
    // Generar estrellas en posiciones aleatorias
    const newSparkles = Array.from({ length: 8 }, (_, i) => ({
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

// Componente para el contenedor de la imagen con borde azul brillante
interface ImageContainerProps {
  imageSrc?: string;
  imageAlt?: string;
  children?: React.ReactNode;
}

const ImageContainer = ({
  imageSrc,
  imageAlt = "Roxana Aparicio",
  children,
}: ImageContainerProps) => {
  return (
    <div className="relative w-full h-[500px] md:h-[600px]">
      {/* Borde azul brillante */}
      <div className="absolute inset-0 rounded-lg ">
        {/* Contenedor interno para la imagen */}
        <div className="absolute inset-2 rounded-md overflow-hidden ">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover"
            />
          ) : children ? (
            children
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <p className="text-gray-400 text-sm italic">
                {/* Imagen por agregar */}
              </p>
            </div>
          )}
        </div>
        {/* Estrellas brillantes flotantes */}
        <SparkleStars />
      </div>
    </div>
  );
};

interface AboutMeSectionProps {
  imageSrc?: string;
  imageAlt?: string;
}

export default function AboutMeSection({
  imageSrc,
  imageAlt,
}: AboutMeSectionProps) {
  const navigate = useNavigate();
  const { data, loading } = useHomeData();
  const aboutMe = data.aboutMe || {};
  const displayImageAlt = imageAlt ?? aboutMe.imageAlt;
  const displayImageSrc = imageSrc ?? aboutMe.imageUrl;

  const handleButtonClick = () => {
    navigate("/about#sobre-la-fundadora");
  };

  if (loading) {
    return <AboutMeSectionSkeleton />;
  }

  return (
    <section className="relative py-20 px-6 min-h-[700px]">
      {/* Floating papers background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingPaper count={6} />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Columna de imagen (izquierda) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center"
          >
            <ImageContainer
              imageSrc={displayImageSrc}
              imageAlt={displayImageAlt}
            >
              {/* La imagen se puede agregar pasando imageSrc como prop o usando children */}
            </ImageContainer>
          </motion.div>

          {/* Columna de texto (derecha) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              {aboutMe.title}
            </h2>

            <p className="text-white text-lg md:text-xl leading-relaxed">
              {aboutMe.paragraph1}
            </p>

            <p className="text-white text-lg md:text-xl leading-relaxed">
              {aboutMe.paragraph2}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <button
                onClick={handleButtonClick}
                className="btn-primary px-8 mt-6"
              >
                {aboutMe.buttonText}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
