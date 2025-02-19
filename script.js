const puzzles = [
  {
    title: "Tech",
    gridSize: 15,
    words: ["JAVASCRIPT", "HTML", "CSS", "REACT", "NODEJS", "API", "DATABASE"]
  },
  {
    title: "Animals",
    gridSize: 15,
    words: ["ELEPHANT", "GIRAFFE", "KANGAROO", "PANDA", "CHEETAH", "ZEBRA"]
  },
  {
    title: "Food",
    gridSize: 15,
    words: ["PASTA", "PIZZA", "SUSHI", "BURRITO", "TACO", "RAMEN"]
  }
];

let currentPuzzle = puzzles[0];
let selectedCells = [];
let foundWords = [];
let isDragging = false;

// DOM Elements
const wordsearch = document.getElementById("wordsearch");
const wordsContainer = document.getElementById("words");
const puzzleSelect = document.getElementById("puzzle-select");

// Initialize first puzzle
initializeGame();

// Puzzle selector
puzzleSelect.addEventListener("change", (e) => {
  currentPuzzle = puzzles[e.target.value];
  resetGame();
});

// Reset button
document.getElementById("reset-button").addEventListener("click", resetGame);

function initializeGame() {
  // Clear existing elements
  wordsearch.innerHTML = "";
  wordsContainer.innerHTML = "<div>Words to find:</div>";

  // Create grid
  for (let i = 0; i < currentPuzzle.gridSize; i++) {
    for (let j = 0; j < currentPuzzle.gridSize; j++) {
      const cell = createCell(i, j);
      wordsearch.appendChild(cell);
    }
  }
function initializeGame() {
  console.log("Initializing game..."); // Debugging
  wordsearch.innerHTML = "";
  wordsContainer.innerHTML = "<div>Words to find:</div>";

  // Create grid
  for (let i = 0; i < currentPuzzle.gridSize; i++) {
    for (let j = 0; j < currentPuzzle.gridSize; j++) {
      const cell = createCell(i, j);
      wordsearch.appendChild(cell);
    }
  }

  console.log("Grid created with", currentPuzzle.gridSize, "rows and columns."); // Debugging

  // Place words
  currentPuzzle.words.forEach(word => placeWord(word));

  // Fill empty cells
  fillRandomLetters();

  // Display words
  currentPuzzle.words.forEach(word => {
    const wordElement = document.createElement("div");
    wordElement.textContent = word;
    wordsContainer.appendChild(wordElement);
  });

  // Add touch events for mobile
  addTouchSupport();
}
  // Place words
  currentPuzzle.words.forEach(word => placeWord(word));

  // Fill empty cells
  fillRandomLetters();

  // Display words
  currentPuzzle.words.forEach(word => {
    const wordElement = document.createElement("div");
    wordElement.textContent = word;
    wordsContainer.appendChild(wordElement);
  });

  // Add touch events for mobile
  addTouchSupport();
}

function createCell(row, col) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.row = row;
  cell.dataset.col = col;
  cell.textContent = "";
  cell.addEventListener("mousedown", () => startDrag(cell));
  cell.addEventListener("mouseenter", () => dragOver(cell));
  cell.addEventListener("mouseup", endDrag);
  return cell;
}

function addTouchSupport() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => {
    cell.addEventListener("touchstart", (e) => {
      e.preventDefault();
      startDrag(cell);
    });
    cell.addEventListener("touchmove", (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      if (target?.classList.contains("cell")) dragOver(target);
    });
    cell.addEventListener("touchend", endDrag);
  });
}

// Keep existing placeWord, canPlaceWord, fillRandomLetters, 
// drag functions, and checkForWord from previous implementation
// (Copy those functions exactly as you had them before)