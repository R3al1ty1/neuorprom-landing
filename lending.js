console.log('lending.js script started.'); // Log when script starts

// Removed Theme Switching Functionality

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded fired!'); // Log when DOM is ready

    // --- Mobile menu toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    // Toggle 'active' class on button click
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active'); // Use class toggle
            console.log('Mobile menu button clicked, toggled active class on nav.');
        });
    } else {
        console.warn('Mobile menu button or nav not found.');
    }

    // Remove 'active' class on nav link click (for mobile)
    if (nav) {
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                console.log('Nav link clicked:', this.getAttribute('href'));
                // Check if the screen is mobile size (using a threshold)
                if (window.innerWidth <= 768) {
                    nav.classList.remove('active');
                    console.log('Closed mobile menu.');
                }
            });
        });
    }

    // Close mobile menu if open on window resize (when resizing from mobile to desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && nav) { // Check for nav existence
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                console.log('Window resized, closed mobile menu.');
            }
        }
    });

    // --- Smooth scrolling for anchor links with offset for fixed header ---
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    console.log('Found anchor links:', anchorLinks.length); // Log how many links found

    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            console.log('Anchor link clicked:', this.getAttribute('href')); // Log which link was clicked
            e.preventDefault(); // Prevent default anchor jump

            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') {
                console.log('Clicked on empty hash, preventing scroll.');
                return; // Prevent scrolling to top for empty/hash links
            }

            const targetElement = document.querySelector(targetId);
            console.log('Target element for ID:', targetId, 'found:', targetElement); // Log if target found

            if (targetElement) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0; // Get header height, default to 0 if not found
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offset = headerHeight + 30; // Add header height + some extra padding

                console.log(`Scrolling to ${targetId} (position: ${targetPosition}, offset: ${offset})`);
                window.scrollTo({
                    top: targetPosition - offset,
                    behavior: 'smooth'
                });

                // Mobile menu will be closed by the nav link click listener itself if applicable
            } else {
                console.warn(`Target element not found for ID: ${targetId}. Cannot scroll.`);
            }
        });
    });

    // --- App redirect buttons ---
    const appButtons = document.querySelectorAll('#app-btn, #hero-app-btn');
    appButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('App button clicked.');
            // Replace with your actual app URL
            window.location.href = 'https://app.neuroprom.com'; // Example URL
        });
    });

    // --- Contact buttons scroll to form (#pilot section) ---
    const contactButtons = document.querySelectorAll('#hero-contact-btn');
    contactButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Contact button clicked, attempting to scroll to #pilot.');
            const pilotSection = document.querySelector('#pilot');
            if (pilotSection) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = pilotSection.getBoundingClientRect().top + window.scrollY;
                const offset = headerHeight + 30; // Adjust for header and padding

                window.scrollTo({
                    top: targetPosition - offset,
                    behavior: 'smooth'
                });
                console.log(`Scrolling to #pilot (position: ${targetPosition}, offset: ${offset})`);
            } else {
                console.warn('Pilot section element not found for contact button scroll.');
            }
        });
    });

    // --- Form submission and Modal handling ---
    const cooperationForm = document.getElementById('cooperation-form');
    const successModal = document.getElementById('success-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const closeModalBtn = document.querySelector('.modal .close-modal'); // Select specifically within modal

    function closeModal() {
        if(successModal) { // Check if modal exists
            console.log('Closing modal.');
            successModal.classList.remove('active'); // Remove active class
            // Add a small delay before hiding display completely to allow transition
            setTimeout(() => {
                successModal.style.display = 'none';
            }, 300); // Matches transition-medium duration
        }
    }

    if (cooperationForm && successModal) { // Check if form and modal exist
        cooperationForm.addEventListener('submit', function(e) {
            console.log('Form submission attempted.');
            e.preventDefault();

            let isValid = true;
            const inputs = this.querySelectorAll('input[required], textarea[required]');

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('input-error'); // Add class for styling
                    console.log(`Validation failed: required field ${input.id} is empty.`);
                } else {
                    input.classList.remove('input-error');
                }
            });

            const emailInput = this.querySelector('input[type="email"]');
            // Basic email format check
            if(emailInput && emailInput.value.trim() && !/\S+@\S+\.\S+/.test(emailInput.value.trim())) {
                isValid = false;
                emailInput.classList.add('input-error');
                console.log(`Validation failed: email field ${emailInput.id} is invalid.`);
            } else if (emailInput) {
                emailInput.classList.remove('input-error');
            }

            if (!isValid) {
                console.warn('Form validation failed. Stopping submission.');
                return; // Stop if not valid
            }

            console.log('Form validation successful.');

            // --- START: Replace with your actual form submission logic ---
            // For demo purposes *without* a backend, just log, reset, and show modal
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            console.log('Form data (demo):', formObject);

            // Simulate successful submission
            cooperationForm.reset();
            // Remove any leftover error classes after reset
            inputs.forEach(input => input.classList.remove('input-error'));
            if(emailInput) emailInput.classList.remove('input-error');

            // Show success modal
            successModal.style.display = 'flex'; // Make it display: flex first
            // Use requestAnimationFrame for better timing before adding active class
            requestAnimationFrame(() => {
                successModal.classList.add('active'); // Then add active class for transition
                console.log('Showing success modal.');
            });
        });
    } else {
        console.warn('Cooperation form or success modal not found.');
    }

    // Close modal via button or x-icon
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
        console.log('Modal close button listener added.');
    }
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
        console.log('Modal x-icon close listener added.');
    }

    // Close modal when clicking outside
    if (successModal) { // Check if modal exists
        window.addEventListener('click', function(e) {
            if (e.target === successModal) { // Check if clicked element is the modal background
                closeModal();
                console.log('Clicked outside modal, closing.');
            }
        });
        console.log('Click outside modal listener added.');
    }

    // Remove error class on input when user types or focuses
    const formInputs = cooperationForm ? cooperationForm.querySelectorAll('input, textarea') : [];
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('input-error');
        });
        input.addEventListener('focus', function() {
            this.classList.remove('input-error');
        });
    });
    // Specific email validation check on input (removes error class if it becomes valid)
    const emailInput = cooperationForm ? cooperationForm.querySelector('input[type="email"]') : null;
    if(emailInput) {
        emailInput.addEventListener('input', function() {
            if(this.value.trim() && /\S+@\S+\.\S+/.test(this.value.trim())) {
                this.classList.remove('input-error');
            }
        });
    }
});

console.log('lending.js script finished execution.'); // Log when script finishes