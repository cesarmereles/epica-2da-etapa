import { Router } from "express";
import {
  ctrolCreatePost,
  ctrolGetAllPost,
} from "../controllers/post-controllers.js";
import { handlerException } from "../middlewares/handler-exceptions.js";

//!importamos de express-validator la propiedad BODY
import { body } from "express-validator";

import { validator } from "../validations/create-post-validation.js";
import { applyValidatios } from "../middlewares/apply-validations.js";

const postRouter = Router();

//**CTROL + ESPACIO */
postRouter.get("/", ctrolGetAllPost, handlerException);
//postRouter.post("/", validator, verificarValidaciones, ctrolCreatePost);
postRouter.post("/", validator, applyValidatios, ctrolCreatePost);

export { postRouter };
