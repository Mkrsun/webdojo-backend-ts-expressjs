import mysql from "mysql2/promise";
import { roConfig, rwConfig } from "./mysql.config";

// Create read-only pool
export const MysqlPoolRO = mysql.createPool(roConfig);

// Create read-write pool
export const MysqlPoolRW = mysql.createPool(rwConfig);
