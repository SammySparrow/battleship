import { Player } from "./game.js";
import { UserInterface } from "./dom.js";

const main = document.querySelector("main");

class Controller {
  constructor(playerOne, playerTwo) {
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.currentPlayer = this.playerOne;
    this.target = this.playerTwo;
    this.bothHuman = this.checkTypes();
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

  placeShips(direction, length, x, y, shipElement) {
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

    UI.interact.removeChild(shipElement);
    if (this.currentPlayer.board.placedShips === 15)
      UI.updateButton("next-ship", "Done");
  }

  shipPhaseSwitch() {
    UI.cleanUp(UI.interact);
    if (this.currentPlayer === this.playerOne) {
      this.currentPlayer = this.playerTwo;
      this.target = this.playerOne;
      this.bothHuman ? this.humanSwitch() : this.shipPhase();
    } else {
      this.phase = "move";
      this.currentPlayer = this.playerOne;
      this.target = this.playerTwo;
      this.bothHuman ? this.humanSwitch() : this.movePhase();
    }
  }

  movePhase() {
    this.phase = "move";
    if (this.currentPlayer.type === "human") {
      let dataRef;
      let name;
      let oppDataRef;
      if (this.currentPlayer === this.playerOne) {
        dataRef = "player-one";
        name = "Player One";
        oppDataRef = "player-two";
      } else {
        dataRef = "player-two";
        name = "Player Two";
        oppDataRef = "player-one";
      }
      UI.render(
        this.currentPlayer,
        this.currentPlayer,
        document.querySelector(`[data-owner="${dataRef}"]`)
      );
      UI.render(
        this.target,
        this.currentPlayer,
        document.querySelector(`[data-owner="${oppDataRef}"]`)
      );
      UI.displayMessage(`Current player: ${name}`, "Click to attack");
    } else {
      let coords = this.currentPlayer.randomMove(this.target);
      this.movePhaseAttack(coords);
    }
  }

  movePhaseAttack(coords) {
    if (!this.target.board.receiveAttackValidation(coords)) return;
    this.target.board.receiveAttack(coords);
    let owner;
    let player;
    let targetCell = this.target.board.grid[coords[0]][coords[1]];
    if (this.target === this.playerOne) {
      owner = "player-one";
      player = "Player Two";
    } else {
      owner = "player-two";
      player = "Player One";
    }
    if (this.target.board.allSunken) this.gameOver(player);
    else {
      this.phase = "next";
      UI.render(
        this.target,
        this.currentPlayer,
        document.querySelector(`[data-owner="${owner}"]`)
      );
      targetCell.ship
        ? UI.moveStatus(coords, targetCell.isHit, player, targetCell.ship.sunk)
        : UI.moveStatus(coords, targetCell.isHit, player);
      UI.updateButton("next-turn", "End turn");
    }
  }

  movePhaseSwitch() {
    UI.cleanUp(UI.interact);
    if (this.currentPlayer === this.playerOne) {
      this.currentPlayer = this.playerTwo;
      this.target = this.playerOne;
    } else {
      this.currentPlayer = this.playerOne;
      this.target = this.playerTwo;
    }
    this.bothHuman ? this.humanSwitch() : this.movePhase();
  }

  gameOver(winner) {
    UI.render(
      this.playerOne,
      this.playerOne,
      document.querySelector(`[data-owner="player-one"]`)
    );
    UI.render(
      this.playerTwo,
      this.playerTwo,
      document.querySelector(`[data-owner="player-two"]`)
    );
    UI.displayMessage("Game Over!", `${winner} Wins!`);
    UI.updateButton("new-game", "New game");
  }

  newGame() {
    UI.cleanUp(document.querySelector(".grid-wrap"));
    this.playerOne.reset();
    this.playerTwo.reset();
    this.currentPlayer = this.playerOne;
    this.target = this.playerTwo;
    this.phase = "ship";
    this.initialiseUI();
    this.shipPhase();
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

  if (e.target.className === "cell" && control.phase === "move")
    control.movePhaseAttack([
      parseInt(e.target.dataset.x),
      parseInt(e.target.dataset.y),
    ]);

  if (e.target.id === "next-turn") control.movePhaseSwitch();

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

  if (e.target.id === "new-game") control.newGame();
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
  targetedShip = null;
});
