import { Link, useLocation } from "react-router-dom";
import {
  CalendarDays,
  CalendarX2,
  ArrowLeft,
  Clock3,
  Globe2,
} from "lucide-react";
import "./NoMentor.css";

export default function NoMentor() {
  const location = useLocation();

  // Get booking information from SelectDateTime page
  const bookingState = location.state as
    | {
        date?: string;
        time?: string;
        timezone?: string;
        country?: string;
        parent?: {
          parentName?: string;
          parentEmail?: string;
          studentName?: string;
          country?: string;
          timezone?: string;
          subject?: string;
        };
      }
    | null;

  const selectedDate = bookingState?.date || "";
  const selectedTime = bookingState?.time || "";
  const selectedTimezone =
    bookingState?.timezone || "America/New_York";

  const studentName =
    bookingState?.parent?.studentName || "";

  // Convert date into a readable format
  const formattedDate = selectedDate
    ? new Date(
        `${selectedDate}T00:00:00`
      ).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <main className="no-mentor-page">
      <section className="no-mentor-container">

        {/* =====================================================
            ILLUSTRATION
        ===================================================== */}

        <div className="no-mentor-illustration">

          <div className="illustration-calendar">

            <div className="calendar-top">
              <span></span>
              <span></span>
            </div>

            <div className="calendar-body">

              <div className="calendar-grid">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </div>

              <div className="calendar-cross">
                <span></span>
                <span></span>
              </div>

            </div>
          </div>

          {/* Plant */}

          <div className="illustration-plant">

            <div className="plant-stem"></div>

            <div className="plant-leaf leaf-one"></div>
            <div className="plant-leaf leaf-two"></div>
            <div className="plant-leaf leaf-three"></div>

            <div className="plant-pot"></div>

          </div>

          {/* Laptop */}

          <div className="illustration-laptop">

            <div className="laptop-screen">
              <div className="laptop-dot"></div>
            </div>

            <div className="laptop-base"></div>

          </div>

          {/* Person */}

          <div className="illustration-person">

            <div className="person-hair"></div>

            <div className="person-face">

              <div className="person-eye eye-one"></div>
              <div className="person-eye eye-two"></div>
              <div className="person-mouth"></div>

            </div>

            <div className="person-body"></div>

          </div>

          {/* Decorative lines */}

          <span className="decor-line line-one"></span>
          <span className="decor-line line-two"></span>

        </div>


        {/* =====================================================
            TITLE
        ===================================================== */}

        <h1>
          No mentors available for this time slot
        </h1>


        {/* =====================================================
            DESCRIPTION
        ===================================================== */}

        <p className="no-mentor-description">

          {studentName
            ? `Sorry! We couldn't find an available mentor for ${studentName}'s trial class at this time.`
            : "Sorry! We couldn't find an available mentor for this time slot."}

          <br />

          Please choose another time or date and we'll
          check the mentor availability again.

        </p>


        {/* =====================================================
            SELECTED SLOT
        ===================================================== */}

        {(selectedDate || selectedTime) && (
          <div
            className="no-mentor-slot"
            style={{
              width: "100%",
              maxWidth: "560px",
              margin: "20px auto 28px",
              padding: "18px 20px",
              borderRadius: "14px",
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              display: "grid",
              gap: "14px",
            }}
          >

            {/* DATE */}

            {selectedDate && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >

                <CalendarDays
                  size={20}
                  color="#2563eb"
                />

                <div>
                  <small
                    style={{
                      display: "block",
                      color: "#64748b",
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    Requested Date
                  </small>

                  <strong
                    style={{
                      color: "#0f172a",
                      fontSize: "14px",
                    }}
                  >
                    {formattedDate}
                  </strong>
                </div>

              </div>
            )}


            {/* TIME */}

            {selectedTime && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >

                <Clock3
                  size={20}
                  color="#2563eb"
                />

                <div>
                  <small
                    style={{
                      display: "block",
                      color: "#64748b",
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    Requested Time
                  </small>

                  <strong
                    style={{
                      color: "#0f172a",
                      fontSize: "14px",
                    }}
                  >
                    {selectedTime}
                  </strong>
                </div>

              </div>
            )}


            {/* TIMEZONE */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >

              <Globe2
                size={20}
                color="#2563eb"
              />

              <div>

                <small
                  style={{
                    display: "block",
                    color: "#64748b",
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  Your Timezone
                </small>

                <strong
                  style={{
                    color: "#0f172a",
                    fontSize: "14px",
                  }}
                >
                  {selectedTimezone}
                </strong>

              </div>

            </div>

          </div>
        )}


        {/* =====================================================
            ACTION BUTTONS
        ===================================================== */}

        <div className="no-mentor-actions">

          <Link
            to="/book-trial/select-time"
            state={{
              parent: bookingState?.parent,
            }}
            className="no-mentor-primary"
          >

            <CalendarDays size={20} />

            <span>
              Choose Another Time Slot
            </span>

          </Link>


          <Link
            to="/book-trial/select-time"
            state={{
              parent: bookingState?.parent,
            }}
            className="no-mentor-secondary"
          >

            <CalendarX2 size={20} />

            <span>
              View Available Dates
            </span>

          </Link>

        </div>


        {/* =====================================================
            SMALL BACK LINK
        ===================================================== */}

        <Link
          to="/book-trial"
          state={{
            parent: bookingState?.parent,
          }}
          className="no-mentor-back"
        >

          <ArrowLeft size={15} />

          Back to Booking

        </Link>

      </section>
    </main>
  );
}