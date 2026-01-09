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
  });
});
