# Sitio Web - Automatización con IA

Sitio web completo para consultoría en automatización e inteligencia artificial.

## 📁 Estructura del Proyecto

```
weaves/
│
├── index.html                          # Página principal
├── servicios.html                      # Listado de servicios
├── sectores.html                       # Sectores que atendemos
├── casos-exito.html                    # Casos de éxito
├── quienes-somos.html                  # Sobre nosotros
├── blog.html                           # Blog
├── planes-precios.html                 # Planes y precios
├── contacto.html                       # Formulario de contacto
├── diagnostico-gratuito.html           # Diagnóstico gratuito (multi-paso)
│
├── consultoria-estrategica.html        # Servicio: Consultoría estratégica
├── implementacion-soluciones.html      # Servicio: Implementación
├── atencion-cliente-chatbots.html      # Servicio: Chatbots
├── marketing-redes-sociales.html       # Servicio: Marketing automatizado
├── automatizacion-procesos.html        # Servicio: Automatización procesos
├── sitios-web-inteligentes.html        # Servicio: Sitios web IA
├── integraciones-flujos.html           # Servicio: Integraciones
├── capacitacion-soporte.html           # Servicio: Capacitación
├── productos-preconfigurados.html      # Servicio: Productos configurados
│
├── sector-ecommerce.html               # Sector: E-commerce
├── sector-servicios-profesionales.html # Sector: Servicios profesionales
├── sector-educacion.html               # Sector: Educación
├── sector-restauracion-turismo.html    # Sector: Restauración y turismo
├── sector-startups.html                # Sector: Startups
├── sector-salud.html                   # Sector: Salud
│
├── css/
│   ├── styles.css                      # Estilos principales
│   ├── components.css                  # Componentes reutilizables
│   └── responsive.css                  # Diseño responsive
│
├── js/
│   ├── main.js                         # JavaScript principal
│   ├── forms.js                        # Manejo de formularios
│   ├── animations.js                   # Animaciones y efectos
│   └── diagnostic-form.js              # Formulario multi-paso
│
├── images/
│   ├── hero/                           # Imágenes hero sections
│   ├── servicios/                      # Imágenes de servicios
│   ├── casos/                          # Imágenes casos de éxito
│   ├── equipo/                         # Fotos del equipo
│   ├── tech/                           # Logos tecnologías
│   └── blog/                           # Imágenes blog
│
├── assets/
│   ├── icons/                          # Iconos SVG
│   └── docs/                           # Documentos descargables
│
├── legal/
│   ├── aviso-legal.html                # Aviso legal
│   ├── politica-privacidad.html        # Política de privacidad
│   └── terminos-servicio.html          # Términos de servicio
│
└── README.md                           # Este archivo
```

## 🚀 Características

### Diseño
- **Responsive**: Adaptado a móviles, tablets y desktop
- **Moderno**: Diseño limpio con gradientes y efectos visuales
- **Accesible**: Cumple estándares de accesibilidad web

### Funcionalidades JavaScript
- **Navegación móvil**: Menú hamburguesa responsive
- **Smooth scroll**: Navegación suave entre secciones
- **Lazy loading**: Carga diferida de imágenes
- **Animaciones on scroll**: Elementos se animan al aparecer
- **Validación de formularios**: Validación en tiempo real
- **Auto-guardado**: Guarda datos de formularios en localStorage
- **Filtros de blog**: Filtrado dinámico por categorías
- **Formulario multi-paso**: Diagnóstico con progreso visual
- **Contadores animados**: Números que se animan al aparecer
- **Efectos hover**: Interacciones suaves en tarjetas

### CSS Features
- **Variables CSS**: Colores y espaciado centralizados
- **Grid y Flexbox**: Layouts modernos y flexibles
- **Media queries**: Breakpoints en 992px, 768px, 480px
- **Animaciones**: Transiciones y efectos suaves
- **Print styles**: Estilos optimizados para impresión
- **Reduced motion**: Respeta preferencias de accesibilidad

## 🛠️ Tecnologías Utilizadas

- HTML5 (semántico)
- CSS3 (con custom properties)
- JavaScript vanilla (ES6+)
- No frameworks - código limpio y ligero

## 📄 Páginas Principales

### Homepage (`index.html`)
- Hero con CTA principal
- Beneficios (4 cards)
- Preview de servicios (6 cards)
- Caso destacado con estadísticas
- Logos de tecnologías
- Call-to-action final

### Servicios (`servicios.html`)
- Grid con 9 servicios principales
- Descripción y tecnologías de cada servicio
- Enlaces a páginas de detalle

