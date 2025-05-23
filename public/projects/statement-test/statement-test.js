"use strict";
import { reports } from "./reports.js";

const startModal = document.getElementById("start-modal");
const modal = document.getElementById("modal");
const optionList = document.getElementById("option-list");
const reportTitle = document.getElementById("report-title");
const reportDescription = document.getElementById("report-description");
const reportTable = document.getElementById("report-table");
const reportSheet = document.getElementById("sheet");
const closeModalBtn = document.getElementById("close-modal");
const deleteRowBtn = document.getElementById("delete-row-btn");
const checkBtn = document.getElementById("check-button");
const resetBtn = document.getElementById("reset-statement");

const errorList = document.getElementById("error-list");
const errorModal = document.getElementById("error-modal");
const progressFill = document.getElementById("progress-fill");
const percentageText = document.getElementById("percentage-text");
const canvas = document.getElementById("confetti-canvas"); // confetti

let activeCell = null; // Az éppen kiválasztott cella
let availableOptions = []; // Az elérhető elemek listája
let selectedItems = []; // Kiválasztott elemek
let currentReportType = null; // Dinamikusan tároljuk a kiválasztott beszámoló típusát
let shuffledOptions = [];

// Induló modal megjelenítése
document.addEventListener("DOMContentLoaded", () => {
	if (startModal) startModal.classList.add("show");
});

// Fisher-Yates algoritmus a keveréshez
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

// Beszámoló kiválasztása
document.querySelectorAll(".select-report").forEach((button) => {
	button.addEventListener("click", function () {
		currentReportType = this.dataset.type;

		const selectedReport = reports[currentReportType];

		startModal.classList.remove("show");
		reportSheet.classList.remove("hidden");
		reportTitle.textContent = selectedReport.title;
		reportDescription.textContent = selectedReport.description;
		reportTitle.style.display = "block";
		reportDescription.style.display = "block";
		reportTable.style.display = "table";

		// Táblázat generálása
		reportTable.innerHTML = "";
		selectedReport.rows.forEach((row, index) => {
			const tableRow = document.createElement("tr");
			const cell = document.createElement("td");

			if (
				row.type === "mainheader" ||
				row.type === "secheader" ||
				row.type === "subheader" ||
				row.type === "sum"
			) {
				cell.textContent = `${row.label} ${row.name}`;
				cell.style.fontWeight = "bold";

				cell.setAttribute("data-bs-toggle", "tooltip");
				cell.setAttribute("data-bs-placement", "bottom");
				cell.setAttribute(
					"data-bs-title",
					row.tooltip || "Nincs leírás"
				);

				if (row.type === "mainheader") {
					cell.classList.add("mainheader");
				} else if (row.type === "secheader") {
					cell.classList.add("secheader");
				} else if (row.type === "subheader") {
					cell.classList.add("subheader");
				} else if (row.type === "sum") {
					cell.classList.add("sum");
				}
			} else if (row.type === "nothing") {
				cell.classList.add("nothing");
			} else {
				cell.textContent = row.label;
				cell.classList.add("selectable");
				cell.dataset.id = index;
				cell.dataset.label = row.label;

				cell.addEventListener("click", function () {
					activeCell = this;
					updateOptionsList();
					modal.classList.add("show");
				});
			}

			tableRow.appendChild(cell);
			reportTable.appendChild(tableRow);
		});

		availableOptions = selectedReport.rows.filter(
			(row) => row.type === "selectable"
		);
		shuffledOptions = shuffleArray([...availableOptions]);

		// Bootstrap tooltip-ek inicializálása
		const tooltipTriggerList = document.querySelectorAll(
			'[data-bs-toggle="tooltip"]'
		);
		const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => {
			const tooltip = new bootstrap.Tooltip(tooltipTriggerEl);
			tooltipTriggerEl.addEventListener("shown.bs.tooltip", () => {
				// Az összes látható tooltip nyílának módosítása
				const arrows = document.querySelectorAll(
					".tooltip.bs-tooltip-bottom .tooltip-arrow"
				);
				arrows.forEach((arrow) => {
					arrow.style.borderBottomColor = "#333"; // Inline felülírás
				});
			});
			return tooltip;
		});
	});
});

// --------------------------------------------------------------------

