import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"]
    },
    leaveType: {
        type: String,
        enum: ["sick", "casual", "earned"],
        required: [true, "Leave type is required"]
    },
    startDate: {
        type: Date,
        required: [true, "Start date is required"]
    },
    endDate: {
        type: Date,
        required: [true, "End date is required"]
    },
    totalDays: {
        type: Number,
        required: [true, "Total days is required"]
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
        required: [true, "Status is required"]
    },
    appliedDate: {
        type: Date,
        default: Date.now
    },
    reason: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

const leaveModel = mongoose.model("Leave", leaveSchema);

export default leaveModel;