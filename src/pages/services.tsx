import { useEffect } from "react";
import ServiceSlider from "../componentes/Slider";
import ProjectsStatsSection from "../componentes/ProjectsStatsSection";
import ServicesGridSection from "../componentes/ServicesGridSection";
import ToolsSection from "../componentes/ToolsSection";

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ServiceSlider />
      <ProjectsStatsSection />
      <ServicesGridSection />
      <ToolsSection />
    </>
  );
}