### Sectores (`sectores.html`)
- 6 sectores de industria
- Soluciones específicas por sector
- Enlaces a páginas de detalle

### Casos de Éxito (`casos-exito.html`)
- 4 casos de estudio detallados
- Resultados cuantificables
- Testimonios de clientes

### Blog (`blog.html`)
- Sistema de filtros por categoría
- Grid responsive de artículos
- Paginación

### Diagnóstico Gratuito (`diagnostico-gratuito.html`)
- Formulario de 5 pasos
- Barra de progreso
- Navegación prev/next
- Validación por paso

## 🎨 Personalización

### Colores
Los colores se definen en `css/styles.css` usando variables CSS:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #7c3aed;
    --accent-color: #10b981;
    --text-color: #1f2937;
    --text-light: #6b7280;
    --bg-light: #f9fafb;
    --border-color: #e5e7eb;
}
```

### Tipografía
Fuentes importadas de Google Fonts:
- **Títulos**: Inter (700, 600, 500)
- **Texto**: System fonts optimizados

### Breakpoints Responsive
- Desktop: > 992px
- Tablet: 768px - 992px
- Mobile: 480px - 768px
- Small mobile: < 480px

## 📱 Carpetas de Imágenes

Organiza tus imágenes en las siguientes carpetas:

- `images/hero/`: Imágenes para secciones hero (1920x1080px recomendado)
- `images/servicios/`: Iconos o fotos de servicios (800x600px)
- `images/casos/`: Capturas de casos de éxito (1200x800px)
- `images/equipo/`: Fotos del equipo (500x500px, cuadradas)
- `images/tech/`: Logos de tecnologías (formato SVG o PNG con fondo transparente)
- `images/blog/`: Imágenes destacadas de artículos (1200x630px)

## 🔧 Configuración

### 1. Configurar formularios
Edita `js/forms.js` y `js/diagnostic-form.js` para conectar con tu backend:

```javascript
fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
})
```

### 2. Agregar Google Analytics
Añade tu código de tracking en todas las páginas HTML antes de `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=TU-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'TU-ID');
</script>
```

### 3. Configurar meta tags
Actualiza los meta tags en cada página HTML:

```html
<meta name="description" content="Tu descripción específica">
<meta property="og:image" content="URL-de-tu-imagen">
<meta property="og:url" content="URL-de-tu-sitio">
```

## 🚀 Deployment

### Hosting estático
Este sitio funciona perfectamente en:
- **Coolify** (u otro Docker/self-hosted): sirve los HTML estáticos; el **proxy Teable** es un servicio Node aparte (`Dockerfile` + `server/server.mjs`) con variables `TEABLE_*` (ver `.env.example`).
- **Netlify / Vercel / GitHub Pages / Cloudflare Pages**: deploy de la carpeta estática

### Configuración de servidor
Si usas servidor propio, asegúrate de:
1. Configurar HTTPS
2. Activar compresión gzip
3. Configurar cache headers para imágenes/CSS/JS
4. Redirigir www a non-www (o viceversa)

## ✅ Checklist Pre-Launch

- [ ] Reemplazar textos placeholder con contenido real
- [ ] Agregar imágenes en todas las carpetas
- [ ] Actualizar información de contacto en footer
- [ ] Configurar formularios con endpoint real
- [ ] Añadir Google Analytics
- [ ] Optimizar imágenes (compresión)
- [ ] Probar en diferentes navegadores
- [ ] Validar HTML/CSS (W3C validator)
- [ ] Probar responsive en dispositivos reales
- [ ] Configurar meta tags SEO
- [ ] Crear sitemap.xml
- [ ] Configurar robots.txt
- [ ] Probar velocidad (PageSpeed Insights)

## 📊 SEO

### Mejoras recomendadas
1. **Sitemap XML**: Genera con herramientas online o plugins
2. **Robots.txt**: Crear en raíz del proyecto
3. **Schema.org markup**: Añadir datos estructurados
4. **Open Graph**: Meta tags para redes sociales
5. **Canonical URLs**: Evitar contenido duplicado

### Ejemplo robots.txt
```
User-agent: *
Allow: /
Sitemap: https://tudominio.com/sitemap.xml
```

## 🐛 Soporte de Navegadores

- Chrome (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- Edge (últimas 2 versiones)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📞 Contacto

Para soporte o consultas sobre este proyecto, contacta a través del formulario en `contacto.html`.

## 📝 Licencia

Este proyecto es propiedad de [Tu Empresa]. Todos los derechos reservados.

---

**Versión**: 1.0  
**Última actualización**: 2024  
**Desarrollado con**: ❤️ y mucho ☕
