export { render };

function render(parent, player) {
  const main = document.querySelector(`${parent}`);
  const gridHolder = document.createElement("div");
  gridHolder.setAttribute("class", "wrapper");

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let cell = document.createElement("div");
      cell.setAttribute("class", "cell");
      cell.setAttribute("data-x", `${i}`);
      cell.setAttribute("data-y", `${j}`);
      if (
        player.board.grid[j][i].isHit === false &&
        player.board.grid[j][i].ship === null
      ) {
        cell.style.backgroundColor = "white";
      } else if (player.board.grid[j][i].isHit === false) {
        cell.style.backgroundColor = "grey";
      } else if (player.board.grid[j][i].ship !== null) {
        cell.style.backgroundColor = "red";
      } else {
        cell.style.backgroundColor = "blue";
      }
      gridHolder.appendChild(cell);
    }
  }

  main.appendChild(gridHolder);
}
