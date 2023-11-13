import { config } from "dotenv";

config();

export const env = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  DB: {
    HOST: process.env.DB_HOST || "localhost",
    USER: process.env.DB_USER,
    PASS: process.env.DB_PASS,
    PORT: process.env.DB_PORT || 3306,
    NAME: process.env.DB_NAME,
  },
};
