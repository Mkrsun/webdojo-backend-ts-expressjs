import CustomError from "./CustomError";

class NotFound extends CustomError {
  constructor(message: string) {
    super(message, 404);
  }
}

export default NotFound;
