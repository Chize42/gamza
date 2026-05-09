const gamjaImg = document.getElementById("gamjaImg");
const heartEffect = document.getElementById("heartEffect");
const loveBar = document.getElementById("loveBar");
const statusText = document.getElementById("statusText");

let isPetting = false;
let loveScore = 0;

// 쓰다듬기 시작
function startPetting() {
  isPetting = true;
  gamjaImg.classList.add("petting-active");
}

// 쓰다듬기 종료
function stopPetting() {
  isPetting = false;
  gamjaImg.classList.remove("petting-active");
  heartEffect.style.opacity = 0;
}

// 쓰다듬는 동작
function handleMove(e) {
  if (!isPetting) return;

  // 마우스 혹은 터치 좌표 가져오기
  const rect = gamjaImg.getBoundingClientRect();
  const x = (e.clientX || e.touches[0].clientX) - rect.left;
  const y = (e.clientY || e.touches[0].clientY) - rect.top;

  // 하트 효과 위치 조절
  heartEffect.style.opacity = 1;
  heartEffect.style.left = `${x - 20}px`;
  heartEffect.style.top = `${y - 20}px`;
  heartEffect.style.transform = `scale(${1 + Math.random()})`;

  // 친밀도 상승
  if (loveScore < 100) {
    loveScore += 0.2;
    loveBar.style.width = `${loveScore}%`;
  }

  if (loveScore >= 100) {
    statusText.innerText = "감자가 너무 행복해해요! ❤️";
  }
}

// 마우스 이벤트
gamjaImg.addEventListener("mousedown", startPetting);
window.addEventListener("mouseup", stopPetting);
gamjaImg.addEventListener("mousemove", handleMove);

// 터치 이벤트 (모바일)
gamjaImg.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    startPetting();
  },
  { passive: false },
);
gamjaImg.addEventListener("touchend", stopPetting);
gamjaImg.addEventListener(
  "touchmove",
  (e) => {
    handleMove(e);
  },
  { passive: false },
);
