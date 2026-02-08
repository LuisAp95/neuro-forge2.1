import { motion } from "framer-motion";

export interface Testimonial {
  id: number;
  name: string;
  title: string;
  comment: string;
  image?: string;
  image_url?: string | null;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive?: boolean;
  delay?: number;
}

export default function TestimonialCard({
  testimonial,
  isActive = false,
  delay = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className={`flex-shrink-0 w-full max-w-[450px] px-4 ${
        isActive ? "opacity-100" : "opacity-70"
      }`}
    >
      <div
        className={`bg-gradient-to-br from-gray-900/80 to-gray-800/50 rounded-lg border p-6 md:p-8 transition-all duration-300 ${
          isActive
            ? "border-cyan-400/60 shadow-lg shadow-cyan-400/20"
            : "border-gray-700/50"
        }`}
      >
        {/* Foto del cliente */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-cyan-400/40 bg-gradient-to-br from-gray-700 to-gray-800">
              {(testimonial.image ?? testimonial.image_url) ? (
                <img
                  src={testimonial.image ?? testimonial.image_url ?? ""}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback si la imagen no carga
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    if (target.parentElement) {
                      target.parentElement.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 text-white text-2xl font-bold">
                          ${testimonial.name.charAt(0)}
                        </div>
                      `;
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 text-white text-2xl font-bold">
                  {testimonial.name.charAt(0)}
                </div>
              )}
            </div>
            {/* Efecto de brillo alrededor de la foto cuando está activa */}
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-cyan-400/60"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
          </div>
        </div>

        {/* Comentario */}
        <p className="text-white text-base md:text-lg leading-relaxed mb-6 text-center min-h-[120px]">
          "{testimonial.comment}"
        </p>

        {/* Nombre y título */}
        <div className="text-center">
          <h4 className="text-white font-bold text-lg mb-1">
            {testimonial.name}
          </h4>
          <p className="text-gray-400 text-sm">{testimonial.title}</p>
        </div>
      </div>
    </motion.div>
  );
}
