import { Player } from "./game.js";
import {
  render,
  initialRender,
  displayResults,
  updateButton,
  cleanUp,
  currentPlayerDisplay,
  moveStatus,
  removeNextButton,
  renderShips,
  currentShipPlacement,
  nextShipButton,
} from "./dom.js";

const main = document.querySelector("main");

class Controller {
  constructor(playerOne, playerTwo) {
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.currentPlayer = this.playerOne;
    this.phase = "ships";
  }

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

  initialiseUI() {
    initialRender(this.playerOne, "player-one", this.currentPlayer);
    initialRender(this.playerTwo, "player-two", this.currentPlayer);
    currentShipPlacement("Player One");
  }

  move(coords, owner) {
    let target;
    owner === "player-one"
      ? (target = this.playerOne)
      : (target = this.playerTwo);
    if (target === this.currentPlayer) return;
    target.board.receiveAttack(coords);
    render(
      target,
      this.currentPlayer,
      document.querySelector(`[data-owner="${owner}"]`)
    );
    let checkHit;
    let checkSunk;
    let playerName;
    owner === "player-one"
      ? (playerName = "Player Two")
      : (playerName = "Player One");
    if (target.board.grid[coords[0]][coords[1]].ship) {
      checkHit = true;
      target.board.grid[coords[0]][coords[1]].ship.sunk
        ? (checkSunk = true)
        : (checkSunk = false);
    } else {
      checkHit = false;
    }
    if (target.board.allSunken) {
      displayResults(playerName);
    } else {
      moveStatus(coords, checkHit, playerName, checkSunk);
      updateButton();
      this.phase = "next";
    }
  }

  placeShips(direction, length, x, y) {
    control.currentPlayer.board.placeShip(length, [x, y], direction);
    let playerName;
    this.currentPlayer === this.playerOne
      ? (playerName = "player-one")
      : (playerName = "player-two");
    render(
      this.currentPlayer,
      this.currentPlayer,
      document.querySelector(`[data-owner="${playerName}"]`)
    );
    if (this.currentPlayer.board.placedShips === 15) nextShipButton();
  }

  shipTurnChange() {}
}

let playerOne;
let playerTwo;
let control;

main.addEventListener("click", (e) => {
  if (e.target.id === "start-game") {
    const inputOne = new FormData(document.querySelector("#player-one"));
    const inputTwo = new FormData(document.querySelector("#player-two"));
    playerOne = new Player(inputOne.get("player-one"));
    playerTwo = new Player(inputTwo.get("player-two"));
    control = new Controller(playerOne, playerTwo);
    control.initialiseUI();
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

  if (e.target.parentNode.className === "ship") {
    e.target.parentNode.dataset.direction === "vertical"
      ? e.target.parentNode.setAttribute("data-direction", "horizontal")
      : e.target.parentNode.setAttribute("data-direction", "vertical");
  }
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
