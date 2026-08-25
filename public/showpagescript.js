// Data from the EJS file
const totalSlides = window.listingData.totalSlides;
const imageUrls = window.listingData.imageUrls;

// Carousel Logic
let currentSlide = 0;
const track = document.getElementById('carousel-track');

function updateCarousel() {
    if (!track) return;
    const dots = document.querySelectorAll('.carousel-dot');
    track.style.transform = `translate3d(-${currentSlide * 100}%, 0px, 0px)`;

    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.remove('bg-white/50', 'w-1.5');
            dot.classList.add('bg-white', 'w-6');
        } else {
            dot.classList.remove('bg-white', 'w-6');
            dot.classList.add('bg-white/50', 'w-1.5');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

// Lightbox Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
let currentLightboxIndex = 0;

function openLightbox(index) {
    currentLightboxIndex = index;
    lightboxImg.src = imageUrls[currentLightboxIndex];

    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        lightbox.classList.remove('opacity-0');
        lightboxImg.classList.remove('scale-95');
        lightboxImg.classList.add('scale-100');
    }, 10);
}

function closeLightbox(e) {
    if (e) e.stopPropagation();

    lightbox.classList.add('opacity-0');
    lightboxImg.classList.remove('scale-100');
    lightboxImg.classList.add('scale-95');
    document.body.style.overflow = '';

    setTimeout(() => {
        lightbox.classList.add('hidden');
        lightboxImg.src = '';
    }, 300);
}

function prevLightboxSlide(e) {
    if (e) e.stopPropagation();
    currentLightboxIndex = (currentLightboxIndex - 1 + imageUrls.length) % imageUrls.length;
    lightboxImg.src = imageUrls[currentLightboxIndex];
}

function nextLightboxSlide(e) {
    if (e) e.stopPropagation();
    currentLightboxIndex = (currentLightboxIndex + 1) % imageUrls.length;
    lightboxImg.src = imageUrls[currentLightboxIndex];
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('hidden')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight' && totalSlides > 1) nextLightboxSlide();
        if (e.key === 'ArrowLeft' && totalSlides > 1) prevLightboxSlide();
    }
    else {
        if (e.key === 'ArrowRight' && totalSlides > 1) nextSlide();
        if (e.key === 'ArrowLeft' && totalSlides > 1) prevSlide();
    }
});

// Reviews Modal functionality
function openReviewsModal() {
    const modal = document.getElementById('reviews-modal');
    const modalBox = modal.querySelector('.scale-95');
    
    // Show the modal container
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    // Prevent background scrolling on the main page
    document.body.style.overflow = 'hidden';
    
    requestAnimationFrame(() => {
        modal.classList.remove('opacity-0');
        modalBox.classList.remove('scale-95');
        modalBox.classList.add('scale-100');
    });
}

function closeReviewsModal(event) {
    const modal = document.getElementById('reviews-modal');
    const modalBox = modal.querySelector('.scale-100');
    
    if (modal) {
        // Reverse animation
        modal.classList.add('opacity-0');
        if(modalBox) {
            modalBox.classList.remove('scale-100');
            modalBox.classList.add('scale-95');
        }
        
        // Restore background scrolling
        document.body.style.overflow = 'auto';
        
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, 300);
    }
}