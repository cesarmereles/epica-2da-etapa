import { param } from "express-validator";
export const validationID = [
  param("postID").isString().withMessage("Debe ser un valor numerico"),
  //param("postID").isNumeric().withMessage("Debe ser un valor numerico").toInt(),
];

//* toInt: cambia a un entero
