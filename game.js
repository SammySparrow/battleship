export { Ship, Gameboard, Player };

class Ship {
  constructor(length) {
    this.length = length;
    this.timesHit = 0;
    this.sunk = false;
  }

  hit() {
    this.timesHit += 1;
    if (this.timesHit === this.length) {
      this.sunk = true;
    }
  }
}

class Cell {
  constructor() {
    this.ship = null;
    this.isHit = false;
  }
}

class Gameboard {
  constructor() {
    this.grid = this.initialiseGrid();
    this.placedShips = 0;
    this.sunkenShips = 0;
    this.allSunken = false;
  }

  initialiseGrid() {
    const board = [[], [], [], [], [], [], [], [], [], []];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let cell = new Cell();
        board[i][j] = cell;
      }
    }
    return board;
  }

  reset() {
    this.grid = this.initialiseGrid();
  }

  placeShip(size, coords, direction) {
    let ship = new Ship(size);
    let index;
    direction === "horizontal" ? (index = 0) : (index = 1);

    if (coords[index] + size > 10) {
      throw new Error("Coords out of bounds");
    }

    let testCoords = structuredClone(coords);
    for (let i = 0; i < size; i++) {
      if (this.grid[testCoords[0]][testCoords[1]].ship !== null) {
        throw new Error("Ship overlap");
      }
      testCoords[index]++;
    }

    for (let i = 0; i < size; i++) {
      this.grid[coords[0]][coords[1]].ship = ship;
      coords[index]++;
    }

    this.placedShips++;
  }

  receiveAttack(coords) {
    if (this.grid[coords[0]][coords[1]].isHit) {
      throw new Error("Cell is already hit");
    }
    this.grid[coords[0]][coords[1]].isHit = true;

    if (this.grid[coords[0]][coords[1]].ship !== null) {
      this.grid[coords[0]][coords[1]].ship.hit();
      if (this.grid[coords[0]][coords[1]].ship.sunk === true) {
        this.sunkenShips++;
        if (this.sunkenShips === this.placedShips) {
          this.allSunken = true;
        }
      }
    }
  }
}

class Player {
  constructor() {
    this.board = new Gameboard();
    this.movesTaken = [];
  }

  randomiseCoords() {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
  }

  randomMove(target) {
    let coords = this.randomiseCoords();
    while (target.board.grid[coords[0]][coords[1]].isHit) {
      coords = this.randomiseCoords();
    }
    target.board.receiveAttack(coords);
  }
}
