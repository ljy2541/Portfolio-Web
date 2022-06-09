scrollTo(0, 0);

// 큐브 회전 애니메이션 (gsap 라이브러리)
let cubeTimeLine = gsap.timeline();
cubeTimeLine.fromTo(
  ".cube",
  { rotationX: 40, rotationY: 70, rotationZ: 20 },
  {
    rotationX: 400,
    rotationY: 430,
    rotationZ: 20,
    duration: 20,
    repeat: -1,
    ease: "none",
  }
);

// 타이틀 생성
const mainTitle = "안녕하세요";
const subTitle = "프론트엔드 개발자 이제연 입니다";

const mainTitleTag = document.querySelector("#mainTitle");
const subTitleTag = document.querySelector("#subTitle");

for (let i = 0; i < mainTitle.length; i++) {
  const span = document.createElement("span");
  span.textContent = mainTitle[i];
  mainTitleTag.appendChild(span);
}

for (let i = 0; i < subTitle.length; i++) {
  const span = document.createElement("span");
  span.textContent = subTitle[i];
  if (span.textContent === " ") {
    span.classList.add("spacing");
  }
  subTitleTag.appendChild(span);
}

// 스크롤 이벤트

const mainTextTransForm = [
  [-50, -10],
  [-30, -70],
  [0, -100],
  [30, -70],
  [50, -10],
];

let subTextTransForm = [];
let translateX = subTitle.length * 2 * -1;
let checkVal = 0;

for (let i = 0; i < subTitle.length; i++) {
  if (checkVal === 0) {
    translateX += 2;
    checkVal++;
  }
  subTextTransForm.push(translateX);
  translateX += 4;
}

let lastScrollY = 0;

const mainSpan = document.querySelector("#mainTitle").children; // 메인타이틀의 자식노드 저장
const subSpan = document.querySelector("#subTitle").children; // 메인타이틀의 자식노드 저장

// 메인 타이틀 이벤트
function mainDownScrollEvent() {
  // 스크롤을 내렸을때
  for (let i = 0; i < mainSpan.length; i++) {
    let t = mainSpan[i];

    gsap.to(t, {
      x: mainTextTransForm[i][0] + "vw",
      y: mainTextTransForm[i][1] + "vh",
      duration: 1.6,
      ease: "power4.out",
      delay: (2 - Math.abs(2 - i)) / 10 + 0.3,
    });
  }
}

function mainUpScrollEvent() {
  for (let i = 0; i < mainSpan.length; i++) {
    let t = mainSpan[i];
    gsap.to(t, {
      x: 0,
      y: 0,
      duration: 1.6,
      ease: "power4.out",
      delay: (2 - Math.abs(2 - i)) / 10 + 0.3,
    });
  }
}

// 서브 타이틀 이벤트
function subDownScrollEvent() {
  for (let i = 0; i < subTextTransForm.length; i++) {
    let t = subSpan[i];
    if (t.className === "spacing") {
      continue;
    }

    gsap.to(t, {
      x: subTextTransForm[i] + "vw",
      y: 0,
      opacity: 0,
      duration: 0.8,
      ease: "power4.out",
      delay: 0.8,
    });
  }
}

function subUpScrollEvent() {
  for (let i = 0; i < subSpan.length; i++) {
    let t = subSpan[i];
    gsap.to(t, {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power4.out",
      delay: 1,
    });
  }
}

function cubeDownScrollEvent() {
  cubeTimeLine.clear();
  cubeTimeLine
    .to(".cube", {
      keyframes: [
        {
          rotationX: 360,
          rotationY: 360,
          rotationZ: 360,
          scale: 0.8,
          duration: 1,
          ease: "power3.out",
        },
        {
          scale: 8,
          rotationX: 360,
          rotationY: 360,
          rotationZ: 300,
          duration: 1,
          ease: "power3.out",
        },
      ],
    })
    .to(".home", {
      opacity: 0,
      display: "none",
    });
}

function cubeUpScrollEvent() {
  cubeTimeLine.clear();
  cubeTimeLine
    .to(".home", {
      opacity: 1,
      display: "block",
    })
    .to(".cube", {
      rotationX: 360,
      rotationY: 360,
      rotationZ: 360,
      duration: 0.5,
      scale: 0.8,
      ease: "power3.out",
      repeat: 0,
    })
    .to(".cube", {
      rotationX: 40,
      rotationY: 70,
      rotationZ: 20,
      duration: 1.5,
      scale: 1,
      delay: 0.1,
      ease: "power3.out",
    })
    .to(".cube", {
      rotationX: 400,
      rotationY: 430,
      rotationZ: 20,
      duration: 20,
      repeat: -1,
      ease: "none",
    });
}

scrollCheck = 0;

window.addEventListener(
  "wheel",
  function (e) {
    e.preventDefault();
  },
  { passive: false }
);

console.log(document.querySelector("#mainTag").children);

document.addEventListener("wheel", (e) => {
  if (e.deltaY > 0 && scrollCheck === 0) {
    mainDownScrollEvent();
    subDownScrollEvent();
    cubeDownScrollEvent();
    scrollCheck++;
  } else if (e.deltaY < 0 && scrollCheck === 1) {
    mainUpScrollEvent();
    subUpScrollEvent();
    cubeUpScrollEvent();
    scrollCheck--;
  }
});
