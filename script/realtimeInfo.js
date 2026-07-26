import { getWeather } from "./weatherAPI.js";
const cities = {
  seoul: { name: "서울", lat: 37.5665, lon: 126.978 },
  busan: { name: "부산", lat: 35.1796, lon: 129.0756 },
  jeju: { name: "제주", lat: 33.4996, lon: 126.5312 },
  tokyo: { name: "도쿄", lat: 35.6762, lon: 139.6503 },
  newyork: { name: "뉴욕", lat: 40.7128, lon: -74.006 },
  london: { name: "런던", lat: 51.5074, lon: -0.1278 },
  paris: { name: "파리", lat: 48.8566, lon: 2.3522 },
  beijing: { name: "베이징", lat: 39.9042, lon: 116.4074 },
  sydney: { name: "시드니", lat: -33.8688, lon: 151.2093 },
  dubai: { name: "두바이", lat: 25.2048, lon: 55.2708 },
  singapore: { name: "싱가포르", lat: 1.3521, lon: 103.8198 },
};
const select = document.querySelector("#city-select");
const box = document.querySelector("#weather-box");

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

async function renderWeather() {
  box.classList.remove("fade-in");
  box.innerHTML =
    '<span class="spinner" aria-hidden="true"></span><span class="sr-only">로딩 중</span>';
  try {
    let city;
    if (select.value === "me") {
      const position = await getCurrentPosition();
      city = {
        name: "내 위치",
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      };
    } else {
      city = cities[select.value];
    }
    const data = await getWeather(city.lat, city.lon);
    const c = data.current;
    box.innerHTML = `<strong>${city.name}</strong><span>좌표 ${city.lat.toFixed(4)}, ${city.lon.toFixed(4)}</span><b>${c.temperature_2m}°C</b><span>습도 ${c.relative_humidity_2m}%</span>`;
    box.classList.add("fade-in");
  } catch (error) {
    const message =
      select.value === "me"
        ? "위치 정보를 가져오지 못했습니다. 브라우저 위치 권한을 허용하거나 도시를 선택해 주세요."
        : "날씨 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.";
    box.innerHTML = `<span>${message}</span>`;
    box.classList.add("fade-in");
  }
}
select?.addEventListener("change", renderWeather);
if (select) renderWeather();
