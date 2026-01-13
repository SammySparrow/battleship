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

class Gameboard {
  constructor() {
    this.grid = [[], [], [], [], [], [], [], [], [], []];
    this.placedShips = 0;
    this.sunkenShips = 0;
    this.allSunken = false;
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
      if (this.grid[testCoords[0]][testCoords[1]] !== undefined) {
        throw new Error("Ship overlap");
      }
      testCoords[index]++;
    }

    for (let i = 0; i < size; i++) {
      this.grid[coords[0]][coords[1]] = ship;
      coords[index]++;
    }

    this.placedShips++;
  }

  receiveAttack(coords) {
    if (this.grid[coords[0]][coords[1]] === undefined) {
      this.grid[coords[0]][coords[1]] = "miss";
    } else if (this.grid[coords[0]][coords[1]] !== "miss") {
      this.grid[coords[0]][coords[1]].hit();
    }

    if (this.grid[coords[0]][coords[1]].sunk) {
      this.sunkenShips++;
      if (this.placedShips === this.sunkenShips) {
        this.allSunken = true;
      }
    }
  }
}

class Player {
  constructor() {
    this.board = new Gameboard();
  }
}
