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

  placeShip(ship, coords) {
    let check = coords.flat();
    if (Math.max(...check) > 9 || Math.min(...check) < 0) {
      throw new Error();
    }
    for (let i = 0; i < coords.length; i++) {
      this.board[coords[i][0]][coords[i][1]] = ship;
    }
  }
}
