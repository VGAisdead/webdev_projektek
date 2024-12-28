"use strict";

const input = document.getElementById("text-input");
const result = document.getElementById("result");

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
  const rev = lowStr.split("").reverse().join("");

  if (rev === lowStr) {
    result.innerHTML = `A(z) <strong>${input.value}</strong> egy palindrom.`;
  } else {
    result.innerHTML = `A(z) <strong>${input.value}</strong> nem palindrom.`;
  }
}
