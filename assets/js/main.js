const apiKey = '789f2c7c553ae281ecf566fcce879323';

let response = fetch('https://api.openweathermap.org/data/2.5/onecall?q=London&appid=' + apiKey);

console.log(response)