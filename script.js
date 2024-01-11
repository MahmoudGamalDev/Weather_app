let getLocation = () => {
  return new Promise((resolve, reject) => {
    let success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      resolve({ latitude, longitude });
    };

    let error = () => {
      reject("Unable to retrieve your location");
      alert("Unable to retrieve your location");
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      reject("Geolocation is not supported by your browser");
      alert("Geolocation is not supported by your browser");
    }
  });
};

let search = document.querySelector(".search input");
let submitBtn = document.querySelector('button[type="submit"]');

let searchCity = async () => {
  let key = "0150b5277f0d45438b475635240701";
  let result = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${search.value}&days=7`
  );
  let data = await result.json();
  displayWeather(data);
};

let getWeather = async () => {
  let { latitude, longitude } = await getLocation();
  let key = "0150b5277f0d45438b475635240701";
  let result = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${latitude},${longitude}&days=7`
  );
  let data = await result.json();
  displayWeather(data);
};

getWeather();

let displayWeather = (data) => {
  let weekForecastObj = data.forecast.forecastday;
  const daysElements = document.querySelectorAll(".week .day");
  let city = document.querySelector("h3");

  city.textContent = `Week forecast for ${data.location.name}`;

  for (let i = 0; i < daysElements.length; i++) {
    let day = new Date(`${weekForecastObj[i].date}`).toLocaleDateString(
      "en-US",
      {
        weekday: "long",
      }
    );

    daysElements[i].innerHTML = `<p class="m-0 fs-4 fw-semibold">${day}</p>
      <p class="m-0">${weekForecastObj[i].date}</p>
      <picture><img src="${weekForecastObj[i].day.condition.icon}" alt="cloud and sun"></picture>
      <p class="m-0 fw-bold fs-4">${weekForecastObj[i].day.avgtemp_c} C</p>
      <p class="m-0">${weekForecastObj[i].day.condition.text}</p>`;
  }
};
