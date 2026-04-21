// ===================================
// Buscador proyecto Teable (llamada directa a la API)
// ===================================

(function () {
    var form = document.getElementById('clientRequestForm');
    if (!form) return;

    var TEABLE_BASE = (window.TEABLE_CONFIG && window.TEABLE_CONFIG.base) || 'https://plane.weavewp.com';
    var TEABLE_TABLE = (window.TEABLE_CONFIG && window.TEABLE_CONFIG.tableId) || 'tblkdYU3GrAdAPHrajt';
    var TEABLE_TOKEN = (window.TEABLE_CONFIG && window.TEABLE_CONFIG.token) || '';
    var FIELD_ID = 'fldsn21iQ3qa5pd1Wce';

    var input = document.getElementById('proyecto_search_input');
    var listbox = document.getElementById('proyecto_search_listbox');
    var combobox = document.getElementById('proyecto_combobox');
    var hiddenNombre = document.getElementById('nombre_proyecto_hidden');
    var hiddenCompany = document.getElementById('company_name_hidden');
    var hiddenId = document.getElementById('teable_proyecto_id_hidden');
    var hiddenOrigen = document.getElementById('proyecto_teable_origen');

    if (!input || !hiddenNombre || !hiddenCompany || !hiddenId) return;

    var debounceTimer = null;
    var selectionLocked = false;
    var projectCache = null;

    function isConfigured() {
        return !!TEABLE_TOKEN;
    }

    function lower(s) {
        return String(s || '').toLocaleLowerCase('es');
    }

    function apiUrl(path) {
        return TEABLE_BASE.replace(/\/$/, '') + '/api/table/' + TEABLE_TABLE + path;
    }

    function authHeaders() {
        return { Authorization: 'Bearer ' + TEABLE_TOKEN };
    }

    function nombreFromRecord(rec) {
        var f = rec && rec.fields ? rec.fields : {};
        if (f.nombre_proyecto != null) return String(f.nombre_proyecto).trim();
        if (f[FIELD_ID] != null) return String(f[FIELD_ID]).trim();
        return '';
    }

    function clearSelection() {
        hiddenId.value = '';
        hiddenNombre.value = '';
        hiddenCompany.value = '';
        if (hiddenOrigen) hiddenOrigen.value = '';
        selectionLocked = false;
    }

    function applySelection(id, nombre, origen) {
        hiddenId.value = id;
        hiddenNombre.value = nombre;
        hiddenCompany.value = nombre;
        if (hiddenOrigen) hiddenOrigen.value = origen;
        input.value = nombre;
        selectionLocked = true;
        hideDropdown();
    }

    function hideDropdown() {
        if (listbox) {
            listbox.hidden = true;
            listbox.innerHTML = '';
        }
        input.setAttribute('aria-expanded', 'false');
    }

    function showDropdown() {
        if (listbox) listbox.hidden = false;
        input.setAttribute('aria-expanded', 'true');
    }

    function renderProjects(projects, query) {
        if (!listbox) return;
        listbox.innerHTML = '';
        var q = lower(query);

        var filtered = projects;
        if (q.length > 0) {
            filtered = projects.filter(function (p) {
                return lower(p.nombre_proyecto).indexOf(q) !== -1;
            });
        }

        filtered.forEach(function (p) {
            var li = document.createElement('li');
            li.setAttribute('role', 'option');
            li.className = 'proyecto-dropdown__item';
            li.textContent = p.nombre_proyecto;
            li.dataset.id = p.id;
            li.addEventListener('mousedown', function (e) {
                e.preventDefault();
                applySelection(p.id, p.nombre_proyecto, 'lista');
            });
            listbox.appendChild(li);
        });

        if (isConfigured() && (query || '').trim().length >= 1 && filtered.length === 0) {
            var liInfo = document.createElement('li');
            liInfo.setAttribute('role', 'presentation');
            liInfo.className = 'proyecto-dropdown__info';
            var wrap = document.createElement('div');
            wrap.className = 'proyecto-dropdown__info-inner';
            wrap.appendChild(document.createTextNode('Si tu proyecto no aparece en la lista, '));
            var a = document.createElement('a');
            a.href = 'contacto.html';
            a.textContent = 'contacta con Weaves';
            wrap.appendChild(a);
            wrap.appendChild(document.createTextNode(' para registrarlo antes de enviar la solicitud.'));
            liInfo.appendChild(wrap);
            listbox.appendChild(liInfo);
        }

        if (filtered.length > 0 || ((query || '').trim().length >= 1 && isConfigured())) {
            showDropdown();
        } else {
            hideDropdown();
        }
    }

    async function loadAllProjects() {
        if (projectCache) return projectCache;
        if (!isConfigured()) return [];

        var url = apiUrl('/record?fieldKeyType=name&take=500&skip=0');
        try {
            var res = await fetch(url, { method: 'GET', headers: authHeaders() });
            var data = await res.json().catch(function () { return {}; });
            if (!res.ok) {
                console.warn('Teable list error:', data.error || data.message || res.status);
                return [];
            }
            var records = data.records || (data.data && data.data.records) || [];
            var seen = new Set();
            var out = [];
            for (var i = 0; i < records.length; i++) {
                var rec = records[i];
                if (!rec || !rec.id || seen.has(rec.id)) continue;
                var name = nombreFromRecord(rec);
                if (!name) continue;
                seen.add(rec.id);
                out.push({ id: rec.id, nombre_proyecto: name });
            }
            out.sort(function (a, b) {
                return a.nombre_proyecto.localeCompare(b.nombre_proyecto, 'es', { sensitivity: 'base' });
            });
            projectCache = out;
            return out;
        } catch (err) {
            console.error('Error cargando proyectos:', err);
            return [];
        }
    }

    async function runSearch(q) {
        if (!isConfigured()) {
            hiddenNombre.value = (q || '').trim();
            hiddenCompany.value = (q || '').trim();
            if (hiddenOrigen) hiddenOrigen.value = 'manual';
            hideDropdown();
            return;
        }
        var projects = await loadAllProjects();
        renderProjects(projects, q);
    }

    // --- Eventos ---

    input.addEventListener('input', function () {
        var q = input.value;
        if (selectionLocked && q !== hiddenNombre.value) {
            selectionLocked = false;
            clearSelection();
        }

        if (!q.trim()) {
            clearTimeout(debounceTimer);
            clearSelection();
            if (isConfigured()) {
                runSearch('');
            } else {
                hideDropdown();
            }
            return;
        }

        if (!isConfigured()) {
            hiddenNombre.value = q.trim();
            hiddenCompany.value = q.trim();
            if (hiddenOrigen) hiddenOrigen.value = 'manual';
            hideDropdown();
            return;
        }

        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function () {
            runSearch(q.trim());
        }, 150);
    });

    input.addEventListener('focus', function () {
        if (!isConfigured()) return;
        if (!selectionLocked) runSearch(input.value.trim());
    });

    document.addEventListener('click', function (e) {
        if (combobox && combobox.contains(e.target)) return;
        hideDropdown();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            hideDropdown();
        }
    });

    window.resetProyectoSearch = function () {
        input.value = '';
        clearSelection();
        selectionLocked = false;
        hideDropdown();
    };

    if (!isConfigured()) {
        input.placeholder = 'Nombre del proyecto (configura TEABLE_CONFIG para búsqueda)';
    }

    if (isConfigured()) {
        loadAllProjects();
    }
})();
