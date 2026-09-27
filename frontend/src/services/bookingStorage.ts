// =========================================
// BOOKING STORAGE
// =========================================

import type { Mentor } from "./mentorService";

// =========================================
// BOOKING TYPE
// =========================================

export interface Booking {
  id: string;

  date: string;

  time: string;

  timezone: string;

  country: string;

  parentName: string;

  parentEmail: string;

  studentName: string;

  subject: string;

  mentorId: number;

  mentor: Mentor;

  meetingLink: string;

  duration: number;

  status: "upcoming" | "completed" | "cancelled";

  createdAt: string;
}

// =========================================
// LOCAL STORAGE KEY
// =========================================

const STORAGE_KEY = "codeyoung_bookings";

// =========================================
// GET BOOKINGS
// =========================================

export function getStoredBookings(): Booking[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch (error) {
    console.error("Unable to read bookings:", error);
    return [];
  }
}

// =========================================
// SAVE BOOKING
// =========================================

export function saveBooking(booking: Booking): void {
  try {
    const bookings = getStoredBookings();

    bookings.push(booking);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(bookings)
    );
  } catch (error) {
    console.error("Unable to save booking:", error);
  }
}

// =========================================
// GET LATEST BOOKING
// =========================================

export function getLatestBooking(): Booking | null {
  const bookings = getStoredBookings();

  if (bookings.length === 0) {
    return null;
  }

  return bookings[bookings.length - 1];
}

// =========================================
// GET BOOKINGS FOR DATE
// =========================================

export function getBookingsForDate(
  date: string
): Booking[] {
  return getStoredBookings().filter(
    (booking) => booking.date === date
  );
}

// =========================================
// GET BOOKINGS FOR MENTOR
// =========================================

export function getMentorBookings(
  mentorId: number,
  date: string
): Booking[] {
  return getStoredBookings().filter(
    (booking) =>
      booking.mentorId === mentorId &&
      booking.date === date &&
      booking.status !== "cancelled"
  );
}

// =========================================
// CHECK SAME TIME BOOKING
// =========================================

export function isMentorBookedAtTime(
  mentorId: number,
  date: string,
  time: string
): boolean {
  return getStoredBookings().some(
    (booking) =>
      booking.mentorId === mentorId &&
      booking.date === date &&
      booking.time === time &&
      booking.status !== "cancelled"
  );
}

// =========================================
// GET MENTOR DAILY COUNT
// =========================================

export function getMentorDailyCount(
  mentorId: number,
  date: string
): number {
  return getStoredBookings().filter(
    (booking) =>
      booking.mentorId === mentorId &&
      booking.date === date &&
      booking.status !== "cancelled"
  ).length;
}

// =========================================
// CLEAR BOOKINGS
// Useful for testing
// =========================================

export function clearAllBookings(): void {
  localStorage.removeItem(STORAGE_KEY);
}