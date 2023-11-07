import jwt from "jsonwebtoken";
import { userModel } from "../models/user-model.js";
export const middlewareGuard = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) res.status(401).json({ message: "Unauthorized" });

  const token = authorization;
  try {
    const { id } = jwt.verify(token, "secret");

    const user = userModel.findUserId(id);

    //*ESTA LINEA LO QUE HACE ES ASIGNARLE AL REQ UNA NUEVA PROPIEDAD USER QUE TIENE LOS DATOS DEL
    //*USUARIO LOGUEADO

    req.user = user;

    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};
