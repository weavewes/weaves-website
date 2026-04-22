import re
import os
import shutil

# Backup existing components
for comp in ['components/header.html', 'components/footer.html']:
    if os.path.exists(comp):
        shutil.move(comp, comp + '.bak')

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract NAV
nav_regex = r'(<!-- NAV -->\n<nav id="nav">.*?</nav>)'
nav_match = re.search(nav_regex, content, re.DOTALL)
if nav_match:
    nav_content = nav_match.group(1)
    with open('components/header.html', 'w', encoding='utf-8') as f:
        f.write(nav_content + '\n')
    # Replace in content
    content = content.replace(nav_content, '<!-- NAV -->\n<div id="header-placeholder"></div>')

# Extract FOOTER
footer_regex = r'(<!-- FOOTER -->\n<footer>.*?</footer>)'
footer_match = re.search(footer_regex, content, re.DOTALL)
if footer_match:
    footer_content = footer_match.group(1)
    with open('components/footer.html', 'w', encoding='utf-8') as f:
        f.write(footer_content + '\n')
    # Replace in content
    content = content.replace(footer_content, '<!-- FOOTER -->\n<div id="footer-placeholder"></div>')

# Inject components-loader.js and fix the scroll script
scroll_old = """const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});"""

scroll_new = """window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (!nav) return;
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});"""

content = content.replace(scroll_old, scroll_new)

# Add the scrip include if not there
if '<script src="js/components-loader.js"></script>' not in content:
    content = content.replace('<script>', '<script src="js/components-loader.js"></script>\n<script>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully extracted header and footer, updated index.html")
