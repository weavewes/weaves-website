/**
 * Sistema de Diagnóstico Tipo Typeform - Weaves
 * Una pregunta a la vez, pantalla completa, navegación fluida
 */

class DiagnosticChat {
    constructor(config) {
        this.config = config;
        this.currentStep = 0;
        this.answers = {};
        this.n8nWebhookUrl = config.webhookUrl || '/api/diagnostic';
        
        this.questions = this.loadQuestions();
    }

    loadQuestions() {
        return [
            // Bloque A - Contexto básico
            {
                id: 'welcome',
                type: 'message',
                text: '¡Hola! 👋 Soy el asistente de diagnóstico de Weaves.\n\nVoy a hacerte algunas preguntas para entender cómo funciona tu negocio y dónde podríamos ayudarte con automatización inteligente.\n\nNo te preocupes, esto no es un formulario aburrido. Es una conversación. Y puedes tomarte el tiempo que necesites.'
            },
            {
                id: 'role',
                type: 'single_choice',
                text: '¿Cuál es tu rol en la empresa?',
                options: [
                    { label: 'Fundador/a o CEO', value: 'founder' },
                    { label: 'Director/a o Gerente', value: 'director' },
                    { label: 'Responsable de área', value: 'manager' },
                    { label: 'Autónomo/a o freelance', value: 'freelancer' },
                    { label: 'Otro', value: 'other' }
                ],
                otherField: 'role_other'
            },
            {
                id: 'sector',
                type: 'single_choice_with_other',
                text: '¿En qué sector opera tu negocio?',
                options: [
                    { label: 'E-commerce / Retail', value: 'ecommerce' },
                    { label: 'Servicios profesionales', value: 'professional_services' },
                    { label: 'Salud y bienestar', value: 'health' },
                    { label: 'Educación y formación', value: 'education' },
                    { label: 'Restauración y turismo', value: 'hospitality' },
                    { label: 'Tecnología / Startup', value: 'tech' },
                    { label: 'Otro', value: 'other' }
                ],
                otherField: 'sector_other'
            },
            {
                id: 'company_size',
                type: 'single_choice',
                text: '¿Cuántas personas trabajan en tu empresa?',
                options: [
                    { label: 'Solo yo', value: 'solo' },
                    { label: '2-5 personas', value: '2-5' },
                    { label: '6-20 personas', value: '6-20' },
                    { label: '21-50 personas', value: '21-50' },
                    { label: 'Más de 50', value: '50+' }
                ]
            },
            {
                id: 'main_channels',
                type: 'multi_choice',
                text: '¿Qué canales usas principalmente para relacionarte con tus clientes?',
                maxSelections: 3,
                options: [
                    { label: 'WhatsApp', value: 'whatsapp' },
                    { label: 'Email', value: 'email' },
                    { label: 'Instagram / Redes sociales', value: 'social_media' },
                    { label: 'Teléfono / Llamadas', value: 'phone' },
                    { label: 'Web / Chat online', value: 'web_chat' },
                    { label: 'Presencial', value: 'in_person' }
                ]
            },

            // Bloque B - Herramientas y tecnología actual
            {
                id: 'block_b_intro',
                type: 'message',
                text: 'Genial. Ahora me gustaría saber qué herramientas ya estás usando.'
            },
            {
                id: 'communication_tools',
                type: 'multi_choice_with_other',
                text: '¿Qué herramientas de comunicación utilizas con tu equipo o clientes?',
                options: [
                    { label: 'WhatsApp Business', value: 'whatsapp_business' },
                    { label: 'Gmail / Outlook', value: 'email' },
                    { label: 'Slack / Teams', value: 'slack_teams' },
                    { label: 'Telegram', value: 'telegram' },
                    { label: 'Zoom / Meet', value: 'video_calls' },
                    { label: 'Ninguna herramienta formal', value: 'none' },
                    { label: 'Otra', value: 'other' }
                ],
                otherField: 'communication_tools_other'
            },
            {
                id: 'internal_tools',
                type: 'multi_choice_with_other',
                text: '¿Qué herramientas usas para gestionar tu negocio internamente?',
                options: [
                    { label: 'Google Sheets / Excel', value: 'spreadsheets' },
                    { label: 'CRM (HubSpot, Pipedrive, etc.)', value: 'crm' },
                    { label: 'ERP o software de gestión', value: 'erp' },
                    { label: 'Notion / Trello / Asana', value: 'project_management' },
                    { label: 'WordPress / Shopify / WooCommerce', value: 'cms_ecommerce' },
                    { label: 'Software propio o custom', value: 'custom' },
                    { label: 'No uso herramientas digitales', value: 'none' },
                    { label: 'Otra', value: 'other' }
                ],
                otherField: 'internal_tools_other'
            },
            {
                id: 'data_source',
                type: 'single_choice',
                text: '¿Dónde vive la información más importante de tu negocio?',
                options: [
                    { label: 'En hojas de cálculo (Excel, Sheets)', value: 'spreadsheets' },
                    { label: 'En un CRM o sistema de gestión', value: 'crm' },
                    { label: 'En emails y conversaciones', value: 'emails' },
                    { label: 'En papel o notas físicas', value: 'paper' },
                    { label: 'Dispersa en varios sitios', value: 'scattered' },
                    { label: 'No tengo claro dónde', value: 'unclear' }
                ]
            },
            {
                id: 'integration_level',
                type: 'scale_1_5',
                text: '¿Qué tan conectadas están tus herramientas entre sí?',
                min: 1,
                max: 5,
                labels: ['Nada conectadas', 'Poco', 'Algo conectadas', 'Bastante', 'Totalmente integradas']
            },
            {
                id: 'ai_usage',
                type: 'single_choice',
                text: '¿Usas actualmente alguna herramienta de IA en tu negocio?',
                options: [
                    { label: 'Sí, regularmente (ChatGPT, Copilot, etc.)', value: 'yes_regularly' },
                    { label: 'A veces, para tareas puntuales', value: 'occasionally' },
                    { label: 'Lo he probado pero no lo uso', value: 'tried_not_using' },
                    { label: 'No, todavía no', value: 'no' },
                    { label: 'No sé qué es o cómo usarla', value: 'dont_know' }
                ]
            },

            // Bloque C - Problemas y procesos manuales
            {
                id: 'block_c_intro',
                type: 'message',
                text: 'Perfecto. Ahora vamos a hablar de lo que no funciona o te consume tiempo.'
            },
            {
                id: 'pain_areas',
                type: 'multi_choice_max',
                text: '¿En cuál de estas áreas sientes que pierdes más tiempo o cometes más errores?',
                maxSelections: 3,
                options: [
                    { label: 'Atención al cliente (responder mensajes, dudas)', value: 'customer_service' },
                    { label: 'Gestión de pedidos o reservas', value: 'orders_bookings' },
                    { label: 'Facturación y cobros', value: 'invoicing' },
                    { label: 'Marketing (redes sociales, email, campañas)', value: 'marketing' },
                    { label: 'Gestión interna (reportes, seguimiento)', value: 'internal_management' },
                    { label: 'Búsqueda o entrada de información', value: 'data_entry' },
                    { label: 'Coordinación con el equipo', value: 'team_coordination' },
                    { label: 'Captación de leads o ventas', value: 'sales' }
                ]
            },
            {
                id: 'manual_process',
                type: 'long_text',
                text: 'Descríbeme un proceso que haces a mano y que te gustaría automatizar',
                placeholder: 'Ej: Cada vez que me llega un pedido por WhatsApp tengo que copiarlo a una hoja de cálculo, buscar el stock, responder al cliente, crear la factura...',
                minLength: 50
            },
            {
                id: 'repetitive_tasks',
                type: 'short_text',
                text: '¿Qué tarea repetitiva te gustaría que desapareciera mágicamente?',
                placeholder: 'Ej: Responder siempre las mismas preguntas en Instagram'
            },
            {
                id: 'process_owner',
                type: 'single_choice',
                text: '¿Quién hace mayoritariamente ese trabajo repetitivo?',
                options: [
                    { label: 'Yo mismo/a', value: 'me' },
                    { label: 'Mi equipo', value: 'team' },
                    { label: 'Todos un poco', value: 'everyone' },
                    { label: 'Lo externalizamos', value: 'outsourced' }
                ]
            },

            // Bloque D - Impacto y prioridades
            {
                id: 'hours_wasted',
                type: 'single_choice',
                text: '¿Cuántas horas a la semana crees que pierdes en tareas manuales que podrían automatizarse?',
                options: [
                    { label: 'Menos de 5 horas', value: '<5' },
                    { label: 'Entre 5 y 10 horas', value: '5-10' },
                    { label: 'Entre 10 y 20 horas', value: '10-20' },
                    { label: 'Más de 20 horas', value: '20+' },
                    { label: 'No tengo ni idea', value: 'no_idea' }
                ]
            },
            {
                id: 'biggest_problem',
                type: 'single_choice',
                text: 'Si tuvieras que elegir, ¿cuál es tu mayor problema ahora mismo?',
                options: [
                    { label: 'No tengo tiempo para todo', value: 'no_time' },
                    { label: 'Cometo errores o se me pierden cosas', value: 'errors' },
                    { label: 'No puedo escalar el negocio', value: 'cant_scale' },
                    { label: 'Mi equipo está saturado', value: 'team_overload' },
                    { label: 'Pierdo clientes por lentitud', value: 'slow_response' },
                    { label: 'No tengo visibilidad de lo que pasa', value: 'no_visibility' }
                ]
            },
            {
                id: 'priority',
                type: 'scale_1_5',
                text: '¿Qué tan urgente es para ti resolver esto?',
                min: 1,
                max: 5,
                labels: ['Puede esperar', 'No urgente', 'Moderado', 'Bastante urgente', 'Urgente ya']
            },
            {
                id: 'magic_wish',
                type: 'long_text',
                text: 'Si tuvieras una varita mágica, ¿qué cambiarías en tu forma de trabajar?',
                placeholder: 'Cuéntame tu situación ideal...',
                minLength: 30
            },

            // Bloque E - Contexto organizacional
            {
                id: 'organization_level',
                type: 'scale_1_5',
                text: '¿Cómo de organizado dirías que está tu negocio ahora?',
                min: 1,
                max: 5,
                labels: ['Caos total', 'Bastante caótico', 'Regular', 'Bastante organizado', 'Muy organizado']
            },
            {
                id: 'change_willingness',
                type: 'single_choice',
                text: '¿Cómo de abierto/a estás a cambiar tu forma de trabajar?',
                options: [
                    { label: 'Muy abierto, necesito cambios ya', value: 'very_open' },
                    { label: 'Abierto, si tiene sentido', value: 'open' },
                    { label: 'Depende de cuánto esfuerzo requiera', value: 'depends' },
                    { label: 'Prefiero cambios pequeños y graduales', value: 'gradual' },
                    { label: 'Me cuesta cambiar lo que ya funciona', value: 'reluctant' }
                ]
            },
            {
                id: 'budget',
                type: 'single_choice',
                text: 'En términos generales, ¿qué rango de inversión mensual estarías dispuesto/a a considerar para automatización?',
                options: [
                    { label: 'Menos de 200€/mes', value: '<200' },
                    { label: 'Entre 200€ y 500€/mes', value: '200-500' },
                    { label: 'Entre 500€ y 1.000€/mes', value: '500-1000' },
                    { label: 'Más de 1.000€/mes', value: '1000+' },
                    { label: 'Depende del retorno que me aseguren', value: 'depends_roi' },
                    { label: 'Prefiero no hablar de presupuesto aún', value: 'not_now' }
                ]
            },

            // Bloque F - Datos de contacto
            {
                id: 'final_message',
                type: 'message',
                text: '¡Casi terminamos! Solo necesito tus datos para enviarte el diagnóstico personalizado.'
            },
            {
                id: 'contact_info',
                type: 'contact_form',
                text: 'Déjame tus datos de contacto',
                fields: [
                    { id: 'name', label: 'Nombre completo', type: 'text', required: true },
                    { id: 'email', label: 'Email', type: 'email', required: true },
                    { id: 'phone', label: 'Teléfono (opcional)', type: 'tel', required: false },
                    { id: 'company', label: 'Nombre de la empresa', type: 'text', required: true }
                ]
            },
            {
                id: 'preferred_contact',
                type: 'single_choice',
                text: '¿Cómo prefieres que te contactemos?',
                options: [
                    { label: 'Email', value: 'email' },
                    { label: 'WhatsApp', value: 'whatsapp' },
                    { label: 'Llamada telefónica', value: 'phone' },
                    { label: 'Como prefiráis', value: 'any' }
                ]
            },
            {
                id: 'follow_up_consent',
                type: 'single_choice',
                text: '¿Podemos hacer seguimiento de tu caso aunque no terminemos trabajando juntos?',
                options: [
                    { label: 'Sí, me interesa recibir consejos y actualizaciones', value: 'yes' },
                    { label: 'Solo si vamos a trabajar juntos', value: 'only_if_work' },
                    { label: 'Prefiero que no', value: 'no' }
                ]
            }
        ];
    }

