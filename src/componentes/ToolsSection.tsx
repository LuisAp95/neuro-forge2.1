import { motion } from "framer-motion";
import { FloatingPaper } from "./floating-paper";
import { useServicesData } from "../hooks/useServicesData";
import { ToolsSectionSkeleton } from "./skeletons";

interface Tool {
  id: string;
  name: string;
  logo: React.ReactNode;
}

// Logos definidos en el componente (mantienen estructura visual/CSS)
const toolLogos: Record<string, React.ReactNode> = {
  make: (
    <div className="flex items-center gap-3">
      <div className="flex flex-col gap-1">
        <div className="w-8 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded transform rotate-[-5deg] shadow-lg" />
        <div className="w-8 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded transform rotate-[2deg] shadow-lg ml-1" />
      </div>
      <span className="text-3xl md:text-4xl font-bold text-gray-900">
        make
      </span>
    </div>
  ),
  Airtable: (
    <div className="flex items-center gap-3">
      <div className="relative w-14 h-14 perspective-1000">
        <div className="relative w-full h-full transform-style-preserve-3d">
          <div className="absolute inset-0">
            <div
              className="absolute bg-red-500 rounded-sm shadow-lg"
              style={{
                width: "28px",
                height: "28px",
                top: "14px",
                left: "14px",
                transform: "rotateZ(45deg)",
              }}
            />
            <div
              className="absolute bg-yellow-400 rounded-sm shadow-lg"
              style={{
                width: "28px",
                height: "28px",
                top: "7px",
                left: "7px",
                transform: "rotateZ(45deg) rotateX(45deg)",
              }}
            />
            <div
              className="absolute bg-blue-400 rounded-sm shadow-lg"
              style={{
                width: "28px",
                height: "28px",
                top: "7px",
                left: "21px",
                transform: "rotateZ(45deg) rotateY(45deg)",
              }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-10 h-10 bg-red-500 rounded transform rotate-45 shadow-lg" />
              <div className="absolute -top-1 -left-1 w-6 h-6 bg-yellow-400 rounded transform rotate-45 shadow-md" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-400 rounded transform rotate-45 shadow-md" />
            </div>
          </div>
        </div>
      </div>
      <span className="text-3xl md:text-4xl font-bold text-gray-900">
        Airtable
      </span>
    </div>
  ),
  Chat: (
    <div className="flex items-center justify-center">
      <span className="text-5xl md:text-6xl font-bold text-gray-900">
        Chat
      </span>
    </div>
  ),
};

// Componente para cada herramienta
const ToolCard = ({ tool, index }: { tool: Tool; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="bg-white rounded-xl p-8 md:p-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center min-h-[150px]"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
        className="flex items-center justify-center"
      >
        {tool.logo}
      </motion.div>
    </motion.div>
  );
};

export default function ToolsSection() {
  const { data, loading } = useServicesData();
  
  const tools: Tool[] = data.tools.items.map((item: any) => ({
    id: String(item.id),
    name: item.name,
    logo: toolLogos[item.name] ?? (
      <span className="text-3xl font-bold text-gray-900">{item.name}</span>
    ),
  }));

  if (loading) {
    return <ToolsSectionSkeleton />;
  }

  return (
    <section className="relative py-20 px-6 min-h-[500px]">
      {/* Banner superior con fondo oscuro y estrellas */}
      <div className="relative  py-12 mb-16 overflow-hidden">
        {/* Efecto de estrellas */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.8 + 0.2,
              }}
            />
          ))}
        </div>

        {/* Floating papers background */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <FloatingPaper count={4} />
        </div>

        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto max-w-7xl relative z-10"
        >
          <div className="md:flex md:flex-row flex-col gap-4 items-center justify-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center">
              {data.tools.titlePart1}
            </h2>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient text-center">
              {data.tools.titleHighlight}
            </h2>
          </div>
        </motion.div>
      </div>

      {/* Sección de herramientas con fondo blanco */}
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {tools.map((tool, index) => (
            <ToolCard key={tool.id} tool={tool} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
