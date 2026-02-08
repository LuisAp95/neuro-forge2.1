-- =====================================================
-- NEUROFORGE - DATOS INICIALES (SEED)
-- =====================================================
-- Ejecuta este script después del schema inicial
-- para cargar todos los datos existentes de tu proyecto

-- =====================================================
-- TESTIMONIOS
-- =====================================================
INSERT INTO testimonials (name, title, comment, image_url, sort_order) VALUES
('Valentina Ruiz', 'Emprendedora', 'Neuro Forge nos devolvió el tiempo para conectar con nuestros clientes y disfrutar lo que hacemos. Fue un cambio enorme para mí y mi tienda.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop', 1),
('Diego Herrera', 'Emprendedor', 'Intentesolo, pero con Neuro Forge todo cambió. Nos guiaron, personalizaron la solución y ahora todo fluye con menos esfuerzo.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', 2),
('María González', 'CEO', 'La automatización que implementamos con Neuro Forge transformó completamente nuestros procesos. Ahora tenemos más tiempo para lo que realmente importa.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop', 3),
('Carlos Mendoza', 'Fundador', 'Excelente servicio y resultados. Neuro Forge entendió nuestras necesidades y creó una solución perfecta para nuestro negocio.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop', 4);

-- =====================================================
-- NIVELES MAKE ACADEMY
-- =====================================================
INSERT INTO academy_levels (level, stars, image_url, sort_order) VALUES
('FOUNDATION', 1, 'https://trello.com/1/cards/67dcbc5b163d4b2490345151/attachments/68175dfb7accb4bed6de07f6/download/Sin_t%C3%ADtulo_(1200_x_1500_px)_(11).png', 1),
('BASICS', 2, 'https://trello.com/1/cards/67dcbc5b163d4b2490345151/attachments/68175e1f0825b860387e64c7/download/Sin_t%C3%ADtulo_(1200_x_1500_px)_(10).png', 2),
('INTERMEDIATE', 3, 'https://trello.com/1/cards/67dcbc5b163d4b2490345151/attachments/68175dfbfe421043e9e07f57/download/Sin_t%C3%ADtulo_(1200_x_1500_px)_(12).png', 3),
('ADVANCED', 3, 'https://trello.com/1/cards/67dcbc5b163d4b2490345151/attachments/68175dfb0825b860387e0697/download/Sin_t%C3%ADtulo_(1200_x_1500_px)_(13).png', 4);

-- =====================================================
-- SERVICIOS DEL SLIDER
-- =====================================================
INSERT INTO slider_services (title, description, description_completa, implementacion, beneficios, sort_order) VALUES
('IA para tu Organización', 
 'Aumenta la eficiencia, optimiza procesos y elimina tareas repetitivas con inteligencia artificial.',
 'La inteligencia artificial (IA) es una herramienta poderosa que transforma la manera en que operan las organizaciones. Con nuestras soluciones de IA personalizadas, no solo optimizamos tus procesos internos, sino que también mejoramos la eficiencia general de tu equipo. Al integrar IA en tareas repetitivas y procesos manuales, conseguimos que tu personal se enfoque en tareas más estratégicas y creativas, mientras que la IA se encarga de las labores automáticas. Desde chatbots para atención al cliente hasta sistemas predictivos que analizan grandes volúmenes de datos, nuestra IA está diseñada para hacer tu organización más ágil, escalable y eficiente.',
 '["Análisis y diagnóstico de tus procesos para identificar oportunidades de automatización.", "Implementación de soluciones IA adaptadas a las necesidades específicas de tu negocio.", "Entrenamiento y soporte continuo para garantizar una integración exitosa."]'::jsonb,
 '["Ahorro de tiempo en tareas manuales y repetitivas.", "Mejora en la toma de decisiones gracias a los análisis predictivos y análisis de datos en tiempo real.", "Reducción de costos operativos y errores humanos, permitiendo a tu equipo enfocarse en lo que realmente importa."]'::jsonb,
 1),
 
