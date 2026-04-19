import mongooose from "mongoose";

const attendanceSchema = new mongooose.Schema({
    user: {
        type: mongooose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"]
    },
    date: {
        type: String,
        required: [true, "Date is required"]
    },
    status: {
        type: String,
        required: [true, "Status is required"],
        enum: ["present", "absent", "leave"]
    }
},
{
    timestamps: true
});

attendanceSchema.index({user: 1, date: 1}, {unique: true});

const attendanceModel = mongooose.model("attendanceModel", attendanceSchema);

export default attendanceModel;