import { config } from "dotenv";

config();

export const env = {
  PORT: process.env.PORT || 3000,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  MONGO_URI: process.env.MONGO_URI,
};
