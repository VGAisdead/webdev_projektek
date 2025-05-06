const fetch = require("node-fetch");

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
		const apiKey = process.env.ACCUWEATHER_API_KEY;

		// Validate input
		if (!apiKey) {
			return {
				statusCode: 500,
				headers,
				body: JSON.stringify({ error: "API key is not configured" }),
			};
		}

		if (!cityName) {
			return {
				statusCode: 400,
				headers,
				body: JSON.stringify({ error: "Missing cityName parameter" }),
			};
		}

		// Create a mock response for testing
		// Remove this and uncomment the real API calls when ready
		if (type === "autocomplete") {
			return {
				statusCode: 200,
				headers,
				body: JSON.stringify([
					{
						Version: 1,
						Key: "187423",
						Type: "City",
						Rank: 65,
						LocalizedName: "Gödöllő",
						Country: {
							ID: "HU",
							LocalizedName: "Magyarország",
						},
						AdministrativeArea: {
							ID: "PE",
							LocalizedName: "Pest",
						},
					},
				]),
			};
		} else {
			return {
				statusCode: 200,
				headers,
				body: JSON.stringify({
					LocalizedName: "Gödöllő",
					Country: {
						ID: "HU",
						LocalizedName: "Magyarország",
					},
					Temperature: {
						Metric: {
							Value: 18.5,
							Unit: "C",
						},
					},
					WeatherText: "Részben felhős",
					WeatherIcon: 3,
				}),
			};
		}

		/* 
    // REAL API CALLS - UNCOMMENT WHEN READY
    if (type === 'autocomplete') {
      const url = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${encodeURIComponent(cityName)}&language=hu-hu`;
      const response = await fetch(url);
      
      if (!response.ok) {
        return {
          statusCode: response.status,
          headers,
          body: JSON.stringify({ error: `AccuWeather API error: ${response.status}` })
        };
      }
      
      const data = await response.json();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data)
      };
    } else {
      // City search
      const locationUrl = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${encodeURIComponent(cityName)}&language=hu-hu`;
      const locationResponse = await fetch(locationUrl);
      
      if (!locationResponse.ok) {
        return {
          statusCode: locationResponse.status,
          headers,
          body: JSON.stringify({ error: `Location API error: ${locationResponse.status}` })
        };
      }
      
      const locationData = await locationResponse.json();
      
      if (!locationData || locationData.length === 0) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'City not found' })
        };
      }
      
      // Weather data
      const locationKey = locationData[0].Key;
      const weatherUrl = `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&language=hu-hu&details=true`;
      const weatherResponse = await fetch(weatherUrl);
      
      if (!weatherResponse.ok) {
        return {
          statusCode: weatherResponse.status,
          headers,
          body: JSON.stringify({ error: `Weather API error: ${weatherResponse.status}` })
        };
      }
      
      const weatherData = await weatherResponse.json();
      
      if (!weatherData || weatherData.length === 0) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Weather data not available' })
        };
      }
      
      // Combine data
      const result = {
        ...locationData[0],
        ...weatherData[0]
      };
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(result)
      };
    }
    */
	} catch (error) {
		return {
			statusCode: 500,
			headers,
			body: JSON.stringify({ error: error.message }),
		};
	}
};
