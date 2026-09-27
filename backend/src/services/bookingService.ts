import {
  findParentById,
  findAvailableMentors,
  countMentorBookings,
  createBooking,
  findAllBookings,
  countActiveMentors,
} from "../repositories/bookingRepository";

// =======================================
// GENERATE DUMMY MEETING LINK
// =======================================

function generateClassLink(): string {
  const meetingId =
    Math.random()
      .toString(36)
      .substring(2, 10);

  return `https://meet.codeyoung.demo/${meetingId}`;
}

// =======================================
// GET ALL BOOKINGS
// =======================================

export async function getBookings() {
  return await findAllBookings();
}

// =======================================
// GET MENTOR AVAILABILITY
// =======================================

export async function getMentorAvailability(
  scheduledAtUtc: string
) {
  if (!scheduledAtUtc) {
    throw new Error(
      "Scheduled time is required"
    );
  }

  // Validate date.
  const parsedDate =
    new Date(
      scheduledAtUtc
    );

  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    throw new Error(
      "Invalid scheduled date and time"
    );
  }

  // ---------------------------------------
  // GET ACTIVE MENTORS
  // ---------------------------------------

  const activeMentors =
    await findAvailableMentors(
      scheduledAtUtc
    );

  const totalMentors =
    await countActiveMentors();

  // ---------------------------------------
  // CHECK DAILY LIMIT
  // ---------------------------------------

  const eligibleMentors: any[] = [];

  for (
    const mentor of activeMentors
  ) {
    const bookingCount =
      await countMentorBookings(
        mentor.id,
        scheduledAtUtc
      );

    if (
      bookingCount < 2
    ) {
      eligibleMentors.push(
        mentor
      );
    }
  }

  // ---------------------------------------
  // RESULT
  // ---------------------------------------

  return {
    totalMentors,

    availableMentors:
      eligibleMentors.length,

    unavailableMentors:
      totalMentors -
      eligibleMentors.length,

    mentors:
      eligibleMentors.map(
        (mentor) => ({
          id: mentor.id,
          name: mentor.name,
          available: true,
        })
      ),
  };
}

// =======================================
// BOOK TRIAL CLASS
// =======================================

export async function bookTrialClass(
  data: {
    parentId: number;
    scheduledAtUtc: string;
    parentTimezone: string;
  }
) {
  // ---------------------------------------
  // CHECK PARENT
  // ---------------------------------------

  const parent =
    await findParentById(
      data.parentId
    );

  if (!parent) {
    throw new Error(
      "Parent not found"
    );
  }

  // ---------------------------------------
  // VALIDATION
  // ---------------------------------------

  if (
    !data.scheduledAtUtc
  ) {
    throw new Error(
      "Scheduled time is required"
    );
  }

  if (
    !data.parentTimezone
  ) {
    throw new Error(
      "Parent timezone is required"
    );
  }

  // ---------------------------------------
  // VALIDATE DATE
  // ---------------------------------------

  const parsedDate =
    new Date(
      data.scheduledAtUtc
    );

  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    throw new Error(
      "Invalid scheduled date and time"
    );
  }

  // ---------------------------------------
  // FIND AVAILABLE MENTORS
  // ---------------------------------------

  const mentors =
    await findAvailableMentors(
      data.scheduledAtUtc
    );

  // ---------------------------------------
  // CHECK DAILY LIMIT
  // ---------------------------------------

  const eligibleMentors: any[] = [];

  for (
    const mentor of mentors
  ) {
    const bookingCount =
      await countMentorBookings(
        mentor.id,
        data.scheduledAtUtc
      );

    if (
      bookingCount < 2
    ) {
      eligibleMentors.push(
        mentor
      );
    }
  }

  // ---------------------------------------
  // NO MENTOR
  // ---------------------------------------

  if (
    eligibleMentors.length ===
    0
  ) {
    throw new Error(
      "No mentor is available for this time slot"
    );
  }

  // ---------------------------------------
  // RANDOM MENTOR ASSIGNMENT
  // ---------------------------------------

  const randomIndex =
    Math.floor(
      Math.random() *
        eligibleMentors.length
    );

  const selectedMentor =
    eligibleMentors[
      randomIndex
    ];

  // ---------------------------------------
  // GENERATE MEETING LINK
  // ---------------------------------------

  const classLink =
    generateClassLink();

  // ---------------------------------------
  // CREATE BOOKING
  // ---------------------------------------

  return await createBooking({
    parentId:
      data.parentId,

    mentorId:
      selectedMentor.id,

    scheduledAtUtc:
      data.scheduledAtUtc,

    parentTimezone:
      data.parentTimezone,

    classLink,
  });
}