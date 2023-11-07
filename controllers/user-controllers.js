import { userModel } from "../models/user-model.js";
import jwt from "jsonwebtoken"

//*ACA SE VA A REALIZAR UN REGISTRO Y UN LOGEO
export const ctrlRegister = async (req, res) => {
  const newUser = await userModel.create(req.body)

  //!SI EL USUARIO NO SE CREO DEVUELVO UN STATUS(400)
  if(!newUser) return res.sendStatus(400)

  //*SI EL USUARIO SE CREO CORRECTAMENTE LO QUE DEVUELVO ES UN TOKEN 
  const token = jwt.sign({id:newUser.id}, "secret")
  res.status(201).json({token})
};
export const ctrlLogin = async (req, res) => {
  const {email, password} = req.body
  
  //*SI EL USUARIO EL VALIDO 
  const user= await userModel.findUserEmail(email)
  if(!user) return res.sendStatus(404)

  //!PREGUNTO SI EL PASSORD PASADO POR EL BODY ES DISTINTO 
  if(user.password!==password) return res.sendStatus(404)

  //*SI PASO EL CONTROL DEL PASSWORD GENERO UN TOKEN
  const token = jwt.sign({id:user.id}, "secret")
  res.status(201).json({token})
  
};
