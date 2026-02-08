//import Navbar from '../componentes/navbar'
import Hero from "../componentes/hero";
import { motion } from "framer-motion";
import { FloatingPaper } from "../componentes/floating-paper";
import FeaturesSection from "../componentes/FeaturesSection";
import AboutMeSection from "../componentes/AboutMeSection";
import TestimonialsSection from "../componentes/TestimonialsSection";
import ContactSection from "../componentes/ContactSection";
import { useHomeData } from "../hooks/useHomeData";
import {
  HeroSkeleton,
  IntroSectionSkeleton,
  FeaturesSectionSkeleton,
  AboutMeSectionSkeleton,
  TestimonialsSectionSkeleton,
  ContactSectionSkeleton,
} from "../componentes/skeletons";

export default function Home() {
  const { data, loading } = useHomeData();
  const introSection = data.introSection || {};

  if (loading) {
    return (
      <>
        <HeroSkeleton />
        <IntroSectionSkeleton />
        <FeaturesSectionSkeleton />
        <AboutMeSectionSkeleton />
        <TestimonialsSectionSkeleton />
        <ContactSectionSkeleton />
      </>
    );
  }

  return (
    <>
      <Hero />
      {/* Nueva sección con texto e imagen */}
      <section className="relative py-20 px-6 min-h-[600px]">
        {/* Floating papers background */}
        <div className="absolute inset-0 overflow-hidden">
          <FloatingPaper count={6} />
        </div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Columna de texto */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl  lg:text-5xl font-bold text-white">
                {introSection.title}
                <span className="text-gradient ml-4">
                  {introSection.titleHighlight}
                </span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                {introSection.paragraph1}
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                {introSection.paragraph2}
              </p>
            </motion.div>

            {/* Columna de imagen (URL desde Supabase: Storage → images/pages/ → pegar URL en content_blocks introSection.imageUrl) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center"
            >
              {introSection.imageUrl ? (
                <img
                  src={introSection.imageUrl}
                  alt="NeuroForge - Transformamos ideas en realidad digital"
                  className="w-full h-auto object-cover rounded-lg "
                />
              ) : (
                <div className="w-full h-[400px] bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center" />
              )}
            </motion.div>
          </div>
        </div>
      </section>
      {/* Sección de características */}
      <FeaturesSection />
      {/* Sección Sobre mí */}
      {/* Para agregar la imagen, pasa la prop imageSrc:
          <AboutMeSection imageSrc="/src/assets/fundadora.jpeg" />
          O importa la imagen y úsala:
          import fundadoraImage from "../assets/fundadora.jpeg";
          <AboutMeSection imageSrc={fundadoraImage} />
      */}
      <AboutMeSection />
      {/* Esto dicen nuestros clientes */}
      <TestimonialsSection />
      {/* Sección de Contacto */}
      <ContactSection />
    </>
  );
}
