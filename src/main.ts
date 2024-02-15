const apikey = `6b616df9910d4bd39c834734240902`;
let SearchVal = " ";
let StartingVal = "New York";

function start(Value_Onclick: string) {
  let inputvalue = document.getElementById("Search") as HTMLInputElement;
  if (inputvalue) {
    let value = inputvalue.value;
    SearchVal = value;
  }

  let click = Value_Onclick;

  console.log("das", SearchVal);
  const Weather = fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${
      click || SearchVal || StartingVal
    }&days=7&aqi=yes`,
    {
      headers: {
        "Transfer-Encoding": "chunked",
        Connection: "keep-alive",
        Vary: "Accept-Encoding",
        "CDN-PullZone": "93447",
        "CDN-Uid": "8fa3a04a-75d9-4707-8056-b7b33c8ac7fe",
        "CDN-RequestCountryCode": "GB",
        Age: "0",
        "x-weatherapi-qpm-left": "4999674",
        "CDN-ProxyVer": "1.04",
        "CDN-RequestPullSuccess": "True",
        "CDN-RequestPullCode": "200",
        "CDN-CachedAt": "02/14/2024 12:11:53",
        "CDN-EdgeStorageId": "860",
        "CDN-Status": "200",
        "CDN-RequestId": "54d0430fb743f995a8e0a024f42db881",
        "CDN-Cache": "MISS",
        "Cache-Control": "public, max-age=180",
        "Content-Type": "application/json",
        Date: "Wed, 14 Feb 2024 12:11:53 GMT",
        Server: "BunnyCDN-DE1-863",
        Via: "1.1 haproxy-api-1 (Varnish/7.3)",
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
    let IMG = document.getElementById("IMG_Cover") as HTMLImageElement;
    if (IMG == null || CityWeatherType == null) {
      IMG.src =
        "https://media.istockphoto.com/id/1472560341/photo/majestic-dark-cloud-and-sky.jpg?s=2048x2048&w=is&k=20&c=EOFRtOBxkp7bbiphbFkd7LUdu6XQv7551Tz3rGkXPeM=";
    }

    // Forecast (7-days)
    let Week = V2.forecast.forecastday;
    let add = "";
    Week.map((items: any) => {
      let Week_Date = items.date;
      var Week_day = Week_Date.substring(8, 10); // Extract characters at index 8 and 9
      let Week_Icon = items.day.condition.icon;
      let Week_temp = items.day.avgtemp_c;
      console.log(items);

      let Week = `
         <li class="F">
              <h3 class="W_D">${Week_day}</h3>
               <span class="Weekly_Temp-logo "><img class="IMG_Weekly"
                  src="${Week_Icon}"alt=""></span>
              <span class="Weekly_Temp-logo ">${Week_temp}°
</span>
            </li>
      `;
      add += Week;
    });
    let UL5 = document.getElementById("UL-5");
    if (UL5 != null) {
      UL5.innerHTML = add;
    }

    // This adding Wallpapers to backround
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
  // UL5_em?.remove();
}

let inputvalue_Enter = document.getElementById("Search");

inputvalue_Enter?.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    start("");
    let UL5_em = document.getElementById("UL-5");
  }
});
start("");
