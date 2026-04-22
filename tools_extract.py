import os
import json
import re

files = [
    'ecommerce.html', 'educacion.html', 'restauracion-turismo.html',
    'salud.html', 'servicios-profesionales.html', 'startups.html'
]

data = {}

for f in files:
    key = f.replace('.html', '')
    path = os.path.join('sectores', f)
    if not os.path.exists(path): continue
    with open(path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    badge = re.search(r'<span class="sector-badge">(.*?)</span>', content)
    h1 = re.search(r'<h1>(.*?)</h1>', content)
    lead = re.search(r'<p class="sector-hero-lead">(.*?)</p>', content)
    
    # Retos
    retos = []
    for m in re.finditer(r'<div class="sector-card">.*?<span class="card-icon-large">(.*?)</span>.*?<h3>(.*?)</h3>.*?<p>(.*?)</p>', content, re.DOTALL):
        retos.append({"icon": m.group(1).strip(), "title": m.group(2).strip(), "desc": m.group(3).strip()})
        
    # Soluciones
    soluciones = []
    for m in re.finditer(r'<div class="solution-content">.*?<h3>(.*?)</h3>.*?<p>(.*?)</p>', content, re.DOTALL):
        soluciones.append({"title": m.group(1).strip(), "desc": m.group(2).strip()})
        
    # Casos (capturing the block and extracting title, icon, desc, and list items)
    casos = []
    for m in re.finditer(r'<div class="feature-box">(.*?)</div>\s*(?=<div class="feature-box|<div class="container|<section)', content, re.DOTALL | re.IGNORECASE):
        block = m.group(1)
        icon_m = re.search(r'<span class="feature-icon">(.*?)</span>', block)
        title_m = re.search(r'<h3>(.*?)</h3>', block)
        desc_m = re.search(r'<p>(.*?)</p>', block)
        
        list_items = [re.sub(r'<[^>]+>', '', li).strip() for li in re.findall(r'<li>(.*?)</li>', block, re.DOTALL)]
        
        if title_m:
            casos.append({
                "icon": icon_m.group(1).strip() if icon_m else "",
                "title": title_m.group(1).strip(),
                "desc": desc_m.group(1).strip() if desc_m else "",
                "list": list_items
            })
        
    # Beneficios
    beneficios = []
    for m in re.finditer(r'<div class="benefit-item">.*?<p>(.*?)</p>', content, re.DOTALL):
        # strip tags inside benefit
        btext = re.sub(r'<[^>]+>', '', m.group(1).strip())
        beneficios.append(btext)
        
    # Antes y Despues
    antes = []
    despues = []
    lists = re.findall(r'<ul class="comparison-list">(.*?)</ul>', content, re.DOTALL)
    if len(lists) >= 2:
        antes = [re.sub(r'<[^>]+>', '', li).strip() for li in re.findall(r'<li>(.*?)</li>', lists[0], re.DOTALL)]
        despues = [re.sub(r'<[^>]+>', '', li).strip() for li in re.findall(r'<li>(.*?)</li>', lists[1], re.DOTALL)]
        
    # Stack
    tech = []
    for m in re.finditer(r'<span class="tech-item">(.*?)</span>', content, re.DOTALL):
        tech.append(m.group(1).strip())
        
    data[key] = {
        "badge": badge.group(1).strip() if badge else "Sector",
        "h1": h1.group(1).strip() if h1 else "Automatización",
        "lead": lead.group(1).strip() if lead else "",
        "retos": retos,
        "soluciones": soluciones,
        "casos": casos,
        "beneficios": beneficios,
        "antes": antes,
        "despues": despues,
        "tech": tech
    }

os.makedirs('data', exist_ok=True)
with open('data/sectores.json', 'w', encoding='utf-8') as outfile:
    json.dump(data, outfile, ensure_ascii=False, indent=2)

print("Done generating JSON.")
