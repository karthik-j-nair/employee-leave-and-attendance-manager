import { Router } from "express";
import { userRegister, userLogin, userLogout, userGetMe, getEmployees } from "../controllers/auth.controller.js";
import verifyUser from "../middlewares/auth.middleware.js";

const authRouter = Router();

/**
 * @route POST /api/auth/register
 */
authRouter.post("/register", userRegister);

/**
 * @route POST /api/auth/login
 */
authRouter.post("/login", userLogin);

/**
 * @route GET /api/auth/logout
 */
authRouter.post("/logout", userLogout);

/**
 * @route GET /api/auth/me
 */
authRouter.get("/me", verifyUser, userGetMe);

/**
 * @route GET /api/auth/employees
 */
authRouter.get("/employees", verifyUser, getEmployees);

export default authRouter;