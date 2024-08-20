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
const contentBox = document.querySelector('.content-box');
const contents = document.querySelectorAll('.content-box ul > li');
const contentBoxOST = contentBox.offsetTop-600;
const inputBox = document.querySelectorAll('.input-field');
const inputClickedOn = document.querySelector('.input-container');
const servicesAfter = document.querySelectorAll('.services > ul > li');

const servicesText = document.querySelectorAll('.services-box > ul > li');


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
// 승차권 예약 / 예약 조회 탭 메뉴
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
      document.querySelector(target).classList.add('form-active');
    });
  }
}
formChange();
// 일정 스크롤 내리면 content box가 올라옴 
function scrollEvent(){
  window.addEventListener('scroll', ()=>{
    let scrollAmt = window.scrollY;
    if(scrollAmt >= contentBoxOST){
      for(let con of contents){
        con.classList.remove('con-active');
        if(!con.classList.contains('con-active')){
          con.classList.add('con-active');
        }
      }
    }
  });
}
scrollEvent();

// 달력 출력 함수
function loadCalendar(){
  const calendar = document.querySelector('.calendar');
  const calPrev = calendar.querySelector('.cal-left');
  const calNext = calendar.querySelector('.cal-right');
  const display = calendar.querySelector('.cal-header-display');
  const days = calendar.querySelector('.cal-days');
  //const selected = calendar.querySelector('.cal-selected');
  const today = new Date();

  let year = today.getFullYear();
  let month = today.getMonth();
  // 헤더의 날짜 출력 함수
  function displayHeader(){       
    let headerDate = today.toLocaleString('ko-KR',{
      month: 'long', year:'numeric', timeZone: 'Asia/Seoul'
    });
    display.innerHTML = headerDate;
  }
  displayHeader();
  function displayCalendar(){
    const firstDay = new Date(year, month, 1); // 현재 년 월의 첫째날
    const firstDateIdx= firstDay.getDay(); // 현재 년 월의 첫째날이 주의 몇번째에 있는지 idx 값을 가져옴
    const lastDay = new Date(year, month + 1, 0); // 현재 년의 다음달의 전날 => 현재 년 월의 마지막 날
    const numberOfDays = lastDay.getDate(); // 현재 년 월의 마지막 '날'의 값을 가져옴
    // 빈 div 생성, 달력 첫째날의 앞을 생성 
    for(let i = 0; i < firstDateIdx; i++){
      let div = document.createElement('div');
      days.appendChild(div);
      div.style.visibility = 'hidden';
    }
    for(let i = 1; i<= numberOfDays; i++){
      let currentData = new Date(year, month, i);   // 현재 년월의 i 번째의 날 값 저장
      let div = document.createElement('div');
      div.innerHTML += i;
      days.appendChild(div);   
      // 사용자 속성에 현재 년 월 일 요일 값 저장
      div.dataset.date = currentData.toLocaleString('ko-KR', 
        {year:'numeric', month:'long', day:'numeric',  timeZone: 'Asia/Seoul' });
      // 현재 년월일과 같은지 하나하나 비교
      if(currentData.getFullYear() === new Date().getFullYear() && 
      currentData.getMonth() === new Date().getMonth() &&
      currentData.getDate() === new Date().getDate()){
        div.classList.add('current');
      }
    }
    displaySelected();
  }
  displayCalendar()
  // 선택한 날짜를 하단에 표시해 주는 함수
  function displaySelected(){
    const dayElement = document.querySelectorAll('.cal-days div');
    for(let day of dayElement){
      day.addEventListener('click', ()=>{
        let selectedDate = day.dataset.date;
          /*  selected.innerHTML = `선택일 : ${selectedDate}`;
            selected.style.display = 'block' */       
        document.getElementById('input-date').value = selectedDate;
        
      })
    }
  }
  calNext.addEventListener('click', ()=>{
    days.innerHTML = '';
    //selected.innerHTML = '';
    if(month > 11){
      month = 0;
      year += 1;
    }
    month += 1;
    today.setMonth(month);
    displayCalendar();
    displayHeader();
  });
  
  calPrev.addEventListener('click', ()=>{
    days.innerHTML = '';
    //selected.innerHTML = '';
    if(month < 0){
      month = 11;
      year -= 1;
    }
    month -= 1;
    today.setMonth(month);
    displayCalendar();
    displayHeader();
  });
  
}
loadCalendar();

// Form의 input 클릭 시 입력창을 띄워주는 함수
function inputFormClicked(){
  for(let ib of inputBox){
    ib.addEventListener('click', ()=>{
      for(let box of inputBox){
        box.querySelector('.input-container').classList.add('hidden');
        box.style.borderColor = 'var(--darkGray)';
      }
      ib.style.borderColor = 'var(--primary)';
      ib.querySelector('.input-container').classList.remove('hidden');
    })
  }
}
inputFormClicked();

//after content에 값을 넘겨주는 함수
function servicesDataset(){
  for(let sd of servicesText){
    sd.dataset.text = sd.innerText;
    let servicesData = sd.dataset.text;
    sd.setAttribute('data-text', servicesData );
    }
}servicesDataset();