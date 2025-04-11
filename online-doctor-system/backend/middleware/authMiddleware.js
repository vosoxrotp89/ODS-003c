const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = (allowedRoles = []) => {
  return async (req, res, next) => {
    console.log("🔐 Middleware triggered");

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ No token or bad format");
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
      console.log("🔍 Verifying token");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        console.log("❌ User not found in DB");
        return res.status(401).json({ message: "Unauthorized: User not found" });
      }

      // ⛔ Blocked user check
      if (user.isBlocked) {
        console.log("🚫 Blocked user tried to access:", user.email);
        return res.status(403).json({ message: "Your account has been blocked. Access denied." });
      }

      // 🔒 Role check (case-insensitive)
      const normalizedAllowedRoles = allowedRoles.map(r => r.toLowerCase());
      const normalizedUserRole = user.role.toLowerCase();

      if (allowedRoles.length > 0 && !normalizedAllowedRoles.includes(normalizedUserRole)) {
        console.log(`🚫 Access denied for role "${user.role}". Allowed: ${allowedRoles.join(", ")}`);
        return res.status(403).json({ message: "Forbidden: You do not have permission to access this resource" });
      }

      console.log("✅ Auth passed for:", user.email);
      req.user = user;
      next();
    } catch (error) {
      console.log("❌ Token verification failed:", error.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

module.exports = authMiddleware;
