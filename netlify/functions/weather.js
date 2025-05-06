import fetch from "node-fetch";

exports.handler = async function (event) {
	const headers = {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Headers": "Content-Type",
		"Content-Type": "application/json",
	};

	const apiKey = process.env.ACCUWEATHER_API_KEY;
	const { cityName, type, locationKey, language } =
		event.queryStringParameters || {};

	if (!apiKey) {
		return {
			statusCode: 500,
			headers,
			body: JSON.stringify({ error: "API key is missing" }),
		};
	}

	// Autocomplete keresés
	if (type === "autocomplete" && typeof cityName === "string") {
		try {
			const url = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${encodeURIComponent(
				cityName
			)}&language=hu-hu`;
			const response = await fetch(url);
			const data = await response.json();
			return {
				statusCode: 200,
				headers,
				body: JSON.stringify(data),
			};
		} catch (err) {
			return {
				statusCode: 500,
				headers,
				body: JSON.stringify({
					error: "Autocomplete fetch failed",
					details: err.message,
				}),
			};
		}
	}

	// Időjárás locationKey alapján
	if (locationKey) {
		try {
			const weatherUrl = `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&language=hu-hu&details=true`;
			const weatherRes = await fetch(weatherUrl);
			const weatherData = await weatherRes.json();

			const locationUrl = `https://dataservice.accuweather.com/locations/v1/${locationKey}?apikey=${apiKey}&language=hu-hu`;
			const locationRes = await fetch(locationUrl);
			const locationData = await locationRes.json();

			return {
				statusCode: 200,
				headers,
				body: JSON.stringify({
					location: locationData,
					weather: weatherData[0],
				}),
			};
		} catch (err) {
			return {
				statusCode: 500,
				headers,
				body: JSON.stringify({
					error: "Weather fetch failed",
					details: err.message,
				}),
			};
		}
	}

	return {
		statusCode: 400,
		headers,
		body: JSON.stringify({ error: "Missing or invalid parameters" }),
	};
};
