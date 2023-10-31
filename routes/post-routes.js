import { Router } from "express";
import {
  ctrolCreatePost,
  ctrolGetAllPost,
} from "../controllers/post-controllers.js";
import { handlerException } from "../middlewares/handler-exceptions.js";

const postRouter = Router();

//**CTROL + ESPACIO */
postRouter.get("/", ctrolGetAllPost, handlerException);
postRouter.post("/", ctrolCreatePost);

export { postRouter };
