import AuthService from "./auth.service";
import AuthRepo from "../repository/auth.repo";
import { BadRequest } from "../../../error";
import isStrongPassword from "../../../utils/validator/isStrongPassword";
import hashPassword from "../../../utils/passwordEncryptor";

jest.mock("./auth.repo");
jest.mock("../../utils/validator/isStrongPassword");
jest.mock("../../utils/passwordEncryptor");

describe("AuthService", () => {
  describe("signup", () => {
    it("should throw a BadRequest error if password is too short", async () => {
      await expect(
        AuthService.signup("user@example.com", "short")
      ).rejects.toThrow(BadRequest);
    });

    it("should throw a BadRequest error if password is not strong enough", async () => {
      (isStrongPassword as jest.Mock).mockReturnValue(false);

      await expect(
        AuthService.signup("user@example.com", "weakpassword")
      ).rejects.toThrow(BadRequest);
    });

    it("should hash the password and create the user", async () => {
      (isStrongPassword as jest.Mock).mockReturnValue(true);
      (hashPassword as jest.Mock).mockResolvedValue("hashedPassword");

      await AuthService.signup("user@example.com", "StrongPass1!");

      expect(hashPassword).toHaveBeenCalledWith("StrongPass1!");
      expect(AuthRepo.createUser).toHaveBeenCalledWith(
        "user@example.com",
        "hashedPassword"
      );
    });

    it("should throw a BadRequest error if email already exists", async () => {
      (isStrongPassword as jest.Mock).mockReturnValue(true);
      (AuthRepo.emailExistsInDB as jest.Mock).mockResolvedValue(true);

      await expect(
        AuthService.signup("existing@example.com", "StrongPass1!")
      ).rejects.toThrow(BadRequest);
    });
  });
});
