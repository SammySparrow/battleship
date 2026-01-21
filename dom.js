export { UserInterface };

class UserInterface {
  constructor(
    status = document.querySelector(".status-wrap"),
    interact = document.querySelector(".interact-wrap")
  ) {
    this.status = status;
    this.interact = interact;
  }

  initialRender(player, owner) {
    this.cleanUp(document.querySelector(".initialise"));
    const main = document.querySelector(".grid-wrap");
    const gridHolder = document.createElement("div");

    gridHolder.setAttribute("class", "wrapper");
    gridHolder.setAttribute("data-owner", `${owner}`);
    this.render(player, gridHolder, false, true);
    main.appendChild(gridHolder);
  }

  render(player, dataRef, hide = false, init = false) {
    let wrapper;
    if (init) wrapper = dataRef;
    else wrapper = document.querySelector(`[data-owner="${dataRef}"]`);
    this.cleanUp(wrapper);
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("data-x", `${j}`);
        cell.setAttribute("data-y", `${i}`);

        if (player.board.grid[j][i].isHit) {
          player.board.grid[j][i].ship
            ? cell.setAttribute("id", "hit")
            : cell.setAttribute("id", "miss");
        } else if (!hide && player.board.grid[j][i].ship)
          cell.setAttribute("id", "grid-ship");
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
