const key = 'YOUR_OPENWEATHER_API';
const city_name = 'YOUR_LOCATION';


// getAir(); 
getWeatherInfo();

function getWeatherInfo() {
	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${key}`)
	.then(function (response) {
		return response.json();
	})
	// .then(data => console.log(data))
	.then(function (data) {
		celcius = Math.round(parseFloat(data.main.temp)-273.15);
		fahrenheit = Math.round(((parseFloat(data.main.temp)-273.15)*1.8)+32);
		description = data.weather[0].description.replace(/^\w/, function(c) {
    		return c.toUpperCase();
});
		humidity = Math.round(parseFloat(data.main.humidity)); 
		speed = Math.round(parseFloat(data.wind.speed)*3.6); 
		direction = parseFloat(data.wind.deg) 

		convert = {
    		toCompass: function(direction)
	    		{
	        		return ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'][Math.round(direction / 11.25 / 2)];
	    		}
			}
			compass = convert.toCompass(direction)


	})
	.then(function () {
		drawWeather();
	})
	.catch(function (error) {
		if (key == '') {
			document.getElementById('header__weather__alert').innerHTML = 'remember to add your api key';
		} else if (city_name == '') {
			document.getElementById('header__weather__alert').innerHTML = 'remember to add city name';
		}
		 else {
			document.getElementById('header__weather__alert').style.display = 'none';
			document.getElementById('header__weather__info').innerHTML = `n/a`;
			document.getElementById('header__humidity__info').innerHTML = `n/a`;
			document.getElementById('header__speed__info').innerHTML = `n/a`;
			document.getElementById('header__speed__dir').innerHTML = `n/a`
			// document.getElementById('header__air__qlty').innerHTML = `n/a`
			console.log(error);
		}
    });
	setTimeout(getWeatherInfo, 1800000);
} 

getAir(); 

function getAir() {
	fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=25&lon=121&appid=YOUR_API_KEY`)
	.then(function (response) {
		return response.json();
	})
	// .then(d => console.log(d))
	.then(function (data) {
		aqi = parseFloat(data.list[0].main.aqi) 
		co2 = data.list[0].components.co
		o3 = data.list[0].components.o3
		pm25 = data.list[0].components.pm2_5
		// if (aqi = 1) {
		// 	aqi = 'Good';
		// } else if (aqi = 2) {
		// 	aqi = 'Fair';
		// } else if (aqi =3) {
		// 	aqi = 'Moderate';
		// } else if (aqi =4) {
		// 	aqi = 'Poor';
		// } else {
		// 	aqi = 'Very Poor';
 	// 	}

	})
	.then(function () {
		drawWeather();
	})
	.catch(function (error) {
		if (key == '') {
			document.getElementById('header__weather__alert').innerHTML = 'remember to add your api key';
		} else if (city_name == '') {
			document.getElementById('header__weather__alert').innerHTML = 'remember to add city name';
		}
		 else {
			document.getElementById('header__air__qlty').innerHTML = `n/a`
			console.log(error);
		}
    });
}


// function getAir() {
// 	fetch(`http://api.airvisual.com/v2/nearest_city?key=e7a35f18-fc4b-447c-9ce9-e909035c7fec`)
// 	.then(function (response) {
// 		return response.json();
// 	})
// 	// .then(d => console.log(d))
// 	.then(function (data) {
// 		aqi = data.current.pollution
// 	})
// 	// .then(aqi => console.log(aqi))
// 	.then(function () {
// 		drawAqi();
// 	})
// }


function drawWeather() {
	document.getElementById('header__weather__info').innerHTML = `${description}, <span class="header__weather__temp">${celcius}\u00B0C</span>`;
	document.getElementById('header__humidity__info').innerHTML = `<span class="header__humidity__info">, Humidity:</span> <span class="header__weather__temp">${humidity}%</span>`;
	document.getElementById('header__speed__info').innerHTML = `<span class="header__humidity__info">, W.Speed:</span> <span class="header__weather__temp">${speed} km/h</span>`;
	document.getElementById('header__speed__dir').innerHTML = `<span class="header__speed__dir"> Dir: </span> <span class="header__weather__temp">${compass}</span>`; 	
	document.getElementById('header__air__qlty').innerHTML = `<span class="header__speed__dir"> AQI: </span> <span class="header__weather__temp">${aqi}</span>`
}

