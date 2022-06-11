// 이벤트 실행 조건 변수
let eventOn = false;
let scrollCheck = false;
let sectionCheck = 0;

const skillPercent = {
  html: 80,
  css: 80,
  js: 60,
  react: 30,
};

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
      visibility: "hidden",
    });
}

function cubeUpScrollEvent() {
  cubeTimeLine.clear();
  cubeTimeLine
    .to(".home", {
      visibility: "visible",
      opacity: 1,
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

// 섹션 출력
const sectionNode = document.getElementsByTagName("section");

function sectionOnEvent(sectionCheckNum) {
  console.log(`${sectionCheckNum}이 들어왔습니다`);
  let openTitle = sectionNode
    .item(sectionCheckNum)
    .querySelector(".open_title");
  let article = sectionNode.item(sectionCheckNum).querySelector("article");
  sectionNode.item(sectionCheckNum).classList.add("on");
  openTitle.setAttribute("class", "open_title on");
  setTimeout(() => openTitle.setAttribute("class", "open_title"), 2000);
  setTimeout(() => article.classList.add("on"), 3000);

  if (sectionCheckNum === 2) {
    setTimeout(() => {
      skillPercentEvent(skillPercent);
    }, 4000);
  }

  if (sectionCheckNum !== 2) {
    skillPercentEventInit();
  }
}

function sectionOffEvent(sectionCheckNum) {
  const article = sectionNode.item(sectionCheckNum).querySelector("article");
  article.classList.remove("on");
  skillPercentEventInit();
  sectionNode.item(sectionCheckNum).classList.remove("on");
}

// 스킬 퍼센트 카운팅 이벤트
function skillPercentEvent(percent) {
  console.log(percent);
  for (let value in percent) {
    const skillName = document.getElementById(value);
    const fillBar = skillName.querySelector(".fillBar");
    const percentText = skillName.querySelector(".percent");
    let count = 0;
    fillBar.style.width = `0%`;
    let counting = setInterval(() => {
      if (count == skillPercent[value]) {
        clearInterval(counting);
        return false;
      }
      count++;
      fillBar.style.width = `${count}%`;
      percentText.textContent = `${count}%`;
    }, 20);
  }
}

function skillPercentEventInit() {
  const fillBar = document.getElementsByClassName("fillBar");
  const percentText = document.getElementsByClassName("percent");

  for (let i = 0; i < fillBar.length; i++) {
    fillBar.item(i).style.width = `0%`;
    percentText.item(i).textContent = `0%`;
  }
}

function homeSectionDownEvent() {
  mainDownScrollEvent();
  subDownScrollEvent();
  cubeDownScrollEvent();
}

function homeSectionUpEvent() {
  mainUpScrollEvent();
  subUpScrollEvent();
  cubeUpScrollEvent();
}

/* 이벤트 실행 영역 */
window.addEventListener(
  "wheel",
  function (e) {
    e.preventDefault();
  },
  { passive: false }
);

document.addEventListener("wheel", (e) => {
  console.log(eventOn);
  if (eventOn) return;

  if (e.deltaY > 0 && !scrollCheck && sectionCheck === 0) {
    eventOn = true;
    homeSectionDownEvent();
    scrollCheck = true;
    sectionCheck++;
    setTimeout(() => sectionOnEvent(sectionCheck), 2000);
  } else if (e.deltaY < 0 && scrollCheck && sectionCheck === 0) {
    eventOn = true;
    homeSectionUpEvent();
    scrollCheck = false;
  } else if (e.deltaY > 0 && scrollCheck && sectionCheck >= 1) {
    if (sectionNode.length - 1 <= sectionCheck) {
      sectionCheck = sectionNode.length - 1;
      return;
    }

    eventOn = true;
    sectionCheck++;
    sectionOnEvent(sectionCheck);

    if (sectionCheck >= 2) {
      sectionOffEvent(sectionCheck - 1);
    }
  } else if (e.deltaY < 0 && scrollCheck && sectionCheck >= 1) {
    eventOn = true;
    if (sectionCheck === 1) {
      homeSectionUpEvent();
      scrollCheck = false;
      sectionOffEvent(sectionCheck);
      sectionCheck--;
      setTimeout(() => (eventOn = false), 3000);
      return;
    }
    sectionOffEvent(sectionCheck);
    sectionCheck--;
    sectionOnEvent(sectionCheck);
  }
  console.log(e.deltaY);
  console.log(sectionCheck);
  setTimeout(() => (eventOn = false), 3000);
});
