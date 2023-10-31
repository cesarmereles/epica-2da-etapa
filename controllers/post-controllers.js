// process.exit(1)
import { posts } from "../models/post-model.js";
import {validationResult} from "express-validator"
export const ctrolGetAllPost = (req, res, next) => {
  //res.status(200).send('metodo GET')
  try {
    //throw new Error("No hay post")
    //!SI EL POST ENVIADO NO CONTIENE DATOS DEVUELVE 204 SIN CONTENIDO
    if (posts.length < 1) {
      return res.sendStatus(204);
    }
    
    res.status(200).json(posts);
  } catch (error) {
    console.log("Error:", error);
    next("No hay Post");
  }
};

//!si hay un error debe ir al manejador de errores

export const ctrolCreatePost = (req, res, next) => {
  const { title, description, image } = req.body;
  
  //-------------------------------
  //!OJO LINEA AGREGADA
  const errors = validationResult(req)
  if(errors){
    return res.status(400).json(errors)
  }
  //-------------------------------
  
  const newPost = {
    title,
    description,
    image,
  };
  posts.push(newPost);

  res.sendStatus(201);
};
//forma tipo commonjs
//export {miFuncion}
