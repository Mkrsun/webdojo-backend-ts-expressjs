import isStrongPassword from "./isStrongPassword";

describe("isStrongPassword", () => {
  it("should return true for a strong password", () => {
    expect(isStrongPassword("StrongPass1!")).toBe(true);
  });

  it("should return false for a password without uppercase letters", () => {
    expect(isStrongPassword("strongpass1!")).toBe(false);
  });

  it("should return false for a password without numbers", () => {
    expect(isStrongPassword("StrongPass!")).toBe(false);
  });

  it("should return false for a password without special characters", () => {
    expect(isStrongPassword("StrongPass1")).toBe(false);
  });

  it("should return false for a password that is too short", () => {
    expect(isStrongPassword("Str1!")).toBe(false);
  });
});
