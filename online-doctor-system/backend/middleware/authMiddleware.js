const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = (allowedRoles = []) => {
  return async (req, res, next) => {
    console.log("🔐 Middleware triggered"); // ✅ Add log

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ No token or bad format"); // ✅ Add log
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try {
      console.log("🔍 Verifying token"); // ✅ Add log
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        console.log("❌ User not found in DB"); // ✅ Add log
        return res.status(401).json({ message: "User not found" });
      }

      if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        console.log("🚫 Access denied for role:", user.role); // ✅ Add log
        return res.status(403).json({ message: "Forbidden: Access denied" });
      }

      console.log("✅ Auth passed for:", user.email); // ✅ Add log
      req.user = user;
      next();
    } catch (error) {
      console.log("❌ Token failed:", error.message); // ✅ Add log
      return res.status(401).json({ message: "Token failed or expired" });
    }
  };
};

module.exports = authMiddleware;
