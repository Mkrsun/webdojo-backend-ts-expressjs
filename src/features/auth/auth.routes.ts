import { Router } from "express";
import AuthController from "./controller/auth.controller";

const authRouter = Router();

authRouter.get("/signup", AuthController.signup);

export default authRouter;
