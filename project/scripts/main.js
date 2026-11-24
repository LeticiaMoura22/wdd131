// Shared behavior for every page: mobile navigation toggle.
(function () {
    const toggleButton = document.querySelector('.nav-toggle');
    const nav = document.getElementById('site-nav');

    if (!toggleButton || !nav) {
        return;
    }

    function setNavOpen(isOpen) {
        nav.classList.toggle('is-open', isOpen);
        toggleButton.setAttribute('aria-expanded', String(isOpen));
    }

    toggleButton.addEventListener('click', () => {
        const isOpen = nav.classList.contains('is-open');
        setNavOpen(!isOpen);
    });

    // Close the menu after a link is chosen on small screens.
    nav.addEventListener('click', (event) => {
        if (event.target.tagName === 'A' && window.innerWidth < 900) {
            setNavOpen(false);
        }
    });
}());
