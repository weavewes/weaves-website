const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/sectores.json');
const tplPath = path.join(__dirname, '../sectores/sector.html');
const outDir = path.join(__dirname, '../sectores');

if (!fs.existsSync(dataPath) || !fs.existsSync(tplPath)) {
    console.error("No se encuentran los archivos necesarios.");
    process.exit(1);
}

const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const template = fs.readFileSync(tplPath, 'utf8');

for (const [id, sector] of Object.entries(data)) {
    let out = template;
    
    // Meta / Title tags injection for SEO
    out = out.replace(
        /<title>.*?<\/title>/s, 
        `<title>${sector.h1} | Weaves Premium</title>\n` +
        `<meta name="description" content="${sector.lead.replace(/"/g, '&quot;')}">\n` +
        `<meta property="og:title" content="${sector.h1}">\n` +
        `<meta property="og:url" content="https://weaveswp.com/sectores/${id}.html">\n` +
        `<link rel="canonical" href="https://weaveswp.com/sectores/${id}.html">`
    );
    
    // Top Text Fields
    out = out.replace(/id="s-badge"[^>]*>.*?<\/div>/s, `id="s-badge">${sector.badge}</div>`);
    out = out.replace(/id="s-title"[^>]*>.*?<\/h1>/s, `id="s-title">${sector.h1}</h1>`);
    out = out.replace(/id="s-lead"[^>]*>.*?<\/p>/s, `id="s-lead">${sector.lead}</p>`);
    
    // Retos Injection
    const retosHtml = sector.retos.map((reto, idx) => `
        <div class="result-cell reveal ${idx % 3 !== 0 ? 'reveal-delay-1' : ''}">
            <div class="result-label" style="font-size: 20px; color: var(--indigo); font-weight: 600; margin-bottom: 16px;">
                ${reto.icon} ${reto.title}
            </div>
            <div class="result-desc">${reto.desc}</div>
        </div>
    `).join('');
    out = out.replace(/id="s-retos"[^>]*>.*?<\/div>/s, `id="s-retos" style="grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));">\n${retosHtml}\n    </div>`);

    // Casos Injection
    const casosHtml = sector.casos.map((c, idx) => `
        <div class="reveal ${idx % 2 !== 0 ? 'reveal-delay-1' : ''}">
            <h4 style="color: white; font-family: 'Space Grotesk', sans-serif; font-size: 20px; margin-bottom: 8px;">${c.icon} ${c.title}</h4>
            <p style="color: rgba(255,255,255,0.6); margin-bottom: 12px; font-size: 15px; line-height: 1.6;">${c.desc}</p>
            ${c.list && c.list.length > 0 ? `<ul style="color: rgba(255,255,255,0.85); padding-left: 20px; line-height: 1.6; font-size: 14px;">
                ${c.list.map(li => `<li>${li}</li>`).join('')}
            </ul>` : ''}
        </div>
    `).join('');
    out = out.replace(/id="s-casos"[^>]*>.*?<\/div>/s, `id="s-casos" style="gap:48px;">\n${casosHtml}\n    </div>`);

    // Tech Injection
    const techHtml = sector.tech ? sector.tech.map(t => `
        <span style="background: rgba(0,180,166,0.1); color: var(--teal); padding: 6px 14px; border-radius: 6px; font-size: 14px; font-weight: 500; border: 1px solid rgba(0,180,166,0.15);">${t}</span>
    `).join('') : '';
    out = out.replace(/id="s-tech"[^>]*>.*?<\/div>/s, `id="s-tech" style="display:flex; flex-wrap:wrap; gap:12px; justify-content:center;">\n${techHtml}\n    </div>`);

    // Antes y Despues Injection
    const checkIcon = `<svg viewBox="0 0 24 24" fill="none" class="w-5 h-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; flex-shrink: 0; min-width: 18px;"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    const closeIcon = `<svg viewBox="0 0 24 24" fill="none" class="w-5 h-5" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; flex-shrink: 0; min-width: 18px;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

    const antesHtml = sector.antes ? sector.antes.map(a => `
        <li style="display: flex; gap: 12px; align-items: flex-start; color: var(--muted); font-size: 15px;">
            <span style="color: var(--red); margin-top:2px;">${closeIcon}</span> ${a}
        </li>
    `).join('') : '';
    out = out.replace(/id="s-antes"[^>]*>.*?<\/ul>/s, `id="s-antes" style="list-style:none; display:flex; flex-direction:column; gap:16px; padding:0; margin:0;">\n${antesHtml}\n        </ul>`);

    const despuesHtml = sector.despues ? sector.despues.map(d => `
        <li style="display: flex; gap: 12px; align-items: flex-start; color: var(--dark); font-size: 15px; font-weight: 500;">
            <span style="color: var(--teal); margin-top:2px;">${checkIcon}</span> ${d}
        </li>
    `).join('') : '';
    out = out.replace(/id="s-despues"[^>]*>.*?<\/ul>/s, `id="s-despues" style="list-style:none; display:flex; flex-direction:column; gap:16px; padding:0; margin:0;">\n${despuesHtml}\n        </ul>`);

    // Clean up dynamic JS loader script since page is now static
    out = out.replace('<script src="../js/sector-loader.js"></script>', '');

    fs.writeFileSync(path.join(outDir, `${id}.html`), out, 'utf8');
    console.log(`→ Successfully compiled static SSG payload for: ${id}.html`);
}

console.log('Build process complete! Validated SEO architecture.');
