import CustomError from "./CustomError";

class InternalServerError extends CustomError {
  constructor(message: string) {
    super(message, 500);
  }
}

export default InternalServerError;
