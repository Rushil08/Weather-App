const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  console.log(req.body.cityName);
  const query = req.body.cityName;
  const key = "5ac79ca1e9fff125f537afc9a974b724";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    key +
    "&units=metric";
  var icon = "";
  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      icon = weatherData.weather[0].icon;
      res.write("<body style='background-color: grey'></body>");
      res.write("<h1>Temp in " + query + " is:" + temp + "</h1>");
      res.write("<h1>Condition is: " + weatherDescription + "</h1>");
      res.write(
        "<img src=" +
          "https://openweathermap.org/img/wn/" +
          icon +
          "@2x.png" +
          ">"
      );
      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
