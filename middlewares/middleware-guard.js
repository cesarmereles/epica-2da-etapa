import jwt from "jsonwebtoken"
import {userModel} from "../models/user-model.js"
export const middlewareGuard = (req, res, next) => {
    const { authorization } = req.headers;
  
    if (!authorization) res.status(401).json({ message: "Unauthorized" });

    const token = authorization
  try {
    const {id}=jwt.verify(token, "secret")
    const user=userModel.findUserId(id)
    next();
  
  } catch (error) {
    return res.sendStatus(401)
  }

};
