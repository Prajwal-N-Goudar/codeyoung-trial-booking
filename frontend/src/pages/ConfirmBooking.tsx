import {
  CalendarDays,
  Clock3,
  Globe2,
  Video,
  CheckCircle2,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

import BookingSteps from "../components/booking/BookingSteps";

import type { Mentor } from "../services/mentorService";

import {
  saveBooking,
} from "../services/bookingStorage";

import "./ConfirmBooking.css";

// =========================================
// BOOKING STATE
// =========================================

type BookingState = {
  date?: string;

  time?: string;

  timezone?: string;

  country?: string;

  parentName?: string;

  parentEmail?: string;

  studentName?: string;

  subject?: string;

  duration?: number;

  mentor?: Mentor;
};

// =========================================
// COMPONENT
// =========================================

export default function ConfirmBooking() {

  const navigate = useNavigate();

  const location = useLocation();

  // =======================================
  // POPUP STATE
  // =======================================

  const [showPopup, setShowPopup] =
    useState(false);

  const [isConfirming, setIsConfirming] =
    useState(false);

  // =======================================
  // BOOKING DATA
  // =======================================

  const booking =
    (location.state as BookingState) || {};

  const selectedDate =
    booking.date || "";

  const selectedTime =
    booking.time || "10:00 AM";

  const timezone =
    booking.timezone ||
    "America/New_York";

  const country =
    booking.country ||
    "United States";

  const duration =
    booking.duration || 30;

  const mentor =
    booking.mentor;

  // =======================================
  // MENTOR INFORMATION
  // =======================================

  const mentorName =
    mentor?.name ||
    "Ananya Sharma";

  const mentorSubject =
    mentor?.subject ||
    "Mathematics";

  const mentorImage =
    mentor?.image ||
    "https://ul.postcrest.com/page_contents/south-asian-woman-in-studio-headshot-with-clean-gray-background-khczzyiq.png";

  const mentorRating =
    mentor?.rating ||
    "4.9";

  // =======================================
  // FORMATTED DATE
  // =======================================

  const formattedDate =
    selectedDate
      ? new Date(
          `${selectedDate}T00:00:00`
        ).toLocaleDateString(
          "en-US",
          {
            month: "long",
            day: "numeric",
            year: "numeric",
          }
        )
      : "Date not selected";

  // =======================================
  // OPEN CONFIRMATION POPUP
  // =======================================

  const handleConfirm = () => {
    setShowPopup(true);
  };

  // =======================================
  // COMPLETE BOOKING
  // =======================================

  const completeBooking = () => {

    // Mentor must exist
    if (!mentor) {
      alert(
        "No mentor has been assigned to this booking."
      );

      setShowPopup(false);

      return;
    }

    setIsConfirming(true);

    setTimeout(() => {

      // ====================================
      // CREATE BOOKING ID
      // ====================================

      const bookingId =
        `booking-${Date.now()}`;

      // ====================================
      // CREATE MEETING ROOM
      // ====================================

      const meetingRoomId =
        `trial-${Date.now()}`;

      // ====================================
      // CREATE MEETING LINK
      // ====================================

      const meetingLink =
        `${window.location.origin}/meeting-room/${meetingRoomId}`;

      // ====================================
      // SAVE BOOKING
      // ====================================

      saveBooking({

        id: bookingId,

        date: selectedDate,

        time: selectedTime,

        timezone,

        country,

        parentName:
          booking.parentName || "",

        parentEmail:
          booking.parentEmail || "",

        studentName:
          booking.studentName || "",

        subject:
          booking.subject ||
          "Mathematics",

        mentorId:
          mentor.id,

        mentor,

        meetingLink,

        duration,

        status: "upcoming",

        createdAt:
          new Date().toISOString(),

      });

      // ====================================
      // GO TO BOOKING SUCCESS
      // ====================================

      navigate(
        "/booking-success",
        {
          state: {

            ...booking,

            date: selectedDate,

            time: selectedTime,

            timezone,

            country,

            duration,

            mentor,

            mentorName,

            mentorSubject,

            mentorRating,

            meetingLink,

            meetingRoomId,

          },
        }
      );

    }, 1200);
  };

  // =========================================
  // RENDER
  // =========================================

  return (
    <>
      <main className="booking-page">

        <BookingSteps current={3} />

        <div className="card booking-card">

          <span className="section-label">
            Step 3
          </span>

          <h1>
            Confirm Your Booking
          </h1>

          <p>
            Please review the details before
            confirming.
          </p>

          <div className="confirm-grid">

            {/* =================================
                LEFT
            ================================= */}

            <div className="confirm-panel">

              <div className="confirm-mentor">

                <img
                  src={mentorImage}
                  alt={mentorName}
                />

                <div>

                  <h3>
                    {mentorName}
                  </h3>

                  <p>
                    {mentorSubject} Mentor
                  </p>

                  <div className="rating">
                    ★ {mentorRating} · 120+ classes
                  </div>

                </div>

              </div>

              <div className="detail-list">

                {/* DATE */}

                <div className="detail-row">

                  <CalendarDays />

                  <div>

                    <small>
                      Date
                    </small>

                    {formattedDate}

                  </div>

                </div>

                {/* TIME */}

                <div className="detail-row">

                  <Clock3 />

                  <div>

                    <small>
                      Your Local Time
                    </small>

                    {selectedTime}
                    {" "}– {duration} minutes

                  </div>

                </div>

                {/* TIMEZONE */}

                <div className="detail-row">

                  <Globe2 />

                  <div>

                    <small>
                      Your Time Zone
                    </small>

                    {timezone}

                  </div>

                </div>

                {/* COUNTRY */}

                <div className="detail-row">

                  <Globe2 />

                  <div>

                    <small>
                      Country
                    </small>

                    {country}

                  </div>

                </div>

                {/* CLASS TYPE */}

                <div className="detail-row">

                  <Video />

                  <div>

                    <small>
                      Class Type
                    </small>

                    Online Trial Class ·{" "}
                    {duration} minutes

                  </div>

                </div>

              </div>

            </div>

            {/* =================================
                RIGHT
            ================================= */}

            <div className="confirm-message">

              <div className="confirm-message-icon">
                ✓
              </div>

              <h2>
                Everything looks good!
              </h2>

              <p>
                Your mentor has been assigned
                for this trial class.
              </p>

              <p>
                Once you confirm, your dummy
                live-class meeting room will be
                generated for you and your mentor.
              </p>

              <div className="booking-summary">

                <strong>
                  Booking Summary
                </strong>

                <div>
                  <span>Date</span>

                  <strong>
                    {formattedDate}
                  </strong>
                </div>

                <div>
                  <span>Time</span>

                  <strong>
                    {selectedTime}
                  </strong>
                </div>

                <div>
                  <span>Country</span>

                  <strong>
                    {country}
                  </strong>
                </div>

                <div>
                  <span>Timezone</span>

                  <strong>
                    {timezone}
                  </strong>
                </div>

                <div>
                  <span>Mentor</span>

                  <strong>
                    {mentorName}
                  </strong>
                </div>

              </div>

            </div>

          </div>

          {/* =================================
              ACTIONS
          ================================= */}

          <div className="booking-actions">

            <button
              type="button"
              className="secondary-btn"
              onClick={() =>
                navigate(
                  "/book-trial/select-time",
                  {
                    state: booking,
                  }
                )
              }
            >
              ← Back
            </button>

            <button
              type="button"
              className="primary-btn"
              onClick={handleConfirm}
            >
              Confirm Booking
            </button>

          </div>

        </div>

      </main>

      {/* =====================================
          CONFIRMATION POPUP
      ===================================== */}

      {showPopup && (

        <div className="booking-modal-overlay">

          <div
            className={`booking-confirm-modal ${
              isConfirming
                ? "confirming"
                : ""
            }`}
          >

            {!isConfirming ? (

              <>
                <div className="modal-icon">

                  <CheckCircle2 />

                </div>

                <h2>
                  Confirm your trial class?
                </h2>

                <p>
                  Your trial class will be booked
                  with {mentorName}.
                </p>

                <div className="modal-details">

                  <strong>
                    {formattedDate}
                  </strong>

                  <span>
                    {selectedTime}
                  </span>

                  <span>
                    {timezone}
                  </span>

                </div>

                <div className="modal-actions">

                  <button
                    type="button"
                    className="modal-cancel"
                    onClick={() =>
                      setShowPopup(false)
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="modal-confirm"
                    onClick={
                      completeBooking
                    }
                  >
                    Yes, Confirm Booking
                  </button>

                </div>

              </>

            ) : (

              <div className="confirming-content">

                <div className="confirming-spinner">
                  <div />
                </div>

                <h2>
                  Confirming your booking...
                </h2>

                <p>
                  Assigning your mentor and
                  preparing your class.
                </p>

              </div>

            )}

          </div>

        </div>

      )}

    </>
  );
}