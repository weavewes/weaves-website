// Weaves — Datos centralizados de servicios
window.SERVICIOS = {
  consultoria: {
    slug: "consultoria",
    titulo: "Consultoría en Automatización",
    tagline: "Sabrás exactamente qué automatizar y cuánto vas a ahorrar.",
    descripcion: "Analizamos tus procesos operativos y te entregamos una hoja de ruta de 30/60/90 días con el ROI de cada automatización proyectado. Sin promesas vacías.",
    icono: "target",
    color: "teal",
    caracteristicas: [
      { titulo: "Análisis de procesos", desc: "Identificamos cuellos de botella y tareas repetitivas que consumen tiempo valioso de tu equipo.", icono: "search" },
      { titulo: "Hoja de ruta 30/60/90 días", desc: "Te entregamos un plan estructurado con prioridades claras y plazos realistas.", icono: "map" },
      { titulo: "Proyección de ROI", desc: "Cada automatización viene con números claros: inversión, ahorro y tiempo de retorno.", icono: "trending-up" },
      { titulo: "Sin promesas vacías", desc: "No te vendemos humo. Solo automatizaciones que podemos ejecutar y que tienen sentido económico.", icono: "shield" }
    ],
    pasos: [
      { num: "01", titulo: "Auditamos tus procesos", desc: "Identificamos los cuellos de botella y oportunidades de automatización." },
      { num: "02", titulo: "Diseñamos la hoja de ruta", desc: "Priorizamos por impacto y viabilidad técnica y económica." },
      { num: "03", titulo: "Te presentamos el plan", desc: "Con métricas, ROI proyectado y un plan de implementación claro." }
    ],
    casos: [
      { titulo: "Automatización de reportes", desc: "Reportes que se generan y envían solos, sin que nadie abra Excel." },
      { titulo: "Optimización de atención", desc: "Reducimos tiempos de respuesta y derivación automática por tipo de consulta." },
      { titulo: "Reducción de errores", desc: "Procesos que antes dependían de copia manual ahora se ejecutan sin intervención." }
    ],
    cta: "Pide tu hoja de ruta →"
  },
  chatbot: {
    slug: "chatbot",
    titulo: "Chatbot de Atención al Cliente",
    tagline: "Responde el 70% de las consultas sin intervención humana.",
    descripcion: "Chatbots inteligentes en WhatsApp y web que responden preguntas frecuentes, derivan casos complejos a tu equipo, y aprenden de cada interacción. Tus clientes reciben respuesta instantánea. Tu equipo se enfoca en lo que importa.",
    icono: "message-circle",
    color: "teal",
    caracteristicas: [
      { titulo: "Integración con WhatsApp y Chatwoot", desc: "Conexión directa con los canales donde ya están tus clientes. Sin fricción, sin cambios en su experiencia.", icono: "message-circle" },
      { titulo: "Respuesta 24/7", desc: "Tu negocio sigue atendiendo mientras duermes. Sin esperas, sin colas, sin límites de capacidad.", icono: "clock" },
      { titulo: "Escalado inteligente a humanos", desc: "Cuando el chatbot detecta complejidad, deriva la conversación a tu equipo con todo el contexto cargado.", icono: "arrow-up-right" },
      { titulo: "Entrenado con tu información", desc: "El chatbot conoce tus procesos, productos y políticas. No respuestas genéricas — conocimiento real de tu negocio.", icono: "brain" }
    ],
    pasos: [
      { num: "01", titulo: "Configuramos el chatbot", desc: "Definimos las preguntas frecuentes y el tono de tu marca." },
      { num: "02", titulo: "Lo conectamos", desc: "Integración con WhatsApp y tu CRM." },
      { num: "03", titulo: "Aprende y mejora", desc: "El chatbot aprende de cada interacción y se hace más preciso." }
    ],
    casos: [
      { titulo: "Respuesta a preguntas frecuentes", desc: "Horarios, precios, ubicaciones, estados de pedido. Respondidos al instante, sin esperar a un humano." },
      { titulo: "Derivación a agentes humanos", desc: "El bot detecta cuándo necesita intervención humana y escala con contexto completo." },
      { titulo: "Generación de tickets automático", desc: "Cada conversación compleja genera un ticket con todo el contexto para tu equipo." },
      { titulo: "Seguimiento post-consulta", desc: "El bot envía seguimiento automático después de una consulta sin resolver." }
    ],
    cta: "Automatiza tu atención →"
  },
  marketing: {
    slug: "marketing",
    titulo: "Marketing y Redes Sociales con IA",
    tagline: "Tu marca presente en redes sin que nadie toque una tecla.",
    descripcion: "Agentes de IA que planifican, redactan, publican y reportan en tus redes sociales. Contenido consistente, alineado con tu marca, sin equipo de marketing dedicado.",
    icono: "megaphone",
    color: "teal",
    caracteristicas: [
      { titulo: "Generación de contenido", desc: "Posts, captions, hashtags y textos para email. Todo generado con el tono de tu marca.", icono: "pen-tool" },
      { titulo: "Publicación automática", desc: "Conectamos tus perfiles y publicamos directamente. Sin estar presente.", icono: "send" },
      { titulo: "Reportes semanales", desc: "Cada semana recibes un resumen de rendimiento con métricas clave y recomendaciones.", icono: "bar-chart-2" },
      { titulo: "Alineado con tu marca", desc: "Todo el contenido pasa por las directrices de marca que definimos juntos. Consistencia garantizada.", icono: "check-circle" }
    ],
    pasos: [
      { num: "01", titulo: "Definimos la estrategia", desc: "Tono, frecuencia, plataformas y tipos de contenido." },
      { num: "02", titulo: "La IA crea el contenido", desc: "Posts, captions, hashtags y textos para email." },
      { num: "03", titulo: "Publicamos y medimos", desc: "Automáticamente. Reports semanales para que veas resultados." }
    ],
    casos: [
      { titulo: "Posts para Instagram", desc: "Contenido visual y captions optimizados para tu audiencia." },
      { titulo: "LinkedIn posts", desc: "Artículos y publicaciones profesionales que generan credibilidad." },
      { titulo: "Email marketing", desc: "Secuencias de emails automatizados para nurturing y conversión." }
    ],
    cta: "Tu marketing trabajando solo →"
  },
  procesos: {
    slug: "procesos",
    titulo: "Automatización de Procesos (RPA)",
    tagline: "Lo que hacía alguien en 3 horas, ahora se hace solo.",
    descripcion: "Automatizamos facturación, sincronización de datos, reportes contables y cualquier tarea operativa repetitiva. Menos tiempo en administrativo. Más tiempo en estrategia.",
    icono: "settings-2",
    color: "teal",
    caracteristicas: [
      { titulo: "Facturación automática", desc: "Generación y envío de facturas sin intervención. Con validación de datos.", icono: "file-text" },
      { titulo: "Sincronización de datos", desc: "CRM, ERP, hoja de cálculo. Todo conectado y actualizado en tiempo real.", icono: "refresh-cw" },
      { titulo: "Reportes programados", desc: "Reportes que se generan solos y llegan a tu email cuando los necesitas.", icono: "calendar" },
      { titulo: "Validación de errores", desc: "Cada proceso tiene controles que detectan anomalías antes de que sean un problema.", icono: "shield-check" }
    ],
    pasos: [
      { num: "01", titulo: "Mapeamos el proceso", desc: "Identificamos tareas repetitivas y cuantificamos el tiempo que consumen." },
      { num: "02", titulo: "Automatizamos", desc: "Construimos el flujo sin código. No necesitas tocar tu sistema actual." },
      { num: "03", titulo: "Monitoreamos", desc: "Logs y alertas automáticas. Si algo falla, lo sabemos antes que tú." }
    ],
    casos: [
      { titulo: "Facturación recurrente", desc: "Facturas automáticas para clientes con contratos periódicos." },
      { titulo: "Reportes contables", desc: "Reportes financieros que se generan y envían sin abrir Excel." },
      { titulo: "Sincronización CRM", desc: "Datos que fluyen entre tu CRM y otras herramientas sin copia manual." }
    ],
    cta: "Menos manual, más estratégico →"
  },
  integraciones: {
    slug: "integraciones",
    titulo: "Integraciones y Flujos de Datos",
    tagline: "Tu CRM, email y WhatsApp hablando entre sí automáticamente.",
    descripcion: "Conectamos las herramientas que ya usas — CRM, email marketing, WhatsApp, tienda online — para que la información fluya sin duplicados, sin copias manuales, sin errores.",
    icono: "git-merge",
    color: "teal",
    caracteristicas: [
      { titulo: "CRM conectado", desc: "Tu CRM hablando con WhatsApp, email y más. Información unificada.", icono: "database" },
      { titulo: "Sincronización en tiempo real", desc: "Datos que se actualizan al instante entre sistemas. Sin esperas.", icono: "zap" },
      { titulo: "Duplicados eliminados", desc: "Lógica inteligente que detecta y fusiona registros duplicados automáticamente.", icono: "filter" },
      { titulo: "Sin código manual", desc: "Todo funciona en segundo plano. Tú sigues usando tus herramientas como siempre.", icono: "code" }
    ],
    pasos: [
      { num: "01", titulo: "Inventario de herramientas", desc: "Identificamos qué usas hoy y cómo se conectan (o no)." },
      { num: "02", titulo: "Diseñamos los flujos", desc: "Definimos cómo viaja la información entre cada sistema." },
      { num: "03", titulo: "Implementamos", desc: "Conexión lista, probada y documentada. Sin interrumpir tu operación." }
    ],
    casos: [
      { titulo: "CRM + WhatsApp", desc: "Cada mensaje de WhatsApp se registra automáticamente en tu CRM." },
      { titulo: "Email + ERP", desc: "Pedidos recibidos por email que pasan directo a tu ERP sin transcripción." },
      { titulo: "Tienda + Notificaciones", desc: "Nuevos pedidos que disparan alertas a WhatsApp y emails automáticamente." }
    ],
    cta: "Un solo flujo. Sin manual →"
  },
  web: {
    slug: "web",
    titulo: "Sitio Web Inteligente",
    tagline: "Una web que no solo muestra información: capta leads y trabaja.",
    descripcion: "Tu sitio web con formularios inteligentes, chatbots de captación, integraciones con tu CRM y automatizaciones de seguimiento. Visitantes que no convierten hoy se convierten mañana.",
    icono: "globe",
    color: "teal",
    caracteristicas: [
      { titulo: "Chatbots de captación", desc: "Un chatbot en tu web que cualifica visitors y agenda llamada sin que tu equipo haga nada.", icono: "message-circle" },
      { titulo: "Formularios inteligentes", desc: "Formularios que se adaptan al usuario, con validación en tiempo real y follow-up automático.", icono: "edit-3" },
      { titulo: "CRM integrado", desc: "Cada lead que entra en tu web va directo a tu CRM con toda la información capturada.", icono: "database" },
      { titulo: "Seguimiento automatizado", desc: "Secuencias de email y WhatsApp que nurturing a cada lead automáticamente.", icono: "send" }
    ],
    pasos: [
      { num: "01", titulo: "Auditamos tu web", desc: "Puntos de fuga, formularios sin seguimiento, oportunidades de conversión." },
      { num: "02", titulo: "Añadimos inteligencia", desc: "Chatbot, forms inteligentes, integraciones con tu CRM." },
      { num: "03", titulo: "Activamos", desc: "La web trabaja 24/7. Tú te enfocas en cerrar, no en captar." }
    ],
    casos: [
      { titulo: "Leads de contacto", desc: "Visitantes que no sabían qué escribirte ahora reservan llamada o dejan sus datos." },
      { titulo: "Chatbot de soporte", desc: "Tu web tiene alguien atendiendo siempre que responde preguntas y deriva leads." },
      { titulo: "Formularios condicionales", desc: "Forms que cambian según la respuesta del usuario, reduciendo abandono." }
    ],
    cta: "Tu web trabajando 24h →"
  },
  embudo: {
    slug: "embudo",
    titulo: "Automatización de Embudo de Ventas",
    tagline: "Desde que entra un lead hasta que cierra, cada paso avanza solo.",
    descripcion: "Secuencias de seguimiento por email y WhatsApp, puntuación automática de leads, alertas a tu equipo cuando un lead está listo para comprar.",
    icono: "filter",
    color: "teal",
    caracteristicas: [
      { titulo: "Secuencias email/WhatsApp", desc: "Nurturing automatizado por email y WhatsApp según el comportamiento del lead.", icono: "mail" },
      { titulo: "Puntuación de leads", desc: "Score dinámico que prioriza los leads más fríos y alerta a tu equipo cuando están listos.", icono: "star" },
      { titulo: "Alertas a ventas", desc: "Cuando un lead alcanza el score objetivo, tu vendedor recibe la alerta con todo el contexto.", icono: "bell" },
      { titulo: "Seguimiento sin olvido", desc: "Ningún lead se queda sin respuesta. Cada uno tiene una secuencia activa hasta que convierte o se draining.", icono: "clock" }
    ],
    pasos: [
      { num: "01", titulo: "Mapeamos el embudo", desc: "Etapas, puntos de decisión y criterios de avance del lead." },
      { num: "02", titulo: "Diseñamos las secuencias", desc: "Nurture automático, timing de emails y reglas de scoring." },
      { num: "03", titulo: "Activamos scoring", desc: "Alertas en tiempo real cuando un lead está listo para la llamada de cierre." }
    ],
    casos: [
      { titulo: "Nurture de leads", desc: "Leads que descargan tu contenido reciben una secuencia de emails que los guían hacia la conversión." },
      { titulo: "Seguimiento post-demo", desc: "Después de una demo, el lead recibe un seguimiento automático con recursos relevantes." },
      { titulo: "Reactivación de leads fríos", desc: "Leads que no han interactuado en 30 días reciben una campaña de reactivación automática." }
    ],
    cta: "Tu embudo se mueve solo →"
  },
  dashboard: {
    slug: "dashboard",
    titulo: "Dashboard y Reportes Automatizados",
    tagline: "Los datos que necesitas para decidir, llegan a tu bandeja sin que los pidas.",
    descripcion: "Conectamos tus fuentes de datos y generamos reportes automáticos con las métricas que importan para tu negocio.",
    icono: "bar-chart-3",
    color: "teal",
    caracteristicas: [
      { titulo: "Reportes automáticos", desc: "Reportes que se generan y envían solos. Sin preparar datos, sin Excel.", icono: "file-text" },
      { titulo: "Métricas clave", desc: "Las métricas que realmente importan a tu negocio, no vanity numbers.", icono: "trending-up" },
      { titulo: "En tiempo real", desc: "Datos actualizados al instante desde CRM, ventas, marketing y más.", icono: "activity" },
      { titulo: "Sin preparación manual", desc: "Tú decides, nosotros construimos. Tú recibes, no preparas.", icono: "check-circle" }
    ],
    pasos: [
      { num: "01", titulo: "Conectamos fuentes", desc: "CRM, ventas, marketing. Identificamos dónde están tus datos." },
      { num: "02", titulo: "Definimos métricas", desc: "Las que importan a tu negocio y a tus objetivos." },
      { num: "03", titulo: "Reportes automáticos", desc: "Llegan a tu email, a tu Slack o están disponibles en tu dashboard 24/7." }
    ],
    casos: [
      { titulo: "Reporte semanal comercial", desc: "Cada lunes recibes un reporte con pipeline, conversiones y objetivos vs. real." },
      { titulo: "Dashboard de operaciones", desc: "Métricas de operaciones: tareas completadas, tiempos de respuesta, productividad." },
      { titulo: "Métricas de marketing", desc: "Rendimiento de campañas, coste por lead, ROI de canales. Todo en un solo lugar." }
    ],
    cta: "Métricas sin esfuerzo →"
  },
  mantenimiento: {
    slug: "mantenimiento",
    titulo: "Mantenimiento y Soporte Continuo",
    tagline: "Tu automatización sigue funcionando. Siempre.",
    descripcion: "Monitoreo activo de tus flujos, actualizaciones cuando cambia alguna herramienta, y soporte directo cuando algo no funciona como esperas.",
    icono: "shield-check",
    color: "teal",
    caracteristicas: [
      { titulo: "Monitoreo activo", desc: "Alertas antes de que fallen. Si algo se rompe, lo sabemos antes que tú.", icono: "eye" },
      { titulo: "Actualizaciones incluidas", desc: "Cuando cambia una API o una herramienta, actualizamos tus flujos sin costo adicional.", icono: "refresh-cw" },
      { titulo: "Soporte directo", desc: "Un canal directo con el equipo que construyó tu automatización. Sin tickets ni esperas.", icono: "headphones" },
      { titulo: "Uptime garantizado", desc: "Si tu flujo se cae, lo resolvemos. Eso es parte del contrato, no un extra.", icono: "shield" }
    ],
    pasos: [
      { num: "01", titulo: "Monitoreamos 24/7", desc: "Alertas automáticas antes de que fallen. Logs y métricas siempre visibles." },
      { num: "02", titulo: "Actualizamos", desc: "Cuando cambia alguna API o herramienta, actualizamos tus flujos sin cobrarte por ello." },
      { num: "03", titulo: "Soporte reactivo", desc: "Si algo falla, lo resolvemos. Eso es parte del contrato, no un extra." }
    ],
    casos: [
      { titulo: "Caídas de integraciones", desc: "Detectamos cuando una integración se cae y la restauramos antes de que Impacte tu operación." },
      { titulo: "Actualizaciones de APIs", desc: "Cuando WhatsApp o alguna herramienta cambia su API, actualizamos tus flujos." },
      { titulo: "Errores no detectados", desc: "Errores que pasan inadvertidos en flujos complejos los detectamos y corregimos proactivamente." }
    ],
    cta: "Mantenimiento incluido →"
  }
};
