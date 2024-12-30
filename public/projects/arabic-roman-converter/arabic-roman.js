const input = document.getElementById("input");
const result = document.getElementById("result");
const resultBox = document.getElementById("resultBox");
const convertBtn = document.getElementById("convert");
const romans = {
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
  6: "VI",
  7: "VII",
  8: "VIII",
  9: "IX",
  10: "X",
  20: "XX",
  30: "XXX",
  40: "XL",
  50: "L",
  60: "LX",
  70: "LXX",
  80: "LXXX",
  90: "XC",
  100: "C",
  200: "CC",
  300: "CCC",
  400: "CD",
  500: "D",
  600: "DC",
  700: "DCC",
  800: "DCCC",
  900: "CM",
  1000: "M",
  2000: "MM",
  3000: "MMM",
  4000: "I̅V̅",
  5000: "V̅",
  6000: "V̅I̅",
  7000: "V̅MM",
  8000: "V̅MMM",
  9000: "I̅X̅",
  10000: "X̅",
  20000: "X̅X̅",
  30000: "X̅X̅X̅",
  40000: "X̅L̅",
  50000: "L̅",
  60000: "L̅X̅",
  70000: "L̅X̅X̅",
  80000: "L̅X̅X̅X̅",
  90000: "X̅C̅",
  100000: "C̅",
  200000: "C̅C̅",
  300000: "C̅C̅C̅",
  400000: "C̅D̅",
  500000: "D̅",
  600000: "D̅C̅",
  700000: "D̅C̅C̅",
  800000: "D̅C̅C̅C̅",
  900000: "C̅M̅",
  1000000: "M̅",
  2000000: "M̅M̅",
  3000000: "M̅M̅M̅",
};

const removeHidden = function () {
  resultBox.classList.remove("hidden");
};

const checkInput = function () {
  const inputValue = input.value.trim();
  const numValue = parseInt(inputValue, 10);

  if (inputValue === "" || isNaN(numValue)) {
    result.textContent = "Érvényes számot adjon meg";
    removeHidden();
  } else if (inputValue.includes(".") || inputValue.includes(",")) {
    result.textContent = "Egész számot adjon meg";
    removeHidden();
  } else if (numValue < 1) {
    result.textContent =
      "Adjon meg egy számot, amely nagyobb vagy egyenlő, mint 1";
    removeHidden();
  } else if (numValue > 3999999) {
    result.textContent =
      "Adjon meg egy számot, amely kisebb vagy egyenlő, mint 3 999 999";
    removeHidden();
  } else {
    convertNumber(numValue);
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
  removeHidden();
};

convertBtn.addEventListener("click", checkInput);
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkInput();
  }
});
