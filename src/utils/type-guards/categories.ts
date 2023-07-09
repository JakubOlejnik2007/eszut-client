import { ICategory } from "../../types/forms-data";

export const isCategory = (object: unknown): object is ICategory => {
    return object !== null && typeof object === "object"
      ? "name" in object
      : false;
}

export const isArrayOfCategories = (arr: unknown[]): arr is ICategory[] => {
    return arr.every(isCategory)
}

export default isArrayOfCategories;