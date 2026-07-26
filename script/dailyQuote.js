const quotes = [
  "오늘 이해 안 되던 것도 내일은 익숙해진다.",
  "작게 나눠서 하나씩, 그게 제일 빠른 길이다.",
  "막히면 일단 손으로 적어보자. 생각이 정리된다.",
  "어제보다 한 줄 더 아는 오늘이면 충분하다.",
  "완벽한 계획보다 시작한 한 걸음이 낫다.",
  "질문은 부끄러운 게 아니라 가장 빠른 지름길이다.",
  "에러 메시지는 적, 힌트가 아니라 안내문이다.",
  "오늘 못 푼 문제는 내일의 준비운동이다.",
  "꾸준함은 재능보다 오래 남는다.",
  "쉬는 것도 공부의 일부다.",
];

const quoteEl = document.querySelector("#daily-quote");

function dayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  return Math.floor(diff / 86400000);
}

if (quoteEl) {
  quoteEl.textContent = quotes[dayOfYear() % quotes.length];
}
