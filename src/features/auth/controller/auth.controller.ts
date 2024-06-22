import { Request, Response, NextFunction } from "express";
import { BadRequest, InternalServerError } from "../../../error";
import AuthService from "../service/auth.service";

// Utils
import isValidEmail from "../../../utils/validator/isValidEmail";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password || !isValidEmail(email)) {
      throw new BadRequest("Bad credentials");
    }

    await AuthService.signup(email, password);

    // Simulate successful user creation
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    if (error instanceof BadRequest) {
      res.status(400).json({ error: error.message });
    } else {
      next(
        new InternalServerError(
          "An unexpected error occurred. Please try again later"
        )
      );
    }
  }
};

const login = (req: Request, res: Response, next: NextFunction) => {
  // Login logic here
};

const AuthController = {
  signup,
  login,
};

export default AuthController;
