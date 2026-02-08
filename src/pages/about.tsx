import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Aboutme from "../componentes/Aboutme";
import Fundadora from "../componentes/Fundadora";
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
      <Aboutme />
      <Fundadora />
      {/*<OfficePhotoSection />*/}
    </>
  );
}
