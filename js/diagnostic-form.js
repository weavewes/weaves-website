// ===================================
// DIAGNOSTIC FORM - Multi-step form
// ===================================

let currentStep = 1;
const totalSteps = 5;

function nextStep(step) {
    if (validateCurrentStep()) {
        document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
        currentStep = step;
        document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
        updateProgress();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function prevStep(step) {
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
    currentStep = step;
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
    updateProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function validateCurrentStep() {
    const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const requiredInputs = currentStepElement.querySelectorAll('[required]');
    
    let isValid = true;
    requiredInputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'red';
            isValid = false;
        } else {
            input.style.borderColor = '';
        }
    });
    
    if (!isValid) {
        alert('Por favor, completa todos los campos obligatorios.');
    }
    
    return isValid;
}

function updateProgress() {
    const progress = (currentStep / totalSteps) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('currentStep').textContent = currentStep;
}

// Diagnostic Form Submission
const diagnosticForm = document.getElementById('diagnosticForm');
if (diagnosticForm) {
    diagnosticForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateCurrentStep()) {
            return;
        }
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Get selected areas (checkboxes)
        const areas = [];
        document.querySelectorAll('input[name="areas"]:checked').forEach(checkbox => {
            areas.push(checkbox.value);
        });
        data.areas = areas;
        
        console.log('Diagnostic Form Data:', data);
        
        // Show loading
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Procesando...';
        submitBtn.disabled = true;
        
        // Simulate submission (replace with actual API call)
        setTimeout(() => {
            // Success
            alert('¡Gracias! Recibirás tu diagnóstico personalizado en 48 horas a tu email.');
            
            // Redirect to thank you page or home
            window.location.href = 'index.html';
            
            // Here you would send to your backend:
            // fetch('/api/diagnostic', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // })
        }, 2000);
    });
}

// Add styles for form steps
const formStepStyles = document.createElement('style');
formStepStyles.textContent = `
    .form-step {
        display: none;
    }
    
    .form-step.active {
        display: block;
        animation: fadeIn 0.5s ease;
    }
    
    .form-progress {
        margin-top: 2rem;
        text-align: center;
    }
    
    .progress-bar {
        width: 100%;
        height: 8px;
        background: #e5e7eb;
        border-radius: 1rem;
        overflow: hidden;
        margin-bottom: 0.5rem;
    }
    
    .progress-fill {
        height: 100%;
        background: var(--primary-color);
        transition: width 0.3s ease;
        width: 20%;
    }
    
    .progress-text {
        color: var(--text-light);
        font-size: 0.875rem;
    }
    
    .form-buttons {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
    }
    
    .form-buttons button {
        flex: 1;
    }
    
    .checkbox-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
    }
    
    .checkbox-card {
        position: relative;
        cursor: pointer;
    }
    
    .checkbox-card input[type="checkbox"] {
        position: absolute;
        opacity: 0;
    }
    
    .checkbox-card .card-content {
        border: 2px solid var(--border-color);
        border-radius: 0.5rem;
        padding: 1.5rem;
        text-align: center;
        transition: all 0.3s ease;
    }
    
    .checkbox-card input:checked + .card-content {
        border-color: var(--primary-color);
        background: rgba(37, 99, 235, 0.1);
    }
    
    .checkbox-card .card-content:hover {
        border-color: var(--primary-color);
        transform: translateY(-2px);
    }
    
    .checkbox-card img {
        width: 48px;
        height: 48px;
        margin-bottom: 0.5rem;
    }
    
    .step-description {
        color: var(--text-light);
        margin-bottom: 1.5rem;
    }
`;
document.head.appendChild(formStepStyles);

// Initialize first step
if (document.getElementById('diagnosticForm')) {
    updateProgress();
}
