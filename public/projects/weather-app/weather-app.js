"use strict";

const searchBtn = document.getElementById("searchBtn");
const inputBtn = document.getElementById("inputBtn");
const startModal = document.getElementById("start-modal");
const startModalError = document.getElementById("start-modal-error");
const locationInput = document.getElementById("locationInput");
const weatherInfoDiv = document.getElementById("weatherInfo");
const tempElement = document.getElementById("temp");
const cityElement = document.getElementById("city");
const countryElement = document.getElementById("country");
const postcodeElement = document.getElementById("postcode");
const weatherIcon = document.getElementById("weatherIcon");

// Show modal when page loads
document.addEventListener("DOMContentLoaded", () => {
	showModal();

	// Add event listener for Enter key
	locationInput.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			getWeather();
		} else if (e.key === "Escape") {
			// Ha van már megjelenített adat, akkor bezárjuk a modált

			if (tempElement.textContent !== "-- °C") {
				hideModal();
			}
		}
	});

	// Close modal when clicking outside of modal content

	startModal.addEventListener("click", (e) => {
		// Ha a kattintás a modal-content-en kívülre történt és van már megjelenített adat

		if (e.target === startModal && tempElement.textContent !== "-- °C") {
			hideModal();
		}
	});

	// Add event listener for Escape key on document level

	document.addEventListener("keydown", (e) => {
		if (
			e.key === "Escape" &&
			startModal.classList.contains("show") &&
			tempElement.textContent !== "-- °C"
		) {
			hideModal();
		}
	});
});

// Event listeners
inputBtn.addEventListener("click", () => {
	getWeather();
	console.log(locationInput.value);
});

searchBtn.addEventListener("click", () => {
	showModal();
});

function showModal() {
	startModal.classList.add("show");
	// Focus on input field when modal opens
	setTimeout(() => locationInput.focus(), 2000);
}

function hideModal() {
	startModal.classList.remove("show");
	// Clear the input field when the modal is hidden
	locationInput.value = "";
	// Clear msg
	startModalError.textContent = "";
	startModalError.innerHTML = "";
}

// Get weather data - either with city name or location Key
async function getWeather() {
	let city = locationInput.value.trim();
	startModalError.textContent = ""; // Clear previous error messages
	startModalError.innerHTML = ""; // Clear previous error messages
	console.log("Keresés:", city);

	// If we don't have a location key and the input is empty
	if (!city) {
		// Empty input case
		const noInputMsg = document.createElement("h6");
		noInputMsg.innerHTML = `Kérlek, add meg a hely nevét.`;
		noInputMsg.classList.add(
			"fw-light",
			"text-white",
			"mt-2",
			"fs-5",
			"m-0",
			"text-center"
		);
		startModalError.appendChild(noInputMsg);
		return;
	}

	// Add loading message
	const loadingMsg = document.createElement("h6");
	loadingMsg.innerHTML = `Keresés...`;
	loadingMsg.classList.add(
		"fw-light",
		"text-white",
		"mt-2",
		"fs-5",
		"m-0",
		"text-center"
	);
	startModalError.appendChild(loadingMsg);

	try {
		let weatherData;

		// Ha szám, akkor location Key alapján kérjük le az időjárást
		if (!isNaN(city)) {
			const weatherRes = await fetch(
				`/.netlify/functions/weather?q=${city}`
			);
			if (!weatherRes.ok)
				throw new Error("Nem sikerült lekérni az időjárás adatokat.");
			weatherData = await weatherRes.json();
		} else {
			// Ha szöveg, akkor közvetlen keresés a városnév alapján
			// A backendben már kombináljuk az adatokat

			const weatherRes = await fetch(
				`/.netlify/functions/weather?q=${encodeURIComponent(city)}`
			);

			if (!weatherRes.ok) {
				try {
					const errorData = await weatherRes.json();

					if (errorData.Message === "Api Authorization failed") {
						throw new Error("Hibás vagy hiányzó API kulcs.");
					} else if (
						errorData.Message ===
						"The allowed number of requests has been exceeded."
					) {
						throw new Error(
							"Túl sok API kérés, próbáld újra később..."
						);
					} else if (
						errorData.error === "Nem található a megadott város"
					) {
						throw new Error("Nem található a megadott város.");
					} else {
						throw new Error(
							`API hiba: ${
								errorData.Message ||
								errorData.error ||
								"Ismeretlen hiba"
							}`
						);
					}
				} catch (jsonError) {
					throw new Error(
						"Nem sikerült lekérni az időjárás adatokat."
					);
				}
			}

			weatherData = await weatherRes.json();
			console.log("Kapott adat:", weatherData);
			hideModal();
		}

		// Megjelenítjük az adatokat
		console.log("Teljes válasz:", weatherData);

		// Már kombináltuk az adatokat a backendben, így egyszerűen használhatjuk
		displayWeather(weatherData);
	} catch (error) {
		console.error("Hiba:", error.message);
		startModalError.innerHTML = "";
		const errorElement = document.createElement("h6");
		errorElement.innerHTML = `Hiba történt:<br>${error.message}`;
		errorElement.classList.add(
			"text-white",
			"fw-light",
			"mt-2",
			"text-danger",
			"fs-5",
			"m-0",
			"text-center"
		);
		startModalError.appendChild(errorElement);
	}
}

