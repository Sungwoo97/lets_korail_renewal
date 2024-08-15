const slideWrapper = document.querySelector('.slide-wrapper');
const slideContainer = document.querySelector('.slide-container');
const slides = document.querySelectorAll('.slide-container li');
let currentSlide = 0;
let slidesCount = slides.length;

slideContainer.style.width = `${slideWrapper * slidesCount}px`

function showSlide(num){

}