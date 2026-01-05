import { Ship } from "../game";

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

  test("timesHit increments whe ship is hit", () => {
    ship.hit();
    expect(ship.timesHit).toBe(1);
  });

  test("isSunk status is true when timesHit equals ship length", () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.sunk).toBe(true);
  });
});
