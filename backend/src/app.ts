import express from "express";
import cors from "cors";

import parentRoutes from "./routes/parentRoutes";
import mentorRoutes from "./routes/mentorRoutes";
import bookingRoutes from "./routes/bookingRoutes";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://codeyoung-trial-booking-pink.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an origin, such as Postman or server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "CodeYoung booking API is running",
  });
});

// Temporary deployment test
app.get("/api/test", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "New backend code is deployed",
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