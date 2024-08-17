window.onload = function () {
  document.getElementById("instructionsModal").style.display = "block";
};

function closeModal() {
  document.getElementById("instructionsModal").style.display = "none";
}

let n = 0;
const array = [];

function convertToInteger() {
  // Get the value from the input field
  const inputValue = document.getElementById("numberInput").value;

  // Convert the input value to an integer
  const integerValue = parseInt(inputValue, 10); // 10 is the radix (base) for decimal numbers

  // Check if the conversion was successful
  if (isNaN(integerValue) || integerValue <= 0) {
    alert("Please enter a valid positive number.");
    return;
  }

  n = integerValue; // Update n with the converted value
  init(); // Initialize with the new size
}

function init() {
  array.length = 0; // Clear the array
  for (let i = 0; i < n; i++) {
    array[i] = Math.random();
  }
  showBars();
}
// Start the sorting process
function play() {
  const copy = [...array];
  const algorithm = document.getElementById("algorithm").value;
  const moves = window[algorithm](copy);
  animate(moves);
}

// Animate the sorting process
function animate(moves) {
  if (moves.length === 0) {
    showBars();
    return;
  }
  const move = moves.shift();
  const [i, j] = move.indices;
  if (move.type === "swap") {
    [array[i], array[j]] = [array[j], array[i]];
  }
  showBars(move);
  setTimeout(() => {
    animate(moves);
  }, 150);
}

// Bubble Sort algorithm
function bubbleSort(array) {
  const moves = [];
  do {
    var swapped = false;
    for (let i = 1; i < array.length; i++) {
      moves.push({ indices: [i - 1, i], type: "comp" });
      if (array[i - 1] > array[i]) {
        swapped = true;
        moves.push({ indices: [i - 1, i], type: "swap" });
        [array[i - 1], array[i]] = [array[i], array[i - 1]];
      }
    }
  } while (swapped);
  return moves;
}

// Selection Sort algorithm
function selectionSort(array) {
  const moves = [];
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      moves.push({ indices: [minIndex, j], type: "comp" });
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      moves.push({ indices: [i, minIndex], type: "swap" });
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
  }
  return moves;
}

// Insertion Sort algorithm
function insertionSort(array) {
  const moves = [];
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      moves.push({ indices: [j, j + 1], type: "comp" });
      array[j + 1] = array[j];
      moves.push({ indices: [j, j + 1], type: "swap" });
      j = j - 1;
    }
    array[j + 1] = key;
  }
  return moves;
}

// Display the bars based on the current array state
function showBars(move) {
  const container = document.getElementById("container");
  container.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = array[i] * 100 + "%";
    bar.classList.add("bar");
    if (move && move.indices.includes(i)) {
      bar.style.backgroundColor = move.type === "swap" ? "black" : "red";
    }
    container.appendChild(bar);
  }
}
