const input = document.getElementById("input");
const result = document.getElementById("result");
const convertBtn = document.getElementById("convert");
const romans = {
  1: "I",
  4: "IV",
  5: "V",
  6: "VI",
  9: "IX",
  10: "X",
  40: "XL",
  50: "L",
  90: "XC",
  100: "C",
  400: "CD",
  500: "D",
  900: "CM",
  1000: "M",
};

const checkInput = function () {
  const inputValue = input.value.trim();

  if (inputValue === "" || isNaN(inputValue)) {
    result.textContent = "Érvényes számot adjon meg";
    result.classList.remove("hidden");
  } else if (inputValue.includes(".") || inputValue.includes(",")) {
    result.textContent = "Egész számot adjon meg";
    result.classList.remove("hidden");
  } else if (inputValue <= 0) {
    result.textContent =
      "Adjon meg egy számot, amely nagyobb vagy egyenlő, mint 1";
    result.classList.remove("hidden");
  } else if (inputValue >= 4000) {
    result.textContent =
      "Adjon meg egy számot, amely kisebb vagy egyenlő, mint 3999";
    result.classList.remove("hidden");
  } else {
    convertNumber(parseInt(input.value));
  }
};

const convertNumber = function (number) {
  let romanResult = "";
  const romanNumberKeys = Object.keys(romans).sort((a, b) => {
    return b - a;
  });

  for (let i = 0; i < romanNumberKeys.length; i++) {
    const value = romanNumberKeys[i];

    while (number >= value) {
      romanResult += romans[value];
      number -= value;
    }
  }
  result.textContent = romanResult;
  result.classList.remove("hidden");
};

convertBtn.addEventListener("click", checkInput);
