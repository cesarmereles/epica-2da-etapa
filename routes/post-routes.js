import { Router } from "express";

import {
  ctrolCreatePost,
  ctrolDeleteById,
  ctrolGetAllPost,
  ctrolGetByID,
  ctrolUpdatePostById,
} from "../controllers/post-controllers.js";
import { handlerException } from "../middlewares/handler-exceptions.js";

//!importamos de express-validator la propiedad BODY
import { body } from "express-validator";

import { validator } from "../validations/create-post-validation.js";
import { applyValidatios } from "../middlewares/apply-validations.js";
import { validationID } from "../validations/find-post-validation.js";
import { updatePostValidate } from "../validations/update-post-validation.js";

const postRouter = Router();

//*ESTA ES PARA OBTENER TODOS LOS POST
postRouter.get("/", ctrolGetAllPost, handlerException);

//*ESTA RUTA ES PARA OBTENER UN SOLO REGISTRO X ID
postRouter.get("/:postID", validationID, applyValidatios, ctrolGetByID);

//*ESTA RUTA ES PARA CREAR UN NUEVO POST Y APLICA VALIDACIONES
postRouter.post("/", validator, applyValidatios, ctrolCreatePost);

//**ESTO RUTA ES PARA EL UPDATE
postRouter.patch(
  "/:postID",
  updatePostValidate,
  applyValidatios,
  ctrolUpdatePostById
);

//*ESTO PARA ELIMINAR
postRouter.delete("/:postID", validationID, applyValidatios, ctrolDeleteById);

export { postRouter };
