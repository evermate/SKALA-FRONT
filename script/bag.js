import { showAlert } from "./modal.js";

async function showMyBag() {
  const myBag = [
    { name: "노트북", quantity: 1 },
    { name: "출입증", quantity: 1 },
    { name: "이어폰", quantity: 1 },
    { name: "볼펜", quantity: 3 },
    { name: "에너지 드링크", quantity: 2 },
  ];
  const itemLines = myBag.map((item) => `${item.name}: ${item.quantity}개`);
  await showAlert([...itemLines, `총 물품 종류: ${myBag.length}가지`].join("\n"));
}
document.querySelector("#bag-start")?.addEventListener("click", showMyBag);
