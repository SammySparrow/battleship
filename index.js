import { Player } from "./game.js";
import { UserInterface } from "./dom.js";

const main = document.querySelector("main");

class Controller {
  constructor(playerOne, playerTwo) {
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.currentPlayer = this.playerOne;
    this.bothHuman = this.checkTypes;
    this.phase = "ship";
  }

  initialiseUI() {
    UI.initialRender(this.playerOne, "player-one", this.currentPlayer);
    UI.initialRender(this.playerTwo, "player-two", this.currentPlayer);
  }

  checkTypes() {
    if (this.playerOne.type === "human" && this.playerTwo.type === "human")
      return true;
    return false;
  }

  humanSwitch() {
    UI.render(
      this.playerOne,
      this.playerTwo,
      document.querySelector(`[data-owner="player-one"]`)
    );
    UI.render(
      this.playerTwo,
      this.playerOne,
      document.querySelector(`[data-owner="player-two"]`)
    );
    UI.displayMessage("Switching turns", 'Press "Start turn" to begin');
    UI.updateButton("human-switch", "Start turn");
  }

  shipPhase() {
    if (this.currentPlayer.type === "human") {
      UI.renderShips();
      let current;
      this.currentPlayer === this.playerOne
        ? (current = "Player One")
        : (current = "Player Two");
      UI.displayMessage(
        `Current player: ${current}`,
        "Click to rotate, drag and drop to place"
      );
    } else {
      this.currentPlayer.randomShipPlacement();
      this.shipPhaseSwitch();
    }
  }

  placeShips(direction, length, x, y) {
    if (
      !control.currentPlayer.board.placeShipValidation(
        length,
        [x, y],
        direction
      )
    )
      return;
    control.currentPlayer.board.placeShip(length, [x, y], direction);
    let playerName;
    this.currentPlayer === this.playerOne
      ? (playerName = "player-one")
      : (playerName = "player-two");
    UI.render(
      this.currentPlayer,
      this.currentPlayer,
      document.querySelector(`[data-owner="${playerName}"]`)
    );
    if (this.currentPlayer.board.placedShips === 15)
      UI.updateButton("next-ship", "Done");
  }

  shipPhaseSwitch() {
    // initial switch
    if (this.currentPlayer === this.playerOne) {
      this.currentPlayer = this.playerTwo;
      this.bothHuman ? this.humanSwitch() : this.shipPhase();
    }
    // second switch
    else {
      this.currentPlayer = this.playerOne;
      this.phase = "move";
      this.bothHuman ? this.humanSwitch() : this.movePhase();
    }
  }

  movePhase() {}

  movePhaseSwitch() {}

  switchTurns() {
    let playerName;
    if (this.currentPlayer === this.playerOne) {
      this.currentPlayer = this.playerTwo;
      playerName = "Player Two";
    } else {
      this.currentPlayer = this.playerOne;
      playerName = "Player One";
    }
    currentPlayerDisplay(playerName);
    this.phase = "move";
    removeNextButton();
    if (this.currentPlayer.type === "computer") {
      let target;
      let name;
      if (this.currentPlayer === this.playerOne) {
        target = this.playerTwo;
        name = "player-two";
      } else {
        target = this.playerOne;
        name = "player-one";
      }
      let newCoords = this.currentPlayer.randomMove(target);
      this.move(newCoords, name);
    }
  }

  move(coords, owner) {
    let target;
    let checkHit;
    let checkSunk;
    let playerName;
    if (owner === "player-one") {
      target = this.playerOne;
      playerName = "Player Two";
    } else {
      target = this.playerTwo;
      playerName = "Player One";
    }
    if (
      !target.board.receiveAttackValidation(coords) ||
      target === this.currentPlayer
    )
      return;
    target.board.receiveAttack(coords);
    UI.render(
      target,
      this.currentPlayer,
      document.querySelector(`[data-owner="${owner}"]`)
    );

    if (target.board.grid[coords[0]][coords[1]].ship) {
      checkHit = true;
      target.board.grid[coords[0]][coords[1]].ship.sunk
        ? (checkSunk = true)
        : (checkSunk = false);
    } else checkHit = false;
    if (target.board.allSunken) {
      displayResults(playerName);
      control.phase = null;
    } else {
      moveStatus(coords, checkHit, playerName, checkSunk);
      updateButton();
      this.phase = "next";
    }
  }
}

let playerOne;
let playerTwo;
let control;
let UI = new UserInterface();

main.addEventListener("click", (e) => {
  if (e.target.id === "start-game") {
    const inputOne = new FormData(document.querySelector("#player-one"));
    const inputTwo = new FormData(document.querySelector("#player-two"));
    playerOne = new Player(inputOne.get("player-one"));
    playerTwo = new Player(inputTwo.get("player-two"));
    control = new Controller(playerOne, playerTwo);
    control.initialiseUI();
    control.shipPhase();
  }

  if (e.target.className === "cell" && control.phase === "move") {
    control.move(
      [parseInt(e.target.dataset.x), parseInt(e.target.dataset.y)],
      e.target.parentNode.dataset.owner
    );
  }

  if (e.target.id === "next-turn") {
    control.switchTurns();
  }

  if (e.target.id === "human-switch") {
    if (control.phase === "ship") control.shipPhase();
    if (control.phase === "move") control.movePhase();
  }

  if (e.target.parentNode.className === "ship") {
    e.target.parentNode.dataset.direction === "vertical"
      ? e.target.parentNode.setAttribute("data-direction", "horizontal")
      : e.target.parentNode.setAttribute("data-direction", "vertical");
  }

  if (e.target.id === "next-ship") control.shipPhaseSwitch();
});

let targetedShip = null;

main.addEventListener("dragstart", (e) => {
  targetedShip = e.target;
});

main.addEventListener("dragover", (e) => {
  e.preventDefault();
});

main.addEventListener("drop", (e) => {
  if (!targetedShip) return;

  control.placeShips(
    targetedShip.dataset.direction,
    parseInt(targetedShip.dataset.length),
    parseInt(e.target.dataset.x),
    parseInt(e.target.dataset.y)
  );

  document.querySelector(".interact-wrap").removeChild(targetedShip);
  targetedShip = null;
});
