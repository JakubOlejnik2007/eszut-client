import { validate } from "email-validator";

/**
 * The function `validateEmail` takes an email string as input and returns a boolean indicating whether
 * the email is valid or not.
 * @param {string} email - The `email` parameter is a string that represents an email address.
 * @returns The function `validateEmail` returns a boolean value.
 */
export const validateEmail = (email: string): boolean => {
    return validate(email);
};

/**
 * The function `validatePassword` checks if a password meets certain criteria.
 * @param {string} password - A string representing the password that needs to be validated.
 * @returns The function `validatePassword` returns a boolean value.
 */
export const validatePassword = (password: string): boolean => {
    return password.length >= 8 && /[0-9]/.test(password) && /[A-Z]/.test(password) && /[a-z]/.test(password);
};
