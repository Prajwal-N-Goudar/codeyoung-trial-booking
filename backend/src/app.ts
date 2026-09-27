import express from "express";
import cors from "cors";

import parentRoutes from "./routes/parentRoutes";
import mentorRoutes from "./routes/mentorRoutes";
import bookingRoutes from "./routes/bookingRoutes";

const app = express();

// =======================================
// CORS
// =======================================

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// =======================================
// JSON BODY
// =======================================

app.use(
  express.json()
);

// =======================================
// API ROUTES
// =======================================

app.use(
  "/api/parents",
  parentRoutes
);

app.use(
  "/api/mentors",
  mentorRoutes
);

app.use(
  "/api/bookings",
  bookingRoutes
);

// =======================================
// HEALTH CHECK
// =======================================

app.get(
  "/health",
  (_req, res) => {
    res.status(200).json({
      success: true,
      message:
        "CodeYoung booking API is running",
    });
  }
);

// =======================================
// UNKNOWN ROUTE
// =======================================

app.use(
  (_req, res) => {
    res.status(404).json({
      success: false,
      message:
        "API route not found",
    });
  }
);

export default app;