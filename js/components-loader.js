// ===================================
// COMPONENTS LOADER - Carga Header y Footer
// ===================================

// Función para obtener la ruta correcta a los componentes según la ubicación de la página
function getComponentsPath() {
    const path = window.location.pathname;
    
    // Contar cuántos niveles de profundidad tiene la ruta
    const depth = path.split('/').filter(part => part && part !== 'index.html').length;
    
    // Si estamos en la raíz o solo un nivel de profundidad
    if (depth === 0 || path.endsWith('/') || path.endsWith('index.html')) {
        return './components/';
    }
    
    // Si estamos en un subdirectorio (páginas dentro de carpetas)
    if (depth === 1) {
        return '../components/';
    }
    
    // Si estamos más profundo (por ejemplo, /servicios/algo/pagina.html)
    if (depth === 2) {
        return '../../components/';
    }
    
    // Por defecto, intentar desde raíz absoluta
    return '/components/';
}

// Función para cargar componentes HTML
async function loadComponent(elementId, componentFile) {
    const basePath = getComponentsPath();
    const componentPath = basePath + componentFile;
    
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            // Si falla, intentar con ruta absoluta desde la raíz
            const fallbackPath = '/components/' + componentFile;
            const fallbackResponse = await fetch(fallbackPath);
            if (!fallbackResponse.ok) throw new Error(`Error loading ${componentPath} and ${fallbackPath}`);
            const html = await fallbackResponse.text();
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = html;
            }
            return;
        }
        
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
        }
    } catch (error) {
        console.error('Error loading component:', error);
        console.error('Attempted paths:', componentPath);
    }
}

// Función para marcar el enlace activo en el navegación
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === '/' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Cargar componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', async () => {
    // Cargar header y footer
    await loadComponent('header-placeholder', 'header.html');
    await loadComponent('footer-placeholder', 'footer.html');
    
    // Marcar enlace activo después de cargar el header
    setTimeout(setActiveNavLink, 100);
    
    // Re-inicializar el menú móvil después de cargar el header
    initMobileMenu();
});

// Función para inicializar el menú móvil
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Cerrar menú al hacer click en un enlace
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });

        // Cerrar menú al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
}
