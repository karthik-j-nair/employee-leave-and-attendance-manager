import { Router } from "express";
import verifyUser from "../middlewares/auth.middleware.js";
import { applyLeave, getMyLeaves, editLeaveStatus, getAllPendingLeaves, responseLeaveStatus } from "../controllers/leave.controller.js";

const leaveRouter = Router();

/**
 * @route POST /api/leave
 */
leaveRouter.post("/", verifyUser, applyLeave);

/**
 * @route GET /api/leave/my-leaves
 */
leaveRouter.get("/my-leaves", verifyUser, getMyLeaves);

/**
 * @route PATCH /api/leave/:leaveId
 */
leaveRouter.patch("/:leaveId", verifyUser, editLeaveStatus);

/** 
 * @route GET /api/leave/all-peinding-leaves
*/
leaveRouter.get("/all-pending-leaves", verifyUser, getAllPendingLeaves);

/**
 * 
 */
leaveRouter.patch("/:leaveId/status", verifyUser, responseLeaveStatus);

export default leaveRouter;
