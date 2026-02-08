import { motion } from "framer-motion";
import { FloatingPaper } from "./floating-paper";
import { useAboutData } from "../hooks/useAboutData";
import { useEffect, useState } from "react";
import { OfficePhotoSkeleton } from "./skeletons";

// Componente para las estrellas brillantes
const SparkleStars = () => {
  const [sparkles, setSparkles] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);

  useEffect(() => {
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

// Componente para el contenedor de la imagen
interface OfficePhotoContainerProps {
  imageSrc?: string;
  imageAlt?: string;
}

const OfficePhotoContainer = ({
  imageSrc,
  imageAlt,
  officePhoto,
}: OfficePhotoContainerProps & { officePhoto: any }) => {
  const alt = imageAlt ?? officePhoto?.imageAlt;
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative w-full max-w-[700px] h-[600px] flex items-center justify-center">
        {/* Borde azul brillante similar a otras secciones */}
        <div className="absolute inset-0 border-2 border-cyan-400/60 rounded-lg shadow-[0_0_20px_rgba(34,211,238,0.3)]">
          {/* Contenedor interno para la imagen */}
          <div className="absolute inset-2 rounded-md overflow-hidden bg-white">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={alt}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <p className="text-gray-400 text-sm italic">
                  {officePhoto.placeholderText}
                </p>
              </div>
            )}
          </div>
          {/* Estrellas brillantes flotantes */}
          <SparkleStars />
        </div>
      </div>
    </div>
  );
};

// Componente principal de la sección
export default function OfficePhotoSection() {
  const { data, loading } = useAboutData();
  const officePhoto = data.officePhoto || {};

  if (loading) {
    return <OfficePhotoSkeleton />;
  }

  return (
    <section className="relative w-full min-h-screen text-white">
      {/* Floating papers background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingPaper count={6} />
      </div>

      {/* Contenedor principal */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          {/* Imagen centrada */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full flex items-center justify-center"
          >
            <OfficePhotoContainer officePhoto={officePhoto} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
