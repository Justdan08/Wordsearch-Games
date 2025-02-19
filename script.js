// Word Search Configuration
const gridSize = 10;
const words = ["JAVASCRIPT", "HTML", "CSS", "WEB", "GAME"];
let selectedCells = [];
let foundWords = [];
let isDragging = false;

// Generate the word search grid
const wordsearch = document.getElementById("wordsearch");
const wordsContainer = document.getElementById("words");

// Display words to find
words.forEach(word => {
  const wordElement = document.createElement("div");
  wordElement.textContent = word;
  wordsContainer.appendChild(wordElement);
});

// Create the grid
for (let i = 0; i < gridSize; i++) {
  for (let j = 0; j < gridSize; j++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.row = i;
    cell.dataset.col = j;
    cell.textContent = getRandomLetter();
    cell.addEventListener("mousedown", () => startDrag(cell));
    cell.addEventListener("mouseenter", () => dragOver(cell));
    cell.addEventListener("mouseup", endDrag);
    wordsearch.appendChild(cell);
  }
}

// Place words in the grid
words.forEach(word => {
  placeWord(word);
});

// Function to place a word in the grid
function placeWord(word) {
  const direction = Math.random() < 0.5 ? "horizontal" : "vertical";
  let row, col;

  if (direction === "horizontal") {
    row = Math.floor(Math.random() * gridSize);
    col = Math.floor(Math.random() * (gridSize - word.length));
    for (let i = 0; i < word.length; i++) {
      const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col + i}"]`);
      cell.textContent = word[i];
    }
  } else {
    col = Math.floor(Math.random() * gridSize);
    row = Math.floor(Math.random() * (gridSize - word.length));
    for (let i = 0; i < word.length; i++) {
      const cell = document.querySelector(`.cell[data-row="${row + i}"][data-col="${col}"]`);
      cell.textContent = word[i];
    }
  }
}

// Function to get a random letter
function getRandomLetter() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return letters[Math.floor(Math.random() * letters.length)];
}

// Drag and drop functionality
function startDrag(cell) {
  isDragging = true;
  selectedCells = [cell];
  cell.classList.add("selected");
}

function dragOver(cell) {
  if (isDragging && !selectedCells.includes(cell)) {
    selectedCells.push(cell);
    cell.classList.add("selected");
  }
}

function endDrag() {
  isDragging = false;
  checkForWord();
}

// Function to check if selected cells form a word
function checkForWord() {
  const selectedWord = selectedCells.map(cell => cell.textContent).join("");
  if (words.includes(selectedWord) && !foundWords.includes(selectedWord)) {
    foundWords.push(selectedWord);
    selectedCells.forEach(cell => cell.classList.add("found"));
    selectedCells = [];

    // Mark the word as found in the word list
    const wordElements = wordsContainer.querySelectorAll("div");
    wordElements.forEach(el => {
      if (el.textContent === selectedWord) {
        el.classList.add("found");
      }
    });

    if (foundWords.length === words.length) {
      alert("Good Job Big Dog!");
    }
  } else {
    selectedCells.forEach(cell => cell.classList.remove("selected"));
    selectedCells = [];
  }
}

// Reset button functionality
document.getElementById("reset-button").addEventListener("click", () => {
  wordsearch.innerHTML = "";
  wordsContainer.innerHTML = "<div>Words to find:</div>";
  selectedCells = [];
  foundWords = [];
  initializeGame();
});

function initializeGame() {
  // Reinitialize the game
  words.forEach(word => {
    const wordElement = document.createElement("div");
    wordElement.textContent = word;
    wordsContainer.appendChild(wordElement);
  });

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.textContent = getRandomLetter();
      cell.addEventListener("mousedown", () => startDrag(cell));
      cell.addEventListener("mouseenter", () => dragOver(cell));
      cell.addEventListener("mouseup", endDrag);
      wordsearch.appendChild(cell);
    }
  }

  words.forEach(word => {
    placeWord(word);
  });
}
