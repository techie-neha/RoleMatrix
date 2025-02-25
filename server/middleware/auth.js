const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();
//middleware for authentication
exports.auth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.body.token || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ success: false, message: "Token Missing" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            //  user from DB to verify role
            const userDetails = await User.findById(decoded.userId);
            if (!userDetails) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            req.user.role = userDetails.role;
            next();
        } catch (error) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Authentication failed" });
    }
};
// Admin  middleware
exports.isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }
    next();
};

// standard user access middleware (for non-admins)
exports.isUserOrOther = (req, res, next) => {
    if (req.user.role === "admin") {
        return res.status(403).json({ success: false, message: "Access denied. Admins cannot access this route." });
    }
    next();
};
