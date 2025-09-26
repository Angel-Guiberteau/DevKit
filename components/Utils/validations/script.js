document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const textInputs = document.querySelectorAll('input[type="text"]');

    function checkValidity(input) {
        const v = input.value.trim();
        let valid = v !== '';

        if (input.dataset.min) valid = valid && v.length >= Number(input.dataset.min);
        if (input.dataset.alpha === 'true') valid = valid && /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/.test(v);

        return valid;
    }

    function paintFeedback(input, valid) {
        const group = input.closest('.form-input') || input.parentElement;
        const correct = group?.querySelector('.valid-feedback');
        const incorrect = group?.querySelector('.invalid-feedback');

        if (correct)   correct.style.opacity   = valid ? '1' : '0';
        if (incorrect) incorrect.style.opacity = valid ? '0' : '1';

        input.classList.toggle('is-valid', valid);
        input.classList.toggle('is-invalid', !valid);
    }

    function validateAll() {
        let allValid = true;
        textInputs.forEach(inp => {
            const ok = checkValidity(inp);
            paintFeedback(inp, ok);
            if (!ok) allValid = false;
        });
        
        return allValid;
    }

    function validateForm() {
        textInputs.forEach(textInput => {
            textInput.addEventListener('input', function () {
                const valid = checkValidity(this);
                paintFeedback(this, valid);
            });
            textInput.addEventListener('blur', function () {
                const valid = checkValidity(this);
                paintFeedback(this, valid);
            });
        });

        
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            if (!validateAll()) {
                e.preventDefault();
                form.querySelector('.is-invalid')?.focus();
            }
        });
    }

    validateForm();
});
