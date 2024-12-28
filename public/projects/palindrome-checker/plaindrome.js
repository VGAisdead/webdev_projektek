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
      .replace(/cs/g, "§")
      .replace(/dz/g, "¤")
      .replace(/dzs/g, "¥")
      .replace(/gy/g, "†")
      .replace(/ly/g, "µ")
      .replace(/ny/g, "Ω")
      .replace(/sz/g, "∑")
      .replace(/ty/g, "∞")
      .replace(/zs/g, "≠");
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
