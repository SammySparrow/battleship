export { render, initialRender, displayResults, updateButton, clearInitialUI };

function initialRender(player, owner, currentPlayer) {
  const main = document.querySelector(".grid-wrap");
  const gridHolder = document.createElement("div");

  gridHolder.setAttribute("class", "wrapper");
  gridHolder.setAttribute("data-owner", `${owner}`);
  render(player, currentPlayer, gridHolder);
  main.appendChild(gridHolder);
}

function render(player, currentPlayer, wrapper) {
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
        if (player === currentPlayer && player.board.grid[j][i].ship !== null) {
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

function clearInitialUI() {
  let init = document.querySelector(".initialise");
  while (init.firstChild !== null) {
    init.removeChild(init.firstChild);
  }
}
