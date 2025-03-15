const startModal = document.getElementById("start-modal");
const modal = document.getElementById("modal");
const optionList = document.getElementById("option-list");
const reportTitle = document.getElementById("report-title");
const reportTable = document.getElementById("report-table");
const closeModalBtn = document.getElementById("close-modal");

let activeCell = null; // Az éppen kiválasztott cella
let availableOptions = []; // Az elérhető elemek listája

// Különböző beszámolókhoz tartozó sorok
const reports = {
  merleg: {
    title: "Mérleg",
    rows: [
      { label: "A/", name: "Befektetett eszközök", type: "header" },
      { label: "I.", name: "Immateriális javak", type: "subheader" },
      { label: "1.", name: "Alapítás átszervezés aktivált értéke" },
      { label: "2.", name: "Kísérleti fejlesztés aktivált értéke" },
      { label: "3.", name: "Vagyoni értékű jogok" },
      { label: "4.", name: "Szellemi termékek" },
      { label: "5.", name: "Üzleti vagy cégérték" },
      { label: "6.", name: "Immateriális javakra adott előlegek" },
      { label: "7.", name: "Immateriális javak értékhelyesbítése" },
      { label: "II.", name: "Tárgyi eszközök", type: "subheader" },
      { label: "1.", name: "Ingatlanok és a kapcsolódó vagyoni értékű jogok" },
      { label: "2.", name: "Műszaki berendezések, gépek, járművek" },
      { label: "3.", name: "Egyéb berendezések, felszerelések, járművek" },
      { label: "B/", name: "Forgóeszközök", type: "header" },
      { label: "I.", name: "Készletek", type: "subheader" },
      { label: "1.", name: "Anyagok" },
      { label: "2.", name: "Befejezetlen és félkész termékek" },
      { label: "C/", name: "Aktív időbeli elhatárolások", type: "header" },
      { label: "1.", name: "Bevételek aktív időbeli elhatárolása" },
    ],
  },
  osszkoltseg: {
    title: "Összköltség Eredménykimutatás",
    rows: ["Bevétel", "Anyagköltség", "Bérköltség", "Értékcsökkenés"],
  },
  forgalmi: {
    title: "Forgalmi Költség Eredménykimutatás",
    rows: [
      "Nettó árbevétel",
      "Értékesítési költségek",
      "Marketing költségek",
      "Adminisztrációs költségek",
    ],
  },
  cashflow: {
    title: "Cashflow kimutatás",
    rows: [
      "Üzleti tevékenység",
      "Befektetési tevékenység",
      "Finanszírozási tevékenység",
    ],
  },
};

// Az induló modalt megjelenítjük betöltéskor
document.addEventListener("DOMContentLoaded", function () {
  startModal.style.display = "flex";
});

// Amikor egy beszámolót kiválasztunk
document.querySelectorAll(".select-report").forEach((button) => {
  button.addEventListener("click", function () {
    const reportType = this.dataset.type;
    const selectedReport = reports[reportType];

    // Beállítjuk a táblázatot
    reportTitle.textContent = selectedReport.title;
    reportTitle.style.display = "block";
    reportTable.style.display = "table";

    availableOptions = [...selectedReport.rows]; // Újratöltjük az elérhető opciókat

    reportTable.innerHTML = "";
    selectedReport.rows.forEach((row, index) => {
      let tableRow = document.createElement("tr");
      let cell = document.createElement("td");

      if (row.type === "header" || row.type === "subheader") {
        // Az A, B, C és római betűs sorok mindig a teljes szöveget mutatják
        cell.textContent = `${row.label} ${row.name}`;
        cell.style.fontWeight = "bold";
        cell.style.backgroundColor = row.type === "header" ? "#777" : "#999"; // Sötétebb háttér a fő kategóriáknak, világosabb a subheader-eknek
      } else {
        // Az arab számoknál csak a számok jelennek meg először
        cell.textContent = `${row.label}`;
        cell.classList.add("selectable");
        cell.dataset.id = index;

        // Kattintásra megnyitja a modalt
        cell.addEventListener("click", function () {
          activeCell = this; // Eltároljuk az aktív cellát

          // Frissítjük a modalt az elérhető elemekkel
          optionList.innerHTML = "";
          availableOptions.forEach((option) => {
            let li = document.createElement("li");
            li.textContent = option.name; // Az objektum 'name' mezőjét használjuk

            li.addEventListener("click", function () {
              // Kiválasztáskor hozzáadjuk a névet
              activeCell.textContent = `${row.label} ${option.name}`;

              // Eltávolítjuk az opciók közül
              availableOptions = availableOptions.filter(
                (opt) => opt !== option
              );

              modal.style.display = "none"; // Bezárjuk a modalt
            });
            optionList.appendChild(li);
          });

          modal.style.display = "flex"; // Megjelenítjük a modalt
        });
      }

      tableRow.appendChild(cell);
      reportTable.appendChild(tableRow);
    });

    // Bezárjuk az induló modalt
    startModal.style.display = "none";
  });
});

// Modal bezárása
closeModalBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

// Ha a modal háttérre kattintanak, zárja be
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
