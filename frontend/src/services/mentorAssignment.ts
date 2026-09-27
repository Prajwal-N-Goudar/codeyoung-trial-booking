// =========================================
// MENTOR ASSIGNMENT SERVICE
// =========================================

import {
  mentors,
  type Mentor,
} from "./mentorService";

import {
  getMentorDailyCount,
  isMentorBookedAtTime,
} from "./bookingStorage";

// =========================================
// MAX CLASSES PER MENTOR / DAY
// =========================================

const MAX_CLASSES_PER_DAY = 2;

// =========================================
// FIND AVAILABLE MENTORS
// =========================================

export function getAvailableMentors(
  date: string,
  time: string
): Mentor[] {
  const available = mentors.filter((mentor) => {
    // Mentor must be active
    if (!mentor.active) {
      return false;
    }

    // Maximum 2 classes per day
    const dailyCount = getMentorDailyCount(
      mentor.id,
      date
    );

    if (dailyCount >= MAX_CLASSES_PER_DAY) {
      return false;
    }

    // Mentor cannot have another class
    // at exactly the same time
    const alreadyBooked = isMentorBookedAtTime(
      mentor.id,
      date,
      time
    );

    if (alreadyBooked) {
      return false;
    }

    return true;
  });

  return available;
}

// =========================================
// FIND BEST AVAILABLE MENTOR
// =========================================

export function findAvailableMentor(
  date: string,
  time: string
): Mentor | null {
  const availableMentors = getAvailableMentors(
    date,
    time
  );

  // No mentor available
  if (availableMentors.length === 0) {
    return null;
  }

  /*
   * Sort by number of classes already assigned.
   *
   * This prevents the same mentor from being
   * selected every time.
   *
   * Example:
   *
   * Ananya -> 1 class
   * Rahul  -> 0 classes
   *
   * Rahul will be selected first.
   */

  const sortedMentors = [...availableMentors].sort(
    (a, b) => {
      const aCount = getMentorDailyCount(
        a.id,
        date
      );

      const bCount = getMentorDailyCount(
        b.id,
        date
      );

      return aCount - bCount;
    }
  );

  return sortedMentors[0] ?? null;
}

// =========================================
// CHECK WHETHER SLOT HAS A MENTOR
// =========================================

export function hasAvailableMentor(
  date: string,
  time: string
): boolean {
  return (
    getAvailableMentors(date, time).length > 0
  );
}

// =========================================
// GET AVAILABLE MENTOR COUNT
// =========================================

export function getAvailableMentorCount(
  date: string,
  time: string
): number {
  return getAvailableMentors(date, time).length;
}