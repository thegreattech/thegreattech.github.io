
   document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form2');
    const fileInput = document.getElementById('formFile');
    const fileError = document.getElementById('fileError');
    const fileLabel = document.querySelector('.custom-file-label');

    // Validation configuration
    const allowedType = 'application/pdf';
    const maxSizeMB = 10; // Maximum file size in MB

    // Helper function to check file type and size
    function validateFile(file) {
      if (!file) return true; // No file, so validation passes

      const isValidType = file.type === allowedType;
      const isValidSize = file.size <= maxSizeMB * 1024 * 1024;
      return isValidType && isValidSize;
    }

    // Handle form submission
    form.addEventListener('submit', function (event) {
      let isValid = true;

      // Reset error messages
      document.querySelectorAll('.invalid-feedback').forEach(el => el.classList.remove('show'));
      document.querySelectorAll('.form-control').forEach(el => el.classList.remove('is-invalid'));

      // Check if all required fields are filled
      const requiredFields = form.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          field.classList.add('is-invalid');
          isValid = false;
        }
      });

      // Validate email format
      const email = form.querySelector('input[name="email"]');
      if (email && !email.validity.valid) {
        email.classList.add('is-invalid');
        isValid = false;
      }

      // Validate file input
      const file = fileInput.files[0];
      if (!validateFile(file)) {
        fileInput.classList.add('is-invalid');
        fileError.classList.add('show');
        isValid = false;
      } else {
        fileInput.classList.remove('is-invalid');
        fileError.classList.remove('show');
      }

      // Prevent form submission if any validation fails
      if (!isValid) {
        event.preventDefault();
      }
    });

    // Handle file input change to show file name and validate file
    fileInput.addEventListener('change', function (event) {
      const file = event.target.files[0];

      if (file) {
        fileLabel.textContent = file.name;

        if (!validateFile(file)) {
          fileInput.classList.add('is-invalid');
          fileError.classList.add('show');
        } else {
          fileInput.classList.remove('is-invalid');
          fileError.classList.remove('show');
        }
      } else {
        fileLabel.textContent = 'Choose File';
        fileInput.classList.remove('is-invalid');
        fileError.classList.remove('show');
      }
    });
  });
