const gamjaImg = document.getElementById("gamjaImg");
const heartEffect = document.getElementById("heartEffect");
const loveBar = document.getElementById("loveBar");
const statusText = document.getElementById("statusText");

let isPetting = false;
let loveScore = 0;
let idleTimer = null; // 3초 대기용 타이머
let decreaseInterval = null; // 수치 감소용 인터벌

// 1. 친밀도 감소 로직
function startDecreasing() {
  // 이미 감소 중이면 중복 실행 방지
  if (decreaseInterval) return;

  decreaseInterval = setInterval(() => {
    if (loveScore > 0 && !isPetting) {
      loveScore -= 0.5; // 감소 속도 (조절 가능)
      if (loveScore < 0) loveScore = 0;

      updateUI();
    } else if (loveScore <= 0 || isPetting) {
      stopDecreasing();
    }
  }, 100); // 0.1초마다 조금씩 감소
}

function stopDecreasing() {
  clearInterval(decreaseInterval);
  decreaseInterval = null;
}

// 2. 화면 업데이트 로직
function updateUI() {
  loveBar.style.width = `${loveScore}%`;

  if (loveScore >= 100) {
    statusText.innerText = "감자가 너무 행복해해요! ❤️";
  } else if (loveScore > 0) {
    statusText.innerText = "오구오구~ 기분 좋다멍!";
  } else {
    statusText.innerText = "감자의 머리를 부드럽게 쓰다듬어 주세요!";
  }
}

// 3. 쓰다듬기 시작
function startPetting() {
  isPetting = true;
  gamjaImg.classList.add("petting-active");

  // 쓰다듬기 시작하면 감소 로직과 타이머 모두 정지
  stopDecreasing();
  clearTimeout(idleTimer);
}

// 4. 쓰다듬기 종료
function stopPetting() {
  if (!isPetting) return;
  isPetting = false;
  gamjaImg.classList.remove("petting-active");
  heartEffect.style.opacity = 0;

  // 멈춘 후 3초 뒤부터 수치 감소 시작
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    startDecreasing();
  }, 3000); // 3000ms = 3초
}

// 5. 쓰다듬는 동작 (이동)
function handleMove(e) {
  if (!isPetting) return;

  const rect = gamjaImg.getBoundingClientRect();
  const clientX = e.clientX || (e.touches && e.touches[0].clientX);
  const clientY = e.clientY || (e.touches && e.touches[0].clientY);

  const x = clientX - rect.left;
  const y = clientY - rect.top;

  heartEffect.style.opacity = 1;
  heartEffect.style.left = `${x - 20}px`;
  heartEffect.style.top = `${y - 20}px`;

  // 친밀도 상승
  if (loveScore < 100) {
    loveScore += 0.4; // 상승 속도
    if (loveScore > 100) loveScore = 100;
  }

  updateUI();
}

// 이벤트 리스너 연결
gamjaImg.addEventListener("mousedown", startPetting);
window.addEventListener("mouseup", stopPetting);
gamjaImg.addEventListener("mousemove", handleMove);

// 터치 이벤트 (모바일 대응)
gamjaImg.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    startPetting();
  },
  { passive: false },
);
gamjaImg.addEventListener("touchend", stopPetting);
gamjaImg.addEventListener("touchmove", handleMove, { passive: false });
