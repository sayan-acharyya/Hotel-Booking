 // middlewares/isOwner.js
export const isOwner = (req, res, next) => {
  try {
    // req.user is already set from isAuthenticated middleware
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized, please login" });
    }

    if (req.user.role !== "owner") {
      return res.status(403).json({ message: "Access denied, only owners can perform this action" });
    }

    next();
  } catch (error) {
    console.error("isOwner middleware error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
