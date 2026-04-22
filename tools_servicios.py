import os
import re

# 1. Update servicios/index.html
index_path = 'servicios/index.html'
if os.path.exists(index_path):
    with open(index_path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Replace <nav>
    html = re.sub(r'<nav id="nav">.*?</nav>', '<div id="header-placeholder"></div>', html, flags=re.DOTALL)
    # Replace <footer>
    html = re.sub(r'<footer>.*?</footer>', '<div id="footer-placeholder"></div>\n<script src="../js/components-loader.js"></script>\n<script src="../js/main.js"></script>', html, flags=re.DOTALL)
    
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("servicios/index.html updated.")

# 2. Create servicios/servicio.html from procesos.html
procesos_path = 'servicios/procesos.html'
if os.path.exists(procesos_path):
    with open(procesos_path, 'r', encoding='utf-8') as f:
        html_s = f.read()
    
    # Replace CSS globals
    html_s = re.sub(r'<nav id="nav">.*?</nav>', '<div id="header-placeholder"></div>', html_s, flags=re.DOTALL)
    html_s = re.sub(r'<footer>.*?</footer>', '<div id="footer-placeholder"></div>\n<script src="../js/components-loader.js"></script>\n<script src="../js/main.js"></script>', html_s, flags=re.DOTALL)
    
    # Remove data-servicio
    html_s = html_s.replace('<body data-servicio="procesos">', '<body>')
    
    # Link global styles
    if '<link rel="stylesheet" href="../css/styles.css">' not in html_s:
        html_s = html_s.replace('</head>', '  <link rel="stylesheet" href="../css/styles.css">\n</head>')

    # Fix logic
    old_logic = "var slug = document.body.getAttribute('data-servicio') || 'procesos';"
    new_logic = "var params = new URLSearchParams(window.location.search); var slug = params.get('id') || 'procesos';"
    html_s = html_s.replace(old_logic, new_logic)

    # Remove window.addEventListener('scroll') for nav since we are using components loader logic for header!
    # Wait, the components-loader.js does not handle nav.scrolled specifically for services.
    # We will just leave the script, the nav will be injected via components-loader, but ID is header-placeholder. The components loader injects `<header id="header">`!
    html_s = re.sub(r"var nav = document.getElementById\('nav'\);.*?window.scrollY > 60\); \}\);", "", html_s, flags=re.DOTALL)

    with open('servicios/servicio.html', 'w', encoding='utf-8') as f:
        f.write(html_s)
    print("servicios/servicio.html created.")

# 3. Replace all clone pages
clones = [
    'capacitacion-soporte.html', 'chatbot.html', 'consultoria.html', 'dashboard.html', 
    'embudo.html', 'integraciones.html', 'mantenimiento.html', 'marketing.html', 
    'plantilla.html', 'procesos.html', 'web.html'
]
for c in clones:
    path = os.path.join('servicios', c)
    if os.path.exists(path):
        key = c.replace('.html', '')
        with open(path, 'w', encoding='utf-8') as f:
            f.write(f'<!DOCTYPE html><html><head><script>window.location.replace("servicio.html?id={key}");</script></head><body></body></html>')

print("Clones replaced successfully.")
