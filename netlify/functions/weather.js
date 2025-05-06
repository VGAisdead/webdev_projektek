import fetch from "node-fetch";

exports.handler = async function (event, context) {
	// CORS headers
	const headers = {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Headers": "Content-Type",
		"Content-Type": "application/json",
	};

	try {
		// Extract query parameters
		const cityName = event.queryStringParameters?.cityName;
		const type = event.queryStringParameters?.type;
		const locationKey = event.queryStringParameters?.locationKey;
		const apiKey = process.env.ACCUWEATHER_API_KEY;

		// Validate input
		if (!apiKey) {
			return {
				statusCode: 500,
				headers,
				body: JSON.stringify({ error: "API key is not configured" }),
			};
		}

		if (!cityName && !locationKey) {
			return {
				statusCode: 400,
				headers,
				body: JSON.stringify({ error: "Missing required parameters" }),
			};
		}

		// REAL API CALLS
		if (type === "autocomplete") {
			// City autocomplete
			const url = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${encodeURIComponent(
				cityName
			)}&language=hu-hu`;

			console.log(`Making autocomplete request to: ${url}`);
			const response = await fetch(url);

			if (!response.ok) {
				console.error(`AccuWeather API error: ${response.status}`);
				return {
					statusCode: response.status,
					headers,
					body: JSON.stringify({
						error: `AccuWeather API error: ${response.status}`,
					}),
				};
			}

			const data = await response.json();
			return {
				statusCode: 200,
				headers,
				body: JSON.stringify(data),
			};
		} else if (locationKey) {
			// Direct weather lookup by location key (more efficient)
			const weatherUrl = `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&language=hu-hu&details=true`;
			console.log(`Making weather request by key to: ${weatherUrl}`);

			const weatherResponse = await fetch(weatherUrl);

			if (!weatherResponse.ok) {
				console.error(`Weather API error: ${weatherResponse.status}`);
				return {
					statusCode: weatherResponse.status,
					headers,
					body: JSON.stringify({
						error: `Weather API error: ${weatherResponse.status}`,
					}),
				};
			}

			const weatherData = await weatherResponse.json();

			if (!weatherData || weatherData.length === 0) {
				return {
					statusCode: 404,
					headers,
					body: JSON.stringify({
						error: "Weather data not available",
					}),
				};
			}

			// Get the location data as well since we only have the key
			// This ensures we have complete information to display
			const locationUrl = `https://dataservice.accuweather.com/locations/v1/${locationKey}?apikey=${apiKey}&language=hu-hu`;
			console.log(`Making location request by key to: ${locationUrl}`);

			const locationResponse = await fetch(locationUrl);

			if (!locationResponse.ok) {
				// Even if this fails, we still have weather data to return
				console.error(`Location API error: ${locationResponse.status}`);
				return {
					statusCode: 200,
					headers,
					body: JSON.stringify({
						...weatherData[0],
						LocalizedName: locationKey, // Fallback
					}),
				};
			}

			const locationData = await locationResponse.json();

			// Combine location and weather data
			const result = {
				...locationData,
				...weatherData[0],
			};

			return {
				statusCode: 200,
				headers,
				body: JSON.stringify(result),
			};

			// TESTING
			console.log("locationKey:", locationKey);
			console.log("weatherData:", weatherData);
		} else {
			// City search by name if we don't have a locationKey
			const locationUrl = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${encodeURIComponent(
				cityName
			)}&language=hu-hu`;

			console.log(`Making location search request to: ${locationUrl}`);
			const locationResponse = await fetch(locationUrl);

			if (!locationResponse.ok) {
				console.error(`Location API error: ${locationResponse.status}`);
				return {
					statusCode: locationResponse.status,
					headers,
					body: JSON.stringify({
						error: `Location API error: ${locationResponse.status}`,
					}),
				};
			}

			const locationData = await locationResponse.json();

			if (!locationData || locationData.length === 0) {
				return {
					statusCode: 404,
					headers,
					body: JSON.stringify({ error: "City not found" }),
				};
			}

			// Get the location key from the first result
			const locKey = locationData[0].Key;

			// Weather data
			const weatherUrl = `https://dataservice.accuweather.com/currentconditions/v1/${locKey}?apikey=${apiKey}&language=hu-hu&details=true`;
			console.log(`Making weather request to: ${weatherUrl}`);

			const weatherResponse = await fetch(weatherUrl);

			if (!weatherResponse.ok) {
				console.error(`Weather API error: ${weatherResponse.status}`);
				return {
					statusCode: weatherResponse.status,
					headers,
					body: JSON.stringify({
						error: `Weather API error: ${weatherResponse.status}`,
					}),
				};
			}

			const weatherData = await weatherResponse.json();

			if (!weatherData || weatherData.length === 0) {
				return {
					statusCode: 404,
					headers,
					body: JSON.stringify({
						error: "Weather data not available",
					}),
				};
			}

			// Combine data - extract the first weather result and add location info
			const result = {
				...locationData[0],
				...weatherData[0],
			};

			return {
				statusCode: 200,
				headers,
				body: JSON.stringify(result),
			};

			console.log("locationKey:", locationKey);
			console.log("weatherData:", weatherData);
		}
	} catch (error) {
		console.error("Server error:", error);
		return {
			statusCode: 500,
			headers,
			body: JSON.stringify({ error: error.message }),
		};
	}
};