// Elérhető opciók frissítése és "Sor törlése" gomb kezelése
function updateOptionsList() {
	if (!optionList) {
		console.error("Hiba: optionList nem található!");
		return;
	}

	optionList.innerHTML = ""; // Opciók listájának kiürítése

	// Használt elemek tárolása
	const usedItems = new Set(
		Array.from(document.querySelectorAll("td[data-selected-option]")).map(
			(cell) => JSON.parse(cell.dataset.selectedOption)?.name
		)
	);

	let hasOptions = false;

	// Az elérhető, még nem választott opciók hozzáadása
	shuffledOptions.forEach((option) => {
		if (!usedItems.has(option.name)) {
			hasOptions = true; // Ha van elérhető opció, beállítjuk

			const li = document.createElement("li");
			li.textContent = option.name;

			li.addEventListener("click", () => {
				if (activeCell) {
					// Ha van korábban kiválasztott elem, azt visszahelyezzük
					if (activeCell.dataset.selectedOption) {
						try {
							const prevOption = JSON.parse(
								activeCell.dataset.selectedOption
							);
							shuffledOptions.push(prevOption);
							selectedItems = selectedItems.filter(
								(item) => item.name !== prevOption.name
							);
						} catch (e) {
							console.error("Hiba a JSON parseolásakor:", e);
						}
					}

					// Kiválasztott opció beállítása
					activeCell.textContent = `${activeCell.dataset.label} ${option.name}`;
					activeCell.dataset.selectedOption = JSON.stringify(option);
					shuffledOptions = shuffledOptions.filter(
						(opt) => opt.name !== option.name
					);
					selectedItems.push(option);

					// Opciók listájának frissítése
					updateOptionsList();
				}
				modal.classList.remove("show");
			});

			optionList.appendChild(li);
		}
	});

	// A törlés gombot egyértelműen elrejtjük, ha nincs aktív cella vagy nincs kiválasztott opció
	if (!activeCell || !activeCell.dataset.selectedOption) {
		deleteRowBtn.style.display = "none";
	} else {
		deleteRowBtn.style.display = "block";
	}
}

// Törlés gomb eseménykezelője
if (deleteRowBtn) {
	deleteRowBtn.addEventListener("click", () => {
		if (activeCell && activeCell.dataset.selectedOption) {
			try {
				const selectedOption = JSON.parse(
					activeCell.dataset.selectedOption
				);

				// A kiválasztott opciót visszahelyezzük az elérhető opciók közé
				shuffledOptions.push(selectedOption);
				shuffledOptions = shuffleArray(shuffledOptions); // Opciók újrakeverése

				// Kiválasztott elem eltávolítása a selectedItems listából
				selectedItems = selectedItems.filter(
					(item) => item.name !== selectedOption.name
				);

				// A kiválasztott cella visszaállítása az eredeti állapotára
				delete activeCell.dataset.selectedOption;
				activeCell.textContent = activeCell.dataset.label; // Az eredeti címke visszaállítása

				// Aktív cella törlése
				activeCell = null;

				// Opciók listájának frissítése
				updateOptionsList();

				// Biztosan elrejtjük a törlés gombot
				deleteRowBtn.style.display = "none";
			} catch (e) {
				console.error("Hiba a JSON parse-olás során:", e);
			}
		}
	});
}

// Modal bezárása
if (closeModalBtn) {
	closeModalBtn.addEventListener("click", () => {
		modal.classList.remove("show");
		activeCell = null; // Aktív cella törlése
		updateOptionsList();
		deleteRowBtn.style.display = "none"; // Törlés gomb elrejtése
	});
}
function closeModalOnOutsideClick(event, modalElement) {
	if (event.target === modalElement) {
		modalElement.classList.remove("show"); // Csak classList-et használunk
	}
}

