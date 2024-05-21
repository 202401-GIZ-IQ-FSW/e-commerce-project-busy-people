const Admin = require('../models/admin');


exports.isAdmin = (req, res, next) => {
  console.log(req.cookies.userId) 
  //const admin = await Admin.findById(req.cookies.userId)
  if (req.cookies.userId) {
    return next();
  } else {
    return res.status(403).json({ message: "Admin authorization required" });
  }
};
