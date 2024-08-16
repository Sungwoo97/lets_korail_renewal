const slideWrapper = document.querySelector('.slide-wrapper');
let slideContainer = slideWrapper.querySelector('.slide-container');
const slides = slideContainer.querySelectorAll('.slide-container li');
let currentIdx = 0;
const slidesCount = slides.length;
const prevBtn = slideWrapper.querySelector('.prev');
const nextBtn = slideWrapper.querySelector('.next');
let slideTimer;

for(let i = 0; i<slidesCount;i++){
  let cloneSlide = slides[i].cloneNode(true); //복사
  cloneSlide.classList.add('clone'); //복사 클래스 추가
  slideContainer.appendChild(cloneSlide); //ul의 내용의 뒤에 추가
}
for(let i = slidesCount -1; i >=0 ; i--){
  let cloneSlide = slides[i].cloneNode(true); //복사
  cloneSlide.classList.add('clone'); //복사 클래스 추가
  slideContainer.prepend(cloneSlide); //ul의 내용의 앞에 추가
}

let allslides = slideContainer.querySelectorAll('li'); //복사본 포함 전체 슬라이드
let allslidesCount = allslides.length;

function setLayout(){
 let slideWidth = slideWrapper.offsetWidth;
 let slidesContainerWidth = slideWidth * slidesCount;
 slideContainer.style.transform = `translateX(-${slidesContainerWidth}px)`;
}
setLayout();

window.addEventListener('resize',()=>{
  setLayout();
})
console.log(allslides[0]);

//연속 클릭 방지
function debounce(callback, time){
  let slideTrigger = true;
  return (e)=>{
    if(slideTrigger){
      callback(e);
      slideTrigger = false;
      setTimeout(()=>{
        slideTrigger = true;
        console.log(slideTrigger);
      }, time);
    }
    console.log(slideTrigger);
  }
}

allslides.forEach((slide, idx)=>{
  slide.style.left = `${idx * 100}%`;
})
console.log(slides[0]);

function showSlide(num){
  slideContainer.style.left =`${-num*100}%`;
  currentIdx = num;
  console.log(currentIdx);
  if(currentIdx === slidesCount * 2 - 1 ){
    setTimeout(()=>{
      slideContainer.classList.remove('animated');
      slideContainer.style.left = `${(slidesCount-1)*-100}%`;
      currentIdx = slidesCount-1;
    },400);
    setTimeout(()=>{
      slideContainer.classList.add('animated');
    },500);
  }
  if(currentIdx === -3){
    setTimeout(()=>{
      slideContainer.classList.remove('animated');
      slideContainer.style.left = 0;
       currentIdx = 0;
    },400);
    setTimeout(()=>{
      slideContainer.classList.add('animated');
    },500);
    
  }

}
showSlide(0);

prevBtn.addEventListener('click', debounce(()=>{
  showSlide(currentIdx - 1);
}, 500));

nextBtn.addEventListener('click', debounce(()=>{
  showSlide(currentIdx + 1);
}, 500));

function autoSlide(){
  slideTimer = setInterval(()=>{
  showSlide((currentIdx + 1)%slidesCount);
  },3000);
}
autoSlide();

slideWrapper.addEventListener('mouseenter', ()=>{
  clearInterval(slideTimer);
});
slideWrapper.addEventListener('mouseleave',()=>{
  autoSlide();
});