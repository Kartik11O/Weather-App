const apikey = `6b616df9910d4bd39c834734240902`;
let SearchVal = " ";
let StartingVal = "delhi";

function start(Value_Onclick) {
  let inputvalue = document.getElementById("Search") //as HTMLInputElement;
  if (inputvalue) {
    let value = inputvalue.value;
    SearchVal = value;
  }

  let click = Value_Onclick;

  console.log("das", SearchVal);
  const Weather = fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${click || SearchVal || StartingVal
    }&aqi=yes`,
    {
      headers: {
        Connection: "keep-alive",
        Vary: "Accept-Encoding",
        "Content-Length": "2334",
        "Content-Type": "text/html",
        Date: "Sun, 11 Feb 2024 07:56:03 GMT",
      },
    }
  );

  Weather.then((V1) => {
    return V1.json();
  }).then((V2) => {
    console.log(V2);
    let Cityname = V2.location.name;
    let Citytime = V2.location.localtime;
    let Citytemp = V2.current.temp_c;
    let CityIcon = V2.current.condition.icon;
    let CityWeatherType = V2.current.condition.text;
    let CityCloud = V2.current.cloud;
    let CityHumidity = V2.current.humidity;
    let CityWind = V2.current.wind_kph;
    let CityRain = V2.current.pressure_in;
    let IMG = document.getElementById("IMG_Cover") //as HTMLImageElement;
    if (IMG == null || CityWeatherType == null) {
      IMG.src =
        "https://media.istockphoto.com/id/1472560341/photo/majestic-dark-cloud-and-sky.jpg?s=2048x2048&w=is&k=20&c=EOFRtOBxkp7bbiphbFkd7LUdu6XQv7551Tz3rGkXPeM=";
    }
    switch (CityWeatherType) {
      case "Clear":
        IMG.src = "/src/assets/all sky/Clear Sky.jpg";
        break;

      case "Partly cloudy":
        IMG.src = "/src/assets/all sky/most clouds.jpg";
        break;
      case "Sunny":
        IMG.src = "/src/assets/all sky/sunny2.jpg";
        break;
      case "Light rain":
        IMG.src = "/src/assets/all sky/rain.jpg";
        break;
      case "Mist":
        IMG.src = "/src/assets/all sky/mist -1.jpg";
        break;
      case "Overcast":
        IMG.src = "src/assets/all sky/overcast.jpg";
        break;
      case "Patchy light snow":
        IMG.src = "src/assets/all sky/Patchy light snow.jpg";
        break;
      case "Light snow":
        IMG.src = "src/assets/all sky/light snow.jpg";
        break;
      default:
        break;
    }

    let Contant = `
   <div id="Contant">
              <div id="Contant-temp">
                <h1 id="temp" class = "test">${Citytemp}°</h1>
                <ul id="UL-1">
                  <li><h1 id="city" class = "test">${Cityname}</h1></li>
                  <li class = "test">
                    <span class="span_D" >${Citytime}</span>
                  </li>
                </ul>
                   <ul id="UL-4">
                  <li>
                    <img class="test"
                      src="${CityIcon}"
                      alt=""
                    />
                  </li>
                  <li class="test"><span id="span_D" >${CityWeatherType}</span></li>
                </ul>
              </div>
            </div>
  
  `;
    let Weather_Time_Temp = document.getElementById(
      "Container__Weather__Details"
    );
    if (Weather_Time_Temp != null) {
      Weather_Time_Temp.innerHTML = Contant;
    } else {
      alert("Error API is not working");
    }

    let WeatherDetails = `
     <ul id="UL-3">
                <li class="F">
                  <h3 class="W_D">Cloudy</h3>
                  <span class="W_D_Number ">${CityCloud}</span>
                </li>
                <li class="G">
                  <h3 class="W_D ">Humidity</h3>
                  <span class="W_D_Number">${CityHumidity}</span>
                </li>
                <li class="H">
                  <h3 class="W_D ">Wind</h3>
                  <span class="W_D_Number">${CityWind}</span>
                </li>
                <li class="I">
                  <h3 class="W_D ">Rain</h3>
                  <span class="W_D_Number">${CityRain}</span>
                </li>
              </ul>
  `;
    let UL_3 = document.getElementById("UL-3");
    if (UL_3 != null) {
      UL_3.innerHTML = WeatherDetails;
    }
  });
}

let inputvalue_Enter = document.getElementById("Search");

inputvalue_Enter?.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    start("");
  }
});
start("");
