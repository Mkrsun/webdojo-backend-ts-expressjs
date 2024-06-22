/**
 * Validates if the provided password is strong.
 * A strong password must contain at least:
 * - 1 uppercase letter
 * - 1 number
 * - 1 special character
 *
 * @param password - The password string to validate.
 * @returns boolean - True if the password is strong, otherwise false.
 */
const isStrongPassword = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
  return passwordRegex.test(password);
};

// Export the function if you're using modules
export default isStrongPassword;
