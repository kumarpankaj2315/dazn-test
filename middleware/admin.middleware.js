export function isAdmin(req, res, next) {
  let isadmin = false;
  if (req.query && req.query.isAdmin) {
    isadmin = true;
  }

  if (isAdmin) {
    next();
  } else {
    res.status(403).send({ message: "Not Authorized" });
  }
}
