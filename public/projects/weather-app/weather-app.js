"use strict";

const searchBtn = document.getElementById("searchBtn");
const inputBtn = document.getElementById("inputBtn");
const startModal = document.getElementById("start-modal");
const startModalError = document.getElementById("start-modal-error");
const locationInput = document.getElementById("locationInput");
const autocompleteList = document.getElementById("autocompleteList");
const weatherInfoDiv = document.getElementById("weatherInfo");
const tempElement = document.getElementById("temp");
const cityElement = document.getElementById("city");
const countryElement = document.getElementById("country");
const postcodeElement = document.getElementById("postcode");
const weatherIcon = document.getElementById("weatherIcon");

// Show modal when page loads
document.addEventListener("DOMContentLoaded", () => {
	// Show modal initially
	showModal();

	// Event listeners
	inputBtn.addEventListener("click", getWeather);
	searchBtn.addEventListener("click", () => {
		showModal();
	});

	// Add event listener for Enter key
	locationInput.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			getWeather();
		} else if (e.key === "Escape") {
			autocompleteList.innerHTML = "";
			autocompleteList.classList.remove("show");
		}
	});
});

function showModal() {
	startModal.classList.add("show");
	// Focus on input field when modal opens
	setTimeout(() => locationInput.focus(), 100);
}

function hideModal() {
	startModal.classList.remove("show");
	// Clear the input field when the modal is hidden
	locationInput.value = "";
	autocompleteList.innerHTML = "";
	autocompleteList.classList.remove("show");
}

// Get weather data - can be called with either city name or locationKey
const getWeather = (locationKey = null) => {
	const cityName = locationInput.value.trim();
	startModalError.textContent = "";
	startModalError.innerHTML = ""; // Clear previous error messages

	// If we don't have a location key and the input is empty
	if (!locationKey && !cityName) {
		// Empty input case - error message + modal stays open
		const noInputMsg = document.createElement("h6");
		noInputMsg.innerHTML = `Kérlek, add meg a hely nevét.`;
		noInputMsg.classList.add(
			"fw-light",
			"mt-2",
			"text-danger",
			"fs-5",
			"m-0",
			"text-center"
		);
		startModalError.appendChild(noInputMsg);
		return;
	}

	// Add loading indicator
	const loadingMsg = document.createElement("h6");
	loadingMsg.innerHTML = `Keresés...`;
	loadingMsg.classList.add(
		"fw-light",
		"text-white",
		"mt-2",
		"text-info",
		"fs-5",
		"m-0",
		"text-center"
	);
	startModalError.appendChild(loadingMsg);

	// Determine what API endpoint to call based on available info
	let apiUrl;
	if (locationKey) {
		// If we have a location key, use it directly (more efficient)
		apiUrl = `/.netlify/functions/weather?locationKey=${locationKey}`;
	} else {
		// Otherwise use the city name
		apiUrl = `/.netlify/functions/weather?cityName=${encodeURIComponent(
			cityName
		)}`;
	}

	// Make the API request
	fetch(apiUrl)
		.then(async (response) => {
			if (!response.ok) {
				const statusCode = response.status;
				throw new Error(`API hiba: ${statusCode}`);
			}
			return response.json();
		})
		.then((data) => {
			console.log("API Response:", data);

			// Check for error in the response
			if (data.error) {
				startModalError.innerHTML = "";
				const errorMsg = document.createElement("h6");
				errorMsg.innerHTML = data.error;
				errorMsg.classList.add(
					"fw-light",
					"mt-2",
					"text-danger",
					"fs-5",
					"m-0",
					"text-center"
				);
				startModalError.appendChild(errorMsg);
				return;
			}

			// Invalid city (empty response) case: show error
			if (!data) {
				startModalError.innerHTML = "";
				const notFoundMsg = document.createElement("h6");
				notFoundMsg.innerHTML = `Nem található ilyen város.`;
				notFoundMsg.classList.add(
					"fw-light",
					"mt-2",
					"text-danger",
					"fs-5",
					"m-0",
					"text-center"
				);
				startModalError.appendChild(notFoundMsg);
				return;
			}

			// Success → display the weather
			displayWeather(data);
			hideModal();
		})
		.catch((error) => {
			console.error("Hiba:", error.message);
			startModalError.innerHTML = "";
			const errorElement = document.createElement("h6");
			errorElement.innerHTML = `
                Hiba történt az időjárás adatok lekérésekor:<br>
                ${error.message}
            `;
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
		});
};

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
			14: "../../../assets/images/weather/rain.png", // Partly Sunny w/ Showers
			15: "../../../assets/images/weather/thunderstorm.png", // T-Storms
			16: "../../../assets/images/weather/rain.png", // Mostly Cloudy w/ T-Storms
			17: "../../../assets/images/weather/thunderstorm.png", // Partly Sunny w/ T-Storms
			18: "../../../assets/images/weather/rain.png", // Rain
			19: "../../../assets/images/weather/snow.png", // Flurries
			20: "../../../assets/images/weather/snow.png", // Mostly Cloudy w/ Flurries
			21: "../../../assets/images/weather/snow.png", // Partly Sunny w/ Flurries
			22: "../../../assets/images/weather/snow.png", // Snow
			23: "../../../assets/images/weather/snow.png", // Mostly Cloudy w/ Snow
			24: "../../../assets/images/weather/ice.png", // Ice
			25: "../../../assets/images/weather/ice.png", // Sleet
			26: "../../../assets/images/weather/ice.png", // Freezing Rain
			29: "../../../assets/images/weather/rain.png", // Rain and Snow
			30: "../../../assets/images/weather/sunny.png", // Hot
			31: "../../../assets/images/weather/cloudy.png", // Cold
			32: "../../../assets/images/weather/wind.png", // Windy
			33: "../../../assets/images/weather/night-clear.png", // Clear (night)
			34: "../../../assets/images/weather/night-partly-cloudy.png", // Mostly Clear (night)
			35: "../../../assets/images/weather/night-partly-cloudy.png", // Partly Cloudy (night)
			36: "../../../assets/images/weather/night-partly-cloudy.png", // Intermittent Clouds (night)
			37: "../../../assets/images/weather/night-fog.png", // Hazy (night)
			38: "../../../assets/images/weather/night-cloudy.png", // Mostly Cloudy (night)
			39: "../../../assets/images/weather/night-rain.png", // Partly Cloudy w/ Showers (night)
			40: "../../../assets/images/weather/night-rain.png", // Mostly Cloudy w/ Showers (night)
			41: "../../../assets/images/weather/night-thunderstorm.png", // Partly Cloudy w/ T-Storms (night)
			42: "../../../assets/images/weather/night-snow.png", // Mostly Cloudy w/ T-Storms (night)
			43: "../../../assets/images/weather/night-snow.png", // Mostly Cloudy w/ Flurries (night)
			44: "../../../assets/images/weather/night-ice.png", // Mostly Cloudy w/ Snow (night)
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

