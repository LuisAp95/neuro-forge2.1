import { motion } from "framer-motion";
import { FloatingPaper } from "./floating-paper";
import AcademyBadge from "./AcademyBadge";
import { useHomeData } from "../hooks/useHomeData";
import { useAcademyLevels } from "../hooks/useAcademyLevels";
import { useContactDirections } from "../hooks/useContactDirections";
import { ContactSectionSkeleton } from "./skeletons";

export default function ContactSection() {
  const { data: homeContent, loading: loadingHome } = useHomeData();
  const { levels, loading: loadingLevels } = useAcademyLevels();
  const { primaryUrl, loading: loadingDirections } = useContactDirections();
  const contact = homeContent.contact || {};

  const handleConsultationClick = () => {
    if (primaryUrl) {
      window.open(primaryUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (loadingHome || loadingLevels || loadingDirections) {
    return <ContactSectionSkeleton />;
  }

  return (
    <section className="relative py-20 px-6 min-h-[700px]">
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
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            {contact.title}{" "}
            <span className="text-gradient">{contact.titleHighlight}</span>
            {contact.titleSuffix}
          </h2>
        </motion.div>

        {/* Botón de consulta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-16"
        >
          <button
            onClick={handleConsultationClick}
            className="btn-primary px-8"
            disabled={!primaryUrl}
            title={primaryUrl ? undefined : "Configura la URL en Supabase"}
          >
            {contact.ctaButton}
          </button>
        </motion.div>

        {/* Sección de Make Academy - Espacio para agregar "mi make" */}
        <div className="mb-12">
          {/* Título de la sección (opcional, puedes quitarlo si no lo necesitas) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-8"
          >
            {/* Espacio reservado para contenido "mi make" */}
            <div className="min-h-[100px] flex items-center justify-center">
              {/* Aquí puedes agregar el contenido de "mi make" más tarde */}
            </div>
          </motion.div>

          {/* Imágenes Make Academy */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 justify-items-center">
            {levels.map((item, index) => (
              <AcademyBadge
                key={item.id}
                image={item.image_url || ''}
                level={item.level}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
