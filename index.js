const whoami = document.querySelector(".whoami");

const careers = ["kóder ", "könyvelő ", "gamer ", "örök tanuló! "];
let careerIndex = 0;
let characterIndex = 0;

function updateCareer() {
  characterIndex++;
  whoami.innerHTML = `
<h1 class="fw-bold text-body-emphasis mb-3 whoami">Üdvözöllek!<br>
András vagyok - <br>${careers[careerIndex].slice(0, characterIndex)}</h1>`;

  if (characterIndex === careers[careerIndex].length) {
    careerIndex++;
    characterIndex = 0;
  }

  if (careerIndex === careers.length) {
    setTimeout(() => {
      careerIndex = 0;
      updateCareer();
    }, 10000);
  }
  setTimeout(updateCareer, 300);
}

updateCareer();
