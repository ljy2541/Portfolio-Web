// 큐브 회전 애니메이션 (gsap 라이브러리)
gsap.timeline().fromTo(
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

const subTextTransForm = [
  [-70, 10],
  [-60, 30],
  [-50, 50],
  [-40, 70],
  [-30, 90],
  [],
  [-20, 110],
  [-10, 130],
  [0, 100],
  [],
  [10, 130],
  [20, 110],
  [30, 90],
  [],
  [40, 70],
  [50, 50],
  [60, 30],
];

console.log();

let lastScrollY = 0;

// 메인 타이틀 이벤트
function mainScrollEvent(e) {
  const mainSpan = document.querySelector("#mainTitle").children; // 메인타이틀의 자식노드 저장
  // 스크롤을 내렸을때
  if (window.scrollY > lastScrollY) {
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
  // 스크롤을 올렸을때
  else {
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
}

// 서브 타이틀 이벤트
function subScrollEvent(e) {
  const subSpan = document.querySelector("#subTitle").children; // 메인타이틀의 자식노드 저장
  // 스크롤을 내렸을때
  if (window.scrollY > lastScrollY) {
    for (let i = 0; i < subSpan.length; i++) {
      let t = subSpan[i];
      if (t.className === "spacing") {
        continue;
      }

      gsap.to(t, {
        x: subTextTransForm[i][0] + "vw",
        y: subTextTransForm[i][1] + "vh",
        duration: 1.6,
        ease: "power4.out",
        delay: (9 - Math.abs(9 - i)) / 10 + 0.3,
      });
    }
  }
  // 스크롤을 올렸을때
  else {
    for (let i = 0; i < subSpan.length; i++) {
      let t = subSpan[i];
      gsap.to(t, {
        x: 0,
        y: 0,
        duration: 1.6,
        ease: "power4.out",
        delay: (9 - Math.abs(9 - i)) / 10 + 0.3,
      });
    }
  }
  lastScrollY = window.scrollY;
}

function cubeScrollEvent() {}

document.addEventListener("scroll", mainScrollEvent);
document.addEventListener("scroll", subScrollEvent);
