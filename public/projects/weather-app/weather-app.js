"use strict";

const searchBtn = document.getElementById("searchBtn");
const inputBtn = document.getElementById("inputBtn");
const startModal = document.getElementById("start-modal");
const startModalError = document.getElementById("start-modal-error");
const locationInput = document.getElementById("locationInput");
const weatherInfoDiv = document.getElementById("weatherInfo");
const weatherText = document.getElementById("weatherText");
const tempElement = document.getElementById("temp");
const cityElement = document.getElementById("city");
const stateElement = document.getElementById("state");
const countryElement = document.getElementById("country");
const countryCodeElement = document.getElementById("countryCode");
const weatherIcon = document.getElementById("weatherIcon");
const windElement = document.getElementById("wind");
const windDirectionElement = document.getElementById("windDirection");
const indoorHumidityElement = document.getElementById("indoorHumidity");
const outdoorHumidityElement = document.getElementById("outdoorHumidity");
let weatherData;

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

// Display error message
function displayError(message) {
	startModalError.innerHTML = "";
	const errorElement = document.createElement("h6");
	errorElement.innerHTML = message;
	errorElement.classList.add(
		"text-white",
		"fw-light",
		"mt-2",
		"fs-5",
		"m-0",
		"text-center"
	);
	startModalError.appendChild(errorElement);
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
		displayError("Kérlek, add meg a hely nevét.");
		return;
	}

	// Add loading message
	const loadingMsg = document.createElement("div");
	loadingMsg.innerHTML = `<span class="visually-hidden">Keresés...</span>`;
	loadingMsg.role = "status";
	loadingMsg.classList.add(
		"fw-light",
		"text-white",
		"mt-2",
		"fs-5",
		"m-0",
		"text-center",
		"spinner-border"
	);
	startModalError.appendChild(loadingMsg);

	try {
		// Call the Netlify function with proper error handling
		const response = await fetch(
			`/.netlify/functions/weather?q=${encodeURIComponent(city)}`
		);

		console.log("API response status:", response.status);

		// Get the response as text first for better error handling
		const responseText = await response.text();
		console.log("API response text:", responseText);

		// Try to parse as JSON

		try {
			weatherData = JSON.parse(responseText);
		} catch (jsonError) {
			console.error("Failed to parse JSON response:", jsonError);

			throw new Error(`Invalid response format: ${responseText}`);
		}

		// Check if the response contains an error
		if (!response.ok || weatherData.error) {
			// Extract the error reason from the response
			const errorReason =
				weatherData?.details?.Message ||
				weatherData?.details?.Code ||
				weatherData?.error ||
				weatherData?.message ||
				weatherData?.errorType ||
				"Unknown error";

			throw new Error(errorReason);
		}

		// If we got here, we have valid weather data
		console.log("Weather data received:", weatherData);

		// Display the weather data and hide the modal
		displayWeather(weatherData);
		hideModal();
	} catch (error) {
		console.log("Weather data not received:", weatherData);
		console.log("Error:", error);

		// Display a user-friendly error message
		let errorMessage = "Hiba történt az adatok lekérdezése közben:<br>";

		if (
			error.toString().includes("Failed to fetch") ||
			error.toString().includes("NetworkError")
		) {
			errorMessage += `(${weatherData.status}) Nem sikerült kapcsolódni a szerverhez <br>Ellenőrizd az internetkapcsolatot`;
		} else if (error.toString().includes("API key is missing")) {
			errorMessage += `(${weatherData.status}) Az API kulcs hiányzik vagy érvénytelen`;
		} else if (weatherData.error === "Nem található a megadott város") {
			errorMessage += `(404) Nem található a megadott város`;
		} else if (
			error
				.toString()
				.includes("The allowed number of requests has been exceeded")
		) {
			errorMessage += `(${weatherData.status}) Túl sok API kérés, próbáld újra később <br><p class="fs-6 fw-lighter">& give me money</p>`;
		} else {
			errorMessage += error;
		}

		displayError(errorMessage);
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

	// Update state
	if (
		weatherData.AdministrativeArea &&
		weatherData.AdministrativeArea.LocalizedName
	) {
		stateElement.textContent = weatherData.AdministrativeArea.LocalizedName;
	} else {
		stateElement.textContent = "N/A";
	}

	// Update country
	if (weatherData.Country && weatherData.Country.LocalizedName) {
		countryElement.textContent = weatherData.Country.LocalizedName;
	} else {
		countryElement.textContent = "N/A";
	}

	// Update wind
	if (weatherData.WindGust && weatherData.WindGust.Speed) {
		windElement.textContent = `${weatherData.WindGust.Speed.Metric.Value} km/h`;
	} else {
		windElement.textContent = "N/A";
	}

	// Update wind direction
	if (weatherData.Wind && weatherData.Wind.Direction.Localized) {
		windDirectionElement.textContent = `${weatherData.Wind.Direction.Localized}`;
	} else {
		windDirectionElement.textContent = "N/A";
	}

	// Update indoor humidity
	if (weatherData.IndoorRelativeHumidity) {
		indoorHumidityElement.textContent = `Beltér: ${weatherData.IndoorRelativeHumidity}%`;
	} else {
		indoorHumidityElement.textContent = "N/A";
	}

	// Update outdoor humidity
	if (weatherData.RelativeHumidity) {
		outdoorHumidityElement.textContent = `Kültér: ${weatherData.RelativeHumidity}%`;
	} else {
		outdoorHumidityElement.textContent = "N/A";
	}

	// Update country code if available
	if (weatherData.Country && weatherData.Country.ID) {
		countryCodeElement.textContent = weatherData.Country.ID;
	} else {
		countryCodeElement.textContent = ""; // Hide if not available
	}

	// Add weather text description if available
	if (weatherData.WeatherText) {
		weatherText.textContent = weatherData.WeatherText;
		console.log("Weather condition:", weatherData.WeatherText);
	} else {
		weatherText.textContent = ""; // Hide if not available
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

// Bootstrap tooltip-ek inicializálása
const tooltipTriggerList = document.querySelectorAll(
	'[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => {
	const tooltip = new bootstrap.Tooltip(tooltipTriggerEl);
	tooltipTriggerEl.addEventListener("shown.bs.tooltip", () => {
		// Az összes látható tooltip nyílának módosítása
		const arrows = document.querySelectorAll(
			".tooltip.bs-tooltip-bottom .tooltip-arrow"
		);
		arrows.forEach((arrow) => {
			arrow.style.borderBottomColor = "#333"; // Inline felülírás
		});
	});
	return tooltip;
});