// Autocomplete functionality
locationInput.addEventListener("input", async () => {
	const query = locationInput.value.trim();

	if (query.length < 2) {
		autocompleteList.innerHTML = "";
		autocompleteList.classList.remove("show");
		return;
	}

	try {
		const response = await fetch(
			`/.netlify/functions/weather?cityName=${encodeURIComponent(
				query
			)}&type=autocomplete`
		);

		if (!response.ok)
			throw new Error("Nem sikerült betölteni a javaslatokat.");

		const data = await response.json();
		console.log("Autocomplete data:", data);

		autocompleteList.innerHTML = "";

		if (data && data.length > 0) {
			autocompleteList.classList.add("show");

			data.forEach((location) => {
				const listItem = document.createElement("li");
				listItem.textContent = `${location.LocalizedName}, ${location.Country.LocalizedName}`;
				listItem.dataset.key = location.Key;
				listItem.addEventListener("click", () => {
					locationInput.value = location.LocalizedName;
					autocompleteList.innerHTML = "";
					autocompleteList.classList.remove("show");
					// Use the location key for more efficient lookup
					getWeather(location.Key);
				});
				autocompleteList.appendChild(listItem);
			});
		} else {
			autocompleteList.classList.remove("show");
		}
	} catch (error) {
		console.error("Autocomplete hiba:", error);
		autocompleteList.innerHTML = "";
	}
});

// Close autocomplete list when clicking outside
document.addEventListener("click", (e) => {
	if (!autocompleteList.contains(e.target) && e.target !== locationInput) {
		autocompleteList.innerHTML = "";
		autocompleteList.classList.remove("show");
	}
});
