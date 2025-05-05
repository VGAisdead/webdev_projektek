"use strict";

const fetch = require("node-fetch");

exports.handler = async (event, context) => {
	const apiKey = process.env.ACCUWEATHER_API_KEY;
	const cityName = event.queryStringParameters.cityName;

	if (!cityName) {
		return {
			statusCode: 400,
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ error: "Hiányzó cityName paraméter" }),
		};
	}

	const locationApiUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${cityName}&language=hu-hu`;

	try {
		const locationResponse = await fetch(locationApiUrl);
		if (!locationResponse.ok) {
			const errorText = await locationResponse.text();
			console.error(
				"Location API hiba:",
				locationResponse.status,
				errorText
			);
			throw new Error(
				`Location API hiba: ${locationResponse.status} - ${errorText}`
			);
		}
		const locationData = await locationResponse.json();

		if (locationData && locationData.length > 0) {
			const locationKey = locationData[0].Key;
			const currentWeatherApiUrl = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&language=hu-hu&details=true`;

			console.log("Current Weather API URL:", currentWeatherApiUrl); // LOGOLÁS!

			const currentWeatherResponse = await fetch(currentWeatherApiUrl);
			if (!currentWeatherResponse.ok) {
				const errorText = await currentWeatherResponse.text();
				console.error(
					"Current Weather API hiba:",
					currentWeatherResponse.status,
					errorText
				);
				throw new Error(
					`Current Weather API hiba: ${currentWeatherResponse.status} - ${errorText}`
				);
			}
			const currentWeatherData = await currentWeatherResponse.json();

			return {
				statusCode: 200,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(currentWeatherData),
			};
		} else {
			return {
				statusCode: 404,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ error: "Nem található ilyen város" }),
			};
		}
	} catch (error) {
		console.error("Hiba az AccuWeather API hívásakor:", error);
		return {
			statusCode: 500,
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				error: `Időjárás adatok lekérése sikertelen: ${error.message}`,
			}),
		};
	}
};
