const protect = (req, res, next) => {
  if (req.session && req.session.userId) {
    req.user = req.session.userId;
    next();
  } else {
    return res.status(401).json({ message: "Not authorized, no session" });
  }
};

module.exports = protect;
