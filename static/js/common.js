// Common JavaScript functions for Student Management System

// Form validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    let isValid = true;
    const inputs = form.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            showFieldError(input, 'This field is required');
            isValid = false;
        } else {
            showFieldSuccess(input);
        }
    });
    
    return isValid;
}

// Show field error
function showFieldError(input, message) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    
    let feedback = input.parentNode.querySelector('.invalid-feedback');
    if (!feedback) {
        feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        input.parentNode.appendChild(feedback);
    }
    feedback.textContent = message;
}

// Show field success
function showFieldSuccess(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    
    const feedback = input.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.remove();
    }
}

// Clear validation
function clearValidation(input) {
    input.classList.remove('is-invalid', 'is-valid');
    const feedback = input.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.remove();
    }
}

// Show loading spinner on button
function showLoading(buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
        const spinner = document.createElement('span');
        spinner.className = 'spinner';
        spinner.style.display = 'inline-block';
        button.insertBefore(spinner, button.firstChild);
        button.disabled = true;
    }
}

// Hide loading spinner
function hideLoading(buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
        const spinner = button.querySelector('.spinner');
        if (spinner) {
            spinner.remove();
        }
        button.disabled = false;
    }
}

// Validate pincode (6 digits)
function validatePincode(input) {
    const pincode = input.value.trim();
    const pincodePattern = /^[0-9]{6}$/;
    
    if (pincode && !pincodePattern.test(pincode)) {
        showFieldError(input, 'Pincode must be exactly 6 digits');
        return false;
    } else if (pincode) {
        showFieldSuccess(input);
        return true;
    }
    return true;
}

// Validate name (only letters and spaces)
function validateName(input) {
    const name = input.value.trim();
    const namePattern = /^[a-zA-Z\s]+$/;
    
    if (name && !namePattern.test(name)) {
        showFieldError(input, 'Name should contain only letters and spaces');
        return false;
    } else if (name) {
        showFieldSuccess(input);
        return true;
    }
    return true;
}

// Confirm delete action
function confirmDelete(studentName) {
    return confirm(`Are you sure you want to delete student "${studentName}"?`);
}

// Initialize form validation on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add real-time validation to pincode fields
    const pincodeInputs = document.querySelectorAll('input[name="studpin"]');
    pincodeInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validatePincode(this);
        });
        
        input.addEventListener('input', function() {
            clearValidation(this);
        });
    });
    
    // Add real-time validation to name fields
    const nameInputs = document.querySelectorAll('input[name="studname"], input[name="txtname"]');
    nameInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateName(this);
        });
        
        input.addEventListener('input', function() {
            clearValidation(this);
        });
    });
    
    // Add form submission handlers
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitButton = this.querySelector('button[type="submit"]');
            if (submitButton) {
                showLoading(submitButton.id || 'submitBtn');
            }
        });
    });
});