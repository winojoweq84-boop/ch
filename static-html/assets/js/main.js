// CarVault Static HTML - Main JavaScript
// Handles mobile menu, sticky video, form interactions, and smooth scrolling

(function() {
    'use strict';

    // Mobile Menu Toggle
    function initMobileMenu() {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuLinks = mobileMenu?.querySelectorAll('a');

        if (!menuBtn || !mobileMenu) return;

        menuBtn.addEventListener('click', function() {
            const isOpen = mobileMenu.classList.contains('open');
            
            if (isOpen) {
                mobileMenu.classList.remove('open');
                menuBtn.setAttribute('aria-expanded', 'false');
                menuBtn.setAttribute('aria-label', 'Open menu');
            } else {
                mobileMenu.classList.add('open');
                menuBtn.setAttribute('aria-expanded', 'true');
                menuBtn.setAttribute('aria-label', 'Close menu');
            }
        });

        // Close menu when clicking on links
        if (menuLinks) {
            menuLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mobileMenu.classList.remove('open');
                    menuBtn.setAttribute('aria-expanded', 'false');
                    menuBtn.setAttribute('aria-label', 'Open menu');
                });
            });
        }

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('open');
                menuBtn.setAttribute('aria-expanded', 'false');
                menuBtn.setAttribute('aria-label', 'Open menu');
            }
        });
    }

    // Sticky Video Functionality (Desktop Only)
    function initStickyVideo() {
        const wrap = document.getElementById('stickyVideo');
        const closeBtn = wrap?.querySelector('.sv-close');

        if (!wrap) return;

        const isDesktop = window.matchMedia('(min-width: 1025px)').matches;

        // Show when user scrolls past 35% of page on desktop
        function maybeShow() {
            if (!isDesktop) return;
            const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            if (scrolled > 0.35 && wrap.style.display !== 'block') {
                wrap.style.display = 'block';
            }
        }

        window.addEventListener('scroll', maybeShow, { passive: true });
        maybeShow();

        closeBtn?.addEventListener('click', () => {
            wrap.remove();
        });
    }

    // Form Validation and Interactions
    function initForm() {
        const form = document.getElementById('offer-form');
        if (!form) return;

        const payoutTypeRadios = form.querySelectorAll('input[name="payoutType"]');
        const tokenSelect = form.querySelector('#token-select');
        const otherTokenInput = form.querySelector('#other-token');
        const citySelect = form.querySelector('#city');
        const otherCityInput = form.querySelector('#other-city');
        const brandSelect = form.querySelector('#brand');
        const otherBrandInput = document.querySelector('#other-brand');
        const otherModelInput = document.querySelector('#other-model');
        const modelSelect = document.querySelector('#model');

        // Show/hide token selection based on payout type
        function toggleTokenSelection() {
            const selectedPayout = form.querySelector('input[name="payoutType"]:checked');
            if (selectedPayout && selectedPayout.value === 'crypto') {
                tokenSelect.style.display = 'block';
                tokenSelect.setAttribute('required', 'required');
            } else {
                tokenSelect.style.display = 'none';
                tokenSelect.removeAttribute('required');
                otherTokenInput.style.display = 'none';
            }
        }

        // Show/hide other token input
        function toggleOtherToken() {
            if (tokenSelect.value === 'Other') {
                otherTokenInput.style.display = 'block';
                otherTokenInput.setAttribute('required', 'required');
            } else {
                otherTokenInput.style.display = 'none';
                otherTokenInput.removeAttribute('required');
            }
        }

        // Show/hide other city input
        function toggleOtherCity() {
            if (citySelect.value === 'Other') {
                otherCityInput.style.display = 'block';
                otherCityInput.setAttribute('required', 'required');
            } else {
                otherCityInput.style.display = 'none';
                otherCityInput.removeAttribute('required');
            }
        }

        // Show/hide other brand/model inputs
        function toggleOtherBrand() {
            if (brandSelect.value === 'Other') {
                otherBrandInput.style.display = 'block';
                otherModelInput.style.display = 'block';
                otherBrandInput.setAttribute('required', 'required');
                otherModelInput.setAttribute('required', 'required');
                modelSelect.style.display = 'none';
                modelSelect.removeAttribute('required');
            } else {
                otherBrandInput.style.display = 'none';
                otherModelInput.style.display = 'none';
                otherBrandInput.removeAttribute('required');
                otherModelInput.removeAttribute('required');
                modelSelect.style.display = 'block';
                modelSelect.setAttribute('required', 'required');
            }
        }

        // Event listeners
        payoutTypeRadios.forEach(radio => {
            radio.addEventListener('change', toggleTokenSelection);
        });

        if (tokenSelect) {
            tokenSelect.addEventListener('change', toggleOtherToken);
        }

        if (citySelect) {
            citySelect.addEventListener('change', toggleOtherCity);
        }

        if (brandSelect) {
            brandSelect.addEventListener('change', toggleOtherBrand);
        }

        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });

            // Email validation
            const emailField = form.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }

            // Phone validation
            const phoneField = form.querySelector('input[type="tel"]');
            if (phoneField && phoneField.value) {
                const phoneRegex = /^\+?\d[\d\s\-()]{7,}$/i;
                if (!phoneRegex.test(phoneField.value)) {
                    isValid = false;
                    phoneField.classList.add('error');
                }
            }

            if (isValid) {
                // Show loading state
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Submitting...';
                submitBtn.disabled = true;

                // Simulate form submission (replace with actual endpoint)
                setTimeout(() => {
                    window.location.href = 'thank-you.html';
                }, 1000);
            } else {
                // Show error message
                alert('Please fill in all required fields correctly.');
            }
        });

        // Initialize form state
        toggleTokenSelection();
        toggleOtherCity();
        toggleOtherBrand();
    }

    // Smooth Scrolling for Anchor Links
    function initSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    const headerHeight = 80; // Header height
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // FAQ Accordion
    function initFAQ() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const answer = this.nextElementSibling;
                const isOpen = this.classList.contains('active');
                
                // Close all other FAQ items
                faqQuestions.forEach(q => {
                    q.classList.remove('active');
                    q.nextElementSibling.classList.remove('open');
                });
                
                // Toggle current item
                if (!isOpen) {
                    this.classList.add('active');
                    answer.classList.add('open');
                }
            });
        });
    }

    // Header Scroll Behavior (Optional - lightweight)
    function initHeaderScroll() {
        const header = document.querySelector('.site-header');
        if (!header) return;

        let lastScrollY = window.scrollY;
        let ticking = false;

        function updateHeader() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
            ticking = false;
        }

        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }

        // Only add scroll behavior if user hasn't requested reduced motion
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            window.addEventListener('scroll', onScroll, { passive: true });
        }
    }

    // Initialize everything when DOM is ready
    function init() {
        initMobileMenu();
        initStickyVideo();
        initForm();
        initSmoothScrolling();
        initFAQ();
        initHeaderScroll();
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
