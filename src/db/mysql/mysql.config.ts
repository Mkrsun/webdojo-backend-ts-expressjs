import * as dotenv from "dotenv";
dotenv.config();

export const roConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT!, 10),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

export const rwConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT!, 10),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};
