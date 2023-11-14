import { connect } from "mongoose";
import { env } from "../setting/envs.js";

export const startConnection = async () => {
  try {
    const db = await connect(env.MONGO_URI);
    console.log(`DB es conectada a ${db.connection.name}`);
  } catch (error) {
    console.log(error);
  }
};
