import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  buttonText: string;
  illustration: ReactNode;
  imageUrl?: string;
  imageAlt?: string;
  delay?: number;
  onButtonClick?: () => void;
}

export default function FeatureCard({
  title,
  description,
  buttonText,
  illustration,
  imageUrl,
  imageAlt = "",
  delay = 0,
  onButtonClick,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-lg border border-purple-500/20 p-6 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 flex flex-col h-full"
    >
      {/* Imagen (Supabase) o ilustración por defecto */}
      <div className="flex justify-center mb-6 h-48 items-center overflow-hidden rounded-lg bg-gray-800/50">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={imageAlt || title}
            className="w-full h-full object-cover"
          />
        ) : (
          illustration
        )}
      </div>

      {/* Título */}
      <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">
        {title}
      </h3>

      {/* Descripción */}
      <p className="text-gray-400 mb-6 leading-relaxed flex-grow">
        {description}
      </p>

      {/* Botón */}
      <button
        onClick={onButtonClick}
        className="btn-primary w-full px-6 mt-auto"
      >
        {buttonText}
      </button>
    </motion.div>
  );
}