('Automatiza tu Proceso', 
 'Automatiza procesos, ahorra tiempo, reduce errores y disminuye costos con soluciones personalizadas.',
 'La automatización es la clave para mejorar la productividad, reducir errores y optimizar los recursos dentro de cualquier empresa. A través de soluciones personalizadas, analizamos tus procesos de trabajo y diseñamos flujos de trabajo automáticos que eliminan tareas repetitivas y manuales. Automatizamos desde la gestión de tareas diarias hasta procesos complejos, utilizando herramientas que no solo optimizan el tiempo, sino que también mejoran la precisión en cada tarea. Ya sea en ventas, gestión de proyectos o atención al cliente, nuestra automatización ayuda a que tu organización sea más eficiente y rentable.',
 '["Análisis detallado de los procesos y tareas repetitivas dentro de tu empresa.", "Diseño e implementación de flujos de trabajo automatizados con herramientas personalizadas.", "Capacitación y soporte para una transición sin problemas y un uso óptimo de las soluciones automatizadas."]'::jsonb,
 '["Ahorro significativo de tiempo y recursos en la gestión de procesos manuales.", "Mayor precisión y reducción de errores operativos.", "Escalabilidad de tu negocio sin necesidad de aumentar el personal, reduciendo costos a largo plazo."]'::jsonb,
 2),

('Gestiona tu CRM',
 'Implementamos bases de datos relacionales para gestionar proyectos, contactos y equipos de forma fácil, intuitiva y segura.',
 'Un sistema de gestión de relaciones con clientes (CRM) eficiente es vital para cualquier organización que busque mantener relaciones duraderas con sus clientes y mejorar su desempeño. Implementamos bases de datos relacionales avanzadas que no solo organizan tus proyectos y contactos, sino que también proporcionan una visión 360 grados de cada cliente, optimizando la comunicación y las interacciones. Con un CRM bien gestionado, tu equipo podrá acceder a datos clave de manera rápida y eficiente, mejorando la atención al cliente, las ventas y la toma de decisiones estratégicas.',
 '["Diseño e implementación de bases de datos relacionales adaptadas a tus necesidades específicas.", "Integración de tu CRM con otros sistemas internos, como el sistema de gestión de proyectos o software de comunicación.", "Capacitación a tu equipo para utilizar eficazmente el CRM y maximizar su rendimiento."]'::jsonb,
 '["Mejora en la organización y acceso a la información de clientes y proyectos.", "Optimización en la toma de decisiones con datos accesibles y actualizados.", "Seguridad avanzada para proteger la información sensible de clientes y proyectos."]'::jsonb,
 3),

('Contrata una Asistente IA',
 'Optimiza la gestión de tu organización con una asistente virtual basada en IA para tareas administrativas, atención al cliente y más.',
 'La asistencia virtual mediante inteligencia artificial está cambiando la forma en que las empresas gestionan sus tareas diarias. Ofrecemos asistentes IA altamente especializados que pueden encargarse de diversas funciones, como la gestión de agendas, la atención al cliente, el manejo de correos electrónicos, y mucho más. Nuestras asistentes IA están diseñadas para aprender y adaptarse a las necesidades de tu empresa, mejorando la eficiencia en tareas administrativas y brindando soporte a tu equipo 24/7. Además, nuestras soluciones son escalables, lo que significa que tu asistente IA puede crecer junto con tu empresa.',
 '["Reducción de la carga de trabajo administrativa, permitiendo a tu equipo enfocarse en tareas de mayor impacto.", "Respuesta instantánea a las consultas de clientes, mejorando la experiencia del usuario.", "Ahorro de recursos, ya que no es necesario contratar personal adicional para tareas repetitivas y operativas."]'::jsonb,
 '["Reducción de la carga de trabajo administrativa, permitiendo a tu equipo enfocarse en tareas de mayor impacto.", "Respuesta instantánea a las consultas de clientes, mejorando la experiencia del usuario.", "Ahorro de recursos, ya que no es necesario contratar personal adicional para tareas repetitivas y operativas."]'::jsonb,
 4);

-- =====================================================
-- GRID DE SERVICIOS
-- =====================================================
INSERT INTO services_grid (title, description, sort_order) VALUES
('AUTOMATIZA ATENCIÓN AL CLIENTE', 'Transforma la experiencia de tus clientes con sistemas automatizados de atención que responden 24/7, reducen tiempos de espera y mejoran la satisfacción del cliente.', 1),
('CHATBOTS MULTICANAL CON IA', 'Implementa chatbots inteligentes que se integran en múltiples canales de comunicación, ofreciendo respuestas coherentes y personalizadas en cada punto de contacto.', 2),
('SOLUCIONES DE SOPORTE IA', 'Desarrolla sistemas de soporte técnico potenciados por IA que optimizan procesos, automatizan respuestas y mejoran la eficiencia operativa de tu equipo.', 3);

