let slideIndex = 0;

function showSlides() {
    let slides = document.querySelectorAll(".slide");
    let dots = document.querySelectorAll(".dot");
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        dots[i].style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    }
    
    slideIndex++;
    
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].style.backgroundColor = "#fff";
    
    setTimeout(showSlides, 3000); // 切换间隔时间（3秒）
}

function currentSlide(n) {
    slideIndex = n;
    showSlides();
}

showSlides();
