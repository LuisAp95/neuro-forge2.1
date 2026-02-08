import { useState, useEffect, TouchEvent } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, BotMessageSquare } from "lucide-react";
import { useServicesData } from "../hooks/useServicesData";
import { SliderSkeleton } from "./skeletons";

interface Service {
  id: number;
  title: string;
  description: string;
  description_completa: string | null;
  implementacion: string[];
  beneficios: string[];
}

const ServiceSlider = () => {
  const { data, loading } = useServicesData();
  const services = data.slider.services as Service[];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [expansionStyle, setExpansionStyle] = useState({});

  if (loading) {
    return <SliderSkeleton />;
  }

  /* useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);*/

  const handleCardClick = (index: number) => {
    if (index === activeIndex && !isExpanded) {
      setIsExpanded(true);
      setExpansionStyle({
        transform: "scale(1)",
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      });
    }
  };

  const handleClose = () => {
    setExpansionStyle({
      transform: "scale(0)",
      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
    });

    setTimeout(() => {
      setIsExpanded(false);
    }, 500);
  };

  const handleNext = () =>
    setActiveIndex((prev) => (prev + 1) % services.length);
  const handlePrev = () =>
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const difference = touchStart - touchEnd;
    const isLeftSwipe = difference > 50;
    const isRightSwipe = difference < -50;

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();

    // Reset valores
    setTouchStart(0);
    setTouchEnd(0);
  };

  const getCardStyle = (index: number) => {
    if (isMobile) {
      if (index !== activeIndex) {
        return {
          left: "50%",
          opacity: 0,
          visibility: "hidden" as const,
          pointerEvents: "none" as const,
          transform: "translate(-50%, 0) scale(0.95)",
          zIndex: 0,
        };
      }
      return {
        left: "50%",
        transform: "translate(-50%, 0) scale(1)",
        filter: "blur(0px)",
        zIndex: 10,
        opacity: 1,
      };
    }

    const distance = Math.abs(activeIndex - index);
    const direction = index > activeIndex ? 1 : -1;

    return {
      left: "50%",
      transform: `
        translate(-50%, 0)
        scale(${1 - distance * 0.2}) 
        translateX(${direction * distance * 100}%)
      `,
      filter: `blur(${distance * 2}px)`,
      zIndex: services.length - distance,
      opacity: 1 - distance * 0.1,
    };
  };

  return (
    <div
      className="flex min-h-screen w-full max-w-full overflow-x-hidden items-center justify-center p-4 flex-col"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Título Principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 w-full"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white"
          >
            {data.slider.titlePart1}
          </motion.span>{" "}
          <motion.span
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gradient"
          >
            {data.slider.titleHighlight}
          </motion.span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative h-116 w-full max-w-6xl flex items-center justify-center overflow-x-hidden px-2"
      >
        {/* Fondo brillante */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute inset-0 bg-gradient-to-r  from-blue-500/20 to-purple-500/20 blur-2xl"
        />

        {services.map((service, index) => (
          <div
            key={service.id}
            className={`absolute w-[min(100%,calc(100vw-2rem))] md:w-72 lg:w-80 h-80 md:h-96 bg-white rounded-2xl p-6 shadow-xl transition-all duration-500
            ${
              index === activeIndex
                ? "hover:scale-105 hover:shadow-2xl cursor-pointer"
                : "pointer-events-none"
            }`}
            style={isExpanded ? {} : getCardStyle(index)}
            onClick={() => handleCardClick(index)}
          >
            <motion.div
              key={`${service.id}-${activeIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={
                index === activeIndex
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0.8, y: 5 }
              }
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col justify-center"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center">
                {service.description}..
              </p>
            </motion.div>
          </div>
        ))}

        {/* Overlay de expansión */}
        {isExpanded && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 items-center justify-center  "
            onClick={handleClose}
          >
            <div
              className="bg-white rounded-2xl p-8 max-h-[calc(100vh-10%)] relative mx-auto my-8 max-w-4xl overflow-x-hidden custon-scrollbar "
              style={expansionStyle}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClose}
                className="cursor-pointer absolute top-0 right-0 bg-white p-2 rounded-full shadow-lg z-50 hover:scale-105 transition-transform "
              >
                <X size={24} />
              </button>

              <div className="h-full flex flex-col  items-center justify-center">
                <h3 className="text-3xl font-bold mb-6 text-gray-800 text-center">
                  {services[activeIndex].title}
                </h3>
                <p className="text-gray-600 text-lg max-w-2xl text-justify">
                  {services[activeIndex].description_completa}
                </p>
                {/* Agrega aquí más contenido si es necesario */}
                <p className="mt-2 font-semibold text-2xl mb-2">
                  {data.slider.implementLabel}
                </p>
                {services[activeIndex].implementacion.map((imple, idx) => (
                  <div
                    key={idx}
                    className=" flex flex-row  text-lg max-w-2xl px-5 text-gray-800 items-center justify-center gap-4 w-[650px]"
                  >
                    <div className="w-full flex gap-8  mt-2">
                      <div className="w-2 h-2  justify-center">
                        <BotMessageSquare />
                      </div>
                      <p>{imple}</p>
                    </div>
                  </div>
                ))}

                <p className="mt-2 font-semibold text-2xl mb-2">
                  {data.slider.benefitsLabel}
                </p>
                {services[activeIndex].beneficios.map((bn, idx) => (
                  <div
                    key={idx}
                    className=" flex flex-row  text-lg max-w-2xl px-5 text-gray-800 items-center justify-center gap-4 w-[650px]"
                  >
                    <div className="w-full flex gap-8  mt-2">
                      <div className="w-2 h-2  justify-center">
                        <BotMessageSquare />
                      </div>
                      <p>{bn}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Controles */}
        <button
          onClick={() =>
            setActiveIndex(
              (prev) => (prev - 1 + services.length) % services.length,
            )
          }
          className=" md:flex hidden absolute left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg z-50 hover:scale-105 transition-transform"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => setActiveIndex((prev) => (prev + 1) % services.length)}
          className=" md:flex hidden absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg z-50 hover:scale-105 transition-transform"
        >
          <ChevronRight />
        </button>
      </motion.div>
    </div>
  );
};

export default ServiceSlider;
