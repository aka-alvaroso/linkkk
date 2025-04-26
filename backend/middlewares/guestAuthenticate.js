function guestAuthenticate(req, res, next) {
  const guestToken = req.cookies.guestToken;

  if (!guestToken) {
    return res.status(401).json({ error: "No token provided - Guest auth" });
  }

  return next();
}

module.exports = guestAuthenticate;
