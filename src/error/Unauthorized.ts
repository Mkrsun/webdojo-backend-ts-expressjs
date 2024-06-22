import CustomError from "./CustomError";

class Unauthorized extends CustomError {
  constructor(message: string) {
    super(message, 401);
  }
}

export default Unauthorized;
