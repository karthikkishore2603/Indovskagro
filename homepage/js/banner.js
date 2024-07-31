let slideIndex = 0;

function showSlides() {
    const slides = document.querySelectorAll('.slide');
    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;

    slides.forEach((slide, index) => {
        slide.style.display = (index === slideIndex) ? 'flex' : 'none';
    });
}

function changeSlide(n) {
    slideIndex += n;
    showSlides();
}

setInterval(() => {
    slideIndex++;
    showSlides();
}, 5000);

showSlides();
