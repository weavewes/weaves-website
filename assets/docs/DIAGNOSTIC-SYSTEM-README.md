# Sistema de Diagnóstico con IA - Weaves

Sistema completo de diagnóstico conversacional con IA para automatización de procesos empresariales. Incluye chat interactivo tipo ChatGPT, integración con n8n y análisis con OpenAI.

## 📁 Archivos del Sistema

```
d:\weaves\
├── js/
│   └── diagnostic-chat.js          # Motor del chat conversacional
├── css/
│   └── diagnostic-chat.css         # Estilos del chat
├── pages/
│   └── diagnostico-gratuito.html   # Landing page con integración
└── assets/docs/
    └── n8n-diagnostic-config.json  # Configuración para n8n
```

## 🚀 Configuración Rápida

### 1. Frontend (Ya está listo)

El chat conversacional está integrado en `diagnostico-gratuito.html`. Solo necesitas:

**Configurar la URL del webhook de n8n:**

```javascript
// En diagnostico-gratuito.html, línea ~557
diagnosticChat = new DiagnosticChat({
    webhookUrl: 'https://TU-INSTANCIA-N8N.com/webhook/diagnostic' // ⬅️ CAMBIAR AQUÍ
});
```

### 2. Backend n8n (Crear workflow)

#### Paso 1: Crear Webhook en n8n

1. Crear nuevo workflow en n8n
2. Añadir nodo **Webhook**
   - Path: `/diagnostic`
   - Method: `POST`
   - Response Mode: `When Last Node Finishes`
3. Copiar la URL del webhook y pegarla en el frontend

#### Paso 2: Añadir nodo OpenAI

1. Añadir nodo **OpenAI** después del Webhook
2. Configuración:
   - Model: `gpt-4o` (o `gpt-4-turbo`)
   - Temperature: `0.7`
   - Response Format: `json_object`

**System Message:**

```
Eres el motor de diagnóstico de Weaves, una consultora que ayuda a pymes a automatizar procesos con IA, conectar herramientas y reducir tareas repetitivas.

Recibes un objeto JSON con las respuestas de un cuestionario de diagnóstico inicial sobre la empresa (rol, sector, tamaño, herramientas, procesos, problemas, prioridades y datos de contacto).

Tu tarea es:

1. Analizar las respuestas en profundidad
2. Evaluar el potencial de automatización de la empresa
3. Identificar 2–3 áreas prioritarias donde la automatización con IA pueda aportar más valor en los próximos meses
4. Proponer un primer proyecto concreto recomendado
5. Detectar posibles riesgos o limitaciones (organización, presupuesto, resistencia al cambio)
6. Generar dos tipos de salida:
   - Un resumen claro y breve para enviar al cliente por email, en tono profesional cercano
   - Un resumen más detallado para uso interno del consultor de Weaves

Debes responder SIEMPRE en formato JSON válido, en español, siguiendo exactamente esta estructura:

{
  "automation_potential_score": 1,
  "automation_potential_label": "",
  "company_profile": "",
  "main_pain_points": [],
  "priority_areas": [],
  "quick_wins": [],
  "recommended_first_project": "",
  "estimated_time_savings": "",
  "estimated_roi_timeline": "",
  "risks_and_constraints": "",
  "summary_for_email": "",
  "summary_for_consultant": ""
}

Donde:

- automation_potential_score: número del 1 al 5 (1 = bajo, 5 = muy alto)
- automation_potential_label: texto corto como "Potencial alto", "Potencial medio", etc.
- company_profile: párrafo breve describiendo tipo de empresa, sector, tamaño y contexto
- main_pain_points: lista de frases cortas con los principales problemas detectados
- priority_areas: lista de 2–3 áreas donde recomendarías empezar a automatizar
- quick_wins: lista de ideas de automatización sencillas con impacto rápido (2-4 semanas)
- recommended_first_project: párrafo describiendo el primer proyecto que Weaves debería proponer, con enfoque específico y alcance claro
- estimated_time_savings: estimación de horas ahorradas semanalmente
- estimated_roi_timeline: tiempo estimado para ver ROI positivo ("2-3 meses", "4-6 meses", etc.)
- risks_and_constraints: riesgos, límites o condiciones a tener en cuenta
- summary_for_email: texto de 6–10 líneas, listo para pegar en un email al cliente, tono profesional cercano, sin mencionar estructura técnica
- summary_for_consultant: texto detallado (2–4 párrafos) para uso interno, explicando cómo ves la situación y por qué recomiendas ese primer proyecto

No incluyas ningún otro campo fuera de los definidos. No devuelvas explicaciones fuera del JSON.
```

**User Message:**

