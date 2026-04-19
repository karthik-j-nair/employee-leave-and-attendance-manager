import userModel from "../models/auth.model.js";
import jwt from "jsonwebtoken";

/**
 * registers a new user
 * @route POST /api/auth/register
 * @param {string} username - The username of the user
 * @param {string} email - The email of the user
 * @param {string} password - The password of the user
 * @param {string} role - The role of the user (optional, default is "user")
 */
async function userRegister(req, res) {
    const { username, email, password, role, dateOfJoining } = req.body;

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists",
                status: "false"
            });
        }

        const newUser = await userModel.create({ username, email, password, role, dateOfJoining });


        // const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // res.cookie("token", token);

        res.status(201).json({ message: "User registered successfully", success: "true" });
    } catch (error) {
        res.status(500).json({ message: "User registration failed", error: error.message });
    }

}

/**
 * logs in a user
 * @route POST /api/auth/login
 * @param {string} email - The email of the user
 * @param {string} password - The password of the user
 */
async function userLogin(req, res){
    const {email, password} = req.body;

    try {
        const user = await userModel.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.cookie("token", token);

        res.status(200).json({ message: "User logged in successfully", user: { id: user._id, username: user.username, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: "User login failed", error: error.message });
    }

}

/**
 * logs out a user
 * @route GET /api/auth/logout
 */
async function userLogout(req, res) {
    res.clearCookie("token");
    //we can also invalidate the token on the server side by maintaining a blacklist of tokens, but for simplicity, we are just clearing the cookie here.
    res.status(200).json({ message: "User logged out successfully" });
}

/**
 * Retrieves the profile of the authenticated user
 * @route GET /api/auth/me
 */
async function userGetMe(req, res) {
    const user = req.user;
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User found", user });
}

/**
 * Retrieves a list of all employees only for admin users
 * @route GET /api/auth/employees
 */
async function getEmployees(req, res) {

    const user = req.user;
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }

    try {
        const employees = await userModel.find({ role: "employee" });
        res.status(200).json({ message: "Employees found", employees });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch employees", error: error.message });
    }
}

export { userRegister, userLogin, userLogout, userGetMe, getEmployees }