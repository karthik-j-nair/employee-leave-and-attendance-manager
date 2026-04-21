import express from "express";
import cookieParser from "cookie-parser";
import appRouter from "./routes/auth.route.js";
import leaveRouter from "./routes/leave.route.js";
import attendanceRouter from "./routes/attendace.route.js";
import cors from "cors";
import path from "path";

const app = express();

// Needed for ES modules (__dirname fix)
const __dirname = path.resolve();

/**
 * Middlewares
 */
app.use(cookieParser());
app.use(express.json());
if (process.env.NODE_ENV !== "production") {
  app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
  }));
}

app.use(express.static(path.join(__dirname, "public")));

/**
 * Routes
 */
app.use("/api/auth", appRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/attendance", attendanceRouter);


app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

export default app;