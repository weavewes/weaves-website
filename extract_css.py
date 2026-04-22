import re
import os
import glob
import shutil

# Backup old css
css_files = glob.glob('css/*.css')
for f in css_files:
    shutil.move(f, f + '.bak')

# Read index.html
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the style tag content
match = re.search(r'<style>(.*?)</style>', content, re.DOTALL)
if match:
    css_content = match.group(1).strip()
    
    # Write to css/styles.css
    with open('css/styles.css', 'w', encoding='utf-8') as f:
        f.write(css_content + '\n')
        
    # Replace in index.html
    new_content = content[:match.start()] + '<link rel="stylesheet" href="css/styles.css">' + content[match.end():]
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("Successfully extracted CSS and updated index.html")
else:
    print("Error: Could not find <style> tag")
