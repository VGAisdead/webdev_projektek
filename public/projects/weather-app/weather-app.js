"use strict";

const searchBtn = document.getElementById("searchBtn");
const inputBtn = document.getElementById("inputBtn");
const startModal = document.getElementById("start-modal");
const startModalError = document.getElementById("start-modal-error");
const locationInput = document.getElementById("locationInput");
const autocompleteList = document.getElementById("autocompleteList");
const weatherInfoDiv = document.getElementById("weatherInfo");

// Induló modal megjelenítése
document.addEventListener("DOMContentLoaded", () => {
	inputBtn.addEventListener("click", getWeather);

	searchBtn.addEventListener("click", () => {
		showModal();
	});
});

function showModal() {
	startModal.classList.add("show");
}

function hideModal() {
	startModal.classList.remove("show");
}

// API fetch
const getWeather = () => {
	const cityName = locationInput.value.trim();
	startModalError.textContent = "";

	if (!cityName) {
		// Üres input esetén hibaüzenet + modal marad nyitva
		const noInputMsg = document.createElement("h6");
		noInputMsg.innerHTML = `Kérlek, add meg a hely nevét.`;
		noInputMsg.classList.add(
			"fw-light",
			"mt-2",
			"text-white",
			"fs-5",
			"m-0",
			"text-end",
			"text-sm-start"
		);
		startModalError.appendChild(noInputMsg);
		showModal();
		return;
	}

	// Itt minden más esetben rögtön bezárjuk a modalt (még ha hibázik is később)
	startModal.classList.remove("show");

	fetch(`/.netlify/functions/weather?cityName=${cityName}`)
		.then(async (response) => {
			if (!response.ok) {
				const statusCode = response.status;
				throw new Error(`Location API hiba: ${statusCode}`);
			}
			return response.json();
		})
		.then((data) => {
			// Érvénytelen város (üres válaszlista) esetén: modal újra megnyílik
			if (!data || (Array.isArray(data) && data.length === 0)) {
				weatherInfoDiv.innerHTML = "";
				const notFoundMsg = document.createElement("h6");
				notFoundMsg.innerHTML = `Nem található ilyen város.`;
				notFoundMsg.classList.add(
					"text-black",
					"fs-5",
					"m-0",
					"text-end",
					"text-sm-start"
				);
				weatherInfoDiv.appendChild(notFoundMsg);
				showModal();
				return;
			}

			// Sikeres válasz → megjelenítjük az időjárást
			displayWeather(data);
			hideModal();
		})
		.catch((error) => {
			console.error("Hiba:", error.message);
			weatherInfoDiv.innerHTML = "";
			const errorElement = document.createElement("h6");
			errorElement.innerHTML = `
		    Hiba történt az időjárás adatok lekérésekor<br>
		    ${error.message}
		`;
			errorElement.classList.add(
				"text-black",
				"fs-5",
				"m-0",
				"text-end",
				"text-sm-start"
			);
			hideModal();
			weatherInfoDiv.appendChild(errorElement);
		});
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

// autocomplete

locationInput.addEventListener("input", async () => {
	const query = locationInput.value.trim();

	if (data.length > 0) {
		autocompleteList.classList.add("show");

		data.forEach((location) => {
			const listItem = document.createElement("li");
			listItem.textContent = `${location.LocalizedName}, ${location.Country.LocalizedName}`;
			listItem.dataset.key = location.Key;
			listItem.addEventListener("click", () => {
				locationInput.value = location.LocalizedName;
				autocompleteList.innerHTML = "";
				autocompleteList.classList.remove("show");
			});
			autocompleteList.appendChild(listItem);
		});
	} else {
		autocompleteList.classList.remove("show");
	}

	if (query.length < 2) {
		autocompleteList.innerHTML = "";
		autocompleteList.classList.remove("show");
		return;
	}

	try {
		const response = await fetch(
			`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${query}&language=hu-hu`
		);

		if (!response.ok)
			throw new Error("Nem sikerült betölteni a javaslatokat.");

		const data = await response.json();

		// töröljük a korábbi javaslatokat
		autocompleteList.innerHTML = "";

		data.forEach((location) => {
			const listItem = document.createElement("li");
			listItem.textContent = `${location.LocalizedName}, ${location.Country.LocalizedName}`;
			listItem.dataset.key = location.Key; // későbbi használathoz
			listItem.addEventListener("click", () => {
				locationInput.value = location.LocalizedName;
				autocompleteList.innerHTML = "";
				// itt esetleg bezárhatod a modalt vagy hívhatod a getWeather-t is
			});
			autocompleteList.appendChild(listItem);
		});
	} catch (error) {
		console.error("Autocomplete hiba:", error);
		autocompleteList.innerHTML = "";
	}
});

document.addEventListener("click", (e) => {
	if (!startModal.contains(e.target)) {
		autocompleteList.innerHTML = "";
		autocompleteList.classList.remove("show");
	}
});

locationInput.addEventListener("keydown", (e) => {
	if (e.key === "Escape") {
		autocompleteList.innerHTML = "";
		autocompleteList.classList.remove("show");
	}
});