    async start(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error('Container not found:', containerId);
            return;
        }

        this.render();
        await this.showCurrentQuestion();
    }

    render() {
        this.container.innerHTML = `
            <div class="diagnostic-progress">
                <div class="diagnostic-progress-bar" id="progress-bar"></div>
            </div>
            <div class="question-container" id="question-container"></div>
            <div class="navigation-area">
                <button class="btn-nav" id="btn-back" style="visibility: hidden;">
                    <span>←</span>
                    <span>Atrás</span>
                </button>
                <button class="btn-continue" id="btn-next" style="display: none;">
                    <span>Continuar</span>
                    <span>→</span>
                </button>
            </div>
        `;
    }

    async showCurrentQuestion() {
        if (this.currentStep >= this.questions.length) {
            await this.submitDiagnostic();
            return;
        }

        const question = this.questions[this.currentStep];
        const container = document.getElementById('question-container');
        const progress = (this.currentStep / this.questions.length) * 100;
        document.getElementById('progress-bar').style.width = `${progress}%`;

        // Update back button visibility
        const btnBack = document.getElementById('btn-back');
        if (this.currentStep > 0) {
            btnBack.style.visibility = 'visible';
            btnBack.onclick = () => this.goBack();
        } else {
            btnBack.style.visibility = 'hidden';
        }

        // Fade out
        container.style.opacity = '0';
        await this.sleep(200);

        // Scroll to top
        container.scrollTop = 0;

        // Render question
        container.innerHTML = this.renderQuestion(question);

        // Fade in
        await this.sleep(50);
        container.style.opacity = '1';

        // Setup interactions
        this.setupQuestionInteractions(question);
    }

    renderQuestion(question) {
        const questionNum = this.questions.filter(q => q.type !== 'message').indexOf(question) + 1;
        const totalQuestions = this.questions.filter(q => q.type !== 'message').length;

        let html = `
            <div class="question-content">
                ${question.type !== 'message' ? `
                    <div class="question-number">
                        <span class="arrow">→</span>
                        <span>${questionNum} de ${totalQuestions}</span>
                    </div>
                ` : ''}
                <h2 class="question-text">${this.formatText(question.text)}</h2>
                <div class="input-area">
        `;

        switch (question.type) {
            case 'message':
                html += `
                    <button class="typeform-option" id="start-button" style="margin-top: 2rem; max-width: 400px;">
                        <span>✨</span>
                        <span>Listo, ¡empecemos!</span>
                    </button>
                `;
                break;
            case 'single_choice':
            case 'single_choice_with_other':
                html += this.renderSingleChoice(question);
                break;
            case 'multi_choice':
            case 'multi_choice_with_other':
            case 'multi_choice_max':
                html += this.renderMultiChoice(question);
                break;
            case 'scale_1_5':
                html += this.renderScale(question);
                break;
            case 'short_text':
            case 'long_text':
                html += this.renderTextInput(question);
                break;
            case 'contact_form':
                html += this.renderContactForm(question);
                break;
        }

        html += `
                </div>
                ${this.renderInstructions(question)}
            </div>
        `;

        return html;
    }

    formatText(text) {
        return text.replace(/\n/g, '<br>');
    }

    renderSingleChoice(question) {
        let html = '<div class="typeform-options">';
        question.options.forEach((opt, index) => {
            const key = String.fromCharCode(65 + index); // A, B, C...
            html += `
                <button class="typeform-option" data-value="${opt.value}" data-key="${key}">
                    <span class="option-key">${key}</span>
                    <span>${opt.label}</span>
                </button>
            `;
        });
        html += '</div>';
        return html;
    }

    renderMultiChoice(question) {
        const maxSelections = question.maxSelections || null;
        let html = `<div class="typeform-multi-options">`;
        
        question.options.forEach((opt, index) => {
            const key = String.fromCharCode(65 + index);
            html += `
                <div class="typeform-checkbox" data-value="${opt.value}">
                    <input type="checkbox" id="opt-${index}" value="${opt.value}">
                    <span class="option-key">${key}</span>
                    <label for="opt-${index}">${opt.label}</label>
                </div>
            `;
        });
        
        html += '</div>';
        if (maxSelections) {
            html += `<p class="instructions">Selecciona máximo ${maxSelections} opciones</p>`;
        }
        
        return html;
    }

    renderScale(question) {
        let html = '<div class="typeform-scale">';
        for (let i = question.min; i <= question.max; i++) {
            const label = question.labels ? question.labels[i - question.min] : i;
            html += `
                <button class="scale-option" data-value="${i}" data-key="${i}">
                    <span class="scale-number">${i}</span>
                    <span class="scale-label">${label}</span>
                </button>
            `;
        }
        html += '</div>';
        return html;
    }

    renderTextInput(question) {
        const isLong = question.type === 'long_text';
        return `
            <div class="typeform-text-input">
                ${isLong ? 
                    `<textarea id="text-input" placeholder="${question.placeholder || 'Escribe aquí...'}" rows="6" autofocus></textarea>` :
                    `<input type="text" id="text-input" placeholder="${question.placeholder || 'Escribe aquí...'}" autofocus>`
                }
                ${question.minLength ? `<div class="char-counter"><span id="char-count">0</span>/${question.minLength} caracteres mínimo</div>` : ''}
            </div>
        `;
    }

    renderContactForm(question) {
        let html = '<div class="typeform-contact-fields">';
        question.fields.forEach(field => {
            html += `
                <div class="typeform-field">
                    <label for="contact-${field.id}">${field.label}${field.required ? ' *' : ''}</label>
                    <input 
                        type="${field.type}" 
                        id="contact-${field.id}" 
                        ${field.required ? 'required' : ''}
                        ${field.id === 'name' ? 'autofocus' : ''}>
                </div>
            `;
        });
        html += '</div>';
        return html;
    }

    renderInstructions(question) {
        if (question.type === 'message') return '';
        
        let instructions = '';
        if (question.type.includes('choice')) {
            instructions = 'Presiona <kbd>Enter</kbd> o haz click para seleccionar';
        } else if (question.type.includes('text')) {
            instructions = 'Presiona <kbd>Enter</kbd> para continuar';
        }
        
        return instructions ? `<div class="instructions">${instructions}</div>` : '';
    }

    setupQuestionInteractions(question) {
        const btnNext = document.getElementById('btn-next');
        
        // Handle message type with start button
        if (question.type === 'message') {
            const startBtn = document.getElementById('start-button');
            if (startBtn) {
                startBtn.addEventListener('click', () => {
                    this.nextQuestion();
                });
            }
            return;
        }
        
        switch (question.type) {
            case 'single_choice':
            case 'single_choice_with_other':
                this.setupSingleChoice(question, btnNext);
                break;
            case 'multi_choice':
            case 'multi_choice_with_other':
            case 'multi_choice_max':
                this.setupMultiChoice(question, btnNext);
                break;
            case 'scale_1_5':
                this.setupScale(question, btnNext);
                break;
            case 'short_text':
            case 'long_text':
                this.setupTextInput(question, btnNext);
                break;
            case 'contact_form':
                this.setupContactForm(question, btnNext);
                break;
        }
    }

    setupSingleChoice(question, btnNext) {
        const options = document.querySelectorAll('.typeform-option');
        
        options.forEach((opt, index) => {
            const key = String.fromCharCode(65 + index);
            
            opt.addEventListener('click', async () => {
                const value = opt.getAttribute('data-value');
                
                if (value === 'other' && question.otherField) {
                    this.showOtherInput(question);
                } else {
                    await this.saveAnswer(question.id, value);
                    await this.sleep(300);
                    this.nextQuestion();
                }
            });

            // Keyboard shortcuts
            document.addEventListener('keydown', (e) => {
                // Ignorar si está escribiendo en un input/textarea
                if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
                
                if (e.key.toUpperCase() === key && !e.ctrlKey && !e.metaKey) {
                    opt.click();
                }
            });
        });
    }

    setupMultiChoice(question, btnNext) {
        const checkboxes = document.querySelectorAll('.typeform-checkbox');
        const maxSelections = question.maxSelections || null;
        
        btnNext.style.display = 'flex';
        btnNext.disabled = true;

        const updateButton = () => {
            const checked = document.querySelectorAll('.typeform-checkbox input:checked');
            btnNext.disabled = checked.length === 0;
            
            // Limit selections
            if (maxSelections && checked.length >= maxSelections) {
                document.querySelectorAll('.typeform-checkbox input:not(:checked)').forEach(cb => {
                    cb.disabled = true;
                    cb.parentElement.style.opacity = '0.5';
                });
            } else {
                document.querySelectorAll('.typeform-checkbox input').forEach(cb => {
                    cb.disabled = false;
                    cb.parentElement.style.opacity = '1';
                });
            }
        };

        checkboxes.forEach((box, index) => {
            const checkbox = box.querySelector('input[type="checkbox"]');
            const key = String.fromCharCode(65 + index);
            
            box.addEventListener('click', (e) => {
                if (e.target !== checkbox) {
                    checkbox.checked = !checkbox.checked;
                }
                box.classList.toggle('selected', checkbox.checked);
                updateButton();
            });

            // Keyboard shortcuts
            document.addEventListener('keydown', (e) => {
                // Ignorar si está escribiendo en un input/textarea
                if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
                
                if (e.key.toUpperCase() === key && !e.ctrlKey && !e.metaKey) {
                    checkbox.checked = !checkbox.checked;
                    box.classList.toggle('selected', checkbox.checked);
                    updateButton();
                }
            });
        });

        btnNext.onclick = async () => {
            const checked = Array.from(document.querySelectorAll('.typeform-checkbox input:checked'));
            const values = checked.map(cb => cb.value);
            
            if (values.includes('other') && question.otherField) {
                this.showOtherInput(question, values);
            } else {
                await this.saveAnswer(question.id, values);
                await this.sleep(200);
                this.nextQuestion();
            }
        };
    }

    setupScale(question, btnNext) {
        const options = document.querySelectorAll('.scale-option');
        
        options.forEach((opt, index) => {
            opt.addEventListener('click', async () => {
                const value = parseInt(opt.getAttribute('data-value'));
                await this.saveAnswer(question.id, value);
                await this.sleep(300);
                this.nextQuestion();
            });

            // Keyboard shortcuts (1-5)
            const key = (index + 1).toString();
            document.addEventListener('keydown', (e) => {
                // Ignorar si está escribiendo en un input/textarea
                if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
                
                if (e.key === key && !e.ctrlKey && !e.metaKey) {
                    opt.click();
                }
            });
        });
    }

    setupTextInput(question, btnNext) {
        const input = document.getElementById('text-input');
        const counter = document.getElementById('char-count');
        btnNext.style.display = 'flex';
        btnNext.disabled = true;

        const updateButton = () => {
            const value = input.value.trim();
            const isValid = !question.minLength || value.length >= question.minLength;
            btnNext.disabled = !isValid || value.length === 0;
            
            if (counter) {
                counter.textContent = value.length;
                counter.style.color = isValid ? 'var(--success-color)' : 'var(--text-muted)';
            }
        };

        input.addEventListener('input', updateButton);
        
        input.addEventListener('keydown', async (e) => {
            if (e.key === 'Enter' && !e.shiftKey && question.type !== 'long_text') {
                e.preventDefault();
                if (!btnNext.disabled) {
                    await this.saveAnswer(question.id, input.value.trim());
                    await this.sleep(200);
                    this.nextQuestion();
                }
            }
        });

        btnNext.onclick = async () => {
            const value = input.value.trim();
            await this.saveAnswer(question.id, value);
            await this.sleep(200);
            this.nextQuestion();
        };
    }

    setupContactForm(question, btnNext) {
        const inputs = document.querySelectorAll('.typeform-field input');
        btnNext.style.display = 'flex';
        btnNext.disabled = true;

        const updateButton = () => {
            const allValid = Array.from(inputs).every(input => {
                if (input.required) {
                    return input.value.trim().length > 0;
                }
                return true;
            });
            btnNext.disabled = !allValid;
        };

        inputs.forEach(input => {
            input.addEventListener('input', updateButton);
        });

        btnNext.onclick = async () => {
            const contactData = {};
            question.fields.forEach(field => {
                const input = document.getElementById(`contact-${field.id}`);
                contactData[field.id] = input.value.trim();
            });
            
            await this.saveAnswer(question.id, contactData);
            await this.sleep(200);
            this.nextQuestion();
        };
    }

    showOtherInput(question, previousValues = null) {
        const container = document.getElementById('question-container');
        container.innerHTML = `
            <div class="question-content">
                <div class="question-number">
                    <span class="arrow">→</span>
                    <span>Especifica</span>
                </div>
                <h2 class="question-text">¿Podrías especificar?</h2>
                <div class="input-area">
                    <div class="typeform-text-input">
                        <input type="text" id="other-input" placeholder="Escribe aquí..." autofocus>
                    </div>
                </div>
            </div>
        `;

        const input = document.getElementById('other-input');
        const btnNext = document.getElementById('btn-next');
        btnNext.style.display = 'flex';
        btnNext.disabled = true;

        input.addEventListener('input', () => {
            btnNext.disabled = input.value.trim().length === 0;
        });

        input.addEventListener('keydown', async (e) => {
            if (e.key === 'Enter' && !btnNext.disabled) {
                const otherValue = input.value.trim();
                if (question.otherField) {
                    this.answers[question.otherField] = otherValue;
                }
                await this.saveAnswer(question.id, previousValues || 'other');
                await this.sleep(200);
                this.nextQuestion();
            }
        });

        btnNext.onclick = async () => {
            const otherValue = input.value.trim();
            if (question.otherField) {
                this.answers[question.otherField] = otherValue;
            }
            await this.saveAnswer(question.id, previousValues || 'other');
            await this.sleep(200);
            this.nextQuestion();
        };

        input.focus();
    }

    async saveAnswer(questionId, value) {
        this.answers[questionId] = value;
    }

    async nextQuestion() {
        this.currentStep++;
        await this.showCurrentQuestion();
    }

    async goBack() {
        if (this.currentStep > 0) {
            this.currentStep--;
            
            // Skip message-only questions when going back
            while (this.currentStep > 0 && this.questions[this.currentStep].type === 'message') {
                this.currentStep--;
            }
            
            await this.showCurrentQuestion();
        }
    }

    async submitDiagnostic() {
        const container = document.getElementById('question-container');
        document.getElementById('progress-bar').style.width = '100%';
        document.querySelector('.navigation-area').style.display = 'none';

        container.innerHTML = `
            <div class="question-content">
                <div class="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <h2 class="question-text" style="text-align: center;">Analizando tu información...</h2>
            </div>
        `;

        const payload = {
            diagnostic_id: this.generateId(),
            timestamp: new Date().toISOString(),
            answers: this.answers
        };

        try {
            const response = await fetch(this.n8nWebhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('Error al enviar el diagnóstico');
            }

            await this.sleep(1500);

            container.innerHTML = `
                <div class="success-message">
                    <div class="icon">✨</div>
                    <h2>¡Diagnóstico completado!</h2>
                    <p>Gracias por tu tiempo. Hemos recibido tu información y nuestra IA está generando tu diagnóstico personalizado.</p>
                    <p style="margin-top: 1.5rem;">En unos minutos recibirás un email con:</p>
                    <ul style="text-align: left; display: inline-block; margin-top: 1rem;">
                        <li>Tu diagnóstico completo</li>
                        <li>Áreas prioritarias de automatización</li>
                        <li>Recomendaciones específicas</li>
                    </ul>
                    <p style="margin-top: 2rem; color: var(--primary-color); font-weight: 600;">Un experto de nuestro equipo revisará tu caso y te contactará pronto. 🚀</p>
                </div>
            `;

        } catch (error) {
            console.error('Error:', error);
            container.innerHTML = `
                <div class="success-message">
                    <div class="icon">⚠️</div>
                    <h2>Error al enviar</h2>
                    <p>Hubo un problema al enviar tu diagnóstico. Por favor, inténtalo de nuevo o contáctanos directamente.</p>
                    <button class="btn-continue" onclick="location.reload()" style="margin-top: 2rem;">Reintentar</button>
                </div>
            `;
        }
    }

    generateId() {
        return 'diag_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Exportar para uso global
window.DiagnosticChat = DiagnosticChat;
