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



document.getElementById('newsletter-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const messageDiv = document.getElementById('message');
    const loading = document.getElementById('loading');
    const captchaContainer = document.getElementById('captcha-container');

    // First validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showMessage('Please enter a valid email address', false);
        return;
    }

    // Show CAPTCHA if not already shown
    if (captchaContainer.style.display === 'none' || !captchaContainer.style.display) {
        captchaContainer.style.display = 'block';
        showMessage('Please complete the CAPTCHA verification', false);
        return;
    }

    // Verify CAPTCHA
    const captchaResponse = grecaptcha.getResponse();
    if (!captchaResponse) {
        showMessage('Please complete the CAPTCHA verification', false);
        return;
    }

    // Show loading
    loading.style.display = 'block';
    messageDiv.style.display = 'none';

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycby__f7NpwVnNKM5rHlujuX7GMXinGn8j7anLN4f-aG0H5b2ZzuDgZwWL1wjrcu8kMbzJw/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `email=${encodeURIComponent(email)}&g-recaptcha-response=${encodeURIComponent(captchaResponse)}`
        });

        const result = await response.json();
        showMessage(result.message, result.success);
        if (result.success) {
            e.target.reset();
            grecaptcha.reset();
            captchaContainer.style.display = 'none';
        }
    } catch (error) {
        showMessage('Failed to submit. Please try again.', false);
    } finally {
        loading.style.display = 'none';
    }
});

// Modified showMessage function for your dark mode
function showMessage(text, isSuccess) {
    const msg = document.getElementById('message');
    msg.textContent = text;

    // Check if dark mode is active
    const isDarkMode = document.documentElement.classList.contains('dark-mode');

    // Reset classes
    msg.className = 'mt-3 alert';

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