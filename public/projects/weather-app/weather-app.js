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

			// Érvénytelen város (üres válaszlista) esetén: hibaüzenet
			if (!data || (Array.isArray(data) && data.length === 0)) {
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
                Hiba történt az időjárás adatok lekérésekor<br>
                ${error.message}
            `;
			errorElement.classList.add(
				"fw-light",
				"text-white",
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

	// Handle both array response and direct object response
	const data = Array.isArray(weatherData) ? weatherData[0] : weatherData;

	if (!data) {
		console.error("Nincs feldolgozható adat");
		return;
	}

	// Update temperature
	if (data.Temperature && data.Temperature.Metric) {
		tempElement.textContent = `${data.Temperature.Metric.Value} °C`;
	} else {
		tempElement.textContent = "N/A";
	}

	// Update city
	if (data.LocalizedName) {
		cityElement.textContent = data.LocalizedName;
	} else {
		cityElement.textContent = "N/A";
	}

	// Update country
	if (data.Country && data.Country.LocalizedName) {
		countryElement.textContent = data.Country.LocalizedName;
	} else {
		countryElement.textContent = "N/A";
	}

	// Update postcode if available
	if (data.PrimaryPostalCode) {
		postcodeElement.textContent = data.PrimaryPostalCode;
	} else {
		postcodeElement.textContent = ""; // Hide if not available
	}

	// Update weather icon based on weather condition if available
	// This is a placeholder - you would need to map weather conditions to your icon files
	if (data.WeatherIcon) {
		const weatherIcon = document.getElementById("weatherIcon");
		const iconPath = getWeatherIconPath(data.WeatherIcon);
		weatherIcon.src = iconPath;
	}
}

// Function to map weather condition codes to icon paths
function getWeatherIconPath(iconCode) {
	// This is a simple placeholder - you would need to customize this based on your available icons
	// and the API's icon codes
	const defaultIcon = "../../../assets/images/weather/cloudy.png";

	// Mapping could be like this:
	const iconMap = {
		1: "../../../assets/images/weather/sunny.png",
		2: "../../../assets/images/weather/sunny.png",
		3: "../../../assets/images/weather/partly-cloudy.png",
		4: "../../../assets/images/weather/partly-cloudy.png",
		5: "../../../assets/images/weather/partly-cloudy.png",
		6: "../../../assets/images/weather/cloudy.png",
		// Add more mappings as needed
	};

	return iconMap[iconCode] || defaultIcon;
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
