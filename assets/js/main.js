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



let currentDataEl = $("#current-data");
let currentMainEl = $("#current-main");
let currentInfoEl;
let fiveDayEl = $("#five-day-container");

let unixToDate = (timestamp) => {
  //Multiply timestamp by 1000 to make it milliseconds
  let date = new Date(timestamp*1000);
  let formattedDate = moment(date.toISOString()).format('M/DD/YY');
  return formattedDate;
}

let getOneCallData = (coord, cityName, weatherIcon) => {
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
        //Format current data
        let title = $("<h2>").addClass("col-12 h2 mb-2").text(cityName);
        let weatherIconEl = $("<i>")
          .addClass("col-12 display-1 mx-5 my-4 wi " + weatherIcon)
          .attr("id", "weather-icon");
        currentMainEl.append(title, weatherIconEl);
        //Temperature
        let temp = data.current.temp;
        let tempEl = $("<div>")
          .addClass("col-6 col-lg-12 fs-3")
          .html(
            '<i class="col-1 wi wi-thermometer text-center"></i> ' +
              Math.round(temp) +
              "&degF <span class='fs-5 text-muted'>feels like " +
              Math.round(data.current.feels_like) +
              "&degF</span>"
          );
        //Wind
        let wind = data.current.wind_speed;
        let windEl = $("<div>")
          .addClass("col-6 col-lg-12 fs-3")
          .html(
            '<i class="col-1 wi wi-strong-wind text-center"></i> ' +
              Math.round(wind) +
              " MPH"
          );
        //Humidity
        let humidity = data.current.humidity;
        let humidityEl = $("<div>")
          .addClass("col-6 col-lg-12 fs-3")
          .html('<i class="col-1 wi wi-humidity text-center"></i> ' + humidity);
        //UV
        let uv = data.current.uvi;
        let uvRating;
        if (uv < 3) uvRating = "success";
        else if (uv < 7) uvRating = "warning";
        else uvRating = "danger";

        let uvEl = $("<div>")
          .addClass("col-6 col-lg-12 fs-3")
          .html(
            '<i class="col-1 wi wi-barometer text-center"></i><span class="px-2 rounded bg-' +
              uvRating +
              '">' +
              uv +
              "</span>"
          );

        currentMainEl.append(tempEl, windEl, humidityEl, uvEl);

        //Format daily data
        for(let i = 1; i <= 5; i++) {
          let time =  unixToDate(data.daily[i].dt);

          let dayCardEl = $('<div>').addClass('card bg-primary col-2');
          let cardTitle = $('<h4>').addClass('fs-4 card-header bg-dark').text(time);
          let cardIcon = $('<i>').addClass('display-4 m-2 wi ' + getIcon(data.daily[i].weather[0].icon));

          let cardTempEl = $('<div>').addClass('col-12').html('<i class="col-1 wi wi-thermometer"></i> ' + data.daily[i].temp.day + "&degF");
          let cardWindEl = $('<div>').addClass('col-12').html('<i class="col-1 wi wi-strong-wind"></i> ' + data.daily[i].wind_speed);
          let cardHumidityEl = $('<div>').addClass('col-12').html('<i class="col-1 wi wi-humidity"></i> ' + data.daily[i].humidity)
          dayCardEl.append(cardTitle, cardIcon, cardTempEl, cardWindEl, cardHumidityEl);

          fiveDayEl.append(dayCardEl);
        }
      });
    } else {
      alert("Error: could not retrieve weather data");
    }
  });
};
let getIcon = (code) => {
  for (let i = 0; i < iconMap.length; i++) {
    if ( code === iconMap[i][0]) {
      let weatherIcon = iconMap[i][1];
      return weatherIcon;
    }
  }
}

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
        let weatherIcon = getIcon(data.weather[0].icon);
        console.log(weatherIcon);
        console.log(data);
        let name = data.name + " " + day;

        getOneCallData(data.coord, name, weatherIcon);
      });
    } else {
      alert("Error: could not retrieve data");
    }
  });
};

getCoord("North Canton");
