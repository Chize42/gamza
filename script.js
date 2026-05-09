const gamjaImg = document.getElementById("gamjaImg");
const heartEffect = document.getElementById("heartEffect");
const loveBar = document.getElementById("loveBar");
const statusText = document.getElementById("statusText");

let isPetting = false;
let loveScore = 0;
let decreaseInterval = null;

// 1. 친밀도 감소 로직 (속도 대폭 증가)
function startDecreasing() {
  if (decreaseInterval) return;

  decreaseInterval = setInterval(() => {
    if (loveScore > 0 && !isPetting) {
      // 감소 수치를 1.5로 높여서 훨씬 빠르게 줄어들게 설정
      loveScore -= 1.5;
      if (loveScore < 0) loveScore = 0;

      updateUI();
    } else if (loveScore <= 0 || isPetting) {
      stopDecreasing();
    }
  }, 50); // 실행 간격을 0.05초로 줄여 더 부드럽고 빠르게 감소
}

function stopDecreasing() {
  clearInterval(decreaseInterval);
  decreaseInterval = null;
}

// 2. UI 업데이트
function updateUI() {
  loveBar.style.width = `${loveScore}%`;

  if (loveScore >= 100) {
    statusText.innerText = "감자가 너무 행복해해요! ❤️";
  } else if (loveScore > 0) {
    statusText.innerText = "감자가 당신을 좋아해요! 계속 쓰다듬어 주세요!";
  } else {
    statusText.innerText = "감자의 머리를 부드럽게 쓰다듬어 주세요!";
  }
}

// 3. 쓰다듬기 시작
function startPetting() {
  isPetting = true;
  gamjaImg.classList.add("petting-active");
  stopDecreasing(); // 누르는 즉시 감소 중단
}

// 4. 쓰다듬기 종료 (딜레이 없이 즉시 실행)
function stopPetting() {
  if (!isPetting) return;
  isPetting = false;
  gamjaImg.classList.remove("petting-active");
  heartEffect.style.opacity = 0;

  // 3초 대기 없이 즉시 감소 로직 시작
  startDecreasing();
}

// 5. 쓰다듬는 동작
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

  // 상승 수치 (감소 속도에 맞춰 밸런스 조정)
  if (loveScore < 100) {
    loveScore += 0.8;
    if (loveScore > 100) loveScore = 100;
  }

  updateUI();
}

// 이벤트 연결
gamjaImg.addEventListener("mousedown", startPetting);
window.addEventListener("mouseup", stopPetting);
gamjaImg.addEventListener("mousemove", handleMove);

// 터치 이벤트
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
