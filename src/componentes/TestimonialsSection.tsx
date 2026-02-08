import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FloatingPaper } from "./floating-paper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "./TestimonialCard";
import { useTestimonials } from "../hooks/useTestimonials";
import { useHomeData } from "../hooks/useHomeData";
import { TestimonialsSectionSkeleton } from "./skeletons";

// Ilustración del robot central
const RobotIllustration = () => (
  <motion.div
    animate={{
      y: [0, -10, 0],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="relative"
  >
    {/* Robot */}
    <div className="relative w-32 h-40 md:w-40 md:h-48">
      {/* Cuerpo del robot */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-32 md:w-32 md:h-40 rounded-lg">
        {/* Pantalla/cara */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 md:w-20 md:h-20 bg-gray-800 rounded-lg flex items-center justify-center">
          {/* Ojos brillantes */}
          <div className="flex gap-3">
            <motion.div
              className="w-3 h-3 md:w-4 md:h-4 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="w-3 h-3 md:w-4 md:h-4 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
            />
          </div>
        </div>
        {/* Auriculares */}
        <div className="absolute top-2 left-2 w-8 h-8 md:w-10 md:h-10 border-4 border-cyan-400 rounded-full"></div>
        <div className="absolute top-2 right-2 w-8 h-8 md:w-10 md:h-10 border-4 border-cyan-400 rounded-full"></div>
      </div>
      {/* Objeto que sostiene (target) */}
      <motion.div
        className="absolute -right-4 top-1/2 transform -translate-y-1/2"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="w-12 h-12 md:w-16 md:h-16 relative">
          <div className="w-full h-full border-4 border-red-500 rounded-full">
            <div className="absolute inset-2 border-2 border-white rounded-full"></div>
            {/* Flecha */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-b-cyan-400"></div>
          </div>
        </div>
      </motion.div>
    </div>
    {/* Estrellas brillantes alrededor */}
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 2 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 2,
        }}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-cyan-400"
        >
          <path
            d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z"
            fill="currentColor"
          />
        </svg>
      </motion.div>
    ))}
  </motion.div>
);

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Obtener datos desde Supabase
  const { testimonials, loading: loadingTestimonials } = useTestimonials();
  const { data: homeContent, loading: loadingHome } = useHomeData();
  const testimonialsContent = homeContent.testimonials || {};

  // Auto-play del slider
  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  // Manejo de touch para móviles
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }
  };

  if (loadingTestimonials || loadingHome) {
    return <TestimonialsSectionSkeleton />;
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="relative py-20 px-6 min-h-[700px]">
      {/* Floating papers background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingPaper count={6} />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            {testimonialsContent.sectionTitle}{" "}
            <span className="text-gradient">
              {testimonialsContent.titleHighlight}
            </span>
          </h2>
        </motion.div>

        {/* Robot en posición absoluta (solo desktop) */}
        <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none">
          <RobotIllustration />
        </div>

        {/* Contenedor del slider */}
        <div className="relative">
          {/* Botones de navegación */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-gray-900/80 hover:bg-gray-800 rounded-full p-3 border border-cyan-400/40 hover:border-cyan-400 transition-all duration-300 hidden md:flex items-center justify-center"
            aria-label="Cliente anterior"
          >
            <ChevronLeft className="w-6 h-6 text-cyan-400" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-gray-900/80 hover:bg-gray-800 rounded-full p-3 border border-cyan-400/40 hover:border-cyan-400 transition-all duration-300 hidden md:flex items-center justify-center"
            aria-label="Siguiente cliente"
          >
            <ChevronRight className="w-6 h-6 text-cyan-400" />
          </button>

          {/* Slider */}
          <div
            ref={sliderRef}
            className="overflow-hidden relative"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Layout para desktop */}
            <div className="hidden lg:flex items-center justify-center gap-8">
              {/* Testimonio izquierdo */}
              <div className="flex-1 max-w-[450px]">
                {testimonials[
                  (currentIndex - 1 + testimonials.length) % testimonials.length
                ] && (
                  <TestimonialCard
                    testimonial={
                      testimonials[
                        (currentIndex - 1 + testimonials.length) %
                          testimonials.length
                      ]
                    }
                    isActive={false}
                  />
                )}
              </div>

              {/* Testimonio central activo */}
              <div className="flex-1 max-w-[450px]">
                <TestimonialCard
                  testimonial={testimonials[currentIndex]}
                  isActive={true}
                  delay={0.2}
                />
              </div>

              {/* Testimonio derecho */}
              <div className="flex-1 max-w-[450px]">
                {testimonials[(currentIndex + 1) % testimonials.length] && (
                  <TestimonialCard
                    testimonial={
                      testimonials[(currentIndex + 1) % testimonials.length]
                    }
                    isActive={false}
                  />
                )}
              </div>
            </div>

            {/* Layout para móvil/tablet - solo testimonio central */}
            <div className="lg:hidden flex items-center justify-center">
              <div className="w-full max-w-[450px]">
                <TestimonialCard
                  testimonial={testimonials[currentIndex]}
                  isActive={true}
                  delay={0.2}
                />
              </div>
            </div>
          </div>

          {/* Indicadores de puntos */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-cyan-400"
                    : "w-2 bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Ir al cliente ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
