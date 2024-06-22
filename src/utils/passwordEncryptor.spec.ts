import bcrypt from "bcrypt";
import hashPassword from "./passwordEncryptor";

jest.mock("bcrypt");

describe("hashPassword", () => {
  const mockHash = bcrypt.hash as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should hash the password using bcrypt with the correct salt rounds", async () => {
    const plainPassword = "mysecretpassword";
    const hashedPassword = "hashedpassword123";

    // Mock bcrypt.hash to return a resolved promise with the hashed password
    mockHash.mockResolvedValue(hashedPassword);

    const result = await hashPassword(plainPassword);

    expect(mockHash).toHaveBeenCalledWith(plainPassword, 10);
    expect(result).toBe(hashedPassword);
  });

  it("should throw an error if bcrypt.hash fails", async () => {
    const plainPassword = "mysecretpassword";

    // Mock bcrypt.hash to return a rejected promise with an error
    const error = new Error("bcrypt error");
    mockHash.mockRejectedValue(error);

    await expect(hashPassword(plainPassword)).rejects.toThrow("bcrypt error");
  });
});
