import { showAlert, showPrompt } from "./modal.js";

async function calculateGrade() {
  const subjects = ["HTML", "CSS", "JavaScript"];
  let total = 0;
  for (const subject of subjects) {
    const input = await showPrompt(`${subject} 점수를 입력하세요.`);
    const score = Number(input);
    if (Number.isNaN(score)) {
      await showAlert("숫자를 입력해 주세요.");
      return;
    }
    total += score;
  }
  const average = total / subjects.length;
  await showAlert(
    `총점: ${total}점, 평균: ${average.toFixed(1)}점, 결과: ${average >= 60 ? "합격입니다!" : "불합격입니다."}`,
  );
}
document
  .querySelector("#grade-start")
  ?.addEventListener("click", calculateGrade);
