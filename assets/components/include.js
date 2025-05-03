"use strict";

document.addEventListener("DOMContentLoaded", function () {
	// Get the base URL for the current page
	const baseUrl = window.location.pathname.includes("/")
		? window.location.pathname.substring(
				0,
				window.location.pathname.lastIndexOf("/") + 1
		  )
		: "/";

	// Handle all elements with data-include attribute
	const includes = document.querySelectorAll("[data-include]");

	includes.forEach(function (element) {
		// Get the include path
		let file = element.getAttribute("data-include");

		// Remove leading slash if present to make path relative
		if (file.startsWith("/")) {
			file = file.substring(1);
		}

		// Fetch the component file
		fetch(file)
			.then((response) => {
				if (!response.ok) {
					// If file isn't found at the path, try with repository name prefix
					if (window.location.hostname.includes("github.io")) {
						// Extract repository name from GitHub Pages URL
						const repoName = window.location.pathname.split("/")[1];
						// Try with repository name prefix
						return fetch(`/${repoName}/${file}`);
					}
					throw new Error(`Could not load ${file}`);
				}
				return response;
			})
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
				element.innerHTML = `<div style="color:red">Failed to load component: ${file}</div>`;
			});
	});
});
