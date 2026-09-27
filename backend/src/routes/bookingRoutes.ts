import { Router } from "express";

import {
  createBooking,
  checkMentorAvailability,
  getAllBookings,
} from "../controllers/bookingController";

const router = Router();

// =======================================
// GET ALL BOOKINGS
// =======================================

router.get(
  "/",
  getAllBookings
);

// =======================================
// CHECK MENTOR AVAILABILITY
// =======================================

router.get(
  "/availability",
  checkMentorAvailability
);

// =======================================
// CREATE BOOKING
// =======================================

router.post(
  "/",
  createBooking
);

export default router;