-- =====================================================
-- ESTADÍSTICAS
-- =====================================================
INSERT INTO stats (value, label, suffix, sort_order) VALUES
(350, 'CLIENTES FELICES', '+', 1),
(100, 'PROYECTOS HECHOS', '+', 2),
(20, 'HERRAMIENTAS INTEGRADAS', '+', 3),
(100, 'CAPACITACIONES', '+', 4);

-- =====================================================
-- HERRAMIENTAS
-- =====================================================
INSERT INTO tools (name, sort_order) VALUES
('make', 1),
('Airtable', 2),
('Chat', 3);

-- =====================================================
-- CONTENT BLOCKS - PÁGINA HOME
-- =====================================================
INSERT INTO content_blocks (page, section, content) VALUES
('home', 'hero', '{
  "titleLine1": "Impulsa tu Carrera con",
  "titleHighlight": "Herramientas IA",
  "subtitle": "Desarrolla tu futuro profesional con inteligencia artificial y disfruta de la libertad de trabajar desde cualquier lugar. Conviértete en asistente virtual en IA",
  "ctaPrimary": "Mis Servicios",
  "ctaSecondary": "Contactame"
}'::jsonb),

('home', 'introSection', '{
  "title": "Transformamos Ideas en",
  "titleHighlight": "Realidad Digital",
  "paragraph1": "En NeuroForge, combinamos inteligencia artificial y automatización para crear soluciones innovadoras que impulsan tu negocio hacia el futuro. Nuestro equipo de expertos trabaja incansablemente para ofrecerte herramientas de IA de última generación.",
  "paragraph2": "Desde asistentes virtuales hasta sistemas de automatización complejos, transformamos procesos manuales en flujos de trabajo inteligentes que ahorran tiempo y aumentan la productividad.",
  "imageUrl": "https://ojcyysrmjqbmwedeyalx.supabase.co/storage/v1/object/public/images/pages/intro-hero..png"
}'::jsonb),

('home', 'features', '{
  "sectionTitle": "Esto es lo que",
  "titleHighlight": "hacemos",
  "subtitle": "Nuestros servicios en inteligencia artificial y automatización.",
  "items": [
    {
      "title": "AUTOMATIZA ATENCION AL CLIENTE",
      "description": "Optimiza tiempos, reduce costos y ofrece respuestas inmediatas con agentes virtuales automatizados.",
      "buttonText": "Saber mas",
      "imageUrl": "https://ojcyysrmjqbmwedeyalx.supabase.co/storage/v1/object/public/images/pages/phone.png",
      "imageAlt": "Automatiza atención al cliente"
    },
    {
      "title": "CHATBOTS MULTICANAL CON IA",
      "description": "Automatiza conversaciones en múltiples plataformas, reduce errores y mejora tu atención.",
      "buttonText": "Saber mas",
      "imageUrl": "https://ojcyysrmjqbmwedeyalx.supabase.co/storage/v1/object/public/images/pages/phone2.png",
      "imageAlt": "Chatbots multicanal con IA"
    },
    {
      "title": "SOLUCIONES DE SOPORTE IA",
      "description": "Automatiza procesos, personaliza experiencias y toma decisiones basadas en datos.",
      "buttonText": "Saber más",
      "imageUrl": "https://ojcyysrmjqbmwedeyalx.supabase.co/storage/v1/object/public/images/pages/pcune.png",
      "imageAlt": "Soluciones de soporte IA"
    }
  ]
}'::jsonb),

('home', 'aboutMe', '{
  "title": "Sobre mí",
  "paragraph1": "Soy Roxana Aparicio, especialista en automatización y tecnología sin complicaciones.",
  "paragraph2": "Con más de 7 años de experiencia en administración y atención al cliente, hoy ayudo a emprendedores y equipos a integrar herramientas como Make y ChatGPT para trabajar mejor, escalar más rápido y ganar libertad.",
  "buttonText": "Saber mas",
  "imageAlt": "Roxana Aparicio",
  "imageUrl": "https://ojcyysrmjqbmwedeyalx.supabase.co/storage/v1/object/public/images/pages/rox.png"
}'::jsonb),

('home', 'testimonials', '{
  "sectionTitle": "Esto dicen nuestros",
  "titleHighlight": "clientes"
}'::jsonb),

('home', 'contact', '{
  "title": "Transforma tu",
  "titleHighlight": "enfoque",
  "titleSuffix": ", no tu carga de trabajo",
  "ctaButton": "Agenda una consulta"
}'::jsonb);

