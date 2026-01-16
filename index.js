import { Player } from "./game.js";
import { render, initialRender } from "./dom.js";

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

document.querySelector("main").addEventListener("click", (e) => {
  if (e.target.parentNode.dataset.opp === "true") {
    playerTwo.board.receiveAttack([
      parseInt(e.target.dataset.x),
      parseInt(e.target.dataset.y),
    ]);
    render(playerTwo, e.target.parentNode, true);
  }
});
