export { render };

function render(parent, player) {
  const main = document.querySelector(`${parent}`);
  const gridHolder = document.createElement("div");

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let cell = document.createElement("div");
      cell.setAttribute("class", "cell");
      if (player.board.grid[i][j] === undefined) {
        cell.style.backgroundColor = "white";
      } else if (player.board.grid[i][j] === "miss") {
        cell.style.backgroundColor = "red";
      } else {
        cell.style.backgroundColor = "grey";
      }
      gridHolder.appendChild(cell);
    }
  }

  main.appendChild(gridHolder);
}
