import { useEffect } from "react";
import ServiceSlider from "../componentes/Slider";
import ProjectsStatsSection from "../componentes/ProjectsStatsSection";
import ServicesGridSection from "../componentes/ServicesGridSection";
import ToolsSection from "../componentes/ToolsSection";
import { SEO } from "../componentes/SEO";

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Servicios"
        description="Servicios de IA y automatización: asistentes virtuales, chatbots multicanal, soporte con inteligencia artificial y formación en Make y ChatGPT."
        path="/services"
      />
      <ServiceSlider />
      <ProjectsStatsSection />
      <ServicesGridSection />
      <ToolsSection />
    </>
  );
}
