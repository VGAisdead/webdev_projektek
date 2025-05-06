"use strict";

import fetch from "node-fetch";

export const handler = async (event, context) => {
	const apiKey = process.env.ACCUWEATHER_API_KEY;
	const { cityName, type } = event.queryStringParameters;

	if (!cityName) {
		return {
			statusCode: 400,
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ error: "Hiányzó cityName paraméter" }),
		};
	}

	try {
		if (type === "autocomplete") {
			// Autocomplete endpoint
			const autocompleteUrl = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${encodeURIComponent(
				cityName
			)}&language=hu-hu`;
			const response = await fetch(autocompleteUrl);

			if (!response.ok) {
				throw new Error(`Autocomplete API hiba: ${response.status}`);
			}

			const data = await response.json();
			return {
				statusCode: 200,
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
				body: JSON.stringify(data),
			};
		} else {
			// Alapértelmezett: teljes város + időjárás lekérés
			const locationApiUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${encodeURIComponent(
				cityName
			)}&language=hu-hu`;

			const locationResponse = await fetch(locationApiUrl);
			if (!locationResponse.ok) {
				const errorText = await locationResponse.text();
				throw new Error(
					`Location API hiba: ${locationResponse.status} - ${errorText}`
				);
			}
			const locationData = await locationResponse.json();

			if (locationData && locationData.length > 0) {
				const locationKey = locationData[0].Key;
				const currentWeatherApiUrl = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&language=hu-hu&details=true`;

				const currentWeatherResponse = await fetch(
					currentWeatherApiUrl
				);
				if (!currentWeatherResponse.ok) {
					const errorText = await currentWeatherResponse.text();
					throw new Error(
						`Current Weather API hiba: ${currentWeatherResponse.status} - ${errorText}`
					);
				}
				const currentWeatherData = await currentWeatherResponse.json();

				// Merge location data with weather data
				const enrichedData = {
					...locationData[0],
					...currentWeatherData[0],
				};

				return {
					statusCode: 200,
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*",
					},
					body: JSON.stringify(enrichedData),
				};
			} else {
				return {
					statusCode: 404,
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*",
					},
					body: JSON.stringify({
						error: "Nem található ilyen város",
					}),
				};
			}
		}
	} catch (error) {
		console.error("Hiba az AccuWeather API hívásakor:", error);
		return {
			statusCode: 500,
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify({
				error: `Időjárás adatok lekérése sikertelen: ${error.message}`,
			}),
		};
	}
};
