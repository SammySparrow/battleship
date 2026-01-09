export { Ship, Gameboard };

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
    this.board = [[], [], [], [], [], [], [], [], [], []];
  }

  placeShip(size, coords, direction) {
    let ship = new Ship(size);
    let index;
    direction === "horizontal" ? (index = 0) : (index = 1);

    if (coords[index] + size > 9) {
      throw new Error("Coords out of bounds");
    }

    let testCoords = structuredClone(coords);
    for (let i = 0; i < size; i++) {
      if (this.board[testCoords[0]][testCoords[1]] !== undefined) {
        throw new Error("Ship overlap");
      }
      testCoords[index]++;
    }

    for (let i = 0; i < size; i++) {
      this.board[coords[0]][coords[1]] = ship;
      coords[index]++;
    }
  }
}
