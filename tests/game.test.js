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

  test("Ship exists in determined coordinates", () => {
    let threeTileShip = new Ship(3);

    gb.placeShip(threeTileShip, [
      [2, 3],
      [2, 4],
      [2, 5],
    ]);
    expect(gb.board[2][3]).toBe(threeTileShip);
    expect(gb.board[2][4]).toBe(threeTileShip);
    expect(gb.board[2][5]).toBe(threeTileShip);
  });
});
