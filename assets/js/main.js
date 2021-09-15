const apiKey = '789f2c7c553ae281ecf566fcce879323';

let response = fetch('https://api.openweathermap.org/data/2.5/onecall?lat=60.99&lon=30.9&appid=' + apiKey)
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

