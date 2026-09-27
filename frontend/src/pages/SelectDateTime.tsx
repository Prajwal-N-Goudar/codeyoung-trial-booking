import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { DateTime } from "luxon";

import {
  CalendarDays,
  Clock3,
  Globe2,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Users,
  UserCheck,
  UserX,
  RefreshCw,
} from "lucide-react";

import BookingSteps from "../components/booking/BookingSteps";

import {
  mentors,
  type Mentor,
} from "../services/mentorService";

import {
  createBooking,
  getBookings,
} from "../services/api";

import "./SelectDateTime.css";

// =========================================
// TIME SLOTS
// =========================================

const times = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
];

// =========================================
// TIMEZONE OPTIONS
// =========================================

const timezoneOptions = [
  {
    value: "America/New_York",
    label: "Eastern Time",
    country: "🇺🇸 United States",
  },
  {
    value: "America/Chicago",
    label: "Central Time",
    country: "🇺🇸 United States",
  },
  {
    value: "America/Denver",
    label: "Mountain Time",
    country: "🇺🇸 United States",
  },
  {
    value: "America/Los_Angeles",
    label: "Pacific Time",
    country: "🇺🇸 United States",
  },
  {
    value: "Europe/London",
    label: "United Kingdom Time",
    country: "🇬🇧 United Kingdom",
  },
  {
    value: "Europe/Paris",
    label: "Central European Time",
    country: "🇪🇺 Europe",
  },
  {
    value: "Asia/Kolkata",
    label: "India Standard Time",
    country: "🇮🇳 India",
  },
];

// =========================================
// TYPES
// =========================================

type ParentData = {
  parentName?: string;
  parentEmail?: string;
  studentName?: string;
  childAge?: number;
  country?: string;
  timezone?: string;
  subject?: string;
};

type SelectTimeLocationState = {
  parentId?: number;
  parent?: ParentData;
};

type BackendBooking = {
  id?: number;

  parentId?: number;

  mentorId?: number;

  mentor_id?: number;

  scheduledAtUtc?: string;

  scheduled_at_utc?: string;

  scheduled_at?: string;

  parentTimezone?: string;

  parent_timezone?: string;

  classLink?: string;

  class_link?: string;

  status?: string;
};

type MentorAvailability = {
  mentor: Mentor;
  available: boolean;
  reason: string;
};

// =========================================
// DATE HELPERS
// =========================================

