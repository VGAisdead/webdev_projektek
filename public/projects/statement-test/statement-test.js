"use strict";
const startModal = document.getElementById("start-modal");
const modal = document.getElementById("modal");
const optionList = document.getElementById("option-list");
const reportTitle = document.getElementById("report-title");
const reportDescription = document.getElementById("report-description");
const reportTable = document.getElementById("report-table");
const reportSheet = document.getElementById("sheet");
const closeModalBtn = document.getElementById("close-modal");
const deleteRowBtn = document.getElementById("delete-row-btn");

let activeCell = null; // Az éppen kiválasztott cella
let availableOptions = []; // Az elérhető elemek listája
let selectedItems = []; // Kiválasztott elemek
let currentReportType = null; // Dinamikusan tároljuk a kiválasztott beszámoló típusát
let shuffledOptions = [];

// Beszámolók adatai
const reports = {
	merleg: {
		title: "Mérleg",
		description: "A mérleg egy pénzügyi kimutatás...",
		rows: [
			{
				label: "ESZKÖZÖK /",
				name: "AKTÍVÁK",
				type: "mainheader",
			},
			{
				label: "A/",
				name: "Befektetett eszközök",
				type: "secheader",
			},
			{
				label: "I.",
				name: "Immateriális javak",
				type: "subheader",
			},
			{
				label: "1.",
				name: "Alapítás átszervezés aktivált értéke",
				type: "selectable",
			},
			{
				label: "2.",
				name: "Kísérleti fejlesztés aktivált értéke",
				type: "selectable",
			},
			{
				label: "3.",
				name: "Vagyoni értékű jogok",
				type: "selectable",
			},
			{
				label: "4.",
				name: "Szellemi termékek",
				type: "selectable",
			},
			{
				label: "5.",
				name: "Üzleti vagy cégérték",
				type: "selectable",
			},
			{
				label: "6.",
				name: "Immateriális javakra adott előlegek",
				type: "selectable",
			},
			{
				label: "7.",
				name: "Immateriális javak értékhelyesbítése",
				type: "selectable",
			},
			{
				label: "II.",
				name: "Tárgyi eszközök",
				type: "subheader",
			},
			{
				label: "1.",
				name: "Ingatlanok és a kapcsolódó vagyoni értékű jogok",
				type: "selectable",
			},
			{
				label: "2.",
				name: "Műszaki berendezések, gépek, járművek",
				type: "selectable",
			},
			{
				label: "3.",
				name: "Egyéb berendezések, felszerelések, járművek",
				type: "selectable",
			},
			{
				label: "B/",
				name: "Forgóeszközök",
				type: "secheader",
			},
			{ label: "I.", name: "Készletek", type: "subheader" },
			{ label: "1.", name: "Anyagok", type: "selectable" },
			{
				label: "2.",
				name: "Befejezetlen és félkész termékek",
				type: "selectable",
			},
			{
				label: "C/",
				name: "Aktív időbeli elhatárolások",
				type: "secheader",
			},
			{
				label: "1.",
				name: "Bevételek aktív időbeli elhatárolása",
				type: "selectable",
			},
			{
				label: "FORRÁSOK /",
				name: "PASSZÍVÁK",
				type: "mainheader",
			},
		],
	},
	osszkoltseg: {
		title: "Összköltség Eredménykimutatás",
		description: "Összköltség Eredménykimutatás...",
		rows: [
			{
				label: "01.",
				name: "Belföldi értékesítés nettó árbevétele",
				type: "selectable",
			},
			{
				label: "02.",
				name: "Export értékesítés nettó árbevétele",
				type: "selectable",
			},
			{
				label: "I.",
				name: "Értékesítés nettó árbevétele (01+02)",
				type: "secheader",
			},
			{
				label: "03.",
				name: "Saját termelésű készletek állományváltozása",
				type: "selectable",
			},
			{
				label: "04.",
				name: "Saját előállítású eszközök aktivált értéke",
				type: "selectable",
			},
			{
				label: "II.",
				name: "Aktivált saját teljesítmények értéke (±03+04)",
				type: "secheader",
			},
			{
				label: "A /",
				name: "ÜZEMI (Üzleti) tevékenység eredménye",
				type: "mainheader",
			},

			{
				label: "I.",
				name: "Immateriális javak",
				type: "subheader",
			},
		],
	},

	forgalmi: {
		title: "Forgalmi Eredménykimutatás",
		description: "Forgalmi Eredménykimutatás...",
		rows: [
			{
				label: "01.",
				name: "Belföldi értékesítés nettó árbevétele",
				type: "selectable",
			},
			{
				label: "02.",
				name: "Export értékesítés nettó árbevétele",
				type: "selectable",
			},
			{
				label: "I.",
				name: "Értékesítés nettó árbevétele (01+02)",
				type: "secheader",
			},
			{
				label: "03.",
				name: "Saját termelésű készletek állományváltozása",
				type: "selectable",
			},
			{
				label: "04.",
				name: "Saját előállítású eszközök aktivált értéke",
				type: "selectable",
			},
			{
				label: "II.",
				name: "Aktivált saját teljesítmények értéke (±03+04)",
				type: "secheader",
			},
			{
				label: "A /",
				name: "ÜZEMI (Üzleti) tevékenység eredménye",
				type: "mainheader",
			},

			{
				label: "I.",
				name: "Immateriális javak",
				type: "subheader",
			},
		],
	},

	cashflow: {
		title: "Cashflow kimutatás",
		description: "Cahsflow kimutatás...",
		rows: [
			{
				label: "01.",
				name: "Belföldi értékesítés nettó árbevétele",
				type: "selectable",
			},
			{
				label: "02.",
				name: "Export értékesítés nettó árbevétele",
				type: "selectable",
			},
			{
				label: "I.",
				name: "Értékesítés nettó árbevétele (01+02)",
				type: "secheader",
			},
			{
				label: "03.",
				name: "Saját termelésű készletek állományváltozása",
				type: "selectable",
			},
			{
				label: "04.",
				name: "Saját előállítású eszközök aktivált értéke",
				type: "selectable",
			},
			{
				label: "II.",
				name: "Aktivált saját teljesítmények értéke (±03+04)",
				type: "secheader",
			},
			{
				label: "A /",
				name: "ÜZEMI (Üzleti) tevékenység eredménye",
				type: "mainheader",
			},

			{
				label: "I.",
				name: "Immateriális javak",
				type: "subheader",
			},
		],
	},
};

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

		startModal.style.display = "none";
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
				row.type === "subheader"
			) {
				cell.textContent = `${row.label} ${row.name}`;
				cell.style.fontWeight = "bold";

				if (row.type === "mainheader") {
					cell.classList.add("mainheader");
				} else if (row.type === "secheader") {
					cell.classList.add("secheader");
				} else if (row.type === "subheader") {
					cell.classList.add("subheader");
				}
			} else {
				cell.textContent = row.label;
				cell.classList.add("selectable");
				cell.dataset.id = index;
				cell.dataset.label = row.label; // Eredeti címke tárolása

				cell.addEventListener("click", function () {
					activeCell = this;
					updateOptionsList();
					modal.style.display = "flex";
				});
			}

			tableRow.appendChild(cell);
			reportTable.appendChild(tableRow);
		});
		// Elérhető opciók szűrése és keverése
		availableOptions = selectedReport.rows.filter(
			(row) => row.type === "selectable"
		);
		shuffledOptions = shuffleArray([...availableOptions]);
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

	// Az elérhető, még nem választott opciók hozzáadása
	shuffledOptions.forEach((option) => {
		if (!usedItems.has(option.name)) {
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
				modal.style.display = "none"; // Modal bezárása
			});

			optionList.appendChild(li);
		}
	});

	// Törlés gomb megjelenítése, ha van kiválasztott sor
	if (deleteRowBtn && activeCell && activeCell.dataset.selectedOption) {
		deleteRowBtn.style.display = "block"; // Gomb megjelenítése
	} else {
		deleteRowBtn.style.display = "none"; // Gomb elrejtése, ha nincs kiválasztott sor
	}
}

