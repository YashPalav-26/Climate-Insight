let cityName = document.querySelector(".weather-city");
let dateTime = document.querySelector(".weather-datetime");
let weatherForecast = document.querySelector(".weather-forecast");
let weatherIcon = document.querySelector(".weather-icon img");
let weatherTemp = document.querySelector(".weather-temperature");
let weatherMinTemp = document.querySelector(".weather-min");
let weatherMaxTemp = document.querySelector(".weather-max");

let weatherFeelsLike = document.querySelector(".weather-feelsLike");
let weatherHumidity = document.querySelector(".weather-humidity");
let weatherWind = document.querySelector(".weather-wind");
let weatherPressure = document.querySelector(".weather-pressure");

let citySearchForm = document.querySelector(".weather-search");
let cityNameInput = document.querySelector(".city-name");

const getCountryName = (code) => {
  return new Intl.DisplayNames(["en"], { type: "region" }).of(code);
};

const getDateTime = (dt, timezoneOffset) => {
  const curDate = new Date((dt + timezoneOffset) * 1000);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC",
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(curDate);
};

let city = "mumbai";

citySearchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  city = cityNameInput.value.trim();
  if (city) {
    getWeatherData();
    cityNameInput.value = "";
  }
});

// Function to fetch and display weather data
const getWeatherData = async () => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=6cb562664f9fac9ad447922c6de72fc3&units=metric`;

  try {
    const res = await fetch(weatherUrl);
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();

    const { main, name, weather, wind, sys, dt, timezone } = data;

    // Update UI with fetched data
    cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
    dateTime.innerHTML = getDateTime(dt, timezone);

    weatherForecast.innerHTML = weather[0].main;
    weatherIcon.src = `http://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;
    weatherIcon.alt = weather[0].description;

    weatherTemp.innerHTML = `${main.temp.toFixed(1)}°C`;
    weatherMinTemp.innerHTML = `Min: ${main.temp_min.toFixed(1)}°C`;
    weatherMaxTemp.innerHTML = `Max: ${main.temp_max.toFixed(1)}°C`;

    weatherFeelsLike.innerHTML = `${main.feels_like.toFixed(1)}°C`;
    weatherHumidity.innerHTML = `${main.humidity}%`;

    weatherWind.innerHTML = `${wind.speed.toFixed(1)} m/s`;
    weatherPressure.innerHTML = `${main.pressure} hPa`;
  } catch (error) {
    console.error("Error fetching weather data:", error);

    cityName.innerHTML = "City not found";
    dateTime.innerHTML = "";

    weatherForecast.innerHTML = "";
    weatherIcon.src = "";

    weatherTemp.innerHTML = "";
    weatherMinTemp.innerHTML = "";

    weatherMaxTemp.innerHTML = "";
    weatherFeelsLike.innerHTML = "N/A";

    weatherHumidity.innerHTML = "N/A";
    weatherWind.innerHTML = "N/A";

    weatherPressure.innerHTML = "N/A";
  }
};

// Fetch weather data on page load
window.addEventListener("load", getWeatherData);
