// ===================================
// Solicitud cliente → Webhook (n8n / Make / etc.)
// ===================================

(function () {
    var form = document.getElementById('clientRequestForm');
    if (!form) return;

    var requestTypeSelect = document.getElementById('request_type');
    var errorOnlyBlock = document.getElementById('error-only-fields');
    var submitBtn = form.querySelector('button[type="submit"]');

    var feedbackModal = document.getElementById('clientRequestFeedbackModal');
    var feedbackTitle = document.getElementById('modalFeedbackTitle');
    var feedbackBody = document.getElementById('modalFeedbackBody');
    var feedbackBtn = document.getElementById('modalFeedbackClose');
    var feedbackBackdrop = document.getElementById('modalFeedbackBackdrop');
    var iconSuccess = document.getElementById('modalFeedbackIconSuccess');
    var iconError = document.getElementById('modalFeedbackIconError');

    var MAX_FILES = 5;
    var MAX_FILE_BYTES = 10 * 1024 * 1024;
    var lastFocusBeforeModal = null;

    function getWebhookUrl() {
        if (typeof window.CLIENT_REQUEST_WEBHOOK_URL === 'string' && window.CLIENT_REQUEST_WEBHOOK_URL.trim()) {
            return window.CLIENT_REQUEST_WEBHOOK_URL.trim();
        }
        var fromData = form.getAttribute('data-webhook-url');
        return fromData && fromData.trim() ? fromData.trim() : '';
    }

    function toggleErrorFields() {
        if (!requestTypeSelect || !errorOnlyBlock) return;
        errorOnlyBlock.hidden = requestTypeSelect.value !== 'error';
    }

    if (requestTypeSelect) {
        requestTypeSelect.addEventListener('change', toggleErrorFields);
        toggleErrorFields();
    }

    function closeFeedbackModal() {
        if (!feedbackModal || feedbackModal.hidden) return;
        feedbackModal.hidden = true;
        document.body.classList.remove('modal-feedback-open');
        if (lastFocusBeforeModal && typeof lastFocusBeforeModal.focus === 'function') {
            try {
                lastFocusBeforeModal.focus();
            } catch (e) { /* ignore */ }
        }
        lastFocusBeforeModal = null;
    }

    function openFeedbackModal(title, body, isError) {
        if (!feedbackModal || !feedbackTitle || !feedbackBody) {
            window.alert(body);
            return;
        }
        lastFocusBeforeModal = document.activeElement;
        feedbackTitle.textContent = title;
        feedbackBody.textContent = body;
        if (iconSuccess) iconSuccess.hidden = !!isError;
        if (iconError) iconError.hidden = !isError;
        feedbackModal.hidden = false;
        document.body.classList.add('modal-feedback-open');
        if (feedbackBtn) {
            setTimeout(function () {
                feedbackBtn.focus();
            }, 10);
        }
    }

    if (feedbackBtn) {
        feedbackBtn.addEventListener('click', closeFeedbackModal);
    }
    if (feedbackBackdrop) {
        feedbackBackdrop.addEventListener('click', closeFeedbackModal);
    }
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && feedbackModal && !feedbackModal.hidden) {
            e.preventDefault();
            closeFeedbackModal();
        }
    });

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        var webhookUrl = getWebhookUrl();
        if (!webhookUrl) {
            openFeedbackModal(
                'Configuración incompleta',
                'Falta configurar la URL del webhook. Avísanos si ves este mensaje.',
                true
            );
            return;
        }

        var fileInput = form.querySelector('input[type="file"]');
        var files = fileInput && fileInput.files ? Array.from(fileInput.files) : [];
        if (files.length > MAX_FILES) {
            openFeedbackModal(
                'Demasiados archivos',
                'Solo puedes adjuntar un máximo de ' + MAX_FILES + ' archivos. Reduce el número e inténtalo de nuevo.',
                true
            );
            return;
        }
        for (var i = 0; i < files.length; i++) {
            if (files[i].size > MAX_FILE_BYTES) {
                openFeedbackModal(
                    'Archivo demasiado grande',
                    'Cada archivo debe pesar menos de 10 MB. El archivo «' + files[i].name + '» supera ese límite.',
                    true
                );
                return;
            }
        }

        var nombreProyecto = ((form.querySelector('[name="nombre_proyecto"]') || {}).value || '').trim();
        var teableId = ((form.querySelector('[name="teable_proyecto_id"]') || {}).value || '').trim();
        var origen = ((form.querySelector('[name="proyecto_teable_origen"]') || {}).value || '').trim();

        if (!nombreProyecto) {
            openFeedbackModal(
                'Falta el proyecto',
                'Selecciona un proyecto de la lista o escribe uno válido antes de enviar.',
                true
            );
            return;
        }

        var titleVal = (form.querySelector('[name="title"]') || {}).value || '';
        var descriptionVal = (form.querySelector('[name="description"]') || {}).value || '';
        var urgencyVal = (form.querySelector('[name="urgency"]') || {}).value || 'normal';

        var originalText = submitBtn ? submitBtn.textContent : '';
        if (submitBtn) {
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
        }

        try {
            var fd = new FormData();
            fd.append('company_name', (form.querySelector('[name="company_name"]') || {}).value || '');
            fd.append('nombre_proyecto', nombreProyecto);
            fd.append('teable_proyecto_id', teableId);
            fd.append('proyecto_teable_origen', origen);
            fd.append('request_type', (form.querySelector('[name="request_type"]') || {}).value || '');
            fd.append('title', titleVal);
            fd.append('description', descriptionVal);
            fd.append('urgency', urgencyVal);
            fd.append('fecha_entrega', ((form.querySelector('[name="fecha_entrega"]') || {}).value || '').trim());

            var errSince = form.querySelector('[name="error_since"]');
            if (errSince && !errorOnlyBlock.hidden) {
                fd.append('error_since', errSince.value || '');
            }

            var now = new Date();
            fd.append('submitted_at_iso', now.toISOString());
            fd.append('submitted_at_local', now.toString());
            fd.append('form_page_url', window.location.href);
            fd.append('referrer_url', document.referrer || '');

            files.forEach(function (file) {
                fd.append('attachments', file, file.name);
            });

            var response = await fetch(webhookUrl, { method: 'POST', body: fd });
            if (response.ok) {
                openFeedbackModal(
                    'Solicitud recibida',
                    'Hemos recibido tu solicitud correctamente. Te responderemos según urgencia y cola de trabajo.',
                    false
                );
                form.reset();
                toggleErrorFields();
                if (typeof window.resetProyectoSearch === 'function') window.resetProyectoSearch();
                var preview = form.querySelector('.file-preview');
                if (preview) preview.remove();
            } else {
                openFeedbackModal(
                    'No se ha podido enviar',
                    'El servidor respondió con un error (código ' + response.status + '). Inténtalo de nuevo en unos minutos o escríbenos por la página de contacto.',
                    true
                );
            }
        } catch (err) {
            console.error(err);
            openFeedbackModal(
                'Error de conexión',
                'No hemos podido completar el envío. Comprueba tu conexión a internet y vuelve a intentarlo.',
                true
            );
        } finally {
            if (submitBtn) {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        }
    });
})();
