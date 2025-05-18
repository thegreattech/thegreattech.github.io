// Contact form handler
function showStatusMessage(text, isSuccess) {
    const msg = document.getElementById('status-message');
    msg.textContent = text;

    // Check if dark mode is active
    const isDarkMode = document.documentElement.classList.contains('dark-mode');

    // Reset classes
    msg.className = 'alert mt-3';

    // Apply appropriate styling
    if (isSuccess) {
        if (isDarkMode) {
            msg.classList.add('bg-green-900', 'text-green-200', 'border-green-800');
        } else {
            msg.classList.add('bg-green-100', 'text-green-800', 'border-green-300');
        }
    } else {
        if (isDarkMode) {
            msg.classList.add('bg-red-900', 'text-red-200', 'border-red-800');
        } else {
            msg.classList.add('bg-red-100', 'text-red-800', 'border-red-300');
        }
    }

    msg.style.display = 'block';
    msg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}


document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form elements
    const form = e.target;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const captchaContainer = document.getElementById('captcha-container');
    const loading = document.getElementById('loading');
    const statusMessage = document.getElementById('status-message');

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showStatusMessage('Please enter a valid email address', false);
        return;
    }

    // Show CAPTCHA if not already shown
    if (captchaContainer.style.display === 'none' || !captchaContainer.style.display) {
        captchaContainer.style.display = 'block';
        showStatusMessage('Please complete the CAPTCHA verification', false);
        return;
    }

    // Verify CAPTCHA
    const captchaResponse = grecaptcha.getResponse(contactWidgetId);
    if (!captchaResponse) {
        showStatusMessage('Please complete the CAPTCHA verification', false);
        return;
    }

    // Show loading
    loading.style.display = 'block';
    statusMessage.style.display = 'none';

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbypLEBxgvQT1c7EO3WSCFN-SxnvLsUAnV1HDA0NkTBAgsEmXiZCpMJ_LfvwZNTcr8LUng/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&subject=${encodeURIComponent(subject)}&message=${encodeURIComponent(message)}&g-recaptcha-response=${encodeURIComponent(captchaResponse)}`
        });

        const result = await response.json();
        showStatusMessage(result.message, result.success);
        if (result.success) {
            form.reset();
            grecaptcha.reset();
            captchaContainer.style.display = 'none';
        }
    } catch (error) {
        showStatusMessage('Failed to submit. Please try again.', false);
    } finally {
        loading.style.display = 'none';
    }

    grecaptcha.reset(quoteWidgetId);
});

