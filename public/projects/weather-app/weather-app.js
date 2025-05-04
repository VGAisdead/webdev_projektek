"use strict";

const searchBtn = document.getElementById("searchBtn");
const inputBtn = document.getElementById("inputBtn");
const startModal = document.getElementById("start-modal");

// Induló modal megjelenítése
document.addEventListener("DOMContentLoaded", () => {
	if (startModal) startModal.classList.add("show");
});

// Keresés
inputBtn.addEventListener("click", () => {
	startModal.classList.toggle("show");
});

searchBtn.addEventListener("click", () => {
	startModal.classList.toggle("show");
});

// API fetch
document.addEventListener("DOMContentLoaded", () => {
	const locationInput = document.getElementById("locationInput");
	const getWeatherButton = document.getElementById("getWeather");
	const weatherInfoDiv = document.getElementById("weatherInfo");

	getWeatherButton.addEventListener("click", () => {
		const locationKey = locationInput.value;
		if (locationKey) {
			fetch(`/.netlify/functions/weather?locationKey=${locationKey}`)
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
			weatherInfoDiv.textContent = "Kérlek, add meg a hely azonosítóját.";
		}
	});

	function displayWeather(weatherData) {
		// Itt jelenítsd meg az időjárási adatokat a weatherInfoDiv-ben
		console.log(weatherData);
		weatherInfoDiv.textContent = JSON.stringify(weatherData, null, 2); // Példa megjelenítés
	}
});
