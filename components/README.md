# Sistema de Componentes Modulares

Este proyecto utiliza un sistema de componentes modulares para Header y Footer, facilitando el mantenimiento del sitio.

## 📁 Estructura

```
weaves/
├── components/
│   ├── header.html      # Navegación principal
│   └── footer.html      # Pie de página
├── js/
│   └── components-loader.js  # Script que carga los componentes
└── *.html               # Páginas del sitio
```

## 🚀 Uso en nuevas páginas

Para usar los componentes en cualquier página HTML:

### 1. Agregar placeholders en el HTML

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <!-- Tu head aquí -->
</head>
<body>
    <!-- Header Placeholder -->
    <div id="header-placeholder"></div>

    <!-- Tu contenido aquí -->

    <!-- Footer Placeholder -->
    <div id="footer-placeholder"></div>

    <!-- Scripts - IMPORTANTE: components-loader.js debe ir primero -->
    <script src="js/components-loader.js"></script>
    <script src="js/main.js"></script>
    <script src="js/animations.js"></script>
</body>
</html>
```

## ✏️ Modificar Header o Footer

Para actualizar el header o footer en **todas las páginas** simultáneamente:

1. Edita el archivo correspondiente:
   - `components/header.html` para el header
   - `components/footer.html` para el footer

2. Guarda los cambios

3. Los cambios se aplicarán automáticamente a todas las páginas

## ✨ Características

- ✅ **Mantenimiento centralizado**: Edita una vez, aplica en todas partes
- ✅ **Navegación activa automática**: El enlace de la página actual se marca como activo
- ✅ **Menú móvil funcional**: Se reinicializa automáticamente después de cargar
- ✅ **SEO-friendly**: Los componentes se cargan rápidamente
- ✅ **Compatible con GitHub Pages**: No requiere servidor PHP

## 🔧 Funcionalidades del components-loader.js

- Carga automática de header y footer
- Marca el enlace de navegación activo según la página actual
- Reinicializa el menú móvil después de cargar
- Manejo de errores en caso de que falten archivos

## 📝 Notas

- El script usa `fetch()` API, funciona en todos los navegadores modernos
- Para desarrollo local, usa un servidor local (como Live Server de VS Code)
- Si editas rutas de imágenes/links, hazlo en los archivos de componentes
