const API_BASE_URL =
  "http://localhost:5000/api";

// =====================================================
// HELPER
// =====================================================

async function parseResponse(
  response: Response
) {
  const data =
    await response.json().catch(
      () => null
    );

  if (!response.ok) {
    throw new Error(
      data?.message ||
        `Request failed with status ${response.status}`
    );
  }

  return data;
}

// =====================================================
// MENTORS
// =====================================================

export async function getMentors() {
  try {
    const response =
      await fetch(
        `${API_BASE_URL}/mentors`
      );

    return await parseResponse(
      response
    );
  } catch (error: any) {
    console.error(
      "Get mentors error:",
      error
    );

    throw new Error(
      error?.message ||
        "Unable to connect to the booking server."
    );
  }
}

// =====================================================
// PARENTS
// =====================================================

export async function getParents() {
  try {
    const response =
      await fetch(
        `${API_BASE_URL}/parents`
      );

    return await parseResponse(
      response
    );
  } catch (error: any) {
    console.error(
      "Get parents error:",
      error
    );

    throw new Error(
      error?.message ||
        "Unable to fetch parents."
    );
  }
}

// =====================================================
// CREATE PARENT
// =====================================================

export async function createParent(
  parentData: {
    parentName: string;
    email: string;
    timezone: string;
  }
) {
  try {
    const response =
      await fetch(
        `${API_BASE_URL}/parents`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            parentData
          ),
        }
      );

    return await parseResponse(
      response
    );
  } catch (error: any) {
    console.error(
      "Create parent error:",
      error
    );

    throw new Error(
      error?.message ||
        "Unable to save parent details."
    );
  }
}

// =====================================================
// CHECK MENTOR AVAILABILITY
// =====================================================

export async function getMentorAvailability(
  scheduledAtUtc: string
) {
  try {
    if (!scheduledAtUtc) {
      throw new Error(
        "Scheduled time is required."
      );
    }

    const params =
      new URLSearchParams({
        scheduledAtUtc,
      });

    const response =
      await fetch(
        `${API_BASE_URL}/bookings/availability?${params.toString()}`
      );

    return await parseResponse(
      response
    );
  } catch (error: any) {
    console.error(
      "Mentor availability error:",
      error
    );

    throw new Error(
      error?.message ||
        "Unable to check mentor availability."
    );
  }
}

// =====================================================
// CREATE BOOKING
// =====================================================

export async function createBooking(
  bookingData: {
    parentId: number;
    scheduledAtUtc: string;
    parentTimezone: string;
  }
) {
  try {
    if (!bookingData.parentId) {
      throw new Error(
        "Parent ID is required."
      );
    }

    if (
      !bookingData.scheduledAtUtc
    ) {
      throw new Error(
        "Scheduled time is required."
      );
    }

    if (
      !bookingData.parentTimezone
    ) {
      throw new Error(
        "Parent timezone is required."
      );
    }

    const response =
      await fetch(
        `${API_BASE_URL}/bookings`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            bookingData
          ),
        }
      );

    return await parseResponse(
      response
    );
  } catch (error: any) {
    console.error(
      "Create booking error:",
      error
    );

    throw new Error(
      error?.message ||
        "Unable to create booking."
    );
  }
}

// =====================================================
// GET ALL BOOKINGS
// =====================================================

export async function getBookings() {
  try {
    const response =
      await fetch(
        `${API_BASE_URL}/bookings`
      );

    return await parseResponse(
      response
    );
  } catch (error: any) {
    console.error(
      "Get bookings error:",
      error
    );

    throw new Error(
      error?.message ||
        "Unable to fetch bookings."
    );
  }
}