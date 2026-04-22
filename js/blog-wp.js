// ===================================
// BLOG-WP.JS - WordPress Headless CMS Integration
// ===================================

// Configuration
const WP_CONFIG = {
    // Replace with your WordPress site URL
    apiUrl: 'https://your-wordpress-site.com/wp-json/wp/v2',
    postsPerPage: 9,
    currentPage: 1,
    currentCategory: 'all'
};

// State management
let allPosts = [];
let filteredPosts = [];

// Initialize blog
document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
    setupFilters();
});

// Fetch posts from WordPress API
async function loadPosts() {
    const loadingState = document.getElementById('loading-state');
    const postsContainer = document.getElementById('blog-posts');
    const errorState = document.getElementById('error-state');
    const emptyState = document.getElementById('empty-state');

    try {
        loadingState.style.display = 'block';
        postsContainer.style.display = 'none';
        errorState.style.display = 'none';
        emptyState.style.display = 'none';

        // Fetch posts from WordPress REST API
        const response = await fetch(
            `${WP_CONFIG.apiUrl}/posts?per_page=100&_embed`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }

        allPosts = await response.json();
        filteredPosts = allPosts;

        if (allPosts.length === 0) {
            loadingState.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        renderPosts();
        loadingState.style.display = 'none';
        postsContainer.style.display = 'grid';

    } catch (error) {
        console.error('Error loading posts:', error);
        loadingState.style.display = 'none';
        errorState.style.display = 'block';
        
        // Fallback: show demo posts if WordPress is not configured
        if (WP_CONFIG.apiUrl.includes('your-wordpress-site.com')) {
            console.log('WordPress URL not configured. Showing demo posts.');
            showDemoPosts();
        }
    }
}

// Render posts to the grid
function renderPosts() {
    const postsContainer = document.getElementById('blog-posts');
    const start = (WP_CONFIG.currentPage - 1) * WP_CONFIG.postsPerPage;
    const end = start + WP_CONFIG.postsPerPage;
    const postsToShow = filteredPosts.slice(start, end);

    postsContainer.innerHTML = postsToShow.map(post => {
        const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '../images/blog/placeholder.jpg';
        const categories = post._embedded?.['wp:term']?.[0] || [];
        const categoryName = categories[0]?.name || 'General';
        const excerpt = post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 150) + '...';
        const date = new Date(post.date).toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });

        return `
            <article class="blog-card card-unified">
                <div class="blog-image" style="width: 100%; height: 220px; overflow: hidden; border-radius: var(--radius-md) var(--radius-md) 0 0; margin: -1.5rem -1.5rem 1.5rem -1.5rem;">
                    <img src="${featuredImage}" alt="${post.title.rendered}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="blog-info" style="display: flex; gap: 1rem; margin-bottom: 1rem; font-size: 0.875rem;">
                    <span class="blog-category" style="color: var(--primary-color); font-weight: var(--weight-semibold);">${categoryName}</span>
                    <span class="blog-date" style="color: var(--text-muted);">${date}</span>
                </div>
                <h3 style="color: var(--text-white); margin-bottom: 0.75rem; font-size: 1.25rem;">${post.title.rendered}</h3>
                <p style="color: var(--text-light); margin-bottom: 1.5rem; line-height: 1.6;">${excerpt}</p>
                <a href="${post.link}" class="btn btn-outline" style="width: 100%; text-align: center;" target="_blank">Leer más</a>
            </article>
        `;
    }).join('');

    renderPagination();
}

// Setup category filters
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter posts
            const category = button.dataset.category;
            WP_CONFIG.currentCategory = category;
            WP_CONFIG.currentPage = 1;

            if (category === 'all') {
                filteredPosts = allPosts;
            } else {
                filteredPosts = allPosts.filter(post => {
                    const categories = post._embedded?.['wp:term']?.[0] || [];
                    return categories.some(cat => 
                        cat.slug === category || 
                        cat.name.toLowerCase() === category.toLowerCase()
                    );
                });
            }

            renderPosts();
        });
    });
}

