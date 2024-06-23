import { BadRequest } from "../../../error";

// Utils
import isStrongPassword from "../../../utils/validator/isStrongPassword";
import hashPassword from "../../../utils/passwordEncryptor";

import AuthRepo from "../repository/auth.repo";

const signup = async (email: string, password: string) => {
  // Check for password length (example check)
  if (password.length < 8) {
    throw new BadRequest("Password is too short");
  }

  if (!isStrongPassword(password)) {
    throw new BadRequest("Password doesn't meet the security requirements");
  }

  const emailAlreadyRegistered = await AuthRepo.emailExistsInDB(email);

  // Simulate email already exists check
  if (emailAlreadyRegistered) {
    throw new BadRequest("Email already registered");
  }

  const hashedPassword = await hashPassword(password);

  const initialUsername = email.split("@")[0] ?? email;

  // Create a new user
  AuthRepo.createUser(email, initialUsername, hashedPassword);
};
const AuthService = {
  signup,
};

export default AuthService;
