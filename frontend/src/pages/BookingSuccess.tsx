import {
  CalendarDays,
  Clock3,
  Globe2,
  Video,
  CheckCircle2,
  ExternalLink,
  LayoutDashboard,
  Copy,
  Check,
  Home,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

import BookingSteps from "../components/booking/BookingSteps";

import type { Mentor } from "../services/mentorService";

import "./BookingSuccess.css";

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

  mentorName?: string;
  mentorSubject?: string;
  mentorRating?: string | number;

  meetingLink?: string;
  meetingRoomId?: string;
};

const DEFAULT_MENTOR_IMAGE =
  "https://ul.postcrest.com/page_contents/south-asian-woman-in-studio-headshot-with-clean-gray-background-khczzyiq.png";

function formatDate(dateString?: string) {
  if (!dateString) {
    return "Date not selected";
  }

  const date = new Date(
    `${dateString}T00:00:00`
  );

  if (Number.isNaN(date.getTime())) {
    return "Date not selected";
  }

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BookingSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const [copied, setCopied] =
    useState(false);

  const booking =
    (location.state as BookingState | null) ||
    {};

  const mentor =
    booking.mentor;

  const mentorName =
    booking.mentorName ||
    mentor?.name ||
    "Ananya Sharma";

  const mentorSubject =
    booking.mentorSubject ||
    mentor?.subject ||
    booking.subject ||
    "Mathematics";

  const mentorImage =
    mentor?.image ||
    DEFAULT_MENTOR_IMAGE;

  const mentorRating =
    booking.mentorRating ||
    mentor?.rating ||
    "4.9";

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

  const meetingLink =
    booking.meetingLink ||
    `${window.location.origin}/meeting-room/trial-12345`;

  const handleJoinClass = () => {
    window.open(
      meetingLink,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        meetingLink
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);

    } catch {
      alert(
        "Unable to copy the meeting link."
      );
    }
  };

  const handleAddToCalendar = () => {

    if (!selectedDate) {
      alert("Booking date is missing.");
      return;
    }

    const [timePart, meridiem] =
      selectedTime.split(" ");

    const [hoursText, minutesText] =
      timePart.split(":");

    let hours = Number(hoursText);

    if (
      meridiem === "PM" &&
      hours !== 12
    ) {
      hours += 12;
    }

    if (
      meridiem === "AM" &&
      hours === 12
    ) {
      hours = 0;
    }

    const startDate = new Date(
      `${selectedDate}T${String(hours).padStart(
        2,
        "0"
      )}:${minutesText}:00`
    );

    const endDate = new Date(
      startDate.getTime() +
        duration * 60 * 1000
    );

    const formatGoogleDate = (
      date: Date
    ) => {
      return date
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}/, "");
    };

    const start =
      formatGoogleDate(startDate);

    const end =
      formatGoogleDate(endDate);

    const calendarUrl =
      `https://calendar.google.com/calendar/render?action=TEMPLATE` +
      `&text=${encodeURIComponent(
        "Codeyoung Trial Class"
      )}` +
      `&dates=${start}/${end}` +
      `&details=${encodeURIComponent(
        `Trial class with ${mentorName}. Meeting Link: ${meetingLink}`
      )}` +
      `&location=${encodeURIComponent(
        meetingLink
      )}`;

    window.open(
      calendarUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <main className="success-page">

      <BookingSteps current={4} />

      {/* CONFETTI */}

      <div
        className="party-animation"
        aria-hidden="true"
      >

        <div className="party-popper party-left">
          <div className="popper-body">
            🎉
          </div>
        </div>

        <div className="party-popper party-right">
          <div className="popper-body">
            🎉
          </div>
        </div>

        <div className="confetti-container">

          {Array.from({
            length: 70,
          }).map((_, index) => (

            <span
              key={index}
              className={`confetti confetti-${
                (index % 6) + 1
              }`}
              style={{
                left: `${
                  5 +
                  ((index * 37) % 90)
                }%`,
                animationDelay: `${
                  (index % 18) * 0.08
                }s`,
                animationDuration: `${
                  2.8 +
                  (index % 5) * 0.35
                }s`,
              }}
            />

          ))}

        </div>

      </div>

      {/* SUCCESS CARD */}

      <section className="success-card">

        <div className="success-icon-wrapper">

          <div className="success-icon-ring">

            <CheckCircle2
              size={46}
              strokeWidth={2.4}
            />

          </div>

        </div>

        <span className="success-label">
          STEP 4 · BOOKING CONFIRMED
        </span>

        <h1>
          Your Trial Class is Booked!
          <span className="title-party">
            🎉
          </span>
        </h1>

        <p className="success-description">
          Your mentor has been assigned
          successfully. Your trial class is
          ready to go.
        </p>

        {/* MENTOR */}

        <div className="success-mentor">

          <div className="mentor-image-wrapper">

            <img
              src={mentorImage}
              alt={mentorName}
            />

            <span className="online-dot" />

          </div>

          <div className="mentor-info">

            <h3>
              {mentorName}
            </h3>

            <p>
              {mentorSubject} Mentor
            </p>

            <div className="mentor-rating">

              <span>★</span>

              <strong>
                {mentorRating}
              </strong>

              <span>
                · Online Trial Class
              </span>

            </div>

          </div>

          <div className="assigned-badge">
            <Check size={13} />
            Assigned
          </div>

        </div>

        {/* BOOKING DETAILS */}

        <div className="success-details">

          <div className="success-detail">

            <div className="detail-icon">
              <CalendarDays size={18} />
            </div>

            <div>

              <small>
                Date
              </small>

              <strong>
                {formatDate(selectedDate)}
              </strong>

            </div>

          </div>

          <div className="success-detail">

            <div className="detail-icon">
              <Clock3 size={18} />
            </div>

            <div>

              <small>
                Your Local Time
              </small>

              <strong>
                {selectedTime}
                {" · "}
                {duration} minutes
              </strong>

            </div>

          </div>

          <div className="success-detail">

            <div className="detail-icon">
              <Globe2 size={18} />
            </div>

            <div>

              <small>
                Your Time Zone
              </small>

              <strong>
                {timezone}
              </strong>

            </div>

          </div>

          <div className="success-detail">

            <div className="detail-icon">
              <Video size={18} />
            </div>

            <div>

              <small>
                Class Type
              </small>

              <strong>
                Online Trial Class
              </strong>

            </div>

          </div>

        </div>

        {/* MEETING LINK */}

        <div className="meeting-section">

          <div className="meeting-header">

            <div className="meeting-title">

              <div className="meeting-icon">
                <Video size={17} />
              </div>

              <div>

                <strong>
                  Your Meeting Link
                </strong>

                <span>
                  Share this link with your mentor
                </span>

              </div>

            </div>

            <span className="meeting-ready">
              ● Ready
            </span>

          </div>

          <div className="meeting-link-row">

            <div className="meeting-link">
              {meetingLink}
            </div>

            <button
              type="button"
              className="copy-button"
              onClick={handleCopyLink}
            >

              {copied ? (
                <>
                  <Check size={15} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={15} />
                  Copy
                </>
              )}

            </button>

          </div>

          <button
            type="button"
            className="join-class-button"
            onClick={handleJoinClass}
          >

            <Video size={18} />

            Join Your Trial Class

            <ExternalLink size={16} />

          </button>

        </div>

        {/* MESSAGE */}

        <div className="success-message">

          <div className="success-message-icon">
            ✓
          </div>

          <div>

            <strong>
              Everything is ready!
            </strong>

            <p>
              Your mentor has received the
              same meeting details. We look
              forward to seeing you in class.
            </p>

          </div>

        </div>

        {/* ACTIONS */}

        <div className="success-actions">

          <button
            type="button"
            className="calendar-button"
            onClick={handleAddToCalendar}
          >
            <CalendarDays size={16} />
            Add to Calendar
          </button>

          <button
            type="button"
            className="dashboard-button"
            onClick={handleDashboard}
          >
            <LayoutDashboard size={16} />
            Go to Dashboard
          </button>

        </div>

        {/* FOOTER */}

        <div className="success-footer">

          <div>

            <span>
              Booking for
            </span>

            <strong>
              {booking.studentName ||
                "Your child"}
            </strong>

          </div>

          <div>

            <span>
              Country
            </span>

            <strong>
              {country}
            </strong>

          </div>

          <button
            type="button"
            onClick={handleHome}
          >
            <Home size={14} />
            Back to Home
          </button>

        </div>

      </section>

    </main>
  );
}