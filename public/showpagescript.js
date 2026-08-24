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

// Load More Reviews Logic
function loadMoreReviews() {
    const hiddenReviews = document.querySelectorAll('.review-card.hidden');
    const itemsToShow = 6;

    for (let i = 0; i < itemsToShow && i < hiddenReviews.length; i++) {
        const card = hiddenReviews[i];

        card.classList.remove('hidden');
        card.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-500', 'ease-out');

        void card.offsetWidth;

        setTimeout(() => {
            card.classList.remove('opacity-0', 'translate-y-4');
            card.classList.add('opacity-100', 'translate-y-0');
        }, i * 100);
    }

    const remainingHidden = document.querySelectorAll('.review-card.hidden');

    if (remainingHidden.length === 0) {
        const loadMoreContainer = document.getElementById('load-more-container');
        if (loadMoreContainer) {
            loadMoreContainer.classList.add('opacity-0', 'transition-opacity', 'duration-500');
            setTimeout(() => {
                loadMoreContainer.style.display = 'none';
            }, 500);
        }
    }
}