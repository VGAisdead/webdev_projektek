const startModal = document.getElementById("start-modal");
const modal = document.getElementById("modal");
const optionList = document.getElementById("option-list");
const reportTitle = document.getElementById("report-title");
const reportDescription = document.getElementById("report-description");
const reportTable = document.getElementById("report-table");
const reportSheet = document.getElementById("sheet");
const closeModalBtn = document.getElementById("close-modal");

let activeCell = null; // Az éppen kiválasztott cella
let availableOptions = []; // Az elérhető elemek listája

// Különböző beszámolókhoz tartozó sorok
const reports = {
  merleg: {
    title: "Mérleg",
    description:
      "A mérleg egy pénzügyi kimutatás, amely a vállalkozás eszközeit, forrásait és azok változásait mutatja. Két fő részből áll: az aktív oldal az eszközöket, míg a passzív oldal a forrásokat tartalmazza, így átfogó képet adva a vállalat pénzügyi helyzetéről egy adott időpontban.",
    rows: [
      { label: "ESZKÖZÖK", name: "Elválasztó sor", type: "separator" },
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
  startModal.classList.add("show"); // A modális ablak megjelenítése
});

// Amikor egy beszámolót kiválasztunk
document.querySelectorAll(".select-report").forEach((button) => {
  button.addEventListener("click", function () {
    const reportType = this.dataset.type;
    const selectedReport = reports[reportType];
    sheet.classList.remove("hidden");

    // Beállítjuk a táblázatot
    reportTitle.textContent = selectedReport.title;
    reportDescription.textContent = selectedReport.description;
    reportTitle.style.display = "block";
    reportDescription.style.display = "flex";
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

// Az ellenőrzés gomb kattintásának eseménye
document.getElementById("check-button").addEventListener("click", function () {
  // Kiválasztott beszámoló típusa
  const reportType = "merleg"; // Ezt dinamikusan kell frissíteni, ha más beszámolót választunk
  const selectedReport = reports[reportType]; // A beszámoló objektum

  // Az elvárt sorrend (római és arab számok)
  const expectedOrder = selectedReport.rows.map((row) => row.label);

  // A táblázatban található sorrend
  let userOrder = [];
  const tableRows = document.querySelectorAll("#report-table tr td");

  tableRows.forEach((cell) => {
    userOrder.push(cell.textContent.trim().split(" ")[0]); // Csak a számokat tároljuk
  });

  // Ellenőrzés
  let errors = [];
  for (let i = 0; i < expectedOrder.length; i++) {
    if (expectedOrder[i] !== userOrder[i]) {
      errors.push(`Hiba: A(z) ${expectedOrder[i]} sor rossz helyen van!`);
    }
  }

  // Hibák megjelenítése a modálban
  const errorList = document.getElementById("error-list");
  errorList.innerHTML = ""; // Töröljük a korábbi hibákat

  if (errors.length > 0) {
    errors.forEach((error) => {
      let li = document.createElement("li");
      li.textContent = error;
      errorList.appendChild(li);
    });

    // Megjelenítjük a hibák modálját
    const errorModal = document.getElementById("error-modal");
    errorModal.classList.add("show"); // A modális ablak megjelenítése a show osztály hozzáadásával
  } else {
    alert("A megoldás helyes!");
  }
});

// Modal bezárása
document
  .getElementById("close-error-modal")
  .addEventListener("click", function () {
    document.getElementById("error-modal").classList.remove("show"); // A modál elrejtése a show osztály eltávolításával
  });

// Ha a modal háttérre kattintanak, zárja be
window.addEventListener("click", function (event) {
  const errorModal = document.getElementById("error-modal");
  if (event.target === errorModal) {
    errorModal.style.display = "none"; // Bezárás
  }
});
