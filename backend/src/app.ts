import express from "express";
import cors from "cors";

import parentRoutes from "./routes/parentRoutes";
import mentorRoutes from "./routes/mentorRoutes";
import bookingRoutes from "./routes/bookingRoutes";

const app = express();

app.use(cors({ origin: true }));

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "CodeYoung booking API is running",
  });
});

app.use("/api/parents", parentRoutes);
app.use("/api/mentors", mentorRoutes);
app.use("/api/bookings", bookingRoutes);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

export default app;