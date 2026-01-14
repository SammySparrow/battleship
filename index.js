import { Player } from "./game.js";
import { render } from "./dom.js";

const playerOne = new Player();
const playerTwo = new Player();

playerOne.board.placeShip(4, [0, 0], "vertical");
playerOne.board.placeShip(5, [1, 5], "horizontal");
playerOne.board.placeShip(4, [6, 9], "horizontal");
playerOne.board.placeShip(3, [6, 6], "vertical");
playerOne.board.receiveAttack([0, 1]);
playerTwo.board.placeShip(4, [0, 0], "vertical");
playerTwo.board.receiveAttack([7, 1]);
playerTwo.board.receiveAttack([0, 1]);

render("main", playerOne);
render("main", playerTwo, true);
