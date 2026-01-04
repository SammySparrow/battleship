import { testFn } from "../game";

test("Import/export & Jest working", () => {
  expect(testFn(1, 2)).toBe(3);
});
