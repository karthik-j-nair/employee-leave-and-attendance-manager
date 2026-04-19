import attendanceModel from "../models/attendance.model.js";
import userModel from "../models/auth.model.js";


/**
 * Marks daily attendance for an employee
 * @route POST /api/attendance
 */
async function dailyAttendance(req, res) {
    const user = req.user;
    const userId = req.user._id;

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (user.role !== "employee") {
        return res.status(403).json({ message: "Forbidden: Only employees can mark attendance" });
    }

    // const day = new Date().getDay();
    

    // if (day === 0 || day === 6) {
    //     return res.status(400).json({ message: "Attendance cannot be marked on weekends" });
    // }

    const today = new Date().toISOString().split("T")[0];


    const isAlreadyMarked = await attendanceModel.findOne({ user: userId, date: today });

    if (isAlreadyMarked) {
        return res.status(400).json({ message: "Attendance already marked for today" });
    }

    const newAttendance = await attendanceModel.create({
        user: userId,
        date: today,
        status: "present"
    });

    return res.status(201).json({ message: "Attendance marked successfully" });

}

/**
 * Retrieves attendance records for the authenticated employee
 * @route GET /api/attendance/my-attendance
 */
async function getMyAttendance(req, res) {
    const userId = req.user._id;
    const user = req.user;

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "employee") {
        return res.status(403).json({ message: "Only employees can view their attendance" });
    }

    try {
        const attendance = await attendanceModel.find({ user: userId });
        res.status(200).json({ message: "Attendance retrieved successfully", attendance });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving attendance", error });
    }

}

/**
 * Retrieves all attendance records (admin only)
 * @route GET /api/attendance/all-attendance/:userId
 * @access Admin only
 */
async function getAllAttendance(req, res) {
    const user = req.user;
    const userId = req.params.userId;

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden: Only admins can view all attendance records" });
    }

    try {
        const attendance = await attendanceModel.find({ user: userId }).sort({ date: -1 }).populate("user", "username email");
        res.status(200).json({ message: "All attendance records retrieved successfully", attendance });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving all attendance records", error });
    }

}

export { dailyAttendance, getMyAttendance, getAllAttendance };