function displayWeather(weatherData) {
	console.log("Megjelenítendő adatok:", weatherData);

	// Update temperature
	if (weatherData.Temperature && weatherData.Temperature.Metric) {
		tempElement.textContent = `${weatherData.Temperature.Metric.Value} °C`;
	} else {
		tempElement.textContent = "N/A";
	}

	// Update city name
	if (weatherData.LocalizedName) {
		cityElement.textContent = weatherData.LocalizedName;
	} else {
		cityElement.textContent = "N/A";
	}

	// Update country
	if (weatherData.Country && weatherData.Country.LocalizedName) {
		countryElement.textContent = weatherData.Country.LocalizedName;
	} else {
		countryElement.textContent = "N/A";
	}

	// Update postal code if available
	if (weatherData.PrimaryPostalCode) {
		postcodeElement.textContent = weatherData.PrimaryPostalCode;
	} else {
		postcodeElement.textContent = ""; // Hide if not available
	}

	// Add weather text description if available
	if (weatherData.WeatherText) {
		console.log("Weather condition:", weatherData.WeatherText);
	}

	// Update weather icon based on weather condition if available
	updateWeatherIcon(weatherData.WeatherIcon, weatherData.IsDayTime);
}

// Function to map weather condition codes to icon paths
function updateWeatherIcon(iconCode, isDayTime = true) {
	// Default icon
	let iconPath = "../../../assets/images/weather/cloudy.png";

	// Use the AccuWeather icon codes to map to our icon paths
	if (iconCode !== undefined) {
		// This is a mapping based on your provided icon paths and AccuWeather codes
		const iconMap = {
			1: "../../../assets/images/weather/sunny.png", // Sunny
			2: "../../../assets/images/weather/sunny.png", // Mostly Sunny
			3: "../../../assets/images/weather/partly-cloudy.png", // Partly Sunny
			4: "../../../assets/images/weather/partly-cloudy.png", // Intermittent Clouds
			5: "../../../assets/images/weather/partly-cloudy.png", // Hazy Sunshine
			6: "../../../assets/images/weather/cloudy.png", // Mostly Cloudy
			7: "../../../assets/images/weather/cloudy.png", // Cloudy
			8: "../../../assets/images/weather/cloudy.png", // Dreary
			11: "../../../assets/images/weather/fog.png", // Fog
			12: "../../../assets/images/weather/rain.png", // Showers
			13: "../../../assets/images/weather/rain.png", // Mostly Cloudy w/ Showers
			14: "../../../assets/images/weather/sunny-rain.png", // Partly Sunny w/ Showers
			15: "../../../assets/images/weather/thunderstorm.png", // T-Storms
			16: "../../../assets/images/weather/thunderstorm.png", // Mostly Cloudy w/ T-Storms
			17: "../../../assets/images/weather/thunderstorm.png", // Partly Sunny w/ T-Storms
			18: "../../../assets/images/weather/rain.png", // Rain
			19: "../../../assets/images/weather/flurries.png", // Flurries
			20: "../../../assets/images/weather/flurries.png", // Mostly Cloudy w/ Flurries
			21: "../../../assets/images/weather/flurries.png", // Partly Sunny w/ Flurries
			22: "../../../assets/images/weather/snow.png", // Snow
			23: "../../../assets/images/weather/snow.png", // Mostly Cloudy w/ Snow
			24: "../../../assets/images/weather/ice.png", // Ice
			25: "../../../assets/images/weather/ice.png", // Sleet
			26: "../../../assets/images/weather/ice.png", // Freezing Rain
			29: "../../../assets/images/weather/rain-and-snow.png", // Rain and Snow
			30: "../../../assets/images/weather/hot.png", // Hot
			31: "../../../assets/images/weather/cold.png", // Cold
			32: "../../../assets/images/weather/windy.png", // Windy
			33: "../../../assets/images/weather/night-clear.png", // Clear (night)
			34: "../../../assets/images/weather/night-cloudy.png", // Mostly Clear (night)
			35: "../../../assets/images/weather/night-cloudy.png", // Partly Cloudy (night)
			36: "../../../assets/images/weather/night-cloudy.png", // Intermittent Clouds (night)
			37: "../../../assets/images/weather/night-fog.png", // Hazy (night)
			38: "../../../assets/images/weather/night-cloudy.png", // Mostly Cloudy (night)
			39: "../../../assets/images/weather/night-rain.png", // Partly Cloudy w/ Showers (night)
			40: "../../../assets/images/weather/night-rain.png", // Mostly Cloudy w/ Showers (night)
			41: "../../../assets/images/weather/night-thunderstorm.png", // Partly Cloudy w/ T-Storms (night)
			42: "../../../assets/images/weather/night-thunderstorm.png", // Mostly Cloudy w/ T-Storms (night)
			43: "../../../assets/images/weather/night-flurries.png", // Mostly Cloudy w/ Flurries (night)
			44: "../../../assets/images/weather/night-snow.png", // Mostly Cloudy w/ Snow (night)
		};

		if (iconMap[iconCode]) {
			iconPath = iconMap[iconCode];
		} else {
			// Fallback to day/night default if the code isn't mapped
			iconPath = isDayTime
				? "../../../assets/images/weather/cloudy.png"
				: "../../../assets/images/weather/night-cloudy.png";
		}
	}

	weatherIcon.src = iconPath;
}
