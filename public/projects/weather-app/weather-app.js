"use strict";

const searchBtn = document.getElementById("searchBtn");
const inputBtn = document.getElementById("inputBtn");
const startModal = document.getElementById("start-modal");
const locationInput = document.getElementById("locationInput"); // Hozzáférés az inputhoz
const weatherInfoDiv = document.getElementById("weatherInfo");

// Induló modal megjelenítése
document.addEventListener("DOMContentLoaded", () => {
	if (startModal) startModal.classList.add("show");
});

// Keresés gombok eseménykezelői
inputBtn.addEventListener("click", () => {
	startModal.classList.remove("show"); // Javítva: remove a toggle helyett
	getWeather();
});

searchBtn.addEventListener("click", () => {
	startModal.classList.add("show"); // Javítva: add a toggle helyett
});

// API fetch
const getWeather = () => {
	const cityName = locationInput.value.trim(); // Városnév az inputból

	if (cityName) {
		fetch(`/.netlify/functions/weather?cityName=${cityName}`) // Városnév küldése
			.then((response) => response.json())
			.then((data) => {
				displayWeather(data);
			})
			.catch((error) => {
				weatherInfoDiv.textContent =
					"Hiba történt az időjárás adatok lekérésekor.";
				console.error("Hiba:", error);
			});
	} else {
		weatherInfoDiv.textContent = "Kérlek, add meg a hely nevét.";
		weatherInfoDiv.style.color = "red";
	}
};

function displayWeather(weatherData) {
	console.log("API válasz:", weatherData); // Nagyon fontos!

	if (weatherData && Array.isArray(weatherData) && weatherData.length > 0) {
		const firstResult = weatherData[0]; // Első eredmény (ha tömb)

		// Ellenőrizd, hogy ezek a tulajdonságok léteznek-e az objektumban
		if (firstResult.Temperature && firstResult.Temperature.Metric) {
			weatherInfoDiv.querySelector("#temp").textContent =
				firstResult.Temperature.Metric.Value + " °C";
		} else {
			weatherInfoDiv.querySelector("#temp").textContent = "N/A";
		}

		if (firstResult.LocalizedName) {
			weatherInfoDiv.querySelector("#city").textContent =
				firstResult.LocalizedName;
		} else {
			weatherInfoDiv.querySelector("#city").textContent = "N/A";
		}

		if (firstResult.Country && firstResult.Country.LocalizedName) {
			weatherInfoDiv.querySelector("#country").textContent =
				firstResult.Country.LocalizedName;
		} else {
			weatherInfoDiv.querySelector("#country").textContent = "N/A";
		}
	} else if (weatherData && !Array.isArray(weatherData)) {
		// Ha a válasz nem tömb, hanem objektum (pl. Current Conditions API)
		if (weatherData.Temperature && weatherData.Temperature.Metric) {
			weatherInfoDiv.querySelector("#temp").textContent =
				weatherData.Temperature.Metric.Value + " °C";
		} else {
			weatherInfoDiv.querySelector("#temp").textContent = "N/A";
		}

		if (weatherData.LocalizedName) {
			weatherInfoDiv.querySelector("#city").textContent =
				weatherData.LocalizedName;
		} else {
			weatherInfoDiv.querySelector("#city").textContent = "N/A";
		}

		if (weatherData.Country && weatherData.Country.LocalizedName) {
			weatherInfoDiv.querySelector("#country").textContent =
				weatherData.Country.LocalizedName;
		} else {
			weatherInfoDiv.querySelector("#country").textContent = "N/A";
		}
	} else {
		weatherInfoDiv.textContent = "Nincs adat a megadott helyhez.";
		weatherInfoDiv.style.color = "red";
	}
}