```
Analiza el siguiente diagnóstico y genera recomendaciones:

{{$json.answers}}

Datos principales:
- Nombre: {{$json.answers.contact_data.name}}
- Empresa: {{$json.answers.contact_data.company}}
- Sector: {{$json.answers.sector}}
- Tamaño: {{$json.answers.company_size}}

Proceso clave descrito:
{{$json.answers.key_process_description}}

Deseo principal ("magia"):
{{$json.answers.magic_wish}}

Genera un diagnóstico profesional, accionable y personalizado.
```

#### Paso 3: Parsear respuesta JSON

1. Añadir nodo **Code** después de OpenAI
2. Código:

```javascript
const openaiResponse = $input.first().json;
const parsedData = JSON.parse(openaiResponse.choices[0].message.content);

return {
  json: {
    diagnostic_id: $node["Webhook"].json.body.diagnostic_id,
    timestamp: $node["Webhook"].json.body.timestamp,
    answers: $node["Webhook"].json.body.answers,
    ai_response: parsedData
  }
};
```

#### Paso 4: Enviar email al cliente

1. Añadir nodo **Gmail** (o tu servicio de email)
2. Configuración:
   - To: `{{$json.answers.contact_data.email}}`
   - Subject: `Tu diagnóstico de automatización - Weaves`
   - Body: `{{$json.ai_response.summary_for_email}}`

**Plantilla de email sugerida:**

```html
<p>Hola {{$json.answers.contact_data.name}},</p>

<p>{{$json.ai_response.summary_for_email}}</p>

<hr>

<h3>📊 Resumen de tu diagnóstico:</h3>
<ul>
  <li><strong>Potencial de automatización:</strong> {{$json.ai_response.automation_potential_label}} ({{$json.ai_response.automation_potential_score}}/5)</li>
  <li><strong>Ahorro estimado:</strong> {{$json.ai_response.estimated_time_savings}}</li>
  <li><strong>ROI esperado:</strong> {{$json.ai_response.estimated_roi_timeline}}</li>
</ul>

<h3>🎯 Áreas prioritarias:</h3>
<ul>
{{#each $json.ai_response.priority_areas}}
  <li>{{this}}</li>
{{/each}}
</ul>

<h3>⚡ Quick wins (victorias rápidas):</h3>
<ul>
{{#each $json.ai_response.quick_wins}}
  <li>{{this}}</li>
{{/each}}
</ul>

<p>Un saludo,<br>
Equipo Weaves</p>
```

#### Paso 5: Notificar al equipo interno

1. Añadir nodo **Gmail** o **Slack**
2. Configuración:
   - To: `equipo@weaves.com` (o canal de Slack)
   - Subject: `🔥 Nuevo diagnóstico: {{$json.answers.contact_data.company}} - Score {{$json.ai_response.automation_potential_score}}/5`
   - Body: `{{$json.ai_response.summary_for_consultant}}`

**Plantilla interna sugerida:**

```
🆕 NUEVO DIAGNÓSTICO

👤 Contacto:
- Nombre: {{$json.answers.contact_data.name}}
- Empresa: {{$json.answers.contact_data.company}}
- Email: {{$json.answers.contact_data.email}}
- Teléfono: {{$json.answers.contact_data.phone}}
- Preferencia contacto: {{$json.answers.contact_preference}}

📊 Score: {{$json.ai_response.automation_potential_score}}/5 ({{$json.ai_response.automation_potential_label}})

🎯 ANÁLISIS DEL CONSULTOR:
{{$json.ai_response.summary_for_consultant}}

⏰ Ahorro estimado: {{$json.ai_response.estimated_time_savings}}
💰 ROI: {{$json.ai_response.estimated_roi_timeline}}

🚨 Seguimiento humano: {{#if (eq $json.answers.allow_human_followup 'yes')}}SÍ ✅{{else}}NO{{/if}}

---
Ver diagnóstico completo: [Link al CRM]
```

#### Paso 6: Guardar en Google Sheets / Airtable (Opcional)

1. Añadir nodo **Google Sheets** o **Airtable**
2. Mapear campos:
   - Timestamp
   - Nombre
   - Empresa
   - Email
   - Teléfono
   - Sector
   - Score
   - Proyecto recomendado
   - Quiere seguimiento

#### Paso 7: Condicional para seguimiento urgente

1. Añadir nodo **IF**
2. Condición: `{{$json.ai_response.automation_potential_score}} >= 4 AND {{$json.answers.allow_human_followup}} === 'yes'`
3. Si TRUE → Enviar notificación urgente a Slack/WhatsApp

## 📋 Estructura de Preguntas

El chat tiene **23 preguntas** organizadas en 6 bloques:

### Bloque A - Contexto básico (Q1-Q4)
- Rol en la empresa
- Sector
- Tamaño de equipo
- Canales principales

### Bloque B - Herramientas (Q5-Q9)
- Herramientas de comunicación
- Herramientas internas
- Dónde está la "verdad" del cliente
- Nivel de integración
- Uso actual de IA

