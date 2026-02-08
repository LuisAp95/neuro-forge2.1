import { motion } from "framer-motion";
import { FloatingPaper } from "./floating-paper";
import { useAboutData } from "../hooks/useAboutData";
import { AboutmeSkeleton } from "./skeletons";
import MissionSection from "./MissionSection";

// Componente para el espacio del robot (imagen desde Supabase o placeholder)
const RobotContainer = ({ hero }: { hero: any }) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative w-full h-[600px] flex items-center justify-center">
        <div className="relative w-full max-w-[500px] h-full flex items-center justify-center">
          <div className="w-full h-full overflow-hidden flex items-center justify-center">
            {hero.imageUrl ? (
              <img
                src={hero.imageUrl}
                alt={hero.imageAlt || "Acerca de Neuro Forge"}
                className="w-full h-full object-cover"
              />
            ) : (
              <p className="text-gray-400 text-sm italic">
                {hero.robotPlaceholder}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente para el contenido textual
const AboutContent = ({ hero }: { hero: any }) => {
  return (
    <div className="flex flex-col justify-center space-y-6 h-full">
      {/* Título Principal */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl lg:text-6xl  font-bold leading-tight"
      >
        <span className="text-gradient">{hero.titleHighlight}</span>
        <span className="text-white"> {hero.titleMain}</span>
      </motion.h1>

      {/* Subtítulo */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-white text-xl md:text-2xl font-medium"
      >
        {hero.subtitle}
      </motion.p>

      {/* Primer párrafo */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-white text-lg md:text-xl leading-relaxed"
      >
        {hero.paragraph1}
      </motion.p>

      {/* Segundo párrafo */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-white text-lg md:text-xl leading-relaxed"
      >
        {hero.paragraph2}
      </motion.p>

      {/* Botón SABER MÁS */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="pt-4"
      >
        <button className="btn-secondary text-lg uppercase tracking-wider">
          {hero.ctaButton}
        </button>
      </motion.div>
    </div>
  );
};

// Componente para el espacio del cohete/imagen (imagen desde Supabase o placeholder)
const RocketContainer = ({ whatWeDo }: { whatWeDo: any }) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative w-full h-[600px] flex items-center justify-center">
        <div className="relative w-full max-w-[500px] h-full flex items-center justify-center">
          <div className="w-full h-full overflow-hidden flex items-center justify-center">
            {whatWeDo.imageUrl ? (
              <img
                src={whatWeDo.imageUrl}
                alt={whatWeDo.imageAlt || "¿Qué hacemos?"}
                className="w-full h-full object-cover"
              />
            ) : (
              <p className="text-gray-400 text-sm italic">
                {whatWeDo.rocketPlaceholder}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente para el servicio individual
interface ServiceItemProps {
  title: string;
  description: string;
  delay?: number;
}

const ServiceItem = ({ title, description, delay = 0 }: ServiceItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="flex items-start gap-4"
    >
      {/* Checkmark verde */}
      <div className="flex-shrink-0 mt-1">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-green-500"
        >
          <path
            d="M20 6L9 17L4 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="flex-1">
        <h3 className="text-white font-bold text-lg md:text-xl mb-2">
          {title}
        </h3>
        <p className="text-white text-base md:text-lg leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// Componente para el contenido de servicios
const ServicesContent = ({ whatWeDo }: { whatWeDo: any }) => {
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
        {whatWeDo.title}
      </motion.h2>

      {/* Texto introductorio */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-white text-lg md:text-xl mb-6"
      >
        {whatWeDo.intro}
      </motion.p>

      {/* Lista de servicios */}
      <div className="space-y-6">
        {whatWeDo.services?.map((service: any, index: number) => (
          <ServiceItem
            key={index}
            title={service.title}
            description={service.description}
            delay={0.3 + index * 0.1}
          />
        ))}
      </div>
    </div>
  );
};

// Componente para la sección "¿Qué hacemos?"
const WhatWeDoSection = ({ whatWeDo }: { whatWeDo: any }) => {
  return (
    <section className="relative w-full min-h-screen text-white">
      {/* Floating papers background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingPaper count={6} />
      </div>

      {/* Contenedor principal */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Columna izquierda: Contenido textual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center"
          >
            <ServicesContent whatWeDo={whatWeDo} />
          </motion.div>

          {/* Columna derecha: Cohete/Imagen */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center"
          >
            <RocketContainer whatWeDo={whatWeDo} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default function Aboutme() {
  const { data, loading } = useAboutData();
  const hero = data.hero || {};
  const whatWeDo = data.whatWeDo || { services: [] };
  const mission = data.mission;

  if (loading) {
    return <AboutmeSkeleton />;
  }

  return (
    <>
      {/* Primera sección: Acerca de */}
      <section className="relative w-full min-h-screen text-white">
        {/* Floating papers background */}
        <div className="absolute inset-0 overflow-hidden">
          <FloatingPaper count={6} />
        </div>

        {/* Contenedor principal */}
        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Columna izquierda: Robot */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center"
            >
              <RobotContainer hero={hero} />
            </motion.div>

            {/* Columna derecha: Contenido textual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center"
            >
              <AboutContent hero={hero} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Segunda sección: ¿Qué hacemos? */}
      <WhatWeDoSection whatWeDo={whatWeDo} />

      {/* Tercera sección: Nuestra Misión */}
      <MissionSection mission={mission} />
    </>
  );
}
