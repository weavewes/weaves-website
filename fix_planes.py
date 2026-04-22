import re
import os

path = 'pages/planes-precios.html'
if os.path.exists(path):
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()

    # Replace nav block
    html = re.sub(r'<nav class="navbar">.*?</nav>', '<div id="header-placeholder"></div>', html, flags=re.DOTALL)
    
    # Replace footer block
    html = re.sub(r'<footer class="footer">.*?</footer>', '<div id="footer-placeholder"></div>\n<script src="../js/components-loader.js"></script>\n<script src="../js/main.js"></script>', html, flags=re.DOTALL)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Fixed planes-precios.html")
else:
    print("Not found")
