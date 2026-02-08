import { motion } from "framer-motion";
import { RoboAnimation } from "./robo-animation";
import { Facebook, Youtube, Instagram, Sparkles, Anchor } from "lucide-react";

// Componente para el logo del robot (versión estática para el footer)
const RobotLogo = () => (
  <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
    <div className="relative">
      <div className="absolute inset-0 bg-purple-500/20 rounded-lg blur-md"></div>
      <div className="relative bg-purple-500/10 border-2 border-purple-500/40 rounded-lg p-3 md:p-4">
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-purple-400"
        >
          {/* Cabeza del robot - rectangular */}
          <rect
            x="12"
            y="8"
            width="40"
            height="28"
            rx="3"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
          />
          {/* Ojos horizontales ovalados */}
          <ellipse cx="22" cy="20" rx="4" ry="3" fill="currentColor" />
          <ellipse cx="42" cy="20" rx="4" ry="3" fill="currentColor" />
          {/* Antenas redondeadas en las esquinas superiores */}
          <circle cx="16" cy="8" r="3" fill="currentColor" />
          <circle cx="48" cy="8" r="3" fill="currentColor" />
          {/* Cuerpo - forma de batería redondeada */}
          <rect
            x="20"
            y="36"
            width="24"
            height="20"
            rx="4"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
          />
        </svg>
      </div>
    </div>
  </div>
);

// Componente para enlaces del footer
interface FooterLinkProps {
  href?: string;
  children: React.ReactNode;
}

const FooterLink = ({ href = "#", children }: FooterLinkProps) => (
  <a
    href={href}
    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm md:text-base"
  >
    {children}
  </a>
);

// Componente para columna de enlaces
interface FooterColumnProps {
  title: string;
  links: Array<{ label: string; href?: string }>;
}

const FooterColumn = ({ title, links }: FooterColumnProps) => (
  <div className="flex flex-col gap-4">
    <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
    <div className="flex flex-col gap-3">
      {links.map((link, index) => (
        <FooterLink key={index} href={link.href}>
          {link.label}
        </FooterLink>
      ))}
    </div>
  </div>
);

// Componente para iconos de redes sociales
interface SocialIconProps {
  icon: React.ReactNode;
  href?: string;
  ariaLabel: string;
}

const SocialIcon = ({ icon, href = "#", ariaLabel }: SocialIconProps) => (
  <a
    href={href}
    aria-label={ariaLabel}
    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-white transition-colors duration-300"
  >
    {icon}
  </a>
);

export default function Footer() {
  const linkSections = {
    link: [
      { label: "Quienes somos", href: "/about" },
      { label: "Políticas de Cookies", href: "/cookies" },
      { label: "Políticas de privacidad", href: "/privacy" },
      { label: "Aviso Legal", href: "/legal" },
    ],
    aprende: [
      { label: "Cursos", href: "/courses" },
      { label: "Servicios para pymes", href: "/services" },
      { label: "Asesoria", href: "/consulting" },
    ],
    recursos: [
      { label: "Guía gratuita", href: "/guide" },
      { label: "Blog", href: "/blog" },
      { label: "Comunidad", href: "/community" },
    ],
  };

  return (
    <footer className="relative bg-black/[0.96] border-t border-gray-800/50">
      {/* Robot en la parte inferior derecha */}
      <div className="absolute bottom-0 right-0 w-48 h-48 md:w-64 md:h-64 opacity-30 pointer-events-none">
        <RoboAnimation />
      </div>

      {/* Iconos decorativos en la esquina inferior derecha */}
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex flex-col gap-2 opacity-50">
        <Sparkles className="w-4 h-4 text-white" />
        <Anchor className="w-4 h-4 text-white" />
      </div>

      <div className="container mx-auto px-6 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
          {/* Columna de marca/sobre */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Logo del robot */}
            <RobotLogo />

            {/* Descripción */}
            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md">
              Sé parte de la comunidad de asistentes y profesionales que usan IA
              para transformar-
            </p>

            {/* Email placeholder */}
            <div className="mt-2">
              <a
                href="mailto:contacto@neuroforge.com"
                className="text-purple-400 hover:text-purple-300 transition-colors duration-300 text-sm md:text-base font-medium"
              >
                CORREO LINK
              </a>
            </div>

            {/* Redes sociales */}
            <div className="flex gap-3 mt-4">
              <SocialIcon
                icon={<Facebook className="w-5 h-5" />}
                href="https://facebook.com"
                ariaLabel="Facebook"
              />
              <SocialIcon
                icon={<Youtube className="w-5 h-5" />}
                href="https://youtube.com"
                ariaLabel="YouTube"
              />
              <SocialIcon
                icon={<Instagram className="w-5 h-5" />}
                href="https://instagram.com"
                ariaLabel="Instagram"
              />
            </div>
          </div>

          {/* Columna Link */}
          <div>
            <FooterColumn title="Link" links={linkSections.link} />
          </div>

          {/* Columna Aprende */}
          <div>
            <FooterColumn title="Aprende" links={linkSections.aprende} />
          </div>

          {/* Columna Recursos */}
          <div>
            <FooterColumn title="Recursos" links={linkSections.recursos} />
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800/50 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} NeuroForge. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
