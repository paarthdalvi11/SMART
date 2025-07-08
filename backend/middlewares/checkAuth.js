const jwt = require("jsonwebtoken");

async function checkAuth(req, res, next) {
  try {
    console.log("Cookies:", req.cookies); // Debug cookies
    console.log("Headers:", req.headers.authorization); // Debug headers

    const token = req.cookies?.token; // Extract token from cookies

    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ error: "Unauthorized: No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded User:", decoded); // Debug decoded user

    req.user = decoded; // Attach decoded user to request
    next();
  } catch (e) {
    console.error("Auth Error:", e);
    return res.status(401).json({ error: "Unauthorized: Invalid Token" });
  }
}

module.exports = checkAuth;