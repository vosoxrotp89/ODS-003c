// middleware/adminOnly.js

const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "Admin") {
      next();
    } else {
      res.status(403).json({ message: "Access denied: Admins only" });
    }
  };
  
  module.exports = adminOnly;
  