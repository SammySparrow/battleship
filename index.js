import { Player } from "./game.js";
import { render, initialRender, displayResults, updateButton } from "./dom.js";

class Controller {
  constructor(playerOne, playerTwo) {
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.currentPlayer = null;
  }
}
/* 
const playerOne = new Player();
const playerTwo = new Player();

playerOne.board.placeShip(5, [1, 5], "horizontal");
playerOne.board.placeShip(4, [0, 0], "vertical");
playerOne.board.placeShip(4, [6, 9], "horizontal");
playerOne.board.placeShip(3, [6, 6], "vertical");
playerOne.board.placeShip(3, [2, 1], "vertical");
playerOne.board.placeShip(3, [8, 5], "vertical");
playerOne.board.placeShip(3, [2, 7], "vertical");
playerOne.board.placeShip(3, [7, 3], "horizontal");
playerOne.board.placeShip(3, [4, 1], "horizontal");
playerOne.board.placeShip(3, [3, 8], "horizontal");
playerOne.board.placeShip(2, [0, 8], "vertical");
playerOne.board.placeShip(2, [0, 6], "vertical");
playerOne.board.placeShip(2, [5, 6], "vertical");
playerOne.board.placeShip(2, [5, 2], "vertical");
playerOne.board.placeShip(2, [4, 2], "vertical");

playerTwo.board.placeShip(5, [1, 5], "horizontal");
playerTwo.board.placeShip(4, [0, 0], "vertical");
playerTwo.board.placeShip(4, [6, 9], "horizontal");
playerTwo.board.placeShip(3, [6, 6], "vertical");
playerTwo.board.placeShip(3, [2, 1], "vertical");
playerTwo.board.placeShip(3, [8, 5], "vertical");
playerTwo.board.placeShip(3, [2, 7], "vertical");
playerTwo.board.placeShip(3, [7, 3], "horizontal");
playerTwo.board.placeShip(3, [4, 1], "horizontal");
playerTwo.board.placeShip(3, [3, 8], "horizontal");
playerTwo.board.placeShip(2, [0, 8], "vertical");
playerTwo.board.placeShip(2, [0, 6], "vertical");
playerTwo.board.placeShip(2, [5, 6], "vertical");
playerTwo.board.placeShip(2, [5, 2], "vertical");
playerTwo.board.placeShip(2, [4, 2], "vertical");

initialRender(playerOne);
initialRender(playerTwo, true);
updateButton(); */

document.querySelector("main").addEventListener("click", (e) => {
  if (e.target.id === "start-game") {
    const inputOne = new FormData(document.querySelector("#player-one"));
    const inputTwo = new FormData(document.querySelector("#player-two"));
    let playerOne = new Player(inputOne.get("player-one"));
    let playerTwo = new Player(inputTwo.get("player-two"));
    let newGame = new Controller(playerOne, playerTwo);
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
