import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

// Middleware
import errorHandler from "./middleware/errorHandler";
import { authRateLimiter } from "./middleware/authRateLimiter";

import authRouter from "./features/auth/auth.routes";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Usa tus rutas con limitación de velocidad
app.use("/auth", authRateLimiter, authRouter);

// Middleware de manejo de errores
app.use(errorHandler);

export default app;
