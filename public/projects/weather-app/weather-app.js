"use strict";

const searchBtn = document.getElementById("searchBtn");
const inputBtn = document.getElementById("inputBtn");
const startModal = document.getElementById("start-modal");

// Induló modal megjelenítése
document.addEventListener("DOMContentLoaded", () => {
	if (startModal) startModal.classList.add("show");
});

// Keresés
inputBtn.addEventListener("click", () => {
	startModal.classList.toggle("show");
});

searchBtn.addEventListener("click", () => {
	startModal.classList.toggle("show");
});
