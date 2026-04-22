import json

mapping = {
    "🛒": '<i data-lucide="shopping-cart" style="width:24px;height:24px;display:inline-block;vertical-align:middle;stroke:var(--teal)"></i>',
    "💬": '<i data-lucide="message-circle" style="width:24px;height:24px;display:inline-block;vertical-align:middle;stroke:var(--teal)"></i>',
    "📱": '<i data-lucide="smartphone" style="width:24px;height:24px;display:inline-block;vertical-align:middle;stroke:var(--teal)"></i>',
    "✍️": '<i data-lucide="pen-tool" style="width:24px;height:24px;display:inline-block;vertical-align:middle;stroke:var(--teal)"></i>',
    "📢": '<i data-lucide="megaphone" style="width:24px;height:24px;display:inline-block;vertical-align:middle;stroke:var(--teal)"></i>',
    "📂": '<i data-lucide="folder" style="width:24px;height:24px;display:inline-block;vertical-align:middle;stroke:var(--teal)"></i>',
    "🤖": '<i data-lucide="bot" style="width:20px;height:20px;display:inline-block;vertical-align:middle;stroke:white"></i>',
    "📦": '<i data-lucide="package" style="width:20px;height:20px;display:inline-block;vertical-align:middle;stroke:white"></i>',
    "🔄": '<i data-lucide="refresh-cw" style="width:20px;height:20px;display:inline-block;vertical-align:middle;stroke:white"></i>',
    "🎓": '<i data-lucide="graduation-cap" style="width:24px;height:24px;display:inline-block;vertical-align:middle;stroke:var(--teal)"></i>',
    "📝": '<i data-lucide="clipboard-list" style="width:24px;height:24px;display:inline-block;vertical-align:middle;margin-right:8px;stroke:var(--teal)"></i>',
    "💳": '<i data-lucide="credit-card" style="width:24px;height:24px;display:inline-block;vertical-align:middle;margin-right:8px;stroke:var(--teal)"></i>',
    "⏰": '<i data-lucide="clock" style="width:24px;height:24px;display:inline-block;vertical-align:middle;stroke:var(--teal)"></i>',
    "📊": '<i data-lucide="bar-chart-2" style="width:24px;height:24px;display:inline-block;vertical-align:middle;stroke:var(--teal)"></i>',
    "📧": '<i data-lucide="mail" style="width:24px;height:24px;display:inline-block;vertical-align:middle;stroke:var(--teal)"></i>',
    "❓": '<i data-lucide="help-circle" style="width:24px;height:24px;display:inline-block;vertical-align:middle;stroke:var(--teal)"></i>',
    "🔍": '<i data-lucide="search" style="width:24px;height:24px;display:inline-block;vertical-align:middle;stroke:var(--teal)"></i>',
    "😓": '<i data-lucide="frown" style="width:24px;height:24px;display:inline-block;vertical-align:middle;stroke:var(--teal)"></i>',
    "🎯": '<i data-lucide="target" style="width:20px;height:20px;display:inline-block;vertical-align:middle;stroke:white"></i>'
}

with open('data/sectores.json', 'r', encoding='utf-8') as f:
    text = f.read()

for k, v in mapping.items():
    text = text.replace(k, v)

with open('data/sectores.json', 'w', encoding='utf-8') as f:
    f.write(text)

