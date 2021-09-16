const apiKey = "789f2c7c553ae281ecf566fcce879323";

let iconMap = [
  ["11d", "wi-thunderstorm"],
  ["09d", "wi-showers"],
  ["10d", "wi-rain"],
  ["13d", "wi-snow"],
  ["50d", "wi-dust"],
  ["01d", "wi-day-sunny"],
  ["01n", "wi-night-clear"],
  ["02d", "wi-day-cloudy"],
  ["03d", "wi-day-cloudy"],
  ["04d", "wi-day-cloudy"],
  ["02n", "wi-night-cloudy"],
  ["03n", "wi-night-cloudy"],
  ["04n", "wi-night-cloudy"],
];

let day = moment().format("M/DD/YY");
console.log(day);

let currentDataEl = $("#current-data");
let fiveDayEl = $("#five-day");

let getOneCallData = (coord) => {
  let response = fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      coord.lat +
      "&lon=" +
      coord.lon +
      "&units=imperial" +
      "&appid=" +
      apiKey
  ).then((response) => {
    // request was successful
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        let weatherIcon = $("<i>").addClass("wi");
        //Temperature
        let temp = data.current.temp;
        let tempEl = $("<p>")
          .attr("id", "temperature")
          .addClass("fs-4 ms-4")
          .html(
            '<i class="wi wi-thermometer "></i> ' +
              Math.round(temp) +
              String.fromCharCode(176) +
              "F"
          );
        currentDataEl.append(tempEl);
        //Wind
        let wind = data.current.wind_speed;
        let windEl = $("<p>")
          .attr("id", "wind-speed")
          .addClass("fs-4 ms-4")
          .html('<i class="wi wi-strong-wind "></i> ' + wind + " MPH");
        currentDataEl.append(windEl);
        //Humidty
        let humidity = data.current.humidity;
        let humidityEl = $("<p>")
          .attr("id", "humidity")
          .addClass("ms-4")
          .text("Humidity: " + humidity + "%");
        currentDataEl.append(humidityEl);
        //UV Index
        let uv = data.current.uvi;
        let uvEl = $("<p>")
          .attr("id", "uv")
          .addClass("ms-4")
          .html(
            'UV Index: <span class="bg-success text-light py-1 px-2 ml-2 rounded">' +
              uv +
              "</span>"
          );
        currentDataEl.append(uvEl);
      });
    } else {
      alert("Error: could not retrieve weather data");
    }
  });
};

let getCoord = (city) => {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial" +
      "&appid=" +
      apiKey
  ).then((response) => {
    // request was successful
    if (response.ok) {
      response.json().then(function (data) {
        let weatherIcon;
        for (let i = 0; i < iconMap.length; i++) {
          if (data.weather[0].icon === iconMap[i][0]) {
            weatherIcon = iconMap[i][1];
            break;
          }
        }
        console.log(weatherIcon);
        console.log(data);
        currentDataEl.empty();
        let name = data.name + " " + day;
        let cityNameEl = $("<h2>")
          .attr("id", "city")
          .addClass("d-flex align-items-center")
          .html(
            '<i class="wi ' + weatherIcon + ' display-2 mr-2"></i> ' + name
          );
        currentDataEl.append(cityNameEl);

        getOneCallData(data.coord);
      });
    } else {
      alert("Error: could not retrieve data");
    }
  });
};

getCoord("Cleveland");
