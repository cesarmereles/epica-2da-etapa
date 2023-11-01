import { Router } from "express";
import {
  ctrolCreatePost,
  ctrolGetAllPost,
} from "../controllers/post-controllers.js";
import { handlerException } from "../middlewares/handler-exceptions.js";
import { body } from "express-validator";
import { validator } from "../validations/create-post-validation.js";

const postRouter = Router();

//**CTROL + ESPACIO */
postRouter.get("/", ctrolGetAllPost, handlerException);
postRouter.post("/", validator, ctrolCreatePost);

export { postRouter };
