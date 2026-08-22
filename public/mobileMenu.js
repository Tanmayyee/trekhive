document.addEventListener('DOMContentLoaded', () => {
    // 1. Handle Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOpenState = document.getElementById('menu-open-state');
    const menuCloseState = document.getElementById('menu-close-state');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            
            // Toggle the visibility of the mobile dropdown box
            mobileMenu.classList.toggle('hidden');
            
            // Swap the open/close icons
            menuOpenState.classList.toggle('hidden');
            menuCloseState.classList.toggle('hidden');
        });
    }

    // 2. Handle Profile Dropdown (Desktop)
    const profileBtn = document.getElementById('th-profile-btn');
    const profileDropdown = document.getElementById('th-profile-dropdown');

    if (profileBtn && profileDropdown) {
        const closeDropdown = () => {
            profileDropdown.classList.add('opacity-0', 'translate-y-1');
            profileBtn.setAttribute('aria-expanded', 'false');
            setTimeout(() => { profileDropdown.classList.add('hidden'); }, 150);
        };
        
        const openDropdown = () => {
            profileDropdown.classList.remove('hidden');
            requestAnimationFrame(() => {
                profileDropdown.classList.remove('opacity-0', 'translate-y-1');
            });
            profileBtn.setAttribute('aria-expanded', 'true');
        };

        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = profileBtn.getAttribute('aria-expanded') === 'true';
            isOpen ? closeDropdown() : openDropdown();
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!profileDropdown.contains(e.target) && !profileBtn.contains(e.target)) {
                if (profileBtn.getAttribute('aria-expanded') === 'true') closeDropdown();
            }
        });

        // Close dropdown on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && profileBtn.getAttribute('aria-expanded') === 'true') closeDropdown();
        });
    }
});
