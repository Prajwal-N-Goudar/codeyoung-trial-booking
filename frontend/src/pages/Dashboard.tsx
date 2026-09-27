import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  Video,
  User,
  LogOut,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import "./Dashboard.css";

type UserData = {
  fullName?: string;
  name?: string;
  email?: string;
};

type BookingData = {
  id?: string;

  parentName?: string;
  parentEmail?: string;

  mentorName?: string;
  mentorEmail?: string;
  mentorSubject?: string;
  mentorImage?: string;

  date?: string;
  selectedDate?: string;

  time?: string;
  selectedTime?: string;

  timezone?: string;
  country?: string;

  meetingLink?: string;
  classType?: string;
  duration?: number;

  status?: string;
};

const MENTOR_IMAGES: Record<string, string> = {
  "Ananya Sharma":
    "https://ul.postcrest.com/page_contents/south-asian-woman-in-studio-headshot-with-clean-gray-background-khczzyiq.png",

  "Rahul Kumar":
    "https://ul.postcrest.com/page_contents/south-asian-man-in-studio-headshot-with-clean-resume-photo-crop-kibhxse.png",

  "Priya Nair":
    "https://ul.postcrest.com/page_contents/south-asian-woman-studio-headshot-with-beauty-lighting-and-warm-beige-backdrop-dxzzfu20.png",

  "Arjun Rao":
    "https://ul.postcrest.com/page_contents/south-asian-man-studio-headshot-in-light-gray-suit-modern-professional-portrait-ofrcysn0.png",

  "Sneha Patel":
    "https://ul.postcrest.com/page_contents/south-asian-woman-studio-3-4-portrait-premium-professional-ai-headshot-f5vnl8hc.png",

  "Vikram Singh":
    "https://ul.postcrest.com/page_contents/south-asian-man-in-navy-suit-studio-3-4-portrait-for-professional-ai-headshot-stwzdaxb.png",

  "Kavya Reddy":
    "https://ul.postcrest.com/page_contents/south-asian-female-attorney-studio-headshot-with-deep-blue-background-partner-ready-8okpakbb.png",

  "Rohan Mehta":
    "https://ul.postcrest.com/page_contents/south-asian-man-with-arms-crossed-on-gray-studio-background-headshot-b85bg3rc.png",

  "Neha Joshi":
    "https://ul.postcrest.com/page_contents/south-asian-woman-at-home-against-white-wall-warm-profile-headshot-ldbgt3yc.png",

  "Aditya Verma":
    "https://ul.postcrest.com/page_contents/south-asian-man-on-high-key-white-seamless-with-rim-separation-and-crisp-catchlights-zlt330s.png",
};

function readStorage<T>(keys: string[]): T | null {
  for (const key of keys) {
    const value = localStorage.getItem(key);

    if (!value) continue;

    try {
      return JSON.parse(value) as T;
    } catch {
      continue;
    }
  }

  return null;
}

function getUser(): UserData | null {
  return readStorage<UserData>([
    "registeredUser",
    "user",
    "currentUser",
    "parent",
    "parentData",
  ]);
}

function getBooking(): BookingData | null {
  return readStorage<BookingData>([
    "latestBooking",
    "bookingData",
    "booking",
    "currentBooking",
    "confirmedBooking",
  ]);
}

