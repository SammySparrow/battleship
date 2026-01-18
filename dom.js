export {
  render,
  initialRender,
  displayResults,
  updateButton,
  cleanUp,
  currentPlayerDisplay,
  moveStatus,
};

function initialRender(player, owner, currentPlayer) {
  cleanUp(document.querySelector(".initialise"));
  const main = document.querySelector(".grid-wrap");
  const gridHolder = document.createElement("div");

  gridHolder.setAttribute("class", "wrapper");
  gridHolder.setAttribute("data-owner", `${owner}`);
  render(player, currentPlayer, gridHolder);
  main.appendChild(gridHolder);
}

function render(player, currentPlayer, wrapper) {
  cleanUp(wrapper);
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

function currentPlayerDisplay(currentPlayer) {
  const statusWrapper = document.querySelector(".status-wrap");
  cleanUp(statusWrapper);
  const currentText = document.createElement("div");
  const player = document.createElement("div");
  currentText.textContent = "Current Player:";
  player.textContent = `${currentPlayer}`;
  statusWrapper.append(currentText, player);
}

function moveStatus(coords, hit = true, player) {
  const statusWrapper = document.querySelector(".status-wrap");
  cleanUp(statusWrapper);
  const coordMessage = document.createElement("div");
  const hitMessage = document.createElement("div");
  coordMessage.textContent = `${player} fires at x: ${coords[0] + 1} y: ${
    coords[1] + 1
  }`;
  hit === true
    ? (hitMessage.textContent = "It's a hit!")
    : (hitMessage.textContent = "It's a miss...");
  statusWrapper.append(coordMessage, hitMessage);
}

function updateButton() {
  const wrapper = document.querySelector(".interact-wrap");
  cleanUp(wrapper);
  const nextTurn = document.createElement("button");
  nextTurn.setAttribute("id", "next-turn");
  nextTurn.textContent = "Next Turn";
  wrapper.appendChild(nextTurn);
}

function cleanUp(wrapper) {
  while (wrapper.firstChild !== null) {
    wrapper.removeChild(wrapper.firstChild);
  }
}
