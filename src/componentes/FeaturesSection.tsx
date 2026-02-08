import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FloatingPaper } from "./floating-paper";
import FeatureCard from "./FeatureCard";
import { useHomeData } from "../hooks/useHomeData";
import { FeaturesSectionSkeleton } from "./skeletons";

// Ilustración para Automatiza Atención al Cliente
const ChatbotIllustration = () => (
  <div className="relative">
    {/* Smartphone */}
    <div className="w-32 h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border-4 border-white/20 shadow-xl relative overflow-hidden">
      {/* Pantalla */}
      <div className="absolute inset-2 bg-black rounded-lg flex items-center justify-center">
        {/* Robot/Chatbot */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">🤖</span>
            </div>
          </div>
          {/* Burbuja de diálogo */}
          <div className="bg-blue-500 rounded-lg px-3 py-2">
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Ilustración para Chatbots Multicanal
const ChatIllustration = () => (
  <div className="relative">
    {/* Smartphone */}
    <div className="w-32 h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border-4 border-white/20 shadow-xl relative overflow-hidden">
      {/* Pantalla */}
      <div className="absolute inset-2 bg-black rounded-lg p-3 flex flex-col gap-2">
        {/* Burbujas de chat */}
        <div className="bg-blue-500 rounded-lg px-2 py-1 text-xs text-white">
          Hola
        </div>
        <div className="bg-blue-500 rounded-lg px-2 py-1 text-xs text-white self-end">
          ¿Cómo puedo ayudarte?
        </div>
        <div className="bg-blue-500 rounded-lg px-2 py-1 text-xs text-white">
          Necesito información
        </div>
        {/* Icono de usuario */}
        <div className="flex items-center gap-1 mt-auto">
          <div className="w-4 h-4 bg-purple-400 rounded-full"></div>
          <div className="text-white text-xs">Usuario</div>
        </div>
      </div>
    </div>
  </div>
);

// Ilustración para Soluciones de Soporte IA
const SupportIllustration = () => (
  <div className="relative">
    {/* Monitor */}
    <div className="w-40 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border-2 border-white/20 shadow-xl relative overflow-hidden mb-2">
      {/* Pantalla */}
      <div className="absolute inset-1 bg-blue-900 rounded flex items-center justify-center">
        {/* Líneas de código/datos */}
        <div className="w-full p-2 space-y-1">
          <div className="h-1 bg-blue-400 rounded w-3/4"></div>
          <div className="h-1 bg-blue-400 rounded w-full"></div>
          <div className="h-1 bg-blue-400 rounded w-2/3"></div>
        </div>
        {/* Icono AI */}
        <div className="absolute top-1 right-1 bg-purple-500 rounded px-1 text-white text-xs">
          AI
        </div>
      </div>
    </div>
    {/* Engranajes */}
    <div className="flex justify-center items-center gap-2">
      <div className="w-8 h-8 border-4 border-pink-500 rounded-full relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
        </div>
      </div>
      <div className="w-12 h-12 border-4 border-pink-500 rounded-full relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
);

export default function FeaturesSection() {
  const navigate = useNavigate();
  const { data, loading } = useHomeData();
  const featuresConfig = data.features || { items: [] };

  const handleButtonClick = () => {
    navigate("/services");
  };

  if (loading) {
    return <FeaturesSectionSkeleton />;
  }

  return (
    <section className="relative py-20 px-6 min-h-[800px]">
      {/* Floating papers background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingPaper count={6} />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Título principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {featuresConfig.sectionTitle}{" "}
            <span className="text-gradient">{featuresConfig.titleHighlight}</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            {featuresConfig.subtitle}
          </p>
        </motion.div>

        {/* Grid de características */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {featuresConfig.items.map((feature: { title: string; description: string; buttonText: string; imageUrl?: string; imageAlt?: string }, index: number) => {
            const IllustrationComponent = [ChatbotIllustration, ChatIllustration, SupportIllustration][index];
            return (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                buttonText={feature.buttonText}
                illustration={IllustrationComponent ? <IllustrationComponent /> : null}
                imageUrl={feature.imageUrl}
                imageAlt={feature.imageAlt}
                delay={index * 0.2}
                onButtonClick={handleButtonClick}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
