// Client-Side UI Scripts: Handles mobile menu toggling

document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            console.log("hehehehehhehehe")
            mobileMenu.classList.toggle('hidden');
            
            menuIcon.classList.toggle('hidden');
            menuIcon.classList.toggle('block');
 
            closeIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('block');
        });
    } else {
        console.log("Navbar elements not found on this page.");
    }
});