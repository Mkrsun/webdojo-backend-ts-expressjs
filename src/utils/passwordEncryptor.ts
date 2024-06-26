import bcrypt from "bcrypt";

const saltRounds = 10;

/**
 * Hashes the provided password using bcrypt.
 * @param password - The plain text password to hash.
 * @returns Promise<string> - The hashed password.
 */
const hashPassword = async (password: string): Promise<string> => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

/**
 * Compares a plain text password with a hashed password.
 * @param password - The plain text password.
 * @param hashedPassword - The hashed password to compare with.
 * @returns Promise<boolean> - Whether the passwords match.
 */
const comparePasswordWithHashedOne = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

export { hashPassword, comparePasswordWithHashedOne };
