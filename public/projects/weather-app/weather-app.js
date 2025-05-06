"use strict";

const searchBtn = document.getElementById("searchBtn");
const inputBtn = document.getElementById("inputBtn");
const startModal = document.getElementById("start-modal");
const startModalError = document.getElementById("start-modal-error");
const locationInput = document.getElementById("locationInput");
const weatherInfoDiv = document.getElementById("weatherInfo");

// Induló modal megjelenítése
document.addEventListener("DOMContentLoaded", () => {
	if (startModal) startModal.classList.add("show");
});

// Keresés gombok eseménykezelői
inputBtn.addEventListener("click", () => {

	getWeather();
});

searchBtn.addEventListener("click", () => {
	startModal.classList.add("show");
});

// API fetch
const getWeather = () => {
	const cityName = locationInput.value.trim();
	startModalError.textContent = "";
    
	if (cityName) {
	    fetch(`/.netlify/functions/weather?cityName=${cityName}`)
		.then(response => {
		    if (!response.ok) {
			return response.json().then(err => { throw new Error(err.error || 'Hiba történt a lekérdezés során.'); });
		    }
		    return response.json();
		})
		.then(data => {
		    if (Array.isArray(data) && data.length > 0) {
			displayWeather(data);
			startModal.classList.remove("show");
		    } else if (!Array.isArray(data) && Object.keys(data).length > 0) {
			displayWeather(data);
			startModal.classList.remove("show");
		    }
		    else {
			const noInputMsg = document.createElement("h6");
			noInputMsg.innerHTML = `Nem található ilyen város.`;
			noInputMsg.classList.add("text-black", "fs-5", "m-0", "text-end", "text-sm-start");
			startModalError.appendChild(noInputMsg);
			startModal.classList.add("show");
		    }
		})
		.catch(error => {
		    console.error("Hiba:", error);
		    if (weatherInfoDiv) {
			const errorElement = document.createElement("h6");
			errorElement.innerHTML = `Hiba történt<br> az időjárás adatok lekérésekor. ${error.message}`;
			errorElement.classList.add("text-black", "fs-5", "m-0", "text-end", "text-sm-start");
			weatherInfoDiv.appendChild(errorElement);
			startModal.classList.remove("show");
		    }
		});
	} else {
	    const noInputMsg = document.createElement("h6");
	    noInputMsg.innerHTML = `Kérlek, add meg a hely nevét.`;
	    noInputMsg.classList.add("fw-light", "mt-2", "text-white", "fs-5", "m-0", "text-end", "text-sm-start");
	    startModalError.appendChild(noInputMsg);
	    startModal.classList.add("show");
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
