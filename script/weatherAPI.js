export async function getWeather(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("날씨 정보를 불러오지 못했습니다.");
  return response.json();
}
