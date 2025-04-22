let cityName = document.getElementById("cityName");
let temperature = document.getElementById("temperature");
let cityHeading = document.getElementById("cityHeading");
let humidity = document.getElementById("humidity");
let highLow = document.getElementById("highLow");
let windSpeed = document.getElementById("windSpeed");
let description = document.getElementById("description");
let conditionIcon = document.getElementById("conditionIcon");
let weatherIcon = document.getElementById("weatherIcon");
let weatherContainer = document.getElementById("weatherContainer");
let date = document.getElementById("date");


function getStart() {
	navigator.geolocation.getCurrentPosition(
		function (position) {
			let lat = position.coords.latitude;
			let long = position.coords.longitude;

			axios(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=88fc2c0f5e418885265876793f73bc67&units=metric`)
				.then((res) => {

					const data = res.data;
					const speedMps = data.wind.speed;
					const speedKmph = (speedMps * 3.6).toFixed(0);
					const weatherCondition = data.weather[0].main;
					const maxTemp = Math.round(data.main.temp_max);
					const minTemp = Math.floor(data.main.temp_min);
					const dt = new Date().toString();
					const stringDate = dt.slice(0, 15);
					const localDate = stringDate.split(' ').join("/");



					// Time Pata karny ky lye:

					const sunriseTime = data.sys.sunrise;
					const sunsetTime = data.sys.sunset;
					const currentTime = Math.floor(Date.now() / 1000);
					const timezoneOffset = data.timezone;
					const localSunrise = sunriseTime + timezoneOffset;
					const localSunset = sunsetTime + timezoneOffset;
					const localTime = currentTime + timezoneOffset;


					// Dom Manupulation:

					temperature.innerHTML = Math.round(data.main.temp) + "°C";
					cityHeading.innerHTML = data.name;
					humidity.innerHTML = data.main.humidity + "%";
					highLow.innerHTML = `H:${maxTemp}  L:${minTemp}`
					windSpeed.innerHTML = speedKmph + " km/h";
					description.innerHTML = weatherCondition;
					date.innerHTML = localDate;

					if (weatherCondition === "Clear") {
						conditionIcon.innerHTML = `<i class="fa-solid fa-moon"></i>`
					} else if (weatherCondition === "Snow") {
						conditionIcon.innerHTML = `<i class="fa-solid fa-snowflake"></i>`
					} else if (weatherCondition === "Rain") {
						conditionIcon.innerHTML = `<i class="fa-solid fa-cloud-rain"></i>`
					} else if (weatherCondition === "Thunderstorm") {
						conditionIcon.innerHTML = `<i class="fa-solid fa-cloud-bolt"></i>`
					} else if (weatherCondition === "Clouds") {
						conditionIcon.innerHTML = `<i class="fa-solid fa-cloud"></i>`
					} else if (weatherCondition === "Mist" || weatherCondition === "Haze" || weatherCondition === "Fog" || weatherCondition === "Dust") {
						conditionIcon.innerHTML = `<i class="fa-solid fa-smog"></i>`
					} else if (weatherCondition === "Drizzle") {
						conditionIcon.innerHTML = `<i class="fa-solid fa-cloud-rain"></i>`
					} else {
						conditionIcon.innerHTML = `<i class="fa-solid fa-cloud-sun"></i>`
					}


					if (localTime >= localSunrise && localTime <= localSunset) {
						weatherIcon.innerHTML = "☀️";
						document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/31/68/c0/3168c09eeeb529be5b321575fe56b02b.gif')";
					} else {
						document.body.style.backgroundImage = "url('https://vignette.wikia.nocookie.net/animal-jam-clans-1/images/7/7d/Blue_mountains_animation_by_grayamaroq-d9vbn8y.gif/revision/latest?cb=20160721075412')";
						weatherIcon.innerHTML = "🌙"
					}

					if (weatherCondition === "Rain") {
						document.body.style.backgroundImage = "url('https://giffiles.alphacoders.com/105/105417.gif')";
					}

					if (weatherCondition === "Snow") {
						document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/a2/e7/0e/a2e70ee9920b35d55f9fc6d4b5af21aa.gif')";
					}

					setTimeout(() => {
						document.getElementById("welcomeCard").style.display = "none";
						document.getElementById("weatherContainer").classList.remove("hide-container");
					}, 50)
				})
				.catch((err) => {
					console.log("Error fetching weather:", err.message);
				});

		},
		function (error) {
			if (error.code === error.PERMISSION_DENIED) {
				document.getElementById("welcomeCard").style.display = "none";
				document.getElementById("weatherContainer").classList.remove("hide-container");
			} else {
				console.log('Geolocation error:', error.message);
			}
		}
	);
}




const getWeather = () => {
	axios(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=88fc2c0f5e418885265876793f73bc67&units=metric`)
		.then((res) => {

			const data = res.data;
			const speedMps = data.wind.speed;
			const speedKmph = (speedMps * 3.6).toFixed(0);
			const weatherCondition = data.weather[0].main;
			const maxTemp = Math.round(data.main.temp_max);
			const minTemp = Math.floor(data.main.temp_min);
			const dt = new Date().toString();
			const stringDate = dt.slice(0, 15);
			const localDate = stringDate.split(' ').join("/");



			// Time Pata karny ky lye:

			const sunriseTime = data.sys.sunrise;
			const sunsetTime = data.sys.sunset;
			const currentTime = Math.floor(Date.now() / 1000);
			const timezoneOffset = data.timezone;
			const localSunrise = sunriseTime + timezoneOffset;
			const localSunset = sunsetTime + timezoneOffset;
			const localTime = currentTime + timezoneOffset;


			if (cityName.value) {
				temperature.innerHTML = Math.round(data.main.temp) + "°C";
				cityHeading.innerHTML = data.name;
				humidity.innerHTML = data.main.humidity + "%";
				highLow.innerHTML = `H:${maxTemp}  L:${minTemp}`
				windSpeed.innerHTML = speedKmph + " km/h";
				description.innerHTML = weatherCondition;
				date.innerHTML = localDate;

				if (weatherCondition === "Clear") {
					conditionIcon.innerHTML = `<i class="fa-solid fa-moon"></i>`
				} else if (weatherCondition === "Snow") {
					conditionIcon.innerHTML = `<i class="fa-solid fa-snowflake"></i>`
				} else if (weatherCondition === "Rain") {
					conditionIcon.innerHTML = `<i class="fa-solid fa-cloud-rain"></i>`
				} else if (weatherCondition === "Thunderstorm") {
					conditionIcon.innerHTML = `<i class="fa-solid fa-cloud-bolt"></i>`
				} else if (weatherCondition === "Clouds") {
					conditionIcon.innerHTML = `<i class="fa-solid fa-cloud"></i>`
				} else if (weatherCondition === "Mist" || weatherCondition === "Haze" || weatherCondition === "Fog" || weatherCondition === "Dust") {
					conditionIcon.innerHTML = `<i class="fa-solid fa-smog"></i>`
				} else if (weatherCondition === "Drizzle") {
					conditionIcon.innerHTML = `<i class="fa-solid fa-cloud-rain"></i>`
				} else {
					conditionIcon.innerHTML = `<i class="fa-solid fa-cloud-sun"></i>`
				}


				if (localTime >= localSunrise && localTime <= localSunset) {
					weatherIcon.innerHTML = "☀️";
					document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/31/68/c0/3168c09eeeb529be5b321575fe56b02b.gif')";
				} else {
					document.body.style.backgroundImage = "url('https://vignette.wikia.nocookie.net/animal-jam-clans-1/images/7/7d/Blue_mountains_animation_by_grayamaroq-d9vbn8y.gif/revision/latest?cb=20160721075412')";
					weatherIcon.innerHTML = "🌙"
				}

				if (weatherCondition === "Rain") {
					document.body.style.backgroundImage = "url('https://giffiles.alphacoders.com/105/105417.gif')";
				}

				if (weatherCondition === "Snow") {
					document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/a2/e7/0e/a2e70ee9920b35d55f9fc6d4b5af21aa.gif')";
				}
			}
			cityName.value = "";
		})
		.catch((err) => {
			console.log(err.code);
			Swal.fire({
				icon: "error",
				title: "City name required...",
			});
		});
}


