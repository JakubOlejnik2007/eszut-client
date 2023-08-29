/**
 * The function generates a random password of a specified length, consisting of lowercase letters,
 * uppercase letters, and digits.
 * @param {number} length - The `length` parameter is the desired length of the random password that
 * you want to generate.
 * @returns The function `generateRandomPassword` returns a randomly generated password as a string.
 */
const generateRandomPassword = (length: number): string => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const lowercaseCharacters = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digitCharacters = '0123456789';

  let password = '';

  password += lowercaseCharacters.charAt(Math.floor(Math.random() * lowercaseCharacters.length));

  password += uppercaseCharacters.charAt(Math.floor(Math.random() * uppercaseCharacters.length));

  password += digitCharacters.charAt(Math.floor(Math.random() * digitCharacters.length));

  for (let i = 3; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }

  return password.split('').sort(() => 0.5 - Math.random()).join('');
};

export default generateRandomPassword;
