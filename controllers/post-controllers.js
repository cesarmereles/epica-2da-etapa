// process.exit(1)
import { postModel } from "../models/post-model.js";

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
    next("No hay Post");
  }
};

//*CREA NUEVOS POST
export const ctrolCreatePost = async (req, res, next) => {
  try {
    const { title, description, image } = req.body;

    //*CREATENEWPOST ES UN METODO QUE VIENE DEL POST-MODEL.JS
    await postModel.create({ title, description, image });

    res.sendStatus(201);
  } catch (error) {
    console.log("Error:", error);
    next("Error").sendStatus(500);
  }
};

//*CREAMOS UN CONTROLADOR PARA OBTENER UN ID
export const ctrolGetByID = (req, res) => {
  //console.log(req.params);
  const { postID } = req.params;
  console.log(req.params);
  const posts = postModel.findOne({ id: postID });
  if (!posts) {
    return res.sendStatus(404);
  }

  res.status(200).json(posts);
};

//*EDITAR
export const ctrolUpdatePostById = (req, res) => {
  const { postID } = req.params;
  const { title, description, image } = req.body;
  const updatePost = postModel.update(postID, { title, description, image });

  //!SI NO RETORNA NADA
  if (!updatePost) return res.sendStatus(404);
  res.sendStatus(200);
};

//*ELIMINAR
export const ctrolDeleteById = (req, res) => {
  const { postID } = req.params;
  postModel.delete({ id: postID });
  res.sendStatus(200);
};
