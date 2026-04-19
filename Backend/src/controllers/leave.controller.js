import leaveModel from "../models/leave.model.js";
import userModel from "../models/auth.model.js";
import attendanceModel from "../models/attendance.model.js";


/**
 * Applies for a leave request
 * @route POST /api/leave
 */
async function applyLeave(req, res) {
    const { leaveType, startDate, endDate, reason } = req.body;
    const userId = req.user._id;
    const user = req.user;

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "employee") {
        return res.status(403).json({ message: "Only employees can apply for leave" });
    }

    if (new Date(startDate) < new Date()) {
        return res.status(400).json({ message: "Start date cannot be in the past" });
    }

    if (new Date(endDate) < new Date(startDate)) {
        return res.status(400).json({ message: "End date cannot be before start date" });
    }

    const isAlreadyApplied = await leaveModel.findOne({
        user: userId,
        $or: [
            {
                startDate: { $lte: new Date(endDate) },
                endDate: { $gte: new Date(startDate) }
            }
        ]
    });

    if (isAlreadyApplied) {
        return res.status(400).json({ message: "Leave application already exists for the selected period" });
    }


    try {
        const totalDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1;
        const leave = await leaveModel.create({
            user: userId,
            leaveType,
            startDate,
            endDate,
            totalDays,
            reason
        });
        res.status(201).json({ message: "Leave applied successfully", leave, leaveId: leave._id });
    } catch (error) {
        res.status(500).json({ message: "Error applying leave", error });
    }
}

/**
 * Retrieves the leave applications for the authenticated user
 * @route GET /api/leave/my-leaves
 */
async function getMyLeaves(req, res) {
    const user = req.user;
    const userId = user._id;

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "employee") {
        return res.status(403).json({ message: "Only employees can view their leaves" });
    }

    try {
        const leaves = await leaveModel.find({ user: userId }).populate("user", "name email");
        res.status(200).json({ message: "Leaves retrieved successfully", leaves });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving leaves", error });
    }
}

/**
 * Edit the status of a leave application
 * @route PATCH /api/leave/:leaveId
 */
async function editLeaveStatus(req, res) {
    const { leaveId } = req.params;
    const { reason, startDate, endDate, cancel, leaveType } = req.body;
    const user = req.user;

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "employee") {
        return res.status(403).json({ message: "Only employees can edit their leave applications" });
    }

    if (cancel && new Date(startDate) < new Date()) {
        return res.status(400).json({ message: "Cannot cancel a leave that has already started" });
    }



    try {
        const leave = await leaveModel.findById(leaveId);

        if (!leave) {
            return res.status(404).json({ message: "Leave application not found" });
        }

        if (leave.user.toString() !== user._id.toString()) {
            return res.status(403).json({ message: "You are not the owner of this leave application" });
        }

        if (cancel === true && new Date(startDate) < new Date()) {
            return res.status(400).json({ message: "Cannot cancel a leave that has already started" });
        }

        if (cancel === true && leave.status !== "pending") {
            return res.status(400).json({ message: "Only pending leave applications can be cancelled" });
        }


        if (cancel === true) {
            if (new Date(leave.startDate) < new Date()) {
                return res.status(400).json({ message: "Cannot cancel started leave" });
            }

            if (leave.status !== "pending") {
                return res.status(400).json({ message: "Only pending can be cancelled" });
            }

            await leaveModel.findByIdAndDelete(leaveId);
            return res.status(200).json({ message: "Leave cancelled successfully" });
        }

        // Update the leave application
        Object.assign(leave, { reason, startDate, endDate, cancel, leaveType });
        await leave.save();

        res.status(200).json({ message: "Leave application updated successfully", leave });
    } catch (error) {
        res.status(500).json({ message: "Error updating leave application", error });
    }
}

/**
 * Retrieves all leave applications (for admin users)
 * @route GET /api/leave/all-pending-leaves 
 */
async function getAllPendingLeaves(req, res) {
    const user = req.user;

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }

    try {
        const leaves = await leaveModel.find({ status: "pending" }).populate("user", "username email");
        res.status(200).json({ message: "Leaves retrieved successfully", leaves });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving leaves", error });
    }
}

/**
 * Responds to a leave application status update
 * @route PATCH /api/leave/:leaveId/status
 */
async function responseLeaveStatus(req, res) {
    const { leaveId } = req.params;
    const { status } = req.body;
    const user = req.user;
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    if (!["approved", "rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status. Must be 'approved' or 'rejected'." });
    }



    try {
        const leave = await leaveModel.findById(leaveId);
        if (!leave) {
            return res.status(404).json({ message: "Leave application not found" });
        }

        const employee = await userModel.findById(leave.user);

        if (employee.leaveBalance < leave.totalDays) {
            return res.status(400).json({ message: "Employee does not have enough leave balance" });
        }

        if (status === "approved") {
            employee.leaveBalance -= leave.totalDays;
            await employee.save();
        }

        leave.status = status;
        await leave.save();

        res.status(200).json({ message: "Leave application status updated successfully", leave });
    } catch (error) {
        res.status(500).json({ message: "Error updating leave application status", error });
    }

}

export { applyLeave, getMyLeaves, editLeaveStatus, getAllPendingLeaves, responseLeaveStatus };