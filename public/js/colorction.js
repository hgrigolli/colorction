const API_KEY = "3ba2a4c9be6dffffdb2712b6eeb4e42b";
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?#funcao#&lang=pt_br&appid=${API_KEY}`;

function getClima() {
    var cidade = document.getElementById("cidade").value;
    const funcao = `q=${cidade}`;
    const URL = BASE_URL.replace("#funcao#", funcao);
    fetch(URL).then(
        response => {
            return response.json();
        }).then(json => {
            document.getElementById("cidade-header").innerHTML = cidade;
            document.getElementById("weather-condition").innerHTML = json.weather[0].description;
            const cond = json.weather[0].id / 100;
            if(cond <= 8) {
              document.getElementById("fundo").className = `condition-${Math.floor(cond)}`;
            } else {
              document.getElementById("fundo").className = `condition-${Math.floor(cond)}x`;
            }

        });
}

/**
 {
  "coord": {
    "lon": -122.08,
    "lat": 37.39
  },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 282.55,
    "feels_like": 281.86,
    "temp_min": 280.37,
    "temp_max": 284.26,
    "pressure": 1023,
    "humidity": 100
  },
  "visibility": 10000,
  "wind": {
    "speed": 1.5,
    "deg": 350
  },
  "clouds": {
    "all": 1
  },
  "dt": 1560350645,
  "sys": {
    "type": 1,
    "id": 5122,
    "message": 0.0139,
    "country": "US",
    "sunrise": 1560343627,
    "sunset": 1560396563
  },
  "timezone": -25200,
  "id": 420006353,
  "name": "Mountain View",
  "cod": 200
  }                         

 */