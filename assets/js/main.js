const apiKey = '789f2c7c553ae281ecf566fcce879323';



let getWeatherData = (coord) => {
  let response = fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + coord.lat + '&lon=' + coord.lon + '&appid=' + apiKey)
    .then((response) => {
      // request was successful
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data)
        });
      } else {
        alert("Error: could not retrieve weather data");
      }
    });
}

let getCityCoordinates = (city) => {
  let response = fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey)
    .then((response) => {
      // request was successful
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data)
          getWeatherData(data.coord)
        });
      } else {
        alert("Error: could not retrieve weather data");
      }
    });
}

getCityCoordinates('Cleveland')