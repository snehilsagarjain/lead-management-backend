const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // user._id, user.role, etc.
        next();
    } catch (err) {
        return res.status(403).json({ message: "Token Invalid" });
    }
};

module.exports = authMiddleware;
