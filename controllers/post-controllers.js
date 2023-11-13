// process.exit(1)
import { postModel } from "../models/post-model.js";

//*CREA NUEVOS POST
export const ctrolCreatePost = async (req, res, next) => {
  try {
    const { title, description, image } = req.body;

    //*CREATENEWPOST ES UN METODO QUE VIENE DEL POST-MODEL.JS
    const newPost = await postModel.create({ title, description, image });

    res.status(201).json(newPost);
  } catch (error) {
    console.log("Error:", error);
    res.sendStatus(500);
  }
};

//*LISTA TODOS LOS POST - GET
export const ctrolGetAllPost = async (req, res, next) => {
  try {
    const posts = await postModel.findAll();
    if (posts.length < 1) {
      return res.sendStatus(204);
    }
    res.json(posts);
  } catch (error) {
    console.log("Error:", error);
    // next("No hay Post");
    res.sendStatus(500);
  }
};

//*CREAMOS UN CONTROLADOR PARA OBTENER UN ID
export const ctrolGetByID = async (req, res) => {
  try {
    const { postID } = req.params;
    const posts = await postModel.findByPk(postID);
    if (!posts) {
      return res.sendStatus(404);
    }

    res.status(200).json(posts);
  } catch (error) {
    console.log("Error:", error);
    res.sendStatus(500);
  }
};

//*EDITAR
export const ctrolUpdatePostById = async (req, res) => {
  const { postID } = req.params;
  const { title, description, image } = req.body;
  const posts = postModel.findByPk(postID);
  await posts.update({ title, description, image });

  //!SI NO RETORNA NADA
  if (!updatePost) return res.sendStatus(404);
  res.status(200).json(posts);
};

//*ELIMINAR
export const ctrolDeleteById = async (req, res) => {
  const { postID } = req.params;
  const posts = postModel.findByPk(postID);
  //postModel.delete({ id: postID });
  await posts.detroy();
  res.sendStatus(204);
};
