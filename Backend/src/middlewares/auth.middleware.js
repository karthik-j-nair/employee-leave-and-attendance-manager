import jwt from "jsonwebtoken";
import userModel from "../models/auth.model.js";

async function verifyUser(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided.", status: "false" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await userModel.findById(decoded.id);
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token.", status: "false" });
    }
}

export default verifyUser;