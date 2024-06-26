import { dbRepositoryInstance } from "../../../db/dbInstance";
import { Account } from "../domain/account.entity";

/**
 * Checks if an email already exists in the database.
 * @param email - The email to check.
 * @returns Promise<boolean> - True if the email exists, otherwise false.
 */
const emailExistsInDB = async (email: string): Promise<boolean> => {
  const query = "SELECT 1 FROM account WHERE email = ?";
  const rows = await dbRepositoryInstance.executeQueryRO(query, [email]);
  return rows.length > 0;
};

const getAccountDetails = async (email: string): Promise<Account> => {
  const query = "SELECT * from account where email = ?";
  const [userFound] = await dbRepositoryInstance.executeQueryRO(query, [email]);
  return userFound;
};

/**
 * Creates a new user in the database.
 * @param user - The user to create.
 * @returns Promise<void>
 */
const createUser = async (
  email: string,
  initialUsername: string,
  hashedPassword: string
): Promise<void> => {
  const query =
    "INSERT INTO account (email, username, hashedPassword) VALUES (?,?,?)";
  await dbRepositoryInstance.executeQueryRW(query, [
    email,
    initialUsername,
    hashedPassword,
  ]);
};

const AuthRepo = {
  createUser,
  emailExistsInDB,
  getAccountDetails,
};

export default AuthRepo;
