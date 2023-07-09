import { IPlace } from "../../types/forms-data";

export const isPlace = (object: unknown): object is IPlace => {
  return object !== null && typeof object === "object"
    ? "name" in object
    : false;
};

export const isArrayOfPlaces = (arr: unknown[]): arr is IPlace[] => {
  return arr.every(isPlace);
};

export default isArrayOfPlaces;
