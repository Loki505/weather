const API_key ='06c1dee9b95ad04571102398190b9950';
const form = document.querySelector('.form');
const input = document.querySelector('.form__input');

form.onsubmit = submitHandler;

async function submitHandler(e){
    e.preventDefault();

    if(!input.value.trim()){
        console.log(('Enter City name'));
        return
    }

   const cityName = input.value.trim();
   input.value = '';

   const cityInfo = await getGeo(cityName
   );
   if(cityInfo.length === 0) return;

   const weatherInfo = await getWeather(cityInfo[0]['lat'], cityInfo[0]['lon']);

   const weatherDate = {
       name: weatherInfo.name,
       temp: weatherInfo.main.temp,
       humidity: weatherInfo.main.humidity,
       speed: weatherInfo.wind.speed,
       weather: weatherInfo.weather[0]
   }
    renderWeatherData(weatherDate);
}

async function getGeo(name){
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${API_key}`;
    const response = await fetch(geoUrl);
    return response.json();
}

async function getWeather(lat, lon){
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_key}`
    const response = await fetch(weatherUrl);
    return response.json();
}

function renderWeatherData(data){
    document.querySelector('.weather__info').classList.remove('none');
    document.querySelector('.weather__details').classList.remove('none');

    const temp = document.querySelector('.weather__temp');
    const city = document.querySelector('.weather__city');
    const humidity = document.querySelector('#humidity');
    const speed = document.querySelector('#speed');
    const img = document.querySelector('.weather__img');

    temp.innerText = Math.round(data.temp) + ' C';
    city.innerText = data.name;
    humidity.innerText = data.humidity+" %";
    speed.innerText = data.speed+" km/h";

    img.src = ` https://openweathermap.org/img/wn/${data.weather.icon}@2x.png`;
    img.alt = data.weather.description
}
