import bcrypt from "bcrypt";

const saltRounds = 10;

/**
 * Hashes the provided password using bcrypt.
 * @param password - The plain text password to hash.
 * @returns Promise<string> - The hashed password.
 */
const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export default hashPassword;
