"use strict";

document.addEventListener("DOMContentLoaded", function () {
	const includes = document.querySelectorAll("[data-include]");
	let componentsLoaded = 0;

	// Get base path (for GitHub Pages compatibility)
	const getBasePath = () => {
		// For your specific repository: webdev_projektek
		if (window.location.hostname.includes("github.io")) {
			return "/webdev_projektek";
		}
		return "";
	};

	const basePath = getBasePath();
	console.log("Base path detected:", basePath); // Debug output

	// Function to fix navigation links - will be called after components are loaded
	const fixNavigationLinks = () => {
		console.log("Fixing navigation links with basePath:", basePath); // Debug output

		// Fix navigation links in the header
		document.querySelectorAll('#header a[href^="/"]').forEach((link) => {
			// Skip anchors and external links
			if (
				!link.getAttribute("href").startsWith("/#") &&
				!link.getAttribute("href").startsWith("http")
			) {
				const originalHref = link.getAttribute("href");
				link.href = basePath + originalHref;
				console.log(`Updated link: ${originalHref} → ${link.href}`); // Debug output
			}
		});

		// Also fix any other absolute paths in the footer if needed
		document.querySelectorAll('#footer a[href^="/"]').forEach((link) => {
			if (
				!link.getAttribute("href").startsWith("/#") &&
				!link.getAttribute("href").startsWith("http")
			) {
				link.href = basePath + link.getAttribute("href");
			}
		});
	};

	// If no components to load, fix links immediately
	if (includes.length === 0) {
		fixNavigationLinks();
		return;
	}

	// Load each component
	includes.forEach(function (element) {
		let file = element.getAttribute("data-include");

		// Convert paths to work with GitHub Pages
		if (file.startsWith("/")) {
			file = basePath + file;
		}

		console.log("Loading component from:", file); // Debug output

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

				// Count loaded components
				componentsLoaded++;
				console.log(
					`Component loaded: ${componentsLoaded}/${includes.length}`
				); // Debug output

				// If all components are loaded, fix navigation links
				if (componentsLoaded === includes.length) {
					console.log(
						"All components loaded, fixing navigation links"
					); // Debug output
					fixNavigationLinks();
				}
			})
			.catch((error) => {
				console.error(`Error loading component: ${error}`);
				element.innerHTML = `<div class="alert alert-danger">Failed to load ${file}</div>`;

				// Even on error, count as processed
				componentsLoaded++;

				// If all components are processed, fix navigation links
				if (componentsLoaded === includes.length) {
					fixNavigationLinks();
				}
			});
	});
});
