import isValidEmail from "./isValidEmail";

describe("isValidEmail", () => {
  it("should return true for a valid email", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
  });

  it('should return false for an email without "@"', () => {
    expect(isValidEmail("userexample.com")).toBe(false);
  });

  it("should return false for an email without domain part", () => {
    expect(isValidEmail("user@")).toBe(false);
  });

  it("should return false for an email without top-level domain", () => {
    expect(isValidEmail("user@example")).toBe(false);
  });

  it("should return false for an email with spaces", () => {
    expect(isValidEmail("user @example.com")).toBe(false);
  });

  it("should return false for an email with special characters in the domain", () => {
    expect(isValidEmail("user@exa!mple.com")).toBe(false);
  });

  it('should return false for an email with multiple "@" symbols', () => {
    expect(isValidEmail("user@@example.com")).toBe(false);
  });

  it("should return false for an empty email", () => {
    expect(isValidEmail("")).toBe(false);
  });

  it("should return false for an email with only special characters", () => {
    expect(isValidEmail("!@#$%^&*")).toBe(false);
  });

  it("should return false for an email with no local part", () => {
    expect(isValidEmail("@example.com")).toBe(false);
  });
});
