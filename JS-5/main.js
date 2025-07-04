const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

async function fetchWeather(cityName) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=ae73fd5a5f6b4f2594b151859250307&q=${cityName}&days=3`
  );

  if (response.ok && response.status !== 400) {
    const weatherData = await response.json();
    displayTodayWeather(weatherData.location, weatherData.current);
    displayNextDaysWeather(weatherData.forecast.forecastday);
  }
}

document.getElementById("search").addEventListener("keyup", (event) => {
  fetchWeather(event.target.value);
});

function displayTodayWeather(location, current) {
  if (!current) return;

  const dateObj = new Date(current.last_updated.replace(" ", "T"));
  const dayName = daysOfWeek[dateObj.getDay()];
  const formattedDate = `${dateObj.getDate()} ${
    monthNames[dateObj.getMonth()]
  }`;

  const html = `
    <div class="today forecast">
      <div class="forecast-header" id="today">
        <div class="day">${dayName}</div>
        <div class="date">${formattedDate}</div>
      </div>
      <div class="forecast-content" id="current">
        <div class="location">${location.name}</div>
        <div class="degree">
          <div class="num">${current.temp_c}<sup>o</sup>C</div>
          <div class="forecast-icon">
            <img src="https:${current.condition.icon}" alt="" width="90">
          </div>
        </div>
        <div class="custom">${current.condition.text}</div>
        <span><img src="Images/icon-umberella@2x.png" alt="">20%</span>
        <span><img src="Images/icon-wind@2x.png" alt="">18km/h</span>
        <span><img src="Images/icon-compass@2x.png" alt="">East</span>
      </div>
    </div>`;

  document.getElementById("forecast").innerHTML = html;
}

function displayNextDaysWeather(forecastDays) {
  let html = "";

  for (let i = 1; i < forecastDays.length; i++) {
    const day = forecastDays[i];
    const dateObj = new Date(day.date.replace(" ", "T"));
    const dayName = daysOfWeek[dateObj.getDay()];

    html += `
      <div class="forecast">
        <div class="forecast-header">
          <div class="day">${dayName}</div>
        </div>
        <div class="forecast-content">
          <div class="forecast-icon">
            <img src="https:${day.day.condition.icon}" alt="" width="48">
          </div>
          <div class="degree">${day.day.maxtemp_c}<sup>o</sup>C</div>
          <small>${day.day.mintemp_c}<sup>o</sup></small>
          <div class="custom">${day.day.condition.text}</div>
        </div>
      </div>`;
  }

  document.getElementById("forecast").innerHTML += html;
}

fetchWeather("Cairo");
