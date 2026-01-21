export { UserInterface };

class UserInterface {
  constructor(
    status = document.querySelector(".status-wrap"),
    interact = document.querySelector(".interact-wrap")
  ) {
    this.status = status;
    this.interact = interact;
  }

  initialRender(player, owner, currentPlayer) {
    this.cleanUp(document.querySelector(".initialise"));
    const main = document.querySelector(".grid-wrap");
    const gridHolder = document.createElement("div");

    gridHolder.setAttribute("class", "wrapper");
    gridHolder.setAttribute("data-owner", `${owner}`);
    this.render(player, currentPlayer, gridHolder);
    main.appendChild(gridHolder);
  }

  render(player, currentPlayer, wrapper) {
    this.cleanUp(wrapper);
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("data-x", `${j}`);
        cell.setAttribute("data-y", `${i}`);

        if (player.board.grid[j][i].isHit === false) {
          if (
            (player === currentPlayer &&
              player.board.grid[j][i].ship !== null) ||
            (currentPlayer.type === "computer" &&
              player.board.grid[j][i].ship !== null)
          ) {
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

  displayMessage(lineOne, lineTwo) {
    this.cleanUp(this.status);
    const textOne = document.createElement("div");
    const textTwo = document.createElement("div");
    textOne.textContent = `${lineOne}`;
    textTwo.textContent = `${lineTwo}`;
    this.status.append(textOne, textTwo);
  }

  moveStatus(coords, hit, player, sunk = false) {
    this.cleanUp(this.status);
    const coordMessage = document.createElement("div");
    const hitMessage = document.createElement("div");
    const sunkMessage = document.createElement("div");
    coordMessage.textContent = `${player} fires at x: ${coords[0] + 1} y: ${
      coords[1] + 1
    }`;
    hit === true
      ? (hitMessage.textContent = "It's a hit!")
      : (hitMessage.textContent = "It's a miss...");
    if (sunk) {
      sunkMessage.textContent = "Ship destroyed!";
    }
    this.status.append(coordMessage, hitMessage, sunkMessage);
  }

  updateButton(id, text) {
    this.cleanUp(this.interact);
    const btn = document.createElement("button");
    btn.setAttribute("id", `${id}`);
    btn.textContent = `${text}`;
    this.interact.appendChild(btn);
  }

  renderShips() {
    this.cleanUp(this.interact);
    let defaultShips = [5, 4, 4, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2];
    for (let i = 0; i < defaultShips.length; i++) {
      let ship = document.createElement("div");
      for (let j = 0; j < defaultShips[i]; j++) {
        let component = document.createElement("div");
        component.setAttribute("class", "component");
        ship.appendChild(component);
      }
      ship.setAttribute("data-length", `${defaultShips[i]}`);
      ship.setAttribute("data-direction", "vertical");
      ship.setAttribute("class", "ship");
      ship.setAttribute("draggable", "true");
      this.interact.appendChild(ship);
    }
  }

  cleanUp(wrapper) {
    while (wrapper.firstChild) {
      wrapper.removeChild(wrapper.firstChild);
    }
  }
}
