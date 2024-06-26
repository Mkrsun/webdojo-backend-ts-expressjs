import jwt from "jsonwebtoken";
import { BadRequest, InternalServerError } from "../../../error";

// Utils
import isStrongPassword from "../../../utils/validator/isStrongPassword";
import {
  hashPassword,
  comparePasswordWithHashedOne,
} from "../../../utils/passwordEncryptor";

import AuthRepo from "../repository/auth.repo";
import isValidEmail from "../../../utils/validator/isValidEmail";
import { Account } from "../domain/account.entity";

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

const login = async (email: string, password: string) => {
  if (!isValidEmail(email)) {
    throw new BadRequest("Bad credentials");
  }

  // Check if there is an account registered with that email
  const accountIsRegistered = await AuthRepo.emailExistsInDB(email);

  // Simulate email already exists check
  if (!accountIsRegistered) {
    throw new BadRequest("There is no user account associated with this email");
  }

  // Check if the password is the same with the encrypted one
  const userAccount: Account = await AuthRepo.getAccountDetails(email);

  if (!userAccount) {
    throw new InternalServerError("Something unexpected happened");
  }

  if (!comparePasswordWithHashedOne(password, userAccount.hashedPassword)) {
    throw new BadRequest("Bad credentials");
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: userAccount.id, email: userAccount.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRATION }
  );

  return { token };

  return true;
};

const AuthService = {
  signup,
  login,
};

export default AuthService;
