import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Aboutme from "../componentes/Aboutme";
import Fundadora from "../componentes/Fundadora";
import { SEO } from "../componentes/SEO";
//import OfficePhotoSection from "../componentes/OfficePhotoSection";

export default function About() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  }, [hash]);

  return (
    <>
      <SEO
        title="Sobre mí"
        description="Roxana Aparicio, especialista en automatización y IA. Más de 7 años de experiencia ayudando a emprendedores a integrar Make, ChatGPT y herramientas de IA."
        path="/about"
      />
      <Aboutme />
      <Fundadora />
      {/*<OfficePhotoSection />*/}
    </>
  );
}
