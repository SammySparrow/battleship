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
    this.edges = [];
    this.edgesX = [];
    this.edgesY = [];
    this.init = this.listEdges(this.coords);
  }

  listEdges(coords) {
    let x = coords[0];
    let y = coords[1];
    if (x + 1 <= 9) {
      this.edgesX.push([x + 1, y]);
      this.edges.push([x + 1, y]);
    }
    if (x - 1 >= 0) {
      this.edgesX.push([x - 1, y]);
      this.edges.push([x - 1, y]);
    }
    if (y + 1 <= 9) {
      this.edgesY.push([x, y + 1]);
      this.edges.push([x, y + 1]);
    }
    if (y - 1 >= 0) {
      this.edgesY.push([x, y - 1]);
      this.edges.push([x, y - 1]);
    }
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

    for (let i = 0; i < size; i++) {
      this.grid[coords[0]][coords[1]].ship = ship;
      coords[index]++;
    }

    this.placedShips++;
  }

  placeShipValidation(size, coords, direction) {
    let index;
    direction === "horizontal" ? (index = 0) : (index = 1);

    if (coords[index] + size > 10) return false;

    for (let i = 0; i < size; i++) {
      if (this.grid[coords[0]][coords[1]].ship) return false;
      coords[index]++;
    }

    return true;
  }

  receiveAttack(coords) {
    this.grid[coords[0]][coords[1]].isHit = true;

    if (this.grid[coords[0]][coords[1]].ship) {
      this.grid[coords[0]][coords[1]].ship.hit();
      if (this.grid[coords[0]][coords[1]].ship.sunk) {
        this.sunkenShips++;
        if (this.sunkenShips === this.placedShips) this.allSunken = true;
      }
    }
  }

  receiveAttackValidation(coords) {
    if (this.grid[coords[0]][coords[1]].isHit) return false;
    return true;
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
    if (targetCell.ship) {
      this.consecutiveAttacks.push(coords);
      if (Math.abs(targetCell.ship.length - targetCell.ship.timesHit) === 1) {
        this.attackQueue = [];
        this.consecutiveAttacks = [];
      } else if (this.consecutiveAttacks.length >= 2) {
        let coordOne = structuredClone(this.consecutiveAttacks[0]);
        let coordTwo = structuredClone(this.consecutiveAttacks[1]);
        let axis;
        Math.abs(coordOne[0] - coordTwo[0]) === 1
          ? (axis = targetCell.edgesX)
          : (axis = targetCell.edgesY);
        for (let i = 0; i < axis.length; i++) {
          this.attackQueue.push(axis[i]);
        }
      } else {
        for (let i = 0; i < targetCell.edges.length; i++) {
          this.attackQueue.push(targetCell.edges[i]);
        }
      }
    }
    return coords;
  }

  randomShipPlacement() {}
}
