const slideWrapper = document.querySelector('.slide-wrapper');
const slideContainer = slideWrapper.querySelector('.slide-container');
const slides = slideContainer.querySelectorAll('.slide-container li');
let currentIdx = 0;
const slidesCount = slides.length;
const prevBtn = slideWrapper.querySelector('.prev');
const nextBtn = slideWrapper.querySelector('.next');
let slideTimer;


function setLayout(){
 let slideWidth = slideWrapper.offsetWidth;
 let slidesContainerWidth = slideWidth * slidesCount;
 slideContainer.style.transform = `translateX(-${slidesContainerWidth}px)`;
 console.log(slideContainer.style.transform);
}

window.addEventListener('resize',()=>{
  setLayout();
})
slides.forEach((slide, idx)=>{
  slide.style.left = `${idx * 100}%`;
})

function showSlide(num){
  if(currentIdx === num ) return;
  if(num > slidesCount - 1){
    num = 0;
  }
  if(num < 0){
    num = slidesCount - 1;
  }
  
  slideContainer.style.left =`${-num*100}%`;
  currentIdx = num;
  console.log(num);
}
showSlide(0);

prevBtn.addEventListener('click', ()=>{
  showSlide(currentIdx - 1);
});

nextBtn.addEventListener('click', ()=>{
  showSlide(currentIdx + 1);
});

function autoSlide(){
  slideTimer = setInterval(()=>{
  showSlide(currentIdx + 1);
  },3000);
}
autoSlide();

slideWrapper.addEventListener('mouseenter', ()=>{
  clearInterval(slideTimer);
})
slideWrapper.addEventListener('mouseleave',()=>{
  autoSlide();
})