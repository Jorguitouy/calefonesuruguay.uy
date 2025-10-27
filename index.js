import './index.css';

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1) {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Mobile menu toggle
    const menuButton = document.querySelector('.mobile-menu-button');
    const nav = document.querySelector('.main-nav');

    if (menuButton && nav) {
        menuButton.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // Close mobile menu when a non-dropdown link is clicked
    document.querySelectorAll('.main-nav a:not(.dropdown > a)').forEach(link => {
        link.addEventListener('click', () => {
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        });
    });

    // Mobile dropdown toggle
    document.querySelectorAll('.main-nav .dropdown > a').forEach(dropdownToggle => {
        dropdownToggle.addEventListener('click', function(e) {
            // Only run this logic if we're in mobile view (the nav is active)
            if (nav && nav.classList.contains('active')) {
                // Prevent link navigation only if it's a hash link for the same page
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                }
                const parentDropdown = this.parentElement;
                parentDropdown.classList.toggle('open');
            }
        });
    });
});