### Bloque C - Procesos clave (Q10-Q13)
- Áreas problemáticas
- Descripción del proceso
- Tareas repetitivas
- Responsable del proceso

### Bloque D - Dolor y prioridad (Q14-Q17)
- Horas consumidas
- Problemas generados
- Prioridad
- "Deseo mágico"

### Bloque E - Madurez digital (Q18-Q20)
- Nivel de organización
- Disposición al cambio
- Presupuesto aproximado

### Bloque F - Contacto (Q21-Q23)
- Datos de contacto
- Preferencia de contacto
- Consentimiento para seguimiento

## 🎨 Personalización del Chat

### Modificar preguntas

Editar `js/diagnostic-chat.js`, método `loadQuestions()`:

```javascript
{
    id: 'nueva_pregunta',
    type: 'single_choice', // o 'multi_choice', 'long_text', 'scale_1_5', etc.
    text: '¿Tu pregunta aquí?',
    options: [
        { value: 'opcion1', label: 'Opción 1' },
        { value: 'opcion2', label: 'Opción 2' }
    ]
}
```

### Tipos de pregunta disponibles:

- `message`: Solo mensaje informativo
- `single_choice`: Una sola opción
- `single_choice_with_other`: Una opción + campo "Otro"
- `multi_choice`: Múltiples opciones
- `multi_choice_max`: Múltiples con límite
- `scale_1_5`: Escala del 1 al 5
- `short_text`: Campo de texto corto
- `long_text`: Textarea
- `contact_form`: Formulario de contacto completo

### Personalizar estilos

Editar `css/diagnostic-chat.css`:

```css
/* Cambiar colores del chat */
.bot-message .message-content {
    background: linear-gradient(135deg, rgba(TU_COLOR, 0.1), rgba(TU_COLOR, 0.1));
    border: 1px solid rgba(TU_COLOR, 0.2);
}

/* Cambiar velocidad de escritura */
.typing-text {
    animation-duration: 30ms; /* Más rápido = menos ms */
}
```

## 📊 Ejemplo de Payload

```json
{
  "diagnostic_id": "diag_1732012345_abc123",
  "timestamp": "2025-11-18T15:30:00Z",
  "answers": {
    "role": "owner",
    "sector": "ecommerce",
    "company_size": "4_10",
    "main_channels": ["online_store", "whatsapp"],
    "pain_areas": ["support", "admin_finance"],
    "key_process_description": "Cuando entra un pedido tenemos que copiar...",
    "magic_wish": "Que todo el tema de facturas se haga solo",
    "contact_data": {
      "name": "María González",
      "company": "Tienda Online S.L.",
      "email": "maria@tienda.com",
      "phone": "+34123456789"
    },
    "allow_human_followup": "yes"
  }
}
```

## 🧪 Testing

### Test local del chat

1. Abrir `diagnostico-gratuito.html` en el navegador
2. Click en "Empezar diagnóstico ahora"
3. Responder las preguntas
4. Ver payload en Console (F12)

### Test del webhook n8n

```bash
curl -X POST https://TU-N8N.com/webhook/diagnostic \
  -H "Content-Type: application/json" \
  -d @test-payload.json
```

## 🔧 Troubleshooting

### El chat no aparece
- Verificar que `diagnostic-chat.js` y `diagnostic-chat.css` estén cargados
- Abrir Console (F12) y buscar errores

### No se envía el diagnóstico
- Verificar URL del webhook en `diagnostico-gratuito.html`
- Comprobar CORS en n8n (permitir origen)
- Ver Network tab en DevTools

### La IA no responde bien
- Verificar que el System Prompt esté completo
- Asegurar que `response_format` sea `json_object`
- Aumentar `max_tokens` si la respuesta se corta

## 📚 Archivos de Referencia

- **Preguntas completas**: Ver `n8n-diagnostic-config.json`
- **Prompt de IA**: Ver `system_prompt` en config
- **Estructura workflow**: Ver `n8n_workflow_structure` en config

## 🚀 Próximos Pasos

1. ✅ Configurar URL del webhook n8n
2. ✅ Crear workflow en n8n siguiendo los pasos
3. ✅ Conectar cuenta de Gmail/SendGrid
4. ✅ Probar con un diagnóstico real
5. ✅ Configurar Google Sheets para CRM
6. ⚡ (Opcional) Añadir notificaciones Slack/WhatsApp

## 💡 Tips

- **Personalización rápida**: Solo necesitas cambiar colores en el CSS y la URL del webhook
- **Sin base de datos**: Todo se envía a n8n, que se encarga del resto
- **Escalable**: El mismo sistema puede procesar cientos de diagnósticos al día
- **Costo**: ~$0.10-0.20 por diagnóstico con GPT-4 (dependiendo de longitud de respuestas)

---

**¿Necesitas ayuda?** Revisa el archivo `n8n-diagnostic-config.json` para más detalles técnicos.
