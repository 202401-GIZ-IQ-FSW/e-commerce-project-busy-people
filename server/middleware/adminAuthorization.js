exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin === true) {
      return next();
  } else {
      return res.status(403).json({ message: "Admin authorization required" });
  }
};