// Ellenőrzés gomb
if (checkBtn) {
	checkBtn.addEventListener("click", () => {
		if (!currentReportType || !reports[currentReportType]) {
			showErrorModal("Nincs kiválasztott beszámoló!");
			return;
		}

		const selectedReport = reports[currentReportType];
		const expectedSelectableOrder = selectedReport.rows
			.filter((row) => row.type === "selectable")
			.map((row) => ({
				label: row.label,
				name: row.name,
			}));

		const userSelectableOrder = Array.from(
			document.querySelectorAll("#report-table tr td.selectable")
		).map((cell) => {
			let name = null;
			if (cell.dataset.selectedOption) {
				try {
					name = JSON.parse(cell.dataset.selectedOption).name;
				} catch (e) {
					console.error("Hiba a JSON parse-olás során:", e);
				}
			}
			return {
				label: cell.dataset.label,
				name: name,
			};
		});

		const emptyFields = userSelectableOrder.some(
			(user) => user.name === null
		);
		if (emptyFields) {
			showErrorModal(`Töltsd ki az összes mezőt!<br><br>`);
			return;
		}

		const errors = [];
		for (let i = 0; i < expectedSelectableOrder.length; i++) {
			const expected = expectedSelectableOrder[i];
			const user = userSelectableOrder[i];
			if (user.label !== expected.label) {
				errors.push(`Hiba: ${expected.label} sor rossz helyen van!`);
			} else if (user.name !== expected.name) {
				errors.push(
					`Hiba: ${expected.label} sor: ${user.name} (megoldás: ${expected.name})<br>`
				);
			}
		}

		if (errors.length > 0) {
			showErrorModal(errors.join("<br>"));
		} else {
			showErrorModal(`A megoldás helyes! ✅<br><br>`);

			// Konfetti
			setTimeout(() => {
				confetti({
					particleCount: 100,
					spread: 70,
					origin: { y: 0.6 },
				});
			}, 1000);
			setTimeout(() => {
				// Hang lejátszása
				const successSound = new Audio(
					"../../../assets/sounds/confetti.mp3"
				);
				successSound.play().catch((error) => {
					console.error("Hiba a hang lejátszásakor:", error);
				});
			}, 500);
		}
	});
}

// Eredmények modal (egységes progress bar logika)
function showErrorModal(message) {
	errorList.innerHTML = `<p>${message}</p>`;
	errorModal.classList.remove("show"); // Először eltávolítjuk a "show" osztályt
	setTimeout(() => {
		errorModal.classList.add("show"); // Kis késleltetéssel újra hozzáadjuk
	}, 10); // 10ms késleltetés az állapotfrissítéshez

	const selectableCells = document.querySelectorAll(
		"#report-table tr td.selectable"
	);
	const totalSelectable = selectableCells.length;
	const expectedOrder = reports[currentReportType].rows.filter(
		(row) => row.type === "selectable"
	);
	const userOrder = Array.from(selectableCells).map((cell) => ({
		label: cell.dataset.label,
		name: cell.dataset.selectedOption
			? JSON.parse(cell.dataset.selectedOption).name
			: null,
	}));

	let correctCount = 0;
	for (let i = 0; i < expectedOrder.length; i++) {
		if (userOrder[i].name === expectedOrder[i].name) {
			correctCount++;
		}
	}

	const percentage = (correctCount / totalSelectable) * 100;

	// Progress bar animáció
	progressFill.style.transition = "none";
	progressFill.style.width = "0%";
	setTimeout(() => {
		progressFill.style.transition = "width 1s ease-out";
		progressFill.style.width = `${percentage}%`;
	}, 50);

	// Percentage text animáció
	let start = 0;
	const end = Math.round(percentage);
	const duration = 500;
	const startTime = performance.now();

	function animateText(currentTime) {
		const elapsed = currentTime - startTime;
		const progress = Math.min(elapsed / duration, 1);
		const currentValue = Math.round(start + (end - start) * progress);

		percentageText.textContent = `${currentValue}%`;

		if (progress < 1) {
			requestAnimationFrame(animateText);
		} else {
			percentageText.textContent = `${end}%`;
		}
	}

	percentageText.textContent = "0%";
	requestAnimationFrame(animateText);
}
// Hibamodal bezárása (progress bar reset)
document.getElementById("close-error-modal").addEventListener("click", () => {
	errorModal.classList.remove("show");
	progressFill.style.width = "0%";
	percentageText.textContent = "0%";
});

// Progress bar frissítése
function updateProgressBar(percentage) {
	const progressFill = document.getElementById("progress-fill");
	const percentageText = document.getElementById("percentage-text");

	// Progress bar szélesség a százalékos érték alapján
	progressFill.style.width = percentage + "%";

	// Frissítjük a százalékos szöveget
	percentageText.textContent = percentage + "%";
}

// Modalok bezárása
window.addEventListener("click", (event) =>
	closeModalOnOutsideClick(event, modal)
);
window.addEventListener("click", (event) =>
	closeModalOnOutsideClick(event, errorModal)
);

// Beszámoló reset
resetBtn.addEventListener("click", () => {
	window.addEventListener("click", (event) =>
		closeModalOnOutsideClick(event, startModal)
	);
	startModal.classList.add("show");
});
