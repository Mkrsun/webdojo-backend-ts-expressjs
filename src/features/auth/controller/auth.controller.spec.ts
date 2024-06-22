import AuthController from "./auth.controller";
import AuthService from "../service/auth.service";
import { Request, Response, NextFunction } from "express";
import { jest } from "@jest/globals";
import { BadRequest, InternalServerError } from "../../../error";

// Mock AuthService
jest.mock("./auth.service");

// Helper functions to create mock request, response, and next
const mockNext = jest.fn();

const mockRequest = (body: any): Partial<Request> => ({
  body,
});

const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res) as any;
  res.json = jest.fn().mockReturnValue(res) as any;
  return res;
};

describe("AuthController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if email or password is missing", async () => {
    const req = mockRequest({ email: "", password: "password123" }) as Request;
    const res = mockResponse() as Response;

    await AuthController.signup(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Bad credentials" });
  });

  it("should return 400 if password is too short", async () => {
    const req = mockRequest({
      email: "user@example.com",
      password: "short",
    }) as Request;
    const res = mockResponse() as Response;

    (
      AuthService.signup as jest.Mock<typeof AuthService.signup>
    ).mockRejectedValueOnce(new BadRequest("Password is too short"));

    await AuthController.signup(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Password is too short" });
  });

  it("should return 201 if user is created successfully", async () => {
    const req = mockRequest({
      email: "user@example.com",
      password: "StrongPass1!",
    }) as Request;
    const res = mockResponse() as Response;

    (
      AuthService.signup as jest.Mock<typeof AuthService.signup>
    ).mockResolvedValueOnce(await Promise.resolve());

    await AuthController.signup(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "User created successfully",
    });
  });

  it("should call next with an InternalServerError if service layer fails", async () => {
    const req = mockRequest({
      email: "user@example.com",
      password: "StrongPass1!",
    }) as Request;
    const res = mockResponse() as Response;

    (
      AuthService.signup as jest.Mock<typeof AuthService.signup>
    ).mockRejectedValueOnce(new InternalServerError("Service layer error"));

    await AuthController.signup(req, res, mockNext);

    expect(mockNext).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "An unexpected error occurred. Please try again later",
      })
    );
  });
});
