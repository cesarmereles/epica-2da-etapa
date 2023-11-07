import { userModel } from "../models/user-model.js";

//*ACA SE VA A REALIZAR UN REGISTRO Y UN LOGEO
export const ctrlRegister = async (req, res) => {
  const { name, email, password } = req.body;

  res.send("Register");
};
export const ctrlLogin = async (req, res) => {
  res.send("Login");
};
