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
}

// API fetch
const getWeather = () => {
	const cityName = locationInput.value.trim();
	startModalError.textContent = "";
	startModalError.innerHTML = ""; // Clear previous error messages

	if (!cityName) {
		// Üres input esetén hibaüzenet + modal marad nyitva
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
		"mt-2",
		"text-info",
		"fs-5",
		"m-0",
		"text-center"
	);
	startModalError.appendChild(loadingMsg);

	// Make the API request
	fetch(
		`/.netlify/functions/weather?cityName=${encodeURIComponent(cityName)}`
	)
		.then(async (response) => {
			if (!response.ok) {
				const statusCode = response.status;
				throw new Error(`Location API hiba: ${statusCode}`);
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

			// Érvénytelen város (üres válaszlista) esetén: hibaüzenet
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

			// Sikeres válasz → megjelenítjük az időjárást
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

	// Update city
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

	// Update weather icon based on weather condition if available
	updateWeatherIcon(weatherData.WeatherIcon);
}

// Function to map weather condition codes to icon paths
function updateWeatherIcon(iconCode) {
	// Default icon
	let iconPath = "../../../assets/images/weather/cloudy.png";

	// Map weather icon codes to your images
	if (iconCode) {
		// This is a simple placeholder - customize based on your actual icons
		const iconMap = {
			1: "../../../assets/images/weather/sunny.png",
			2: "../../../assets/images/weather/sunny.png",
			3: "../../../assets/images/weather/partly-cloudy.png",
			4: "../../../assets/images/weather/partly-cloudy.png",
			5: "../../../assets/images/weather/partly-cloudy.png",
			6: "../../../assets/images/weather/cloudy.png",
			7: "../../../assets/images/weather/cloudy.png",
			8: "../../../assets/images/weather/cloudy.png",
			11: "../../../assets/images/weather/fog.png",
			12: "../../../assets/images/weather/rain.png",
			13: "../../../assets/images/weather/rain.png",
			14: "../../../assets/images/weather/rain.png",
			15: "../../../assets/images/weather/rain.png",
			16: "../../../assets/images/weather/rain.png",
			17: "../../../assets/images/weather/thunderstorm.png",
			18: "../../../assets/images/weather/rain.png",
			19: "../../../assets/images/weather/snow.png",
			20: "../../../assets/images/weather/snow.png",
			21: "../../../assets/images/weather/snow.png",
			22: "../../../assets/images/weather/snow.png",
			23: "../../../assets/images/weather/snow.png",
			24: "../../../assets/images/weather/ice.png",
			25: "../../../assets/images/weather/ice.png",
			26: "../../../assets/images/weather/ice.png",
			29: "../../../assets/images/weather/rain.png",
			30: "../../../assets/images/weather/sunny.png",
			31: "../../../assets/images/weather/cloudy.png",
			32: "../../../assets/images/weather/wind.png",
			33: "../../../assets/images/weather/night-clear.png",
			34: "../../../assets/images/weather/night-partly-cloudy.png",
			35: "../../../assets/images/weather/night-partly-cloudy.png",
			36: "../../../assets/images/weather/night-partly-cloudy.png",
			37: "../../../assets/images/weather/night-fog.png",
			38: "../../../assets/images/weather/night-cloudy.png",
			39: "../../../assets/images/weather/night-rain.png",
			40: "../../../assets/images/weather/night-rain.png",
			41: "../../../assets/images/weather/night-thunderstorm.png",
			42: "../../../assets/images/weather/night-snow.png",
			43: "../../../assets/images/weather/night-snow.png",
			44: "../../../assets/images/weather/night-ice.png",
		};

		if (iconMap[iconCode]) {
			iconPath = iconMap[iconCode];
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
					getWeather(); // Trigger search on selection
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
