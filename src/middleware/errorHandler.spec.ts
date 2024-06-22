import { Request, Response, NextFunction } from "express";
import errorHandler from "./errorHandler";
import { CustomError, InternalServerError } from "../error";

describe("errorHandler middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should return the correct error response with a custom status code and message", () => {
    const customError = new CustomError("Custom error message", 400);

    errorHandler(customError, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Custom error message" });
    expect(next).toHaveBeenCalled();
  });

  it("should return a 500 status code and a default error message if none is provided", () => {
    const genericError = new InternalServerError("Internal Server Error");

    errorHandler(genericError, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    expect(next).toHaveBeenCalled();
  });

  it("should handle non-CustomError errors correctly", () => {
    const genericError = new Error("Some error");

    errorHandler(
      genericError as CustomError,
      req as Request,
      res as Response,
      next
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    expect(next).toHaveBeenCalled();
  });
});
