export { render, initialRender };

function initialRender(player, opponent = false, parent = "main") {
  const main = document.querySelector(`${parent}`);
  const gridHolder = document.createElement("div");
  gridHolder.setAttribute("class", "wrapper");
  gridHolder.setAttribute("data-opp", `${opponent}`);
  render(player, gridHolder, opponent);
  main.appendChild(gridHolder);
}

function render(player, wrapper, opponent = false) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let cell = document.createElement("div");
      cell.setAttribute("class", "cell");
      cell.setAttribute("data-x", `${j}`);
      cell.setAttribute("data-y", `${i}`);

      if (player.board.grid[j][i].isHit === false) {
        if (opponent === false && player.board.grid[j][i].ship !== null) {
          cell.style.backgroundColor = "grey";
        } else {
          cell.style.backgroundColor = "white";
        }
      } else if (player.board.grid[j][i].ship !== null) {
        cell.style.backgroundColor = "red";
      } else {
        cell.style.backgroundColor = "blue";
      }
      wrapper.appendChild(cell);
    }
  }
}
