import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { FloatingPaper } from "./floating-paper";
import { Bot, Headphones, Settings } from "lucide-react";
import { useServicesData } from "../hooks/useServicesData";
import { ServicesGridSkeleton } from "./skeletons";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  image_url?: string | null;
  image_alt?: string | null;
}

// Iconos definidos en el componente (mantienen estructura visual/CSS)
const serviceIcons: Record<string, ReactNode> = {
  "1": (
    <div className="relative w-32 h-32 md:w-40 md:h-40">
      <div className="absolute inset-0 bg-white rounded-2xl border-4 border-gray-700 shadow-xl">
        <div className="absolute inset-2 bg-gray-900 rounded-lg flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <Bot className="w-12 h-12 text-cyan-400" />
              <Headphones className="w-8 h-8 text-cyan-400 absolute -top-1 -right-1" />
            </div>
            <div className="bg-cyan-400/20 rounded-lg px-3 py-1 mt-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-75" />
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-150" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  "2": (
    <div className="relative w-32 h-32 md:w-40 md:h-40">
      <div className="absolute inset-0 bg-white rounded-2xl border-4 border-gray-700 shadow-xl">
        <div className="absolute inset-2 bg-gray-900 rounded-lg p-3 flex flex-col gap-2">
          <div className="bg-cyan-400/20 rounded-lg px-3 py-2 flex items-center gap-2">
            <Bot className="w-4 h-4 text-cyan-400" />
            <div className="h-2 bg-cyan-400/50 rounded w-20" />
          </div>
          <div className="bg-purple-500/20 rounded-lg px-3 py-2 flex items-center gap-2 ml-auto w-24">
            <div className="h-2 bg-purple-400/50 rounded w-16" />
            <div className="w-4 h-4 rounded-full bg-purple-400/50" />
          </div>
          <div className="bg-cyan-400/20 rounded-lg px-3 py-2 flex items-center gap-2">
            <Bot className="w-4 h-4 text-cyan-400" />
            <div className="h-2 bg-cyan-400/50 rounded w-24" />
          </div>
          <div className="bg-purple-500/20 rounded-lg px-3 py-2 flex items-center gap-2 ml-auto w-20">
            <div className="h-2 bg-purple-400/50 rounded w-12" />
            <div className="w-4 h-4 rounded-full bg-purple-400/50" />
          </div>
        </div>
      </div>
    </div>
  ),
  "3": (
    <div className="relative w-32 h-32 md:w-40 md:h-40">
      <div className="absolute inset-0 bg-cyan-400 rounded-lg border-4 border-gray-700 shadow-xl">
        <div className="absolute inset-2 bg-gray-900 rounded flex flex-col p-2">
          <div className="flex-1 flex flex-col gap-1">
            <div className="h-3 bg-gray-700 rounded w-full" />
            <div className="h-3 bg-gray-700 rounded w-3/4" />
            <div className="h-3 bg-gray-700 rounded w-full" />
          </div>
          <div className="flex justify-center items-center mt-2">
            <div className="bg-cyan-400/20 rounded-lg p-2">
              <Bot className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-2 -right-2">
        <Settings className="w-8 h-8 text-pink-500 rotate-45" />
      </div>
      <div className="absolute -bottom-1 -right-4">
        <Settings className="w-6 h-6 text-pink-400" />
      </div>
    </div>
  ),
};

// Componente para cada tarjeta de servicio
const ServiceCard = ({
  service,
  index,
}: {
  service: ServiceItem;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-xl border border-purple-500/20 p-6 md:p-8 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:scale-105"
    >
      {/* Imagen (Supabase) o ilustración por defecto */}
      <div className="flex justify-center mb-6 h-40 md:h-48 items-center overflow-hidden rounded-lg bg-gray-800/50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
          className="relative w-full h-full"
        >
          {service.image_url ? (
            <img
              src={service.image_url}
              alt={service.image_alt || service.title}
              className="w-full h-full object-cover"
            />
          ) : (
            service.icon
          )}
        </motion.div>
      </div>

      {/* Título */}
      <motion.h3
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
        className="text-lg md:text-xl font-bold text-white mb-4 uppercase tracking-wide text-center"
      >
        {service.title}
      </motion.h3>

      {/* Descripción */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.15 + 0.4 }}
        className="text-gray-400 text-sm md:text-base leading-relaxed text-center"
      >
        {service.description}
      </motion.p>
    </motion.div>
  );
};

export default function ServicesGridSection() {
  const { data, loading } = useServicesData();
  
  const services: ServiceItem[] = data.servicesGrid.items.map((item: any) => ({
    ...item,
    id: String(item.id),
    icon: serviceIcons[String(item.id)] ?? null,
  }));

  if (loading) {
    return <ServicesGridSkeleton />;
  }

  return (
    <section className="relative py-20 px-6 min-h-[600px]">
      {/* Floating papers background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingPaper count={6} />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Título de la sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {data.servicesGrid.titlePart1} <span className="text-gradient">{data.servicesGrid.titleHighlight}</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            {data.servicesGrid.subtitle}
          </p>
        </motion.div>

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