export default function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserData | null>(null);
  const [booking, setBooking] = useState<BookingData | null>(null);

  const loadDashboard = () => {
    const currentUser = getUser();
    const currentBooking = getBooking();

    setUser(currentUser);
    setBooking(currentBooking);
  };

  useEffect(() => {
    loadDashboard();

    const handleStorageChange = () => {
      loadDashboard();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  /*
   * Also refresh when coming back to dashboard.
   */
  useEffect(() => {
    const handleFocus = () => {
      loadDashboard();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const parentName =
    user?.fullName ||
    user?.name ||
    booking?.parentName ||
    "Parent";

  const parentEmail =
    user?.email ||
    booking?.parentEmail ||
    "";

  const mentorName = booking?.mentorName || "Mentor";

  const mentorImage =
    booking?.mentorImage ||
    MENTOR_IMAGES[mentorName] ||
    MENTOR_IMAGES["Ananya Sharma"];

  const bookingDate =
    booking?.selectedDate ||
    booking?.date ||
    "";

  const bookingTime =
    booking?.selectedTime ||
    booking?.time ||
    "";

  const timezone =
    booking?.timezone ||
    "America/New_York";

  const country =
    booking?.country ||
    "United States";

  const meetingLink =
    booking?.meetingLink ||
    "https://meet.codeyoung.demo/trial";

  const classType =
    booking?.classType ||
    "Online Trial Class";

  const duration =
    booking?.duration ||
    30;

  const hasBooking = Boolean(
    booking &&
      (bookingDate || bookingTime || booking.mentorName)
  );

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <main className="dashboard-main">

      {/* =====================================================
          DASHBOARD HEADER
      ===================================================== */}

      <section className="dashboard-top">

        <div>
          <h1>
            Welcome back, {parentName}!
          </h1>

          <p>
            Here&apos;s an overview of your trial classes.
          </p>
        </div>

        <div className="dashboard-user">

          <User size={20} />

          <div>
            <strong>
              {parentName}
            </strong>

            <span>
              {parentEmail || "Parent account"}
            </span>
          </div>

        </div>

      </section>


      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <section className="dashboard-stats">

        <div className="card dashboard-stat">

          <span>
            Upcoming Classes
          </span>

          <strong>
            {hasBooking ? 1 : 0}
          </strong>

        </div>


        <div className="card dashboard-stat">

          <span>
            Completed Classes
          </span>

          <strong>
            0
          </strong>

        </div>


        <div className="card dashboard-stat">

          <span>
            Cancelled Classes
          </span>

          <strong>
            0
          </strong>

        </div>

      </section>


      {/* =====================================================
          UPCOMING CLASS
      ===================================================== */}

      <section className="dashboard-section">

        <div className="dashboard-section-header">

          <h2>
            Upcoming Class
          </h2>

        </div>


        {hasBooking ? (

          <div className="card upcoming-class">

            <div className="class-left">

              <div className="class-icon">
                <Video size={22} />
              </div>


              <div className="class-info">

                <h3>
                  {mentorName}
                </h3>

                <p>
                  {booking?.mentorSubject || "Trial Class Mentor"}
                </p>


                <div className="class-details">

                  <span>
                    <CalendarDays size={14} />

                    {bookingDate || "Date selected"}
                  </span>


                  <span>
                    <Clock3 size={14} />

                    {bookingTime || "Time selected"}
                  </span>


                  <span>
                    {timezone}
                  </span>

                </div>

              </div>

            </div>


            <button
              className="join-class-btn"
              onClick={() => {
                window.open(
                  meetingLink,
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
            >
              Join Class
            </button>

          </div>

        ) : (

          <div className="card empty-dashboard">

            <CalendarDays size={38} />

            <h3>
              No Upcoming Classes
            </h3>

            <p>
              You don&apos;t have any upcoming trial classes.
            </p>

            <Link
              to="/book-trial"
              className="book-dashboard-btn"
            >
              Book a Trial Class
            </Link>

          </div>

        )}

      </section>


      {/* =====================================================
          BOOKING DETAILS
      ===================================================== */}

      {hasBooking && (

        <section className="dashboard-section">

          <div className="dashboard-section-header">

            <h2>
              Booking Details
            </h2>

          </div>


          <div className="card booking-live-card">

            <div className="booking-live-mentor">

              <img
                src={mentorImage}
                alt={mentorName}
              />

              <div>

                <h3>
                  {mentorName}
                </h3>

                <p>
                  {booking?.mentorSubject ||
                    "Trial Class Mentor"}
                </p>

              </div>

            </div>


            <div className="booking-live-details">

              <div>
                <small>
                  Date
                </small>

                <strong>
                  {bookingDate || "Not selected"}
                </strong>
              </div>


              <div>
                <small>
                  Time
                </small>

                <strong>
                  {bookingTime || "Not selected"}
                </strong>
              </div>


              <div>
                <small>
                  Country
                </small>

                <strong>
                  {country}
                </strong>
              </div>


              <div>
                <small>
                  Timezone
                </small>

                <strong>
                  {timezone}
                </strong>
              </div>


              <div>
                <small>
                  Class
                </small>

                <strong>
                  {classType}
                </strong>
              </div>


              <div>
                <small>
                  Duration
                </small>

                <strong>
                  {duration} minutes
                </strong>
              </div>

            </div>


            <div className="booking-live-actions">

              <button
                className="dashboard-secondary-btn"
                onClick={() =>
                  navigator.clipboard.writeText(meetingLink)
                }
              >
                Copy Meeting Link
              </button>


              <button
                className="dashboard-primary-btn"
                onClick={() => {
                  window.open(
                    meetingLink,
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
              >
                <Video size={15} />
                Join Class
              </button>

            </div>

          </div>

        </section>

      )}


      {/* =====================================================
          PAST BOOKINGS
      ===================================================== */}

      <section className="dashboard-section">

        <div className="dashboard-section-header">

          <h2>
            Past Bookings
          </h2>

        </div>


        <div className="card past-bookings">

          <div className="empty-past-bookings">

            <BookOpen size={25} />

            <p>
              No completed bookings yet.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          ACCOUNT
      ===================================================== */}

      <section className="dashboard-section">

        <div className="dashboard-section-header">

          <h2>
            Your Account
          </h2>

        </div>


        <div className="card account-card">

          <div className="account-avatar">
            {parentName.charAt(0).toUpperCase()}
          </div>


          <div className="account-info">

            <h3>
              {parentName}
            </h3>

            <p>
              {parentEmail || "Parent account"}
            </p>

          </div>


          <button
            className="profile-btn"
            onClick={() => navigate("/profile")}
          >
            View Profile
          </button>

        </div>

      </section>


      {/* =====================================================
          LOGOUT
      ===================================================== */}

      <div className="dashboard-logout">

        <button onClick={handleLogout}>

          <LogOut size={15} />

          Logout

        </button>

      </div>

    </main>
  );
}