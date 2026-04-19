import { Router } from "express";
import verifyUser from "../middlewares/auth.middleware.js";
import { dailyAttendance, getMyAttendance, getAllAttendance } from "../controllers/attendance.controller.js";

const attendanceRouter = Router();

/**
 * @route POST /api/attendance
 */
attendanceRouter.post("/", verifyUser, dailyAttendance);

/**
 * @route GET /api/attendance/my-attendance
 */
attendanceRouter.get("/my-attendance", verifyUser, getMyAttendance);

/**
 * @route GET /api/attendance/all-attendance/:userId
 * @access Admin only
 */
attendanceRouter.get("/all-attendance/:userId", verifyUser, getAllAttendance);

/**
 * @route GET /api/attendance/user-attendance
 * @access Admin only
 */
// attendanceRouter.get("/user-attendance", verifyUser, getUserAttendance);

export default attendanceRouter;