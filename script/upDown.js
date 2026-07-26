import { showAlert, showPrompt, setSecretHandler } from "./modal.js";

const gameButton = document.querySelector("#game-start");
const successCountEl = document.querySelector("#game-success-count");
const MAX_TRIES = 5;
let isPlaying = false;

function todayKey() {
  return new Date().toLocaleDateString("sv-SE");
}

function getSuccessCount() {
  const saved = JSON.parse(localStorage.getItem("upDownSuccess") || "null");
  return saved && saved.date === todayKey() ? saved.count : 0;
}

function setSuccessCount(count) {
  localStorage.setItem(
    "upDownSuccess",
    JSON.stringify({ date: todayKey(), count }),
  );
}

function renderSuccessCount() {
  if (successCountEl) {
    successCountEl.textContent = `오늘 성공 ${getSuccessCount()}회`;
  }
}

renderSuccessCount();

async function playOneRound() {
  const answer = Math.floor(Math.random() * 50) + 1;
  let count = 0;
  setSecretHandler(() => console.log(`[디버그] 정답은 ${answer}입니다.`));

  const finalInput = await showPrompt(
    "1부터 50 사이의 숫자를 입력하세요.",
    `기회 ${count}/${MAX_TRIES}`,
    (value) => {
      const n = Number(value);
      if (!Number.isInteger(n) || n < 1 || n > 50) return false;
      count += 1;
      if (n === answer || count >= MAX_TRIES) return true;
      return {
        hint: n > answer ? "Down!" : "Up!",
        meta: `기회 ${count}/${MAX_TRIES}`,
        tone: n > answer ? "down" : "up",
      };
    },
    "1부터 50 사이의 숫자를 입력해 주세요.",
  );
  setSecretHandler(null);
  if (finalInput === null) return false;

  if (Number(finalInput) === answer) {
    setSuccessCount(getSuccessCount() + 1);
    renderSuccessCount();
    return await showAlert(
      `축하합니다! ${count}번 만에 맞추셨습니다. 성공!`,
      "한 판 더",
      "success",
    );
  }
  return await showAlert(
    `아쉽지만 실패! 정답은 ${answer}였습니다.`,
    "한 판 더",
    "fail",
  );
}

async function startUpDown() {
  if (isPlaying) return;
  isPlaying = true;
  try {
    let playAgain = true;
    while (playAgain) {
      playAgain = await playOneRound();
    }
  } finally {
    isPlaying = false;
  }
}
gameButton?.addEventListener("click", startUpDown);
