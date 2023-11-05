let posts = [
  {
    id: Date.now(),
    title: "Seguridad Informática",
    description: "curso sobre seguridad informática y virus informáticos",
    image: "https://blog.hubspot.es/hubfs/media/queesseguridadinformatica.jpeg",
  },
];

const createNewPost = ({ title, description, image }) => {
  if (!title) return null;
  const newPost = { id: Date.now(), title, description, image };
  posts.push(newPost);

  return newPost;
};

//*CREAMOS UN METODO PARA OBTENER TODA LA LISTA
const getAllPost = () => {
  return [...posts];
};

//*METODO PARA OBTENER UN SOLO POST
const getOnePostByID = ({ id }) => {
  //!DEBO CONVERTIR PRIMERO EL OBJ ID PARA PODER COMPARAR PORQUE SI NO ENVIA STRING
  const post = posts.find((post) => post.id === id);

  return post;
};

//* BUSCAR UN ID Y SI ENCUENTRA EDITAR
const findPostIdUpdate = (id, postEdit) => {
  const post = getOnePostByID({ id });
  if (!post) return null;
  posts = posts.map((post) => {
    if (post.id === id) {
      //*SU EL ID SON IGUALES
      if (postEdit.title) post.title = postEdit.title;
      if (postEdit.description) post.description = postEdit.description;
      if (postEdit.image) post.image = postEdit.image;

      return post;
    }
    return post;
  });
  //*ACA RETORNAMOS LA NUEVA INFORMACION
  return { ...post, ...postEdit };
};

//* BUSCAR UN ID Y SI ENCUENTRA ELIMINAR
const findPostIdDelete = ({ id }) => {
  posts = posts.filter((post) => post.id !== id);
};

export const postModel = {
  create: createNewPost,
  findAll: getAllPost,
  findOne: getOnePostByID,
  update: findPostIdUpdate,
  delete: findPostIdDelete,
};