// Törlés gomb eseménykezelője
if (deleteRowBtn) {
	deleteRowBtn.addEventListener("click", () => {
		if (activeCell && activeCell.dataset.selectedOption) {
			const selectedOption = JSON.parse(
				activeCell.dataset.selectedOption
			);

			// A kiválasztott opciót visszahelyezzük az elérhető opciók közé
			shuffledOptions.push(selectedOption);
			shuffledOptions = shuffleArray(shuffledOptions); // Opciók újra keverése

			// A kiválasztott cella törlése
			activeCell.dataset.selectedOption = null;
			activeCell.textContent = activeCell.dataset.label; // Az eredeti címke visszaállítása

			// Kiválasztott elem eltávolítása a selectedItems listából
			selectedItems = selectedItems.filter(
				(item) => item.name !== selectedOption.name
			);

			// Opciók listájának frissítése
			updateOptionsList();

			// A "Sor törlése" gomb elrejtése, ha nincs kiválasztott elem
			deleteRowBtn.style.display = "none";
		}
	});
}

// Modal bezárása
if (closeModalBtn) {
	closeModalBtn.addEventListener("click", () => {
		modal.style.display = "none"; // Modal bezárása
		updateOptionsList(); // Frissítjük az opciókat
	});
}

window.addEventListener("click", (event) => {
	if (event.target === modal) {
		modal.style.display = "none"; // Modal bezárása, ha a háttéren kattintunk
	}
});

