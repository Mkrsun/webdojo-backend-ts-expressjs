import AuthRepo from "./auth.repo";
import { dbRepositoryInstance } from "../../../db/dbInstance";

jest.mock("../../db/dbInstance");

describe("AuthRepo", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("emailExistsInDB", () => {
    it("should return true if email exists in the database", async () => {
      (dbRepositoryInstance.executeQueryRO as jest.Mock).mockResolvedValueOnce([
        { 1: 1 },
      ]);

      const result = await AuthRepo.emailExistsInDB("existing@example.com");
      expect(result).toBe(true);
      expect(dbRepositoryInstance.executeQueryRO).toHaveBeenCalledWith(
        "SELECT 1 FROM users WHERE email = ?",
        ["existing@example.com"]
      );
    });

    it("should return false if email does not exist in the database", async () => {
      (dbRepositoryInstance.executeQueryRO as jest.Mock).mockResolvedValueOnce(
        []
      );

      const result = await AuthRepo.emailExistsInDB("nonexistent@example.com");
      expect(result).toBe(false);
      expect(dbRepositoryInstance.executeQueryRO).toHaveBeenCalledWith(
        "SELECT 1 FROM users WHERE email = ?",
        ["nonexistent@example.com"]
      );
    });
  });

  describe("createUser", () => {
    it("should create a new user in the database", async () => {
      (dbRepositoryInstance.executeQueryRW as jest.Mock).mockResolvedValueOnce(
        undefined
      );

      await AuthRepo.createUser("user@example.com", "hashedPassword");
      expect(dbRepositoryInstance.executeQueryRW).toHaveBeenCalledWith(
        "INSERT INTO users (email, password) VALUES (?, ?)",
        ["user@example.com", "hashedPassword"]
      );
    });

    it("should handle errors during user creation", async () => {
      (dbRepositoryInstance.executeQueryRW as jest.Mock).mockRejectedValueOnce(
        new Error("DB error")
      );

      await expect(
        AuthRepo.createUser("user@example.com", "hashedPassword")
      ).rejects.toThrow("DB error");
      expect(dbRepositoryInstance.executeQueryRW).toHaveBeenCalledWith(
        "INSERT INTO users (email, password) VALUES (?, ?)",
        ["user@example.com", "hashedPassword"]
      );
    });
  });
});
