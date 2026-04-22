import re
import json

path = 'data/sectores.json'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# Replace any attribute="value" with attribute='value' specifically inside <i ...> tags to fix the unescaped quotes
text = re.sub(r'data-lucide="([^"]+)"', r"data-lucide='\1'", text)
text = re.sub(r'style="([^"]+)"', r"style='\1'", text)
text = re.sub(r'class="([^"]+)"', r"class='\1'", text)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)

try:
    with open(path, 'r', encoding='utf-8') as f:
        json.load(f)
    print("VALID FORMAT")
except Exception as e:
    print("INVALID FORMAT:", e)
