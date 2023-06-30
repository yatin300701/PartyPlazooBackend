"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        // console.log("no token");
        return res.status(401).json({ error: "No token provided" });
    }
    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.Token);
        console.log("decoded", decoded);
        // Add the decoded user data to the request object
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};
exports.authMiddleware = authMiddleware;
