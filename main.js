let select = document.querySelectorAll("select");
let name1 = document.getElementById("name");
let name2 = document.getElementById("name2");
let img = document.querySelector(".heder .input .img img");
let img2 = document.querySelector(".secCarde .heder .input .img img");
let result1 = document.getElementById("result1");
let result2 = document.getElementById("result2");
let text = document.querySelector(".footer .rh ");
let change = document.getElementById("change");
let manine = document.getElementById("manine");
let manine2 = document.getElementById("manine2");
function calc() {
  fetch(
    `https://currency-api.pages.dev/v1/currencies/${select[0].value.toLowerCase()}.json`
  )
    .then((res) => res.json())
    .then((data) => {
      text.textContent = `1 ${select[0].value}  = ${data[
        select[0].value.toLowerCase()
      ][select[1].value.toLowerCase()].toFixed(8)}`;
      

      result2.value = (
        parseFloat(result1.value) *
        data[select[0].value.toLowerCase()][select[1].value.toLowerCase()]
      ).toFixed(2);
    });
}
fetch(
  "https://openexchangerates.org/api/currencies.json?prettyprint=false&show_alternative=false&show_inactive=false"
)
  .then((res) => res.json())
  .then((data) => {
    for ([key, valeu] of Object.entries(data)) {
      let option = document.createElement("option");
      option.textContent = key;
      option.value = key;
      select[0].appendChild(option);
    }
    name1.innerHTML = data[select[0].value];
    select[0].onchange = function () {
      name1.innerHTML = data[select[0].value];
      img.src = `https://flagsapi.com/${select[0].value
        .slice(0, 2)
        .toLocaleUpperCase()}/flat/64.png`;
      calc();
    };
    for ([key, valeu] of Object.entries(data)) {
      let option = document.createElement("option");
      option.textContent = key;
      option.value = key;
      select[1].appendChild(option);
    }
    name2.innerHTML = data[select[1].value];
    select[1].onchange = function () {
      name2.innerHTML = data[select[1].value];
      img2.src = `https://flagsapi.com/${select[1].value
        .slice(0, 2)
        .toLocaleUpperCase()}/flat/64.png`;
      calc();
    };
    change.onclick = function () {
      let originale = img.src;
      let originalename = select[0].value;
      let originalevalue = result1.value;
      let orname = name1.textContent;
      img.src = img2.src;
      img2.src = originale;
      select[0].value = select[1].value;
      select[1].value = originalename;
      result1.value = result2.value;
      result2.value = originalevalue;
      name1.textContent = name2.textContent;
      name2.textContent = orname;
      calc();
    };
  });
result1.addEventListener("input", () => {
  calc();
});
