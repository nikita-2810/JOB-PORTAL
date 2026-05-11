import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // 🔥 FIXED KEY (must match login token)
    req.id = decoded.userId;

    next();
  } catch (error) {
    console.log("AUTH ERROR:", error);

    return res.status(401).json({
      message: "Invalid token",
      success: false,
    });
  }
};