document.getElementById("check-button").addEventListener("click", () => {
	console.log("Ellenőrzés gomb megnyomva!");

	if (!currentReportType || !reports[currentReportType]) {
		showErrorModal("Nincs kiválasztott beszámoló!");
		return;
	}

	const selectedReport = reports[currentReportType];

	// Csak a selectable sorok elvárt sorrendje
	const expectedSelectableOrder = selectedReport.rows
		.filter((row) => row.type === "selectable")
		.map((row) => ({
			label: row.label,
			name: row.name,
		}));

	// A felhasználó által kitöltött selectable sorok
	const userSelectableOrder = Array.from(
		document.querySelectorAll("#report-table tr td.selectable")
	).map((cell) => ({
		label: cell.dataset.label,
		name: cell.dataset.selectedOption
			? JSON.parse(cell.dataset.selectedOption).name
			: null,
	}));

	console.log("Kitöltött adatok:", userSelectableOrder);

	// Ellenőrizzük, hogy minden mező ki van-e töltve
	const emptyFields = userSelectableOrder.some((user) => user.name === null);

	if (emptyFields) {
		showErrorModal("Töltse ki az összes mezőt!");
		return;
	}

	const errors = [];
	for (let i = 0; i < expectedSelectableOrder.length; i++) {
		const expected = expectedSelectableOrder[i];
		const user = userSelectableOrder[i];

		if (user.label !== expected.label) {
			errors.push(`Hiba: A(z) ${expected.label} sor rossz helyen van!`);
		} else if (user.name !== expected.name) {
			errors.push(
				`Hiba: ${expected.label} sor: ${user.name} (megoldás: ${expected.name})`
			);
		}
	}

	if (errors.length > 0) {
		showErrorModal(errors.join("<br>"));
	} else {
		showErrorModal("A megoldás helyes! ✅");
	}
});

// Hibaüzenet megjelenítése a modalban
function showErrorModal(message) {
	const errorList = document.getElementById("error-list");
	const errorModal = document.getElementById("error-modal");

	errorList.innerHTML = `<p>${message}</p>`;
	errorModal.classList.add("show");
}

// Hibamodal bezárása
document.getElementById("close-error-modal").addEventListener("click", () => {
	document.getElementById("error-modal").classList.remove("show");
});

window.addEventListener("click", (event) => {
	const errorModal = document.getElementById("error-modal");
	if (event.target === errorModal) {
		errorModal.classList.remove("show");
	}
});
