export { render, initialRender, displayResults, updateButton };

function initialRender(player, opponent = false, parent = ".grid-wrap") {
  const main = document.querySelector(`${parent}`);
  const gridHolder = document.createElement("div");
  gridHolder.setAttribute("class", "wrapper");
  gridHolder.setAttribute("data-opp", `${opponent}`);
  render(player, gridHolder, opponent);
  main.appendChild(gridHolder);
}

function render(player, wrapper, opponent = false) {
  while (wrapper.firstChild !== null) {
    wrapper.removeChild(wrapper.firstChild);
  }
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

function displayResults(winner) {
  const status = document.querySelector(".status-wrap");
  const gameStatus = document.createElement("div");
  const declareWinner = document.createElement("div");
  gameStatus.textContent = "Game Over!";
  declareWinner.textContent = `${winner} Wins!`;
  status.append(gameStatus, declareWinner);
}

function updateButton() {
  const wrapper = document.querySelector(".interact-wrap");
  const nextTurn = document.createElement("button");
  nextTurn.setAttribute("id", "next-turn");
  nextTurn.textContent = "Next Turn";
  wrapper.appendChild(nextTurn);
}
