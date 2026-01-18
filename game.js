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
  constructor(x, y) {
    this.ship = null;
    this.isHit = false;
    this.coords = [x, y];
    this.edges = this.listEdges(this.coords);
  }

  listEdges(coords) {
    let list = [];
    let x = coords[0];
    let y = coords[1];
    if (x + 1 <= 9) {
      list.push([x + 1, y]);
    }
    if (x - 1 >= 0) {
      list.push([x - 1, y]);
    }
    if (y + 1 <= 9) {
      list.push([x, y + 1]);
    }
    if (y - 1 >= 0) {
      list.push([x, y - 1]);
    }
    return list;
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
        let cell = new Cell(i, j);
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
  constructor(type) {
    this.board = new Gameboard();
    this.type = type;
    this.attackQueue = [];
    this.consecutiveAttacks = [];
  }

  randomiseCoords() {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
  }

  randomMove(target) {
    let coords;
    this.attackQueue.length !== 0
      ? (coords = this.attackQueue.pop())
      : (coords = this.randomiseCoords());

    while (target.board.grid[coords[0]][coords[1]].isHit) {
      this.attackQueue.length !== 0
        ? (coords = this.attackQueue.pop())
        : (coords = this.randomiseCoords());
    }

    let targetCell = target.board.grid[coords[0]][coords[1]];
    if (targetCell.ship !== null) {
      this.consecutiveAttacks.push(coords);
      if (Math.abs(targetCell.ship.length - targetCell.ship.timesHit) === 1) {
        this.attackQueue = [];
        this.consecutiveAttacks = [];
      } else if (this.consecutiveAttacks.length === 2) {
        this.attackQueue = [];
        let coordOne = structuredClone(this.consecutiveAttacks[0]);
        let coordTwo = structuredClone(this.consecutiveAttacks[1]);
        let index;
        Math.abs(coordOne[0] - coordTwo[0]) === 1 ? (index = 0) : (index = 1);
        if (coordOne[index] > coordTwo[index]) {
          if (coordOne[index] + 1 <= 9) {
            coordOne[index]++;
            this.attackQueue.push(coordOne);
          }
          if (coordTwo[index] - 1 >= 0) {
            coordTwo[index]--;
            this.attackQueue.push(coordTwo);
          }
        } else {
          if (coordOne[index] - 1 >= 0) {
            coordOne[index]--;
            this.attackQueue.push(coordOne);
          }
          if (coordTwo[index] + 1 >= 9) {
            coordTwo[index]++;
            this.attackQueue.push(coordTwo);
          }
        }
      } else {
        for (let i = 0; i < targetCell.edges.length; i++) {
          this.attackQueue.push(targetCell.edges[i]);
        }
      }
    }
    return coords;
  }
}
