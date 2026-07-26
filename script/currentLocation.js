const locationEl = document.querySelector("#current-location");

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("이 브라우저는 위치 정보를 지원하지 않습니다."));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      timeout: 5000,
    });
  });
}

async function renderCurrentLocation() {
  try {
    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ko`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("위치 정보를 불러오지 못했습니다.");
    const data = await response.json();
    const place = [data.city, data.locality].filter(Boolean).join(" ");
    locationEl.textContent = `현재 위치: ${place || "확인 불가"}`;
  } catch (error) {
    locationEl.textContent =
      "현재 위치: 확인 불가 (위치 권한을 허용해 주세요)";
  }
}

if (locationEl) renderCurrentLocation();
