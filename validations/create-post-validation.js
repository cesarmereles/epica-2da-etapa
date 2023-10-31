import {body} from "express-validator"
export const validator = [
    body("title")
      .notEmpty()
      .withMessage("El titulo es requerido")
      .isString()
      .withMessage("El titulo tiene que ser un string"),
    body("description").notEmpty().withMessage("Debe ingresar una descripción"),
    body("image").notEmpty().isURL(),
  ]