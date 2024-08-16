const slideWrapper = document.querySelector('.slide-wrapper');
let slideContainer = slideWrapper.querySelector('.slide-container');
const slides = slideContainer.querySelectorAll('.slide-container li');
let currentIdx = 0;
const slidesCount = slides.length;
const prevBtn = slideWrapper.querySelector('.prev');
const nextBtn = slideWrapper.querySelector('.next');
let slideTimer;
const formWay = document.querySelectorAll('.form-way li');
const formTab = document.querySelectorAll('.reservation li a');
const formContent = document.querySelectorAll('.main-content form');

// 슬라이드 복사
for(let i = 0; i<slidesCount;i++){
  let cloneSlide = slides[i].cloneNode(true); 
  cloneSlide.classList.add('clone'); 
  slideContainer.appendChild(cloneSlide); 
}
for(let i = slidesCount -1; i >=0 ; i--){
  let cloneSlide = slides[i].cloneNode(true); 
  cloneSlide.classList.add('clone'); 
  slideContainer.prepend(cloneSlide); 
}

let allslides = slideContainer.querySelectorAll('li'); //복사본 포함 전체 슬라이드
let allslidesCount = allslides.length;

//화면 크기 변동시 슬라이드 크기 재지정
function setLayout(){
 let slideWidth = slideWrapper.offsetWidth;
 let slidesContainerWidth = slideWidth * slidesCount;
 slideContainer.style.transform = `translateX(-${slidesContainerWidth}px)`;
}
setLayout();

window.addEventListener('resize',()=>{
  setLayout();
})

//연속 클릭 방지
function debounce(callback, time){
  let slideTrigger = true;
  return (e)=>{
    if(slideTrigger){
      callback(e);
      slideTrigger = false;
      setTimeout(()=>{
        slideTrigger = true
      }, time);
    }
  }
}
// 슬라이드 배치
allslides.forEach((slide, idx)=>{
  slide.style.left = `${idx * 100}%`;
})

// 슬라이드 이동
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

// 버튼 클릭
prevBtn.addEventListener('click', debounce(()=>{
  showSlide(currentIdx - 1);
}, 500));
nextBtn.addEventListener('click', debounce(()=>{
  showSlide(currentIdx + 1);
}, 500));

// 자동 슬라이드 함수
function autoSlide(){
  slideTimer = setInterval(()=>{
  showSlide(currentIdx + 1);
  },3000);
}
autoSlide();

// 마우스가 들어오면 자동 슬라이드 정지
slideWrapper.addEventListener('mouseenter', ()=>{
  clearInterval(slideTimer);
});
slideWrapper.addEventListener('mouseleave',()=>{
  autoSlide();
});
// 왕복 편도 색상 변환
function formWayChange(){
  for(let way of formWay){
    way.addEventListener('click',(e)=>{
      e.preventDefault();
      for(let item of formWay){
        item.classList.remove('way-active');
      }
      way.classList.add('way-active');
    });
    
  }
}
formWayChange();

function formChange(){
  for(let forms of formTab){
    forms.addEventListener('click', (e)=>{
      e.preventDefault();
      for(let form of formTab){
        form.classList.remove('form-active');
      }
      forms.classList.add('form-active');
      for(let fc of formContent){
        fc.classList.remove('form-active');
      }
      let target = forms.getAttribute('href');
      console.log(target);
      document.querySelector(target).classList.add('form-active');
    });
  }
}
formChange();