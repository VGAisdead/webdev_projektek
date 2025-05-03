"use strict";

document.addEventListener("DOMContentLoaded", function () {
	const includes = document.querySelectorAll("[data-include]");

	// Get base path (for GitHub Pages compatibility)
	const getBasePath = () => {
		// Get the repo name from the URL for GitHub Pages
		const pathParts = window.location.pathname.split("/");
		if (
			pathParts.length > 1 &&
			window.location.hostname.includes("github.io")
		) {
			// We're on GitHub Pages, likely format: /repo-name/...
			return "/" + pathParts[1];
		}
		return "";
	};

	const basePath = getBasePath();

	includes.forEach(function (element) {
		let file = element.getAttribute("data-include");

		// Convert paths to work with GitHub Pages
		if (file.startsWith("/")) {
			file = basePath + file;
		}

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

				// Execute any scripts in the included HTML
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
				element.innerHTML = `<div class="alert alert-danger">Failed to load ${file}</div>`;
			});
	});
});