-- =====================================================
-- CONTENT BLOCKS - PÁGINA ABOUT
-- =====================================================
INSERT INTO content_blocks (page, section, content) VALUES
('about', 'hero', '{
  "titleHighlight": "Acerca de",
  "titleMain": "Neuro Forge",
  "subtitle": "Tecnología con propósito. Automatización con visión humana.",
  "paragraph1": "En Neuro Forge ayudamos a negocios y profesionales a simplificar procesos, escalar proyectos y capacitarse para el futuro del trabajo. Somos un proyecto de vanguardia especializada en automatización, inteligencia artificial (IA) para la atención al cliente y asesorías digitales personalizadas.",
  "paragraph2": "Nos apasiona el impacto positivo de la tecnología: menos tareas repetitivas, más tiempo para crear, conectar y crecer.",
  "ctaButton": "Saber más",
  "robotPlaceholder": "Imagen del robot por agregar",
  "imageUrl": "https://ojcyysrmjqbmwedeyalx.supabase.co/storage/v1/object/public/images/pages/robot-2.png",
  "imageAlt": "Acerca de Neuro Forge"
}'::jsonb),

('about', 'whatWeDo', '{
  "title": "¿Qué hacemos?",
  "intro": "Ofrecemos servicios que combinan estrategia, herramientas y formación:",
  "rocketPlaceholder": "Imagen del cohete por agregar",
  "imageUrl": "https://ojcyysrmjqbmwedeyalx.supabase.co/storage/v1/object/public/images/pages/cohetico.png",
  "imageAlt": "¿Qué hacemos?",
  "services": [
    {
      "title": "Optimización de procesos con IA y automatización",
      "description": "Diseñamos soluciones personalizadas que aumentan tu productividad, reducen tareas repetitivas y liberan tiempo valioso."
    },
    {
      "title": "Consultoría en transformación digital",
      "description": "Te acompañamos en la adopción inteligente de herramientas tecnológicas que impulsan un crecimiento sostenible y escalable."
    },
    {
      "title": "Formación para asistentes virtuales",
      "description": "Capacitamos a la nueva generación de profesionales digitales con programas prácticos en automatización, IA y tecnología aplicada."
    }
  ]
}'::jsonb),

('about', 'founder', '{
  "title": "Sobre la fundadora",
  "paragraph1": "Durante años trabajé en administración y atención al cliente, resolviendo tareas repetitivas y sintiendo que el tiempo no me alcanzaba. Aunque disfrutaba ayudar a otros, sabía que necesitaba una forma de trabajar más eficiente y con mayor libertad.",
  "paragraph2": "Fue entonces cuando descubrí el mundo de la automatización y la inteligencia artificial. Empecé a experimentar con herramientas como Make y ChatGPT, y poco a poco, todo cambió. Recuperé tiempo, energía y una nueva visión profesional que hoy comparto con otros.",
  "paragraph3": "Así nació NeuroForge, un espacio donde ayudo a emprendedores, equipos y asistentes virtuales a integrar tecnología de manera simple, práctica y estratégica para construir negocios más sostenibles y libres.",
  "highlightQuote": "No se trata solo de trabajar mejor... se trata de vivir mejor.",
  "imageAlt": "Fundadora de Neuro Forge",
  "imageUrl": "https://ojcyysrmjqbmwedeyalx.supabase.co/storage/v1/object/public/images/pages/rox.png"
}'::jsonb),

('about', 'officePhoto', '{
  "imageAlt": "Oficina de trabajo",
  "placeholderText": "Imagen por agregar"
}'::jsonb);

-- =====================================================
-- CONTENT BLOCKS - PÁGINA SERVICES
-- =====================================================
INSERT INTO content_blocks (page, section, content) VALUES
('services', 'slider', '{
  "titlePart1": "Esto es lo",
  "titleHighlight": "que hacemos",
  "implementLabel": "Cómo lo implementamos:",
  "benefitsLabel": "Beneficios"
}'::jsonb),

('services', 'stats', '{
  "titlePart1": "Números que",
  "titleHighlight": "importan"
}'::jsonb),

('services', 'servicesGrid', '{
  "titlePart1": "Nuestros",
  "titleHighlight": "Servicios",
  "subtitle": "Soluciones innovadoras diseñadas para transformar tu negocio"
}'::jsonb),

('services', 'tools', '{
  "titlePart1": "Herramientas",
  "titleHighlight": "que usamos"
}'::jsonb);
