"use strict";

document.addEventListener("DOMContentLoaded", function () {
	// Handle all elements with data-include attribute
	const includes = document.querySelectorAll("[data-include]");

	includes.forEach(function (element) {
		const file = element.getAttribute("data-include");

		// Fetch the component file
		fetch(file)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Could not load ${file}`);
				}
				return response.text();
			})
			.then((html) => {
				element.innerHTML = html;

				// Execute any scripts that were in the included HTML
				element.querySelectorAll("script").forEach((script) => {
					const newScript = document.createElement("script");

					Array.from(script.attributes).forEach((attr) => {
						newScript.setAttribute(attr.name, attr.value);
					});

					newScript.textContent = script.textContent;
					script.parentNode.replaceChild(newScript, script);
				});
			})
			.catch((error) => {
				console.error(`Error loading component: ${error}`);
			});
	});
});
