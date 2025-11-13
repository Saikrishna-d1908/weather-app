const button = document.getElementById("search-button");
const input = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const cityTime = document.getElementById("city-time");
const cityTemp = document.getElementById("city-temp");

const apiKey = "9f404820e3554e3d9d3124336250711";

async function getData(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`
    );

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    return data;
  } catch (error) {
    alert(error.message);
    return null;
  }
}

button.addEventListener("click", async () => {
  const city = input.value.trim();
  if (!city) return alert("Please enter a city name!");

  const result = await getData(city);
  if (!result) return;

  cityName.innerText = `${result.location.name}, ${result.location.region} - ${result.location.country}`;
  cityTime.innerText = `Local Time: ${result.location.localtime}`;
  cityTemp.innerText = `${result.current.temp_c} °C`;
});
