import { Player } from "./game.js";
import {
  render,
  initialRender,
  displayResults,
  updateButton,
  clearInitialUI,
} from "./dom.js";

class Controller {
  constructor(playerOne, playerTwo) {
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.currentPlayer = this.playerOne;
    this.phase = "ships";
  }

  switchTurns() {
    this.currentPlayer === this.playerOne
      ? (this.currentPlayer = this.playerTwo)
      : (this.currentPlayer = this.playerOne);
  }

  initialiseUI() {
    clearInitialUI();
    initialRender(this.playerOne, "player-one", this.currentPlayer);
    initialRender(this.playerTwo, "player-two", this.currentPlayer);
  }

  selectCell(coords, owner) {
    let target;
  }

  /* TEMP */
  placeShips() {
    this.playerOne.board.placeShip(5, [1, 5], "horizontal");
    this.playerOne.board.placeShip(4, [0, 0], "vertical");
    this.playerOne.board.placeShip(4, [6, 9], "horizontal");
    this.playerOne.board.placeShip(3, [6, 6], "vertical");
    this.playerOne.board.placeShip(3, [2, 1], "vertical");
    this.playerOne.board.placeShip(3, [8, 5], "vertical");
    this.playerOne.board.placeShip(3, [2, 7], "vertical");
    this.playerOne.board.placeShip(3, [7, 3], "horizontal");
    this.playerOne.board.placeShip(3, [4, 1], "horizontal");
    this.playerOne.board.placeShip(3, [3, 8], "horizontal");
    this.playerOne.board.placeShip(2, [0, 8], "vertical");
    this.playerOne.board.placeShip(2, [0, 6], "vertical");
    this.playerOne.board.placeShip(2, [5, 6], "vertical");
    this.playerOne.board.placeShip(2, [5, 2], "vertical");
    this.playerOne.board.placeShip(2, [4, 2], "vertical");

    this.playerTwo.board.placeShip(5, [1, 5], "horizontal");
    this.playerTwo.board.placeShip(4, [0, 0], "vertical");
    this.playerTwo.board.placeShip(4, [6, 9], "horizontal");
    this.playerTwo.board.placeShip(3, [6, 6], "vertical");
    this.playerTwo.board.placeShip(3, [2, 1], "vertical");
    this.playerTwo.board.placeShip(3, [8, 5], "vertical");
    this.playerTwo.board.placeShip(3, [2, 7], "vertical");
    this.playerTwo.board.placeShip(3, [7, 3], "horizontal");
    this.playerTwo.board.placeShip(3, [4, 1], "horizontal");
    this.playerTwo.board.placeShip(3, [3, 8], "horizontal");
    this.playerTwo.board.placeShip(2, [0, 8], "vertical");
    this.playerTwo.board.placeShip(2, [0, 6], "vertical");
    this.playerTwo.board.placeShip(2, [5, 6], "vertical");
    this.playerTwo.board.placeShip(2, [5, 2], "vertical");
    this.playerTwo.board.placeShip(2, [4, 2], "vertical");

    this.phase = "move";
  }
  /* TEMP */
}

let playerOne;
let playerTwo;
let control;

document.querySelector("main").addEventListener("click", (e) => {
  if (e.target.id === "start-game") {
    const inputOne = new FormData(document.querySelector("#player-one"));
    const inputTwo = new FormData(document.querySelector("#player-two"));
    playerOne = new Player(inputOne.get("player-one"));
    playerTwo = new Player(inputTwo.get("player-two"));
    control = new Controller(playerOne, playerTwo);
    control.placeShips();
    control.initialiseUI();
  }

  if (e.target.className === "cell" && control.phase === "move") {
    control.selectCell(
      [parseInt(e.target.dataset.x), parseInt(e.target.dataset.y)],
      e.target.parentNode.dataset.owner
    );
  }
  /*   if (e.target.parentNode.dataset.opp === "true") {
    playerTwo.board.receiveAttack([
      parseInt(e.target.dataset.x),
      parseInt(e.target.dataset.y),
    ]);
    render(playerTwo, e.target.parentNode, true);
    if (playerTwo.board.allSunken === true) {
      displayResults("Player One");
    }
    playerTwo.randomMove(playerOne);
    render(playerOne, document.querySelector("[data-opp='false']"));
    if (playerOne.board.allSunken === true) {
      displayResults("Player Two");
    }
  } */
});
