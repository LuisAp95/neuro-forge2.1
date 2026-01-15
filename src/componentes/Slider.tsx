import { useState, TouchEvent } from "react";
import { ChevronLeft, ChevronRight, X, BotMessageSquare } from "lucide-react";

interface Service {
  id: number;
  title: string;
  description: string;
  descriptionCompleta: string;
  implementacion: string[];
  beneficios: string[];
}

const services: Service[] = [
  {
    id: 1,
    title: "IA para tu Organización",
    description:
      "Aumenta la eficiencia, optimiza procesos y elimina tareas repetitivas con inteligencia artificial.",
    descriptionCompleta:
      "La inteligencia artificial (IA) es una herramienta poderosa que transforma la manera en que operan las organizaciones. Con nuestras soluciones de IA personalizadas, no solo optimizamos tus procesos internos, sino que también mejoramos la eficiencia general de tu equipo. Al integrar IA en tareas repetitivas y procesos manuales, conseguimos que tu personal se enfoque en tareas más estratégicas y creativas, mientras que la IA se encarga de las labores automáticas. Desde chatbots para atención al cliente hasta sistemas predictivos que analizan grandes volúmenes de datos, nuestra IA está diseñada para hacer tu organización más ágil, escalable y eficiente.",
    implementacion: [
      "Análisis y diagnóstico de tus procesos para identificar oportunidades de automatización.",
      "Implementación de soluciones IA adaptadas a las necesidades específicas de tu negocio.",
      "Entrenamiento y soporte continuo para garantizar una integración exitosa.",
    ],
    beneficios: [
      "Ahorro de tiempo en tareas manuales y repetitivas.",
      "Mejora en la toma de decisiones gracias a los análisis predictivos y análisis de datos en tiempo real.",
      "Reducción de costos operativos y errores humanos, permitiendo a tu equipo enfocarse en lo que realmente importa.",
    ],
  },
  {
    id: 2,
    title: " Automatiza tu Proceso",
    description:
      "Automatiza procesos, ahorra tiempo, reduce errores y disminuye costos con soluciones personalizadas.",
    descriptionCompleta:
      "La automatización es la clave para mejorar la productividad, reducir errores y optimizar los recursos dentro de cualquier empresa. A través de soluciones personalizadas, analizamos tus procesos de trabajo y diseñamos flujos de trabajo automáticos que eliminan tareas repetitivas y manuales. Automatizamos desde la gestión de tareas diarias hasta procesos complejos, utilizando herramientas que no solo optimizan el tiempo, sino que también mejoran la precisión en cada tarea. Ya sea en ventas, gestión de proyectos o atención al cliente, nuestra automatización ayuda a que tu organización sea más eficiente y rentable.",
    implementacion: [
      "Análisis detallado de los procesos y tareas repetitivas dentro de tu empresa.",
      "Diseño e implementación de flujos de trabajo automatizados con herramientas personalizadas.",
      "Capacitación y soporte para una transición sin problemas y un uso óptimo de las soluciones automatizadas.",
    ],
    beneficios: [
      "Ahorro significativo de tiempo y recursos en la gestión de procesos manuales.",
      "Mayor precisión y reducción de errores operativos.",
      "Escalabilidad de tu negocio sin necesidad de aumentar el personal, reduciendo costos a largo plazo.",
    ],
  },
  {
    id: 3,
    title: "Gestiona tu CRM",
    description:
      "Implementamos bases de datos relacionales para gestionar proyectos, contactos y equipos de forma fácil, intuitiva y segura.",
    descriptionCompleta:
      "Un sistema de gestión de relaciones con clientes (CRM) eficiente es vital para cualquier organización que busque mantener relaciones duraderas con sus clientes y mejorar su desempeño. Implementamos bases de datos relacionales avanzadas que no solo organizan tus proyectos y contactos, sino que también proporcionan una visión 360 grados de cada cliente, optimizando la comunicación y las interacciones. Con un CRM bien gestionado, tu equipo podrá acceder a datos clave de manera rápida y eficiente, mejorando la atención al cliente, las ventas y la toma de decisiones estratégicas.",
    implementacion: [
      "Diseño e implementación de bases de datos relacionales adaptadas a tus necesidades específicas.",
      "Integración de tu CRM con otros sistemas internos, como el sistema de gestión de proyectos o software de comunicación.",
      "Capacitación a tu equipo para utilizar eficazmente el CRM y maximizar su rendimiento.",
    ],
    beneficios: [
      "Mejora en la organización y acceso a la información de clientes y proyectos.",
      "Optimización en la toma de decisiones con datos accesibles y actualizados.",
      "Seguridad avanzada para proteger la información sensible de clientes y proyectos.",
    ],
  },
  {
    id: 4,
    title: "Contrata una Asistente IA",
    description:
      "Optimiza la gestión de tu organización con una asistente virtual basada en IA para tareas administrativas, atención al cliente y más.",
    descriptionCompleta:
      "La asistencia virtual mediante inteligencia artificial está cambiando la forma en que las empresas gestionan sus tareas diarias. Ofrecemos asistentes IA altamente especializados que pueden encargarse de diversas funciones, como la gestión de agendas, la atención al cliente, el manejo de correos electrónicos, y mucho más. Nuestras asistentes IA están diseñadas para aprender y adaptarse a las necesidades de tu empresa, mejorando la eficiencia en tareas administrativas y brindando soporte a tu equipo 24/7. Además, nuestras soluciones son escalables, lo que significa que tu asistente IA puede crecer junto con tu empresa.",
    implementacion: [
      "Reducción de la carga de trabajo administrativa, permitiendo a tu equipo enfocarse en tareas de mayor impacto.",
      "Respuesta instantánea a las consultas de clientes, mejorando la experiencia del usuario.",
      "Ahorro de recursos, ya que no es necesario contratar personal adicional para tareas repetitivas y operativas.",
    ],
    beneficios: [
      "Reducción de la carga de trabajo administrativa, permitiendo a tu equipo enfocarse en tareas de mayor impacto.",
      "Respuesta instantánea a las consultas de clientes, mejorando la experiencia del usuario.",
      "Ahorro de recursos, ya que no es necesario contratar personal adicional para tareas repetitivas y operativas.",
    ],
  },
];

const ServiceSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  //const [cards, setCards] = useState<Service[]>(services);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [expansionStyle, setExpansionStyle] = useState({});

  /* useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);*/

  const handleCardClick = (index: number) => {
    if (index === activeIndex && !isExpanded) {
      setIsExpanded(true);
      setExpansionStyle({
        transform: "scale(1)",
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      });
    }
  };

  const handleClose = () => {
    setExpansionStyle({
      transform: "scale(0)",
      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
    });

    setTimeout(() => {
      setIsExpanded(false);
    }, 500);
  };

  const handleNext = () =>
    setActiveIndex((prev) => (prev + 1) % services.length);
  const handlePrev = () =>
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const difference = touchStart - touchEnd;
    const isLeftSwipe = difference > 50;
    const isRightSwipe = difference < -50;

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();

    // Reset valores
    setTouchStart(0);
    setTouchEnd(0);
  };

  const getCardStyle = (index: number) => {
    const distance = Math.abs(activeIndex - index);
    const direction = index > activeIndex ? 1 : -1;

    return {
      transform: `
        scale(${1 - distance * 0.2}) 
        translateX(${direction * distance * 100}%)
      `,
      filter: `blur(${distance * 2}px)`,
      zIndex: services.length - distance,
      opacity: 1 - distance * 0.1,
    };
  };

  return (
    <div
      className="flex min-h-screen w-full items-center justify-center p-4"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative h-96 w-full max-w-6xl flex items-center justify-center">
        {/* Fondo brillante */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl" />

        {services.map((service, index) => (
          <div
            key={service.id}
            className={`absolute w-65 h-90 bg-white rounded-2xl p-6 shadow-xl transition-all duration-500  
            ${
              index === activeIndex
                ? "hover:scale-105 hover:shadow-2xl cursor-pointer"
                : "pointer-events-none"
            }`}
            style={isExpanded ? {} : getCardStyle(index)}
            onClick={() => handleCardClick(index)}
          >
            <div className="h-full flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center">
                {service.description}..
              </p>
            </div>
          </div>
        ))}

        {/* Overlay de expansión */}
        {isExpanded && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 items-center justify-center  "
            onClick={handleClose}
          >
            <div
              className="bg-white rounded-2xl p-8 max-h-[calc(100vh-10%)] relative mx-auto my-8 max-w-4xl overflow-x-hidden custon-scrollbar "
              style={expansionStyle}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClose}
                className="cursor-pointer absolute top-0 right-0 bg-white p-2 rounded-full shadow-lg z-50 hover:scale-105 transition-transform "
              >
                <X size={24} />
              </button>

              <div className="h-full flex flex-col  items-center justify-center">
                <h3 className="text-3xl font-bold mb-6 text-gray-800 text-center">
                  {services[activeIndex].title}
                </h3>
                <p className="text-gray-600 text-lg max-w-2xl text-justify">
                  {services[activeIndex].descriptionCompleta}
                </p>
                {/* Agrega aquí más contenido si es necesario */}
                <p className="mt-2 font-semibold text-2xl mb-2">
                  Cómo lo implementamos:
                </p>
                {services[activeIndex].implementacion.map((imple) => (
                  <div className=" flex flex-row  text-lg max-w-2xl px-5 text-gray-800 items-center justify-center gap-4 w-[650px]">
                    <div className="w-full flex gap-8  mt-2">
                      <div className="w-2 h-2  justify-center">
                        <BotMessageSquare />
                      </div>
                      <p>{imple}</p>
                    </div>
                  </div>
                ))}

                <p className="mt-2 font-semibold text-2xl mb-2">
                  Beneficios
                </p>
                {services[activeIndex].beneficios.map((bn) => (
                  <div className=" flex flex-row  text-lg max-w-2xl px-5 text-gray-800 items-center justify-center gap-4 w-[650px]">
                    <div className="w-full flex gap-8  mt-2">
                      <div className="w-2 h-2  justify-center">
                        <BotMessageSquare />
                      </div>
                      <p>{bn}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Controles */}
        <button
          onClick={() =>
            setActiveIndex(
              (prev) => (prev - 1 + services.length) % services.length
            )
          }
          className=" md:flex hidden absolute left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg z-50 hover:scale-105 transition-transform"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => setActiveIndex((prev) => (prev + 1) % services.length)}
          className=" md:flex hidden absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg z-50 hover:scale-105 transition-transform"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ServiceSlider;
