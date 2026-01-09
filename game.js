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

  placeShip(ship, coords, direction) {
    let index;
    direction === "horizontal" ? (index = 0) : (index = 1);

    if (coords[index] + ship.length > 9) {
      throw new Error("Coords out of bounds");
    }

    for (let i = 0; i < ship.length; i++) {
      if (this.board[coords[0]][coords[1]] !== undefined) {
        throw new Error("Ship overlap");
      }
    }

    for (let i = 0; i < ship.length; i++) {
      this.board[coords[0]][coords[1]] = ship;
      coords[index]++;
    }
  }
}
