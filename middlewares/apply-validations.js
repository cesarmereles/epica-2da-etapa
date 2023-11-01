import { validationResult } from "express-validator";

export const applyValidatios = (req, res, next) => {
  const errors = validationResult(req);
  //!errors.isEmpty() si no esta vacio no quiero que entres
  if (!errors.isEmpty()) {
    //BAD-REQUEST 400 MALAS PETICIONES
    return res.status(400).json(errors.array());
  }
  //--------------------------------------------
  next();
};
