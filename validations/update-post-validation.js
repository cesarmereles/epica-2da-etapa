import { body, param } from "express-validator";
export const updatePostValidate = [
  param("postID").isNumeric().withMessage("La id debe ser un numero").toInt(),
  body("title")
    .optional()
    .isString()
    .withMessage("El titulo tiene que ser un string"),
  body("description").optional(),
  body("image").optional().isURL().withMessage("la imagen debe ser una URL"),
];
