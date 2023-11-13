import { userModel } from "../models/user-model.js";
import { env } from "../setting/envs.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//*ACA SE VA A REALIZAR UN REGISTRO Y UN LOGEO
export const ctrlRegister = async (req, res) => {
  //!AGREGAR TRYCATCH
  const newUser = await userModel.create(req.body);

  //TODO SI EL USUARIO NO SE CREO DEVUELVO UN STATUS(400)
  if (!newUser) return res.sendStatus(400);

  //*SI EL USUARIO SE CREO CORRECTAMENTE LO QUE DEVUELVO ES UN TOKEN
  const token = jwt.sign({ id: newUser.id }, env.JWT_SECRET);
  res.status(201).json({ token });
};

//*ESTE METODO SE EJECUTA SI EL USUARIO YA ESTA CREADO
export const ctrlLogin = async (req, res) => {
  //!AGREGAR TRYCATCH
  const { email, password } = req.body;

  //*SI EL USUARIO EL VALIDO
  const user = await userModel.findUserEmail(email);
  if (!user) return res.sendStatus(404);

  //TODO COMPARO EL PASSWORD ENCRIPTADO AYUDANDOME DE UNA LIBRERIA
  const isMatch = await bcrypt.compare(password, user.password);

  //TODO PREGUNTO SI EL PASSORD PASADO POR EL BODY ES DISTINTO
  if (!isMatch) return res.sendStatus(404);

  //*SI PASO EL CONTROL DEL PASSWORD GENERO UN TOKEN
  const token = jwt.sign({ id: user.id }, env.JWT_SECRET);
  res.status(201).json({ token });
};
