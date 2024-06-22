/**
 * Validates if the provided email has a correct structure.
 * @param email - The email string to validate.
 * @returns boolean - True if the email is valid, otherwise false.
 */
const isValidEmail = (email: string): boolean => {
  // This regex checks for a valid email structure
  const emailRegex = /^[^\s@]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// Export the function if you're using modules
export default isValidEmail;
