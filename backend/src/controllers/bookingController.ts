import {
  Request,
  Response,
} from "express";

import {
  bookTrialClass,
  getMentorAvailability,
  getBookings,
} from "../services/bookingService";



export async function getAllBookings(
  _req: Request,
  res: Response
) {
  try {
    const bookings =
      await getBookings();

    return res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error: any) {
    console.error(
      "Get bookings error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Failed to fetch bookings",
    });
  }
}



export async function checkMentorAvailability(
  req: Request,
  res: Response
) {
  try {
    const scheduledAtUtc =
      String(
        req.query.scheduledAtUtc ||
          ""
      );

    if (!scheduledAtUtc) {
      return res.status(400).json({
        success: false,
        message:
          "scheduledAtUtc is required",
      });
    }

    const availability =
      await getMentorAvailability(
        scheduledAtUtc
      );

    return res.status(200).json({
      success: true,
      data: availability,
    });
  } catch (error: any) {
    console.error(
      "Check mentor availability error:",
      error
    );

    return res.status(400).json({
      success: false,
      message:
        error?.message ||
        "Failed to check mentor availability",
    });
  }
}



export async function createBooking(
  req: Request,
  res: Response
) {
  try {
    const {
      parentId,
      scheduledAtUtc,
      parentTimezone,
    } = req.body;

  
    if (
      !parentId ||
      !scheduledAtUtc ||
      !parentTimezone
    ) {
      return res.status(400).json({
        success: false,
        message:
          "parentId, scheduledAtUtc and parentTimezone are required",
      });
    }

   

    const numericParentId =
      Number(parentId);

    if (
      !Number.isInteger(
        numericParentId
      ) ||
      numericParentId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid parent ID",
      });
    }

   

    const booking =
      await bookTrialClass({
        parentId:
          numericParentId,

        scheduledAtUtc,

        parentTimezone,
      });

   

    return res.status(201).json({
      success: true,
      message:
        "Trial class booked successfully",
      data: booking,
    });
  } catch (error: any) {
    console.error(
      "Create booking error:",
      error
    );

    const message =
      error?.message ||
      "Booking failed";

    
    if (
      message
        .toLowerCase()
        .includes("no mentor")
    ) {
      return res.status(409).json({
        success: false,
        message,
      });
    }

    return res.status(400).json({
      success: false,
      message,
    });
  }
}