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
		weatherInfoDiv.textContent = "Kérlek, add meg a hely nevét.";
	}
};

function displayWeather(weatherData) {
	// Itt jelenítsd meg az időjárási adatokat a weatherInfoDiv-ben
	console.log(weatherData);
	if (weatherData && weatherData.length > 0) {
		// Ellenőrizzük, hogy van-e adat
		weatherInfoDiv.querySelector("#temp").textContent =
			weatherData[0].Temperature.Metric.Value + " °C"; // Példa
		weatherInfoDiv.querySelector("#city").textContent =
			weatherData[0].LocalizedName;
		weatherInfoDiv.querySelector("#country").textContent =
			weatherData[0].Country.LocalizedName;
	} else {
		weatherInfoDiv.textContent = "Nincs adat a megadott helyhez.";
	}
}
