document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const sectorId = params.get('id') || 'ecommerce';

    try {
        const response = await fetch('../data/sectores.json');
        if (!response.ok) throw new Error('Data no pudo cargar');
        const data = await response.json();
        
        const sector = data[sectorId];
        if(!sector) {
            console.error('Sector ID no encontrado.');
            return;
        }

        // Map Text fields
        document.title = `${sector.h1} | Weaves`;
        document.getElementById('s-badge').innerHTML = sector.badge;
        document.getElementById('s-title').innerHTML = sector.h1;
        document.getElementById('s-lead').innerHTML = sector.lead;

        // Map Retos
        const retosContainer = document.getElementById('s-retos');
        retosContainer.innerHTML = sector.retos.map((reto, idx) => `
            <div class="result-cell reveal ${idx % 3 !== 0 ? 'reveal-delay-1' : ''}">
                <div class="result-label" style="font-size: 20px; color: var(--indigo); font-weight: 600; margin-bottom: 16px;">
                    ${reto.icon} ${reto.title}
                </div>
                <div class="result-desc">${reto.desc}</div>
            </div>
        `).join('');

        // Map Casos
        const casosContainer = document.getElementById('s-casos');
        casosContainer.innerHTML = sector.casos.map(c => `
            <div class="reveal">
                <h4 style="color: white; font-family: 'Space Grotesk', sans-serif; font-size: 20px; margin-bottom: 8px;">${c.icon} ${c.title}</h4>
                <p style="color: var(--muted); margin-bottom: 12px; font-size: 15px;">${c.desc}</p>
                ${c.list && c.list.length > 0 ? `<ul style="color: rgba(255,255,255,0.7); padding-left: 20px; line-height: 1.6; font-size: 14px;">
                    ${c.list.map(li => `<li>${li}</li>`).join('')}
                </ul>` : ''}
            </div>
        `).join('');

        // Map Tech Stack
        const techContainer = document.getElementById('s-tech');
        techContainer.innerHTML = sector.tech.map(t => `
            <span style="background: rgba(0,180,166,0.1); color: var(--teal); padding: 6px 12px; border-radius: 4px; font-size: 14px; border: 1px solid rgba(0,180,166,0.2);">${t}</span>
        `).join('');

        // Antes y Despues
        const checkIcon = `<svg viewBox="0 0 24 24" fill="none" class="w-5 h-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; flex-shrink: 0; min-width: 18px;"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        const closeIcon = `<svg viewBox="0 0 24 24" fill="none" class="w-5 h-5" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; flex-shrink: 0; min-width: 18px;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

        document.getElementById('s-antes').innerHTML = sector.antes.map(a => `
            <li style="display: flex; gap: 12px; align-items: flex-start; color: var(--text-light); font-size: 15px;">
                <span style="color: var(--accent); margin-top:2px;">${closeIcon}</span> ${a}
            </li>
        `).join('');

        document.getElementById('s-despues').innerHTML = sector.despues.map(d => `
            <li style="display: flex; gap: 12px; align-items: flex-start; color: var(--dark); font-size: 15px; font-weight: 500;">
                <span style="color: var(--teal); margin-top:2px;">${checkIcon}</span> ${d}
            </li>
        `).join('');

        // Trigger observe for newly created reveal elements
        setTimeout(() => {
            const reveals = document.querySelectorAll('.reveal');
            const obs = new IntersectionObserver((entries) => {
              entries.forEach(e => {
                if (e.isIntersecting) {
                  e.target.classList.add('visible');
                  obs.unobserve(e.target);
                }
              });
            }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
            reveals.forEach(el => obs.observe(el));
        }, 100);

        if(typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

    } catch(err) {
        console.error('Error procesando el JSON:', err);
    }
});
