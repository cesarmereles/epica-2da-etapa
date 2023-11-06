export const middlewareGuard = (req, res, next) => {
  //const { isAdmin } = req.body;
  const { isadmin } = req.headers;
  if (!isadmin) res.status(401).json({ message: "Unauthorized" });
  next();
};
