function userAuthenticate(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "No token provided - User auth" });
  }

  return next();
}

module.exports = userAuthenticate;
