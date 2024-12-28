"use strict";

const input = document.getElementById("text-input");
const result = document.getElementById("result");
const isHungarian = document.getElementById("isHungarian");

function checkInput() {
  if (input.value === "") {
    return alert("Írj be egy szót vagy kifejezést.");
  } else {
    checkPalindrome(input.value);
  }
}

function checkPalindrome(str) {
  const re = /[\W_]/g;
  const lowStr = str.toLowerCase().replace(re, "");
  let normalizedStr = lowStr;

  if (isHungarian.checked) {
    // Magyar nyelvi sajátosságok
    normalizedStr = normalizedStr
      .replace(/cs/g, "§") // Az "cs"-t egy speciális karakterre cseréljük
      .replace(/dz/g, "¤") // Az "dz"-t egy másik speciális karakterre cseréljük
      .replace(/dzs/g, "¥") // Az "dzs"-t egy harmadik karakterre cseréljük
      .replace(/gy/g, "§§") // Az "gy"-t egy másik speciális karakterre cseréljük
      .replace(/ly/g, "¤¤") // Az "ly"-t egy másik karakterre
      .replace(/ny/g, "¥¥") // Az "ny"-t egy új karakterre
      .replace(/sz/g, "∑") // Az "sz"-t egy másik karakterre
      .replace(/ty/g, "∞"); // Az "ty"-t egy másik karakterre
  }

  const rev = normalizedStr.split("").reverse().join("");

  console.log(lowStr);
  console.log(rev);

  if (rev === normalizedStr) {
    result.innerHTML = `A(z) "<strong>${input.value}</strong>" egy palindrom.`;
  } else {
    result.innerHTML = `A(z) "<strong>${input.value}</strong>" nem palindrom.`;
  }
}
