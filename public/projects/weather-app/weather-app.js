"use strict";

const searchBtn = document.getElementById("searchBtn");
const inputBtn = document.getElementById("inputBtn");
const startModal = document.getElementById("start-modal");
const locationInput = document.getElementById("locationInput");
const weatherInfoDiv = document.getElementById("weatherInfo");

// Induló modal megjelenítése
document.addEventListener("DOMContentLoaded", () => {
	if (startModal) startModal.classList.add("show");
});

// Keresés gombok eseménykezelői
inputBtn.addEventListener("click", () => {
	startModal.classList.remove("show");
	getWeather();
});

searchBtn.addEventListener("click", () => {
	startModal.classList.add("show");
});

// API fetch
const getWeather = () => {
	const cityName = locationInput.value.trim();

	if (cityName) {
		fetch(`/.netlify/functions/weather?cityName=${cityName}`)
			.then((response) => response.json())
			.then((data) => {
				displayWeather(data);
			})
			.catch((error) => {
				if (weatherInfoDiv) {
					const errorElement = document.createElement("p");
					errorElement.textContent =
						"Hiba történt az időjárás adatok lekérésekor.";
					errorElement.style.color = "red";
					weatherInfoDiv.appendChild(errorElement);
				}
				console.error("Hiba:", error);
			});
	} else {
		if (weatherInfoDiv) {
			const errorElement = document.createElement("p");
			errorElement.textContent = "Kérlek, add meg a hely nevét.";
			errorElement.style.color = "red";
			weatherInfoDiv.appendChild(errorElement);
		}
	}
};

function displayWeather(weatherData) {
	console.log("API válasz:", weatherData);

	if (weatherData && Array.isArray(weatherData) && weatherData.length > 0) {
		const firstResult = weatherData[0];

		if (firstResult.Temperature && firstResult.Temperature.Metric) {
			if (weatherInfoDiv) {
				weatherInfoDiv.querySelector("#temp").textContent =
					firstResult.Temperature.Metric.Value + " °C";
			}
		} else if (weatherInfoDiv) {
			weatherInfoDiv.querySelector("#temp").textContent = "N/A";
		}

		if (firstResult.LocalizedName) {
			if (weatherInfoDiv) {
				weatherInfoDiv.querySelector("#city").textContent =
					firstResult.LocalizedName;
			}
		} else if (weatherInfoDiv) {
			weatherInfoDiv.querySelector("#city").textContent = "N/A";
		}

		if (firstResult.Country && firstResult.Country.LocalizedName) {
			if (weatherInfoDiv) {
				weatherInfoDiv.querySelector("#country").textContent =
					firstResult.Country.LocalizedName;
			}
		} else if (weatherInfoDiv) {
			weatherInfoDiv.querySelector("#country").textContent = "N/A";
		}
	} else if (weatherData && !Array.isArray(weatherData)) {
		if (weatherData.Temperature && weatherData.Temperature.Metric) {
			if (weatherInfoDiv) {
				weatherInfoDiv.querySelector("#temp").textContent =
					weatherData.Temperature.Metric.Value + " °C";
			}
		} else if (weatherInfoDiv) {
			weatherInfoDiv.querySelector("#temp").textContent = "N/A";
		}

		if (weatherData.LocalizedName) {
			if (weatherInfoDiv) {
				weatherInfoDiv.querySelector("#city").textContent =
					weatherData.LocalizedName;
			}
		} else if (weatherInfoDiv) {
			weatherInfoDiv.querySelector("#city").textContent = "N/A";
		}

		if (weatherData.Country && weatherData.Country.LocalizedName) {
			if (weatherInfoDiv) {
				weatherInfoDiv.querySelector("#country").textContent =
					weatherData.Country.LocalizedName;
			}
		} else if (weatherInfoDiv) {
			weatherInfoDiv.querySelector("#country").textContent = "N/A";
		}
	} else if (weatherInfoDiv) {
		const noDataElement = document.createElement("p");
		noDataElement.textContent = "Nincs adat a megadott helyhez.";
		noDataElement.style.color = "red";
		weatherInfoDiv.appendChild(noDataElement);
	}
}
