let firstNumber = 0;
let secondNumber = 0;
let action = "+";
let answer = 0;

let input = document.getElementById("calc-input");
let calculationSpan = document.getElementById("calculation");

let history = [];


input.value = "0";
input.addEventListener("focus", function () {

  if (input.value === "0") {
    input.value = "";
  }
});


function onNumberClick(number) {
  if (input.value === "0") {
    input.value = number;
  } else {
    input.value += number;
  }
}

function onActionClick(clickedAction) {
  let trimmedValue = input.value.trim();
  let lastChar = trimmedValue.slice(-1);

  if (["+", "-", "x", "/"].includes(lastChar)) {
    return;
  } else {
    input.value = trimmedValue + " " + clickedAction + " ";
  }
  action = clickedAction;
}

function onCountClick() {
  let splitted = input.value.split(" ");
  firstNumber = parseFloat(splitted[0]);
  action = splitted[1];
  secondNumber = parseFloat(splitted[2]);

  calculateAnswer();
  input.value = answer;

  calculationSpan.innerText = `${firstNumber} ${action} ${secondNumber}`;

  addToHistory();
}

function calculateAnswer() {
  switch (action) {
    case "+":
      answer = firstNumber + secondNumber;
      break;
    case "-":
      answer = firstNumber - secondNumber;
      break;
    case "x":
      answer = firstNumber * secondNumber;
      break;
    case "/":
      answer = firstNumber / secondNumber;
      break;
  }
}

function onCleanClick() {
  firstNumber = 0;
  secondNumber = 0;
  action = "+";
  answer = 0;
  input.value = "0"; 
  calculationSpan.innerText = "";
}

function addToHistory() {
  let historyItem = {
    firstNumber,
    action,
    secondNumber,
    answer,
  };
  if (history.length >= 5) {
    history.shift();
  }

  history.push(historyItem);
  
}

document.getElementById("show-history").onclick = function () {
  let historyBlock = document.querySelector(".calculator .history");
  historyBlock.classList.toggle("hidden");

  if (!historyBlock.classList.contains("hidden")) {
    let formatted = history.map(
      (x) =>
        `<p>${x.firstNumber} ${x.action} ${x.secondNumber} = ${x.answer}</p>`
    );
    let historyItemsBlock = document.querySelector(
      ".calculator .history-items"
    );
    historyItemsBlock.innerHTML = formatted.join("");
  }
};

document.getElementById("isvalyti").onclick = function () {
  history = [];
  let historyValimas = document.querySelector(".calculator .history-items");
  historyValimas.innerHTML = "";
};

document.getElementById("back").onclick = function () {
  let input = document.getElementById("calc-input");
  let currentValue = input.value;

  if (currentValue.length > 0) {
    input.value = currentValue.slice(0, -1);
  }
  if (input.value === "") {
    input.value = "0";
  }
};