function formatDate(
  date: Date
): string {
  const year =
    date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getToday(): string {
  return formatDate(
    new Date()
  );
}

function displayDate(
  dateString: string
): string {
  if (!dateString) {
    return "";
  }

  const date = new Date(
    `${dateString}T00:00:00`
  );

  return date.toLocaleDateString(
    "en-US",
    {
      weekday: "short",
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );
}

// =========================================
// PARSE BACKEND DATE
// =========================================

function parseBookingDate(
  value: unknown
): DateTime | null {
  if (!value) {
    return null;
  }

  const text =
    String(value);

  // ISO format
  let dateTime =
    DateTime.fromISO(
      text,
      {
        zone: "utc",
      }
    );

  // MySQL DATETIME format
  if (!dateTime.isValid) {
    dateTime =
      DateTime.fromSQL(
        text,
        {
          zone: "utc",
        }
      );
  }

  if (!dateTime.isValid) {
    return null;
  }

  return dateTime.toUTC();
}

// =========================================
// EXTRACT BOOKINGS FROM API RESPONSE
// =========================================

function extractBookings(
  response: any
): BackendBooking[] {
  if (
    Array.isArray(response)
  ) {
    return response;
  }

  if (
    response &&
    Array.isArray(response.data)
  ) {
    return response.data;
  }

  if (
    response &&
    Array.isArray(
      response.bookings
    )
  ) {
    return response.bookings;
  }

  return [];
}

// =========================================
// COMPONENT
// =========================================

export default function SelectDateTime() {
  const navigate =
    useNavigate();

  const location =
    useLocation();

  // =======================================
  // PARENT DATA
  // =======================================

  const previousState =
    location.state as
      | SelectTimeLocationState
      | null;

  const parent =
    previousState?.parent || {
      parentName: "",
      parentEmail: "",
      studentName: "",
      childAge: 0,
      country:
        "United States",
      timezone:
        "America/New_York",
      subject:
        "Mathematics",
    };

  const parentId =
    previousState?.parentId;

  // =======================================
  // STATE
  // =======================================

  const [selectedDate, setSelectedDate] =
    useState(getToday());

  const [selectedTime, setSelectedTime] =
    useState("");

  const [selectedTimezone, setSelectedTimezone] =
    useState(
      parent.timezone ||
        "America/New_York"
    );

  const [liveTime, setLiveTime] =
    useState("");

  const [checking, setChecking] =
    useState(false);

  const [availabilityLoading, setAvailabilityLoading] =
    useState(false);

  const [availabilityError, setAvailabilityError] =
    useState("");

  const [mentorAvailability, setMentorAvailability] =
    useState<MentorAvailability[]>(
      []
    );

  // =======================================
  // TODAY
  // =======================================

  const today = useMemo(
    () => getToday(),
    []
  );

  // =======================================
  // LIVE CLOCK
  // =======================================

  useEffect(() => {
    const updateLiveTime =
      () => {
        try {
          const formattedTime =
            new Intl.DateTimeFormat(
              "en-US",
              {
                timeZone:
                  selectedTimezone,

                hour: "2-digit",

                minute:
                  "2-digit",

                second:
                  "2-digit",

                hour12: true,
              }
            ).format(
              new Date()
            );

          setLiveTime(
            formattedTime
          );
        } catch (error) {
          console.error(
            "Invalid timezone:",
            error
          );

          setLiveTime("");
        }
      };

    updateLiveTime();

    const interval =
      setInterval(
        updateLiveTime,
        1000
      );

    return () => {
      clearInterval(
        interval
      );
    };
  }, [
    selectedTimezone,
  ]);

  // =======================================
  // CONVERT LOCAL DATE/TIME → UTC
  // =======================================

  const scheduledAtUtc =
    useMemo(() => {
      if (
        !selectedDate ||
        !selectedTime
      ) {
        return null;
      }

      const localDateTime =
        DateTime.fromFormat(
          `${selectedDate} ${selectedTime}`,
          "yyyy-MM-dd hh:mm a",
          {
            zone:
              selectedTimezone,
          }
        );

      if (
        !localDateTime.isValid
      ) {
        return null;
      }

      return localDateTime
        .toUTC()
        .toISO();
    }, [
      selectedDate,
      selectedTime,
      selectedTimezone,
    ]);

  // =======================================
  // CHECK LIVE AVAILABILITY
  // =======================================

  const checkLiveAvailability =
    async () => {
      if (
        !selectedDate ||
        !selectedTime ||
        !scheduledAtUtc
      ) {
        setMentorAvailability(
          []
        );

        return;
      }

      setAvailabilityLoading(
        true
      );

      setAvailabilityError(
        ""
      );

      try {
        // -----------------------------------
        // GET CURRENT BOOKINGS FROM MYSQL
        // -----------------------------------

        const response =
          await getBookings();

        const bookings =
          extractBookings(
            response
          );

        // -----------------------------------
        // REQUESTED UTC TIME
        // -----------------------------------

        const requestedUtc =
          parseBookingDate(
            scheduledAtUtc
          );

        if (!requestedUtc) {
          throw new Error(
            "Unable to calculate selected time."
          );
        }

        // -----------------------------------
        // INDIA DATE
        //
        // Mentor daily limit is based on
        // Asia/Kolkata calendar day.
        // -----------------------------------

        const requestedIndiaDate =
          requestedUtc
            .setZone(
              "Asia/Kolkata"
            )
            .toISODate();

        // -----------------------------------
        // CHECK EACH MENTOR
        // -----------------------------------

        const availability =
          mentors.map(
            (mentor) => {
              // --------------------------------
              // INACTIVE MENTOR
              // --------------------------------

              if (
                !mentor.active
              ) {
                return {
                  mentor,

                  available:
                    false,

                  reason:
                    "Mentor is inactive",
                };
              }

              // --------------------------------
              // THIS MENTOR'S BOOKINGS
              // --------------------------------

              const mentorBookings =
                bookings.filter(
                  (booking) => {
                    const bookingMentorId =
                      Number(
                        booking.mentorId ??
                          booking.mentor_id
                      );

                    const status =
                      String(
                        booking.status ||
                          "CONFIRMED"
                      ).toUpperCase();

                    return (
                      bookingMentorId ===
                        Number(
                          mentor.id
                        ) &&
                      status ===
                        "CONFIRMED"
                    );
                  }
                );

              // --------------------------------
              // EXACT SLOT CHECK
              // --------------------------------

              const exactSlotBooked =
                mentorBookings.some(
                  (booking) => {
                    const bookingDate =
                      parseBookingDate(
                        booking.scheduledAtUtc ??
                          booking.scheduled_at_utc ??
                          booking.scheduled_at
                      );

                    if (
                      !bookingDate
                    ) {
                      return false;
                    }

                    return (
                      bookingDate.toMillis() ===
                      requestedUtc.toMillis()
                    );
                  }
                );

              if (
                exactSlotBooked
              ) {
                return {
                  mentor,

                  available:
                    false,

                  reason:
                    "Already booked at this time",
                };
              }

              // --------------------------------
              // INDIA DAILY COUNT
              // --------------------------------

              const dailyCount =
                mentorBookings.filter(
                  (booking) => {
                    const bookingDate =
                      parseBookingDate(
                        booking.scheduledAtUtc ??
                          booking.scheduled_at_utc ??
                          booking.scheduled_at
                      );

                    if (
                      !bookingDate
                    ) {
                      return false;
                    }

                    const bookingIndiaDate =
                      bookingDate
                        .setZone(
                          "Asia/Kolkata"
                        )
                        .toISODate();

                    return (
                      bookingIndiaDate ===
                      requestedIndiaDate
                    );
                  }
                ).length;

              // --------------------------------
              // DAILY LIMIT
              // --------------------------------

              if (
                dailyCount >= 2
              ) {
                return {
                  mentor,

                  available:
                    false,

                  reason:
                    "Daily limit reached",
                };
              }

              // --------------------------------
              // AVAILABLE
              // --------------------------------

              return {
                mentor,

                available:
                  true,

                reason:
                  "Available now",
              };
            }
          );

        setMentorAvailability(
          availability
        );
      } catch (error: any) {
        console.error(
          "Live availability error:",
          error
        );

        setMentorAvailability(
          []
        );

        setAvailabilityError(
          error?.message ||
            "Unable to fetch live mentor availability."
        );
      } finally {
        setAvailabilityLoading(
          false
        );
      }
    };

  // =======================================
  // AUTOMATIC LIVE REFRESH
  // =======================================

  useEffect(() => {
    if (
      !selectedDate ||
      !selectedTime ||
      !scheduledAtUtc
    ) {
      setMentorAvailability(
        []
      );

      setAvailabilityError(
        ""
      );

      return;
    }

    let cancelled =
      false;

    const runCheck =
      async () => {
        if (
          cancelled
        ) {
          return;
        }

        await checkLiveAvailability();
      };

    runCheck();

    // Refresh every 5 seconds
    const interval =
      setInterval(
        runCheck,
        5000
      );

    return () => {
      cancelled = true;

      clearInterval(
        interval
      );
    };
  }, [
    selectedDate,
    selectedTime,
    selectedTimezone,
    scheduledAtUtc,
  ]);

  // =======================================
  // AVAILABLE MENTORS
  // =======================================

  const availableMentors =
    useMemo(() => {
      return mentorAvailability
        .filter(
          (item) =>
            item.available
        )
        .map(
          (item) =>
            item.mentor
        );
    }, [
      mentorAvailability,
    ]);

  const availableCount =
    availableMentors.length;

  const totalMentors =
    mentors.length;

  // =======================================
  // NAVIGATE TO NO MENTOR
  // =======================================

  const goToNoMentor =
    () => {
      navigate(
        "/no-mentor",
        {
          state: {
            date:
              selectedDate,

            time:
              selectedTime,

            timezone:
              selectedTimezone,

            country:
              parent.country ||
              "United States",

            parent,

            parentId,
          },
        }
      );
    };

  // =======================================
  // CONTINUE / BOOK
  // =======================================

  const handleContinue =
    async () => {
      // -------------------------------------
      // DATE
      // -------------------------------------

      if (
        !selectedDate
      ) {
        alert(
          "Please select a date."
        );

        return;
      }

      // -------------------------------------
      // TIME
      // -------------------------------------

      if (
        !selectedTime
      ) {
        alert(
          "Please select a time."
        );

        return;
      }

      // -------------------------------------
      // PARENT
      // -------------------------------------

      if (!parentId) {
        alert(
          "Parent information is missing. Please go back and enter your details again."
        );

        navigate(
          "/book-trial"
        );

        return;
      }

      // -------------------------------------
      // UTC
      // -------------------------------------

      if (
        !scheduledAtUtc
      ) {
        alert(
          "Unable to calculate the selected time."
        );

        return;
      }

      try {
        setChecking(true);

        // ===================================
        // FRESH LIVE CHECK
        // ===================================

        await checkLiveAvailability();

        /*
         * IMPORTANT:
         *
         * The backend is the final authority.
         * We do not select a mentor here.
         */

        // ===================================
        // CREATE ACTUAL BOOKING
        // ===================================

        const response =
          await createBooking({
            parentId,

            scheduledAtUtc,

            parentTimezone:
              selectedTimezone,
          });

        console.log(
          "Booking response:",
          response
        );

        // ===================================
        // BACKEND ERROR
        // ===================================

        if (
          !response?.success
        ) {
          const message =
            response?.message ||
            "Booking failed.";

          if (
            message
              .toLowerCase()
              .includes(
                "no mentor"
              ) ||
            message
              .toLowerCase()
              .includes(
                "no mentors"
              ) ||
            message
              .toLowerCase()
              .includes(
                "available"
              )
          ) {
            goToNoMentor();

            return;
          }

          throw new Error(
            message
          );
        }

        // ===================================
        // BOOKING DATA
        // ===================================

        const booking =
          response.data;

        // ===================================
        // BACKEND ASSIGNED MENTOR
        // ===================================

        const assignedMentor:
          | Mentor
          | null =
          mentors.find(
            (mentor) =>
              Number(
                mentor.id
              ) ===
              Number(
                booking?.mentorId
              )
          ) || null;

        // ===================================
        // SAFETY CHECK
        // ===================================

        if (
          !assignedMentor
        ) {
          goToNoMentor();

          return;
        }

        // ===================================
        // GO TO CONFIRM BOOKING
        // ===================================

        navigate(
          "/confirm-booking",
          {
            state: {
              // Parent
              parentId,

              parentName:
                parent.parentName ||
                "",

              parentEmail:
                parent.parentEmail ||
                "",

              studentName:
                parent.studentName ||
                "",

              childAge:
                parent.childAge ||
                0,

              country:
                parent.country ||
                "United States",

              // Date / time
              date:
                selectedDate,

              time:
                selectedTime,

              timezone:
                selectedTimezone,

              scheduledAtUtc,

              // Subject
              subject:
                parent.subject ||
                "Mathematics",

              // Mentor
              mentor:
                assignedMentor,

              mentorId:
                booking.mentorId,

              // Booking
              bookingId:
                booking.id,

              // Meeting
              meetingLink:
                booking.classLink,

              duration: 30,
            },
          }
        );
      } catch (error: any) {
        console.error(
          "Booking error:",
          error
        );

        const message =
          error?.message ||
          "Unable to book the trial class.";

        // ===================================
        // NO MENTOR
        // ===================================

        if (
          message
            .toLowerCase()
            .includes(
              "no mentor"
            ) ||
          message
            .toLowerCase()
            .includes(
              "no mentors"
            )
        ) {
          goToNoMentor();

          return;
        }

        alert(
          message
        );
      } finally {
        setChecking(false);
      }
    };

  // =======================================
  // UI
  // =======================================

  return (
    <main className="select-time-page">

      <BookingSteps current={2} />

      <section className="select-time-card">

        {/* =================================
            HEADER
        ================================= */}

        <div className="select-time-header">

          <span className="step-label">
            STEP 2
          </span>

          <h1>
            Select a Date & Time
          </h1>

          <p>
            Choose a convenient time
            for your child's trial
            class.
          </p>

        </div>

        {/* =================================
            MAIN GRID
        ================================= */}

        <div className="select-time-grid">

          {/* =================================
              DATE
          ================================= */}

          <div className="date-section">

            <div className="section-title">

              <CalendarDays
                size={18}
              />

              <div>

                <h2>
                  Requested Date
                </h2>

                <p>
                  Select a date for
                  your trial class
                </p>

              </div>

            </div>

            <input
              type="date"
              value={
                selectedDate
              }
              min={today}
              onChange={(event) => {
                setSelectedDate(
                  event.target.value
                );

                setSelectedTime(
                  ""
                );
              }}
              className="date-picker"
              disabled={
                checking
              }
            />

            {selectedDate && (
              <div className="selected-date-preview">

                <CalendarDays
                  size={17}
                />

                <span>
                  {displayDate(
                    selectedDate
                  )}
                </span>

              </div>
            )}

          </div>

          {/* =================================
              TIME
          ================================= */}

          <div className="time-section">

            <div className="section-title">

              <Clock3
                size={18}
              />

              <div>

                <h2>
                  Available Time Slots
                </h2>

                <p>
                  All times are shown
                  in your selected
                  timezone
                </p>

              </div>

            </div>

            {/* TIMEZONE */}

            <div className="timezone-box">

              <div className="timezone-header">

                <div className="timezone-title">

                  <Globe2
                    size={17}
                  />

                  <span>
                    Your Timezone
                  </span>

                </div>

                <span className="live-badge">
                  ● LIVE
                </span>

              </div>

              <select
                value={
                  selectedTimezone
                }
                onChange={(event) =>
                  setSelectedTimezone(
                    event.target.value
                  )
                }
                className="timezone-select"
                disabled={
                  checking
                }
              >

                {timezoneOptions.map(
                  (option) => (
                    <option
                      key={
                        option.value
                      }
                      value={
                        option.value
                      }
                    >
                      {
                        option.country
                      }{" "}
                      {
                        option.label
                      }
                    </option>
                  )
                )}

              </select>

              <div className="timezone-current-time">

                <span>
                  Current time
                </span>

                <strong>
                  {liveTime}
                </strong>

              </div>

              <small className="timezone-name">
                {
                  selectedTimezone
                }
              </small>

            </div>

            {/* TIME SLOTS */}

            <div className="time-grid">

              {times.map(
                (time) => {

                  const isSelected =
                    selectedTime ===
                    time;

                  return (
                    <button
                      key={time}
                      type="button"
                      className={
                        isSelected
                          ? "time-slot selected"
                          : "time-slot"
                      }
                      onClick={() =>
                        setSelectedTime(
                          time
                        )
                      }
                      disabled={
                        checking
                      }
                    >

                      {isSelected && (
                        <CheckCircle2
                          size={14}
                        />
                      )}

                      {time}

                    </button>
                  );
                }
              )}

            </div>

          </div>

        </div>

        {/* =================================
            SELECTED SUMMARY
        ================================= */}

        {selectedDate &&
          selectedTime && (

            <div className="selected-slot-summary">

              <div>

                <CalendarDays
                  size={18}
                />

                <div>

                  <small>
                    DATE
                  </small>

                  <strong>
                    {
                      displayDate(
                        selectedDate
                      )
                    }
                  </strong>

                </div>

              </div>

              <div>

                <Clock3
                  size={18}
                />

                <div>

                  <small>
                    TIME
                  </small>

                  <strong>
                    {
                      selectedTime
                    }
                  </strong>

                </div>

              </div>

              <div>

                <Globe2
                  size={18}
                />

                <div>

                  <small>
                    TIMEZONE
                  </small>

                  <strong>
                    {
                      selectedTimezone
                    }
                  </strong>

                </div>

              </div>

              <div>

                <Clock3
                  size={18}
                />

                <div>

                  <small>
                    LIVE LOCAL TIME
                  </small>

                  <strong>
                    {liveTime}
                  </strong>

                </div>

              </div>

            </div>
          )}

        {/* =================================
            LIVE MENTOR AVAILABILITY
        ================================= */}

        {selectedDate &&
          selectedTime && (

            <div
              style={{
                marginTop:
                  "24px",

                padding:
                  "20px",

                borderRadius:
                  "16px",

                background:
                  "#f8fafc",

                border:
                  "1px solid #e2e8f0",
              }}
            >

              {/* HEADER */}

              <div
                style={{
                  display:
                    "flex",

                  alignItems:
                    "center",

                  justifyContent:
                    "space-between",

                  marginBottom:
                    "16px",
                }}
              >

                <div
                  style={{
                    display:
                      "flex",

                    alignItems:
                      "center",

                    gap: "10px",
                  }}
                >

                  <Users
                    size={20}
                    color="#2563eb"
                  />

                  <div>

                    <strong
                      style={{
                        display:
                          "block",

                        color:
                          "#0f172a",
                      }}
                    >
                      Mentor Availability
                    </strong>

                    <span
                      style={{
                        fontSize:
                          "12px",

                        color:
                          "#64748b",
                      }}
                    >
                      Live availability
                      from the
                      booking system
                    </span>

                  </div>

                </div>

                <strong
                  style={{
                    color:
                      availabilityLoading
                        ? "#64748b"
                        : availabilityError
                        ? "#dc2626"
                        : availableCount >
                          0
                        ? "#16a34a"
                        : "#dc2626",
                  }}
                >

                  {availabilityLoading
                    ? "Checking..."
                    : availabilityError
                    ? "Unavailable"
                    : `${availableCount} / ${totalMentors} available`}

                </strong>

              </div>

              {/* ERROR */}

              {availabilityError && (

                <div
                  style={{
                    padding:
                      "12px 14px",

                    marginBottom:
                      "12px",

                    borderRadius:
                      "10px",

                    background:
                      "#fff7ed",

                    border:
                      "1px solid #fed7aa",

                    color:
                      "#c2410c",

                    fontSize:
                      "13px",
                  }}
                >

                  {availabilityError}

                  <br />

                  <small>
                    The system will
                    retry automatically.
                  </small>

                </div>
              )}

              {/* INITIAL CHECK */}

              {availabilityLoading &&
                mentorAvailability.length ===
                  0 && (

                  <div
                    style={{
                      display:
                        "grid",

                      gap: "8px",
                    }}
                  >

                    {mentors.map(
                      (mentor) => (

                        <div
                          key={
                            mentor.id
                          }
                          style={{
                            display:
                              "flex",

                            alignItems:
                              "center",

                            justifyContent:
                              "space-between",

                            padding:
                              "10px 12px",

                            borderRadius:
                              "10px",

                            background:
                              "#ffffff",

                            border:
                              "1px solid #e2e8f0",
                          }}
                        >

                          <div
                            style={{
                              display:
                                "flex",

                              alignItems:
                                "center",

                              gap: "10px",
                            }}
                          >

                            <Users
                              size={
                                17
                              }
                              color="#94a3b8"
                            />

                            <div>

                              <strong
                                style={{
                                  display:
                                    "block",

                                  fontSize:
                                    "13px",

                                  color:
                                    "#0f172a",
                                }}
                              >
                                {
                                  mentor.name
                                }
                              </strong>

                              <span
                                style={{
                                  fontSize:
                                    "11px",

                                  color:
                                    "#64748b",
                                }}
                              >
                                Checking
                                availability...
                              </span>

                            </div>

                          </div>

                          <span
                            style={{
                              fontSize:
                                "11px",

                              fontWeight:
                                700,

                              color:
                                "#64748b",
                            }}
                          >
                            CHECKING
                          </span>

                        </div>
                      )
                    )}

                  </div>
                )}

              {/* ACTUAL AVAILABILITY */}

              {!availabilityLoading &&
                !availabilityError &&
                mentorAvailability.map(
                  ({
                    mentor,
                    available,
                    reason,
                  }) => (

                    <div
                      key={
                        mentor.id
                      }
                      style={{
                        display:
                          "flex",

                        alignItems:
                          "center",

                        justifyContent:
                          "space-between",

                        padding:
                          "10px 12px",

                        marginBottom:
                          "8px",

                        borderRadius:
                          "10px",

                        background:
                          "#ffffff",

                        border:
                          "1px solid #e2e8f0",
                      }}
                    >

                      <div
                        style={{
                          display:
                            "flex",

                          alignItems:
                            "center",

                          gap: "10px",
                        }}
                      >

                        {available ? (
                          <UserCheck
                            size={
                              17
                            }
                            color="#16a34a"
                          />
                        ) : (
                          <UserX
                            size={
                              17
                            }
                            color="#dc2626"
                          />
                        )}

                        <div>

                          <strong
                            style={{
                              display:
                                "block",

                              fontSize:
                                "13px",

                              color:
                                "#0f172a",
                            }}
                          >
                            {
                              mentor.name
                            }
                          </strong>

                          <span
                            style={{
                              fontSize:
                                "11px",

                              color:
                                "#64748b",
                            }}
                          >
                            {
                              reason
                            }
                          </span>

                        </div>

                      </div>

                      <span
                        style={{
                          fontSize:
                            "11px",

                          fontWeight:
                            700,

                          color:
                            available
                              ? "#16a34a"
                              : "#dc2626",
                        }}
                      >
                        {available
                          ? "AVAILABLE"
                          : "UNAVAILABLE"}
                      </span>

                    </div>
                  )
                )}

              {/* NO MENTORS */}

              {!availabilityLoading &&
                !availabilityError &&
                mentorAvailability.length >
                  0 &&
                availableCount ===
                  0 && (

                  <div
                    style={{
                      marginTop:
                        "16px",

                      padding:
                        "14px 16px",

                      borderRadius:
                        "12px",

                      background:
                        "#fef2f2",

                      border:
                        "1px solid #fecaca",

                      color:
                        "#b91c1c",

                      fontSize:
                        "13px",

                      fontWeight:
                        600,
                    }}
                  >

                    No mentors are
                    available for
                    this date and
                    time.

                    <br />

                    Please choose
                    another time slot.

                  </div>
                )}

              {/* AVAILABLE */}

              {!availabilityLoading &&
                !availabilityError &&
                availableCount >
                  0 && (

                  <div
                    style={{
                      marginTop:
                        "16px",

                      padding:
                        "12px 16px",

                      borderRadius:
                        "12px",

                      background:
                        "#f0fdf4",

                      border:
                        "1px solid #bbf7d0",

                      color:
                        "#166534",

                      fontSize:
                        "13px",

                      fontWeight:
                        600,
                    }}
                  >

                    <CheckCircle2
                      size={15}
                      style={{
                        verticalAlign:
                          "middle",

                        marginRight:
                          "6px",
                      }}
                    />

                    {
                      availableCount
                    } mentor
                    {
                      availableCount ===
                      1
                        ? ""
                        : "s"
                    }{" "}
                    available for
                    this time slot.

                  </div>
                )}

            </div>
          )}

        {/* =================================
            BOOKING CHECKING
        ================================= */}

        {checking && (

          <div
            style={{
              marginTop:
                "24px",

              padding:
                "18px",

              borderRadius:
                "14px",

              background:
                "#eff6ff",

              border:
                "1px solid #bfdbfe",

              color:
                "#1d4ed8",

              fontWeight:
                600,

              textAlign:
                "center",
            }}
          >

            <RefreshCw
              size={16}
              style={{
                marginRight:
                  "7px",

                verticalAlign:
                  "middle",
              }}
            />

            Confirming live
            availability and
            booking your trial
            class...

          </div>
        )}

        {/* =================================
            BUTTONS
        ================================= */}

        <div className="select-time-actions">

          <button
            type="button"
            className="back-button"
            disabled={
              checking
            }
            onClick={() =>
              navigate(
                "/book-trial",
                {
                  state: {
                    parent,
                    parentId,
                  },
                }
              )
            }
          >

            <ArrowLeft
              size={16}
            />

            Back

          </button>

          <button
            type="button"
            className="continue-button"
            disabled={
              !selectedDate ||
              !selectedTime ||
              checking ||
              availabilityLoading ||
              !!availabilityError
            }
            onClick={
              handleContinue
            }
          >

            {checking
              ? "Booking..."
              : availabilityLoading
              ? "Checking availability..."
              : availableCount ===
                0 &&
                mentorAvailability.length >
                  0
              ? "View Other Slots"
              : "Continue"}

            {!checking && (
              <ArrowRight
                size={16}
              />
            )}

          </button>

        </div>

        {/* =================================
            BOTTOM STATUS
        ================================= */}

        {selectedDate &&
          selectedTime &&
          !availabilityLoading &&
          !availabilityError &&
          mentorAvailability.length >
            0 && (

            <div
              className={
                availableCount >
                0
                  ? "availability-status available"
                  : "availability-status unavailable"
              }
            >

              {availableCount >
              0 ? (
                <>
                  <CheckCircle2
                    size={15}
                  />

                  <span>
                    {
                      availableCount
                    } mentor
                    {
                      availableCount ===
                      1
                        ? ""
                        : "s"
                    }{" "}
                    available for
                    this selected
                    time.
                  </span>
                </>
              ) : (
                <>
                  <UserX
                    size={15}
                  />

                  <span>
                    No mentors are
                    available for
                    this selected
                    time.
                  </span>
                </>
              )}

            </div>
          )}

      </section>

    </main>
  );
}