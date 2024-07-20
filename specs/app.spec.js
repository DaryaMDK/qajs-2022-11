/* eslint-disable jest/no-conditional-expect */
// eslint-disable-next-line no-unused-vars
import { nameIsValid, fullTrim, getTotal } from "../src/app.js";

// tests for 1 function
test("check real name", () => {
  expect(nameIsValid("ivan")).toBe(true);
});

test("check real name with upper symbol", () => {
  expect(nameIsValid("Ivan")).toBe(false);
});

test.each([
  ["i", false],
  ["ivan122", false],
  [" ", false],
  ["марфа", false],
])("check invalid name", (value, expected) => {
  expect(nameIsValid(value)).toBe(expected);
});

// tests for 2 function
test("check success replace whitespace in text", () => {
  expect(fullTrim(" i van ")).toBe("ivan");
});

test("check success replace whitespace in text with numbers", () => {
  expect(fullTrim(" tests123")).toBe("tests123");
});

test.each([
  ["* * tst", "**tst"],
  [null, ""],
  ["+d,d, d ", "+d,d,d"],
])("check invalid name", (value, expected) => {
  expect(fullTrim(value)).toBe(expected);
});

// tests for 3 function
test("chekc discount of 7 quantity", () => {
  expect(getTotal([{ price: 52, quantity: 7 }])).toBe(364);
});

test("chekc discount of 100 quantity", () => {
  expect(getTotal([{ price: 52, quantity: 100 }])).toBe(5200);
});

test.each([
  { items: [], discount: 20, expected: 0 },
  {
    items: [{ price: 10, quantity: 5 }],
    discount: 100,
    expectedError: "Процент скидки не может быть больше 100",
  },
  {
    items: [{ price: 10, quantity: 5 }],
    discount: -10,
    expectedError: "Процент скидки не может быть отрицательным",
  },
  {
    items: [{ price: 10, quantity: 5 }],
    discount: "ten",
    expectedError: "Скидка должна быть числом",
  },
])(
  "calculates total with discount",
  ({ items, discount, expected, expectedError }) => {
    if (expectedError) {
      expect(() => getTotal(items, discount)).toThrow(expectedError);
    } else {
      expect(getTotal(items, discount)).toBe(expected);
    }
  },
);