// Render pagination
function renderPagination() {
    const pagination = document.getElementById('pagination');
    const totalPages = Math.ceil(filteredPosts.length / WP_CONFIG.postsPerPage);

    if (totalPages <= 1) {
        pagination.style.display = 'none';
        return;
    }

    pagination.style.display = 'flex';
    pagination.style.justifyContent = 'center';
    pagination.style.gap = '0.5rem';

    let paginationHTML = '';

    // Previous button
    if (WP_CONFIG.currentPage > 1) {
        paginationHTML += `<button class="btn btn-outline" onclick="changePage(${WP_CONFIG.currentPage - 1})">← Anterior</button>`;
    }

    // Page numbers
    for (let i = 1; i <= Math.min(totalPages, 5); i++) {
        const active = i === WP_CONFIG.currentPage ? 'btn-primary' : 'btn-outline';
        paginationHTML += `<button class="btn ${active}" onclick="changePage(${i})">${i}</button>`;
    }

    // Next button
    if (WP_CONFIG.currentPage < totalPages) {
        paginationHTML += `<button class="btn btn-outline" onclick="changePage(${WP_CONFIG.currentPage + 1})">Siguiente →</button>`;
    }

    pagination.innerHTML = paginationHTML;
}

// Change page
function changePage(page) {
    WP_CONFIG.currentPage = page;
    renderPosts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Demo posts fallback
function showDemoPosts() {
    const postsContainer = document.getElementById('blog-posts');
    const loadingState = document.getElementById('loading-state');
    
    loadingState.style.display = 'none';
    postsContainer.style.display = 'grid';
    
    postsContainer.innerHTML = `
        <article class="blog-card card-unified">
            <div class="blog-image" style="width: 100%; height: 220px; background: var(--bg-light); border-radius: var(--radius-md) var(--radius-md) 0 0; margin: -1.5rem -1.5rem 1.5rem -1.5rem; display: flex; align-items: center; justify-content: center; color: var(--text-muted);">
                Sin imagen
            </div>
            <div class="blog-info" style="display: flex; gap: 1rem; margin-bottom: 1rem; font-size: 0.875rem;">
                <span style="color: var(--primary-color); font-weight: var(--weight-semibold);">Guías</span>
                <span style="color: var(--text-muted);">Próximamente</span>
            </div>
            <h3 style="color: var(--text-white); margin-bottom: 0.75rem;">Cómo empezar con automatización e IA</h3>
            <p style="color: var(--text-light); margin-bottom: 1.5rem;">Guía completa para implementar tus primeras automatizaciones sin necesidad de ser experto técnico.</p>
            <button class="btn btn-outline" style="width: 100%;" disabled>Próximamente</button>
        </article>
        <article class="blog-card card-unified">
            <div class="blog-image" style="width: 100%; height: 220px; background: var(--bg-light); border-radius: var(--radius-md) var(--radius-md) 0 0; margin: -1.5rem -1.5rem 1.5rem -1.5rem; display: flex; align-items: center; justify-content: center; color: var(--text-muted);">
                Sin imagen
            </div>
            <div class="blog-info" style="display: flex; gap: 1rem; margin-bottom: 1rem; font-size: 0.875rem;">
                <span style="color: var(--primary-color); font-weight: var(--weight-semibold);">Casos</span>
                <span style="color: var(--text-muted);">Próximamente</span>
            </div>
            <h3 style="color: var(--text-white); margin-bottom: 0.75rem;">Caso real: Tienda online automatizada</h3>
            <p style="color: var(--text-light); margin-bottom: 1.5rem;">Cómo una pyme redujo su tiempo de gestión en un 60% con automatizaciones inteligentes.</p>
            <button class="btn btn-outline" style="width: 100%;" disabled>Próximamente</button>
        </article>
        <article class="blog-card card-unified">
            <div class="blog-image" style="width: 100%; height: 220px; background: var(--bg-light); border-radius: var(--radius-md) var(--radius-md) 0 0; margin: -1.5rem -1.5rem 1.5rem -1.5rem; display: flex; align-items: center; justify-content: center; color: var(--text-muted);">
                Sin imagen
            </div>
            <div class="blog-info" style="display: flex; gap: 1rem; margin-bottom: 1rem; font-size: 0.875rem;">
                <span style="color: var(--primary-color); font-weight: var(--weight-semibold);">Herramientas</span>
                <span style="color: var(--text-muted);">Próximamente</span>
            </div>
            <h3 style="color: var(--text-white); margin-bottom: 0.75rem;">Las mejores herramientas de IA para pymes</h3>
            <p style="color: var(--text-light); margin-bottom: 1.5rem;">Comparativa de plataformas de automatización, chatbots y herramientas de IA accesibles.</p>
            <button class="btn btn-outline" style="width: 100%;" disabled>Próximamente</button>
        </article>
    `;
}

// Newsletter form handler
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Here you would integrate with your newsletter service
        alert('¡Gracias por suscribirte! Te mantendremos informado.');
        this.reset();
    });
}
