const { requireAuth, clerkClient } = require("@clerk/express");

const clerkAuthMiddleware = requireAuth({
  onMissingAuth: (req, res) => {
    res.status(401).json({
      error: true,
      message: "Authentication token is missing. Please provide a valid token.",
    });
  },
  onError: (err, req, res, next) => {
    console.error("Clerk authentication error:", err);
    res.status(401).json({
      error: true,
      message: "Invalid or expired authentication token.",
    });
  },
});

const verifyUser = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // Check if Authorization header is present
  if (!authHeader) {
    return res.status(401).json({
      error: true,
      message: "Authorization header is missing. Please include a valid token.",
    });
  }

  const token = authHeader.split(" ")[1]; // Extract token after "Bearer"
  if (!token) {
    return res.status(401).json({
      error: true,
      message: "Bearer token is missing in the Authorization header.",
    });
  }

  // Proceed with Clerk middleware to validate the token
  try {
    await clerkAuthMiddleware(req, res, next);
  } catch (error) {
    next(error);
  }
};

// Uncomment this code to not use admin verify or middleware
// const verifyUser = (req, res, next) => {
//     return next();
// }

module.exports = verifyUser;
