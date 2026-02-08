import { motion } from "framer-motion";
import { FloatingPaper } from "./floating-paper";
import { useServicesData } from "../hooks/useServicesData";
import { ToolsSectionSkeleton } from "./skeletons";

interface Tool {
  id: number;
  name: string;
  image_url?: string | null;
}

function ToolCard({
  tool,
  index,
}: {
  tool: Tool;
  index: number;
}) {
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
        className="flex items-center justify-center w-full"
      >
        {tool.image_url ? (
          <img
            src={tool.image_url}
            alt={tool.name}
            className="max-h-16 w-auto object-contain"
          />
        ) : (
          <span className="text-3xl md:text-4xl font-bold text-gray-900">
            {tool.name}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function ToolsSection() {
  const { data, loading } = useServicesData();

  if (loading) {
    return <ToolsSectionSkeleton />;
  }

  const tools: Tool[] = (data.tools.items || []).map((item: { id: number; name: string; image_url?: string | null }) => ({
    id: item.id,
    name: item.name,
    image_url: item.image_url ?? null,
  }));

  return (
    <section className="relative py-20 px-6 min-h-[500px]">
      {/* Banner superior con fondo oscuro y estrellas */}
      <div className="relative py-12 mb-16 overflow-hidden">
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

        <div className="absolute inset-0 overflow-hidden opacity-30">
          <FloatingPaper count={4} />
        </div>

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
