import { dbRepositoryInstance } from "../../../db/dbInstance";

/**
 * Checks if an email already exists in the database.
 * @param email - The email to check.
 * @returns Promise<boolean> - True if the email exists, otherwise false.
 */
const emailExistsInDB = async (email: string): Promise<boolean> => {
  const query = "SELECT 1 FROM users WHERE email = ?";
  const rows = await dbRepositoryInstance.executeQueryRO(query, [email]);
  return rows.length > 0;
};

/**
 * Creates a new user in the database.
 * @param user - The user to create.
 * @returns Promise<void>
 */
const createUser = async (
  email: string,
  hashedPassword: string
): Promise<void> => {
  const query = "INSERT INTO users (email, password) VALUES (?, ?)";
  await dbRepositoryInstance.executeQueryRW(query, [email, hashedPassword]);
};

const AuthRepo = {
  createUser,
  emailExistsInDB,
};

export default AuthRepo;
