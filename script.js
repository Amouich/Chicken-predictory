document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("grid");
  const status = document.getElementById("status");
  const predictButton = document.getElementById("predict");

  const gridSize = 5; // Grid size: 5x5
  const totalTiles = gridSize * gridSize;
  const chickenCount = 20; // Total chickens in the grid

  const tiles = Array(totalTiles).fill(null);
  const revealedTiles = [];

  // Randomly place chickens and bones
  for (let i = 0; i < chickenCount; i++) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * totalTiles);
    } while (tiles[randomIndex] !== null);
    tiles[randomIndex] = "chicken";
  }

  for (let i = 0; i < totalTiles; i++) {
    if (tiles[i] === null) tiles[i] = "bone";
  }

  // Create grid tiles
  for (let i = 0; i < totalTiles; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.textContent = "?";
    tile.addEventListener("click", () => revealTile(i, tile));
    grid.appendChild(tile);
  }

  // Reveal tile logic
  function revealTile(index, tileElement) {
    if (revealedTiles.includes(index)) return;

    revealedTiles.push(index);

    if (tiles[index] === "chicken") {
      tileElement.textContent = "🐔";
      tileElement.classList.add("revealed", "chicken");
      status.textContent = "You found a chicken!";
    } else {
      tileElement.textContent = "💀";
      tileElement.classList.add("revealed", "bone");
      status.textContent = "You hit a bone!";
    }
  }

  // Predict and reveal all tiles
  predictButton.addEventListener("click", () => {
    for (let i = 0; i < totalTiles; i++) {
      const tileElements = document.querySelectorAll(".tile");
      const tile = tileElements[i];

      if (tiles[i] === "chicken") {
        tile.textContent = "🐔";
        tile.classList.add("revealed", "chicken");
      } else {
        tile.textContent = "💀";
        tile.classList.add("revealed", "bone");
      }
    }
    status.textContent = "All tiles revealed!";
  });
});