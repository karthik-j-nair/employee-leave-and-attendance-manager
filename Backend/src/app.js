import express from "express";
import cookieParser from "cookie-parser";
import appRouter from "./routes/auth.route.js";
import leaveRouter from "./routes/leave.route.js";
import attendanceRouter from "./routes/attendace.route.js";
import cors from "cors";

const app = express();

/**
 * Middlewares
 */
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

/**
 * Routes
 */
app.use("/api/auth", appRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/attendance", attendanceRouter);

export default app;