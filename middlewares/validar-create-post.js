//TODO MIDDLEWARE PERSONALIZADO
export const validarPost = (req, res, next) => {
  if (req.url === "/post" && req.method === "POST") {
    if (!req.body.title) return res.status(400).send("Error:title es required");
    if (!req.body.description)
      return res.status(400).send("Error:description es required");
    if (!req.body.image) return res.status(400).send("Error:image es required");
  }
  next();
};
