import cron from "node-cron";
import attendanceModel from "../models/attendance.model.js";
import userModel from "../models/auth.model.js";

cron.schedule("0 17 * * *", async () => {

    try {

        const today = new Date().toISOString().split("T")[0];
        const day = new Date().getDay();

        if (day === 0 || day === 6) {
            return;
        }

        const users = await userModel.find({ role: "employee" });

        for (const user of users) {
            const isMarked = await attendanceModel.findOne({ user: user._id, date: today });

            if (!isMarked) {
                await attendanceModel.create({
                    user: user._id,
                    date: today,
                    status: "absent"
                });
            }
        }
    }
    catch (error) {
        console.error("Error in cron:", error);
    }

})