import { Ship, Gameboard } from "../game";

describe("Ship tests", () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3);
  });

  test("Ship initialises with expected length", () => {
    expect(ship.length).toBe(3);
  });

  test("timesHit property initialises to 0", () => {
    expect(ship.timesHit).toBe(0);
  });

  test("timesHit increments when ship is hit", () => {
    ship.hit();
    expect(ship.timesHit).toBe(1);
  });

  test("Sunk status is not set to true before timesHit equals length", () => {
    ship.hit();
    ship.hit();
    expect(ship.sunk).toBe(false);
  });

  test("Sunk status is true when timesHit equals ship length", () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.sunk).toBe(true);
  });
});

describe("Gameboard tests", () => {
  let gb;

  beforeEach(() => {
    gb = new Gameboard();
  });

  describe("Ship placement method tests", () => {
    test("Ship exists in determined coordinates", () => {
      gb.placeShip(3, [2, 3], "vertical");

      expect(gb.board[2][3]).toBeDefined();
      expect(gb.board[2][4]).toBeDefined();
      expect(gb.board[2][5]).toBeDefined();
    });

    test("Ship cannot be placed outside of gameboard boundaries", () => {
      expect(() => gb.placeShip(2, [9, 9], "vertical")).toThrow(Error);
    });

    test("Ships cannot overlap", () => {
      gb.placeShip(2, [3, 4], "vertical");

      expect(() => gb.placeShip(2, [2, 5], "horizontal")).toThrow(Error);
    });

    test("Ships are independent objects", () => {
      gb.placeShip(2, [1, 1], "horizontal");
      gb.placeShip(2, [5, 5], "horizontal");

      expect(gb.board[1][1]).toBeDefined();
      expect(gb.board[5][5]).toBeDefined();
      expect(gb.board[1][1]).not.toBe(gb.board[5][5]);
    });

    test("One ship over two tiles is the same object", () => {
      gb.placeShip(2, [1, 1], "horizontal");
      expect(gb.board[1][1]).toBe(gb.board[2][1]);
    });
  });

  describe("receiveAttack method tests", () => {
    test("Registers missed attack", () => {
      gb.receiveAttack([5, 5]);
      expect(gb.board[5][5]).toBe("miss");
    });

    test("Ship receives attack", () => {
      gb.placeShip(1, [5, 5], "horizontal");
      gb.receiveAttack([5, 5]);
      expect(gb.board[5][5].timesHit).toBe(1);
    });
  });

  test("Amount of placed ships is properly tracked", () => {
    gb.placeShip(1, [1, 1], "horizontal");
    gb.placeShip(1, [5, 5], "horizontal");
    expect(gb.placedShips).toBe(2);
  });

  test("Amount of sunken ships are being tracked", () => {
    gb.placeShip(1, [1, 1], "horizontal");
    gb.receiveAttack([1, 1]);
    expect(gb.sunkenShips).toBe(1);
  });

  test("Gameboard reports that all ships are destroyed", () => {
    gb.placeShip(1, [5, 5], "horizontal");
    gb.receiveAttack([5, 5]);
    expect(gb.allSunken).toBe(true);
  });
});
