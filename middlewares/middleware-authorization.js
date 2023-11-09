//*ESTO ES UN MIDDLEWARE DE AUTORIZACION
export const middlewareAutorization = (req, res, next) => {
  if (!req.user.isAdmin)
    return res
      .status(401)
      .send(`Unauthorized, user: ${req.user.name}  is not admin`);
  next();
};
