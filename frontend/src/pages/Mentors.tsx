import { useEffect, useMemo, useState } from "react";
import "./Mentors.css";
import { getMentors } from "../services/api";

type Mentor = {
  id: number;
  name: string;
  email?: string;
  timezone: string;
  working_start?: string;
  working_end?: string;
  is_active?: boolean;

  // Frontend display information
  subject: string;
  rating: number;
  classes: number;
  image: string;
};

type BackendMentor = {
  id: number;
  name: string;
  email?: string;
  timezone: string;
  working_start?: string;
  working_end?: string;
  is_active?: boolean;
};

/*
 * These are frontend display details.
 * The actual mentor records come from the Node.js backend.
 */
const mentorProfiles: Record<
  number,
  {
    subject: string;
    rating: number;
    classes: number;
    image: string;
  }
> = {
  1: {
    subject: "Maths",
    rating: 4.9,
    classes: 120,
    image:
      "https://ul.postcrest.com/page_contents/south-asian-woman-in-studio-headshot-with-clean-gray-background-khczzyiq.png",
  },

  2: {
    subject: "Science",
    rating: 4.8,
    classes: 105,
    image:
      "https://ul.postcrest.com/page_contents/south-asian-man-in-studio-headshot-with-clean-resume-photo-crop-kibhxse.png",
  },

  3: {
    subject: "English",
    rating: 4.9,
    classes: 132,
    image:
      "https://ul.postcrest.com/page_contents/south-asian-woman-studio-headshot-with-beauty-lighting-and-warm-beige-backdrop-dxzzfu20.png",
  },

  4: {
    subject: "Coding",
    rating: 4.8,
    classes: 118,
    image:
      "https://ul.postcrest.com/page_contents/south-asian-man-studio-headshot-in-light-gray-suit-modern-professional-portrait-ofrcysn0.png",
  },

  5: {
    subject: "Maths",
    rating: 5.0,
    classes: 145,
    image:
      "https://ul.postcrest.com/page_contents/south-asian-woman-studio-3-4-portrait-premium-professional-ai-headshot-f5vnl8hc.png",
  },

  6: {
    subject: "Science",
    rating: 4.7,
    classes: 98,
    image:
      "https://ul.postcrest.com/page_contents/south-asian-man-in-navy-suit-studio-3-4-portrait-for-professional-ai-headshot-stwzdaxb.png",
  },

  7: {
    subject: "English",
    rating: 4.9,
    classes: 127,
    image:
      "https://ul.postcrest.com/page_contents/south-asian-female-attorney-studio-headshot-with-deep-blue-background-partner-ready-8okpakbb.png",
  },

  8: {
    subject: "Coding",
    rating: 4.8,
    classes: 110,
    image:
      "https://ul.postcrest.com/page_contents/south-asian-man-with-arms-crossed-on-gray-studio-background-headshot-b85bg3rc.png",
  },

  9: {
    subject: "Maths",
    rating: 4.9,
    classes: 136,
    image:
      "https://ul.postcrest.com/page_contents/south-asian-woman-at-home-against-white-wall-warm-profile-headshot-ldbgt3yc.png",
  },

  10: {
    subject: "Coding",
    rating: 4.8,
    classes: 115,
    image:
      "https://ul.postcrest.com/page_contents/south-asian-man-on-high-key-white-seamless-with-rim-separation-and-crisp-catchlights-zlt330s.png",
  },
};

function SearchIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export default function Mentors() {
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("All Subjects");

  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /*
   * Get mentors from Node.js backend.
   */
  useEffect(() => {
    let mounted = true;

    async function loadMentors() {
      try {
        setLoading(true);
        setError("");

        const response = await getMentors();

        /*
         * Your backend returns:
         * {
         *   success: true,
         *   data: [...]
         * }
         *
         * This also supports a direct array response.
         */
        const backendMentors: BackendMentor[] = Array.isArray(
          response
        )
          ? response
          : response?.data ?? [];

        const formattedMentors: Mentor[] =
          backendMentors.map((mentor) => {
            const profile =
              mentorProfiles[mentor.id];

            return {
              id: mentor.id,
              name: mentor.name,
              email: mentor.email,
              timezone:
                mentor.timezone || "Asia/Kolkata",
              working_start:
                mentor.working_start,
              working_end:
                mentor.working_end,
              is_active: mentor.is_active,

              subject:
                profile?.subject || "Coding",

              rating:
                profile?.rating || 4.8,

              classes:
                profile?.classes || 0,

              image:
                profile?.image || "",
            };
          });

        if (mounted) {
          setMentors(formattedMentors);
        }
      } catch (err) {
        console.error(
          "Unable to load mentors:",
          err
        );

        if (mounted) {
          setError(
            "Unable to load mentors from the server."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadMentors();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredMentors = useMemo(() => {
    return mentors.filter((mentor) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        mentor.name
          .toLowerCase()
          .includes(searchText) ||
        mentor.subject
          .toLowerCase()
          .includes(searchText);

      const matchesSubject =
        subject === "All Subjects" ||
        mentor.subject === subject;

      return matchesSearch && matchesSubject;
    });
  }, [mentors, search, subject]);

  return (
    <div className="mentors-page">
      <main className="mentors-main">
        {/* HEADER */}
        <section className="mentors-header">
          <div>
            <h1>Our Mentors</h1>

            <p>
              Meet our expert mentors who love teaching
              and helping students grow.
            </p>
          </div>

          {/* FILTERS */}
          <div className="mentor-filters">
            <div className="mentor-search">
              <SearchIcon />

              <input
                type="text"
                placeholder="Search mentors..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>

            <select
              value={subject}
              onChange={(e) =>
                setSubject(e.target.value)
              }
              className="mentor-select"
            >
              <option>All Subjects</option>
              <option>Maths</option>
              <option>Science</option>
              <option>English</option>
              <option>Coding</option>
            </select>
          </div>
        </section>

        {/* LOADING */}
        {loading && (
          <div className="mentor-empty">
            <h2>Loading mentors...</h2>
            <p>
              Fetching our mentors from the server.
            </p>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="mentor-empty">
            <div className="empty-icon">⚠️</div>

            <h2>Unable to load mentors</h2>

            <p>{error}</p>
          </div>
        )}

        {/* MENTOR GRID */}
        {!loading &&
          !error &&
          filteredMentors.length > 0 && (
            <section className="mentor-grid">
              {filteredMentors.map((mentor) => (
                <article
                  className="mentor-card"
                  key={mentor.id}
                >
                  <div className="mentor-photo-wrapper">
                    <img
                      src={mentor.image}
                      alt={`${mentor.name} - ${mentor.subject} mentor`}
                      className="mentor-photo"
                      loading="lazy"
                    />

                    <span
                      className="mentor-online-dot"
                      title={
                        mentor.is_active
                          ? "Available"
                          : "Unavailable"
                      }
                    />
                  </div>

                  <div className="mentor-info">
                    <h2>{mentor.name}</h2>

                    <p className="mentor-subject">
                      {mentor.subject}
                    </p>

                    <div className="mentor-rating">
                      <span className="star">
                        ★
                      </span>

                      <strong>
                        {mentor.rating}
                      </strong>

                      <span className="class-count">
                        ({mentor.classes}+ classes)
                      </span>
                    </div>

                    <div className="mentor-timezone">
                      <ClockIcon />

                      <span>
                        {mentor.timezone ===
                        "Asia/Kolkata"
                          ? "IST (India)"
                          : mentor.timezone}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          )}

        {/* NO RESULTS */}
        {!loading &&
          !error &&
          filteredMentors.length === 0 && (
            <div className="mentor-empty">
              <div className="empty-icon">
                🔍
              </div>

              <h2>No mentors found</h2>

              <p>
                Try another mentor name or subject.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setSubject("All Subjects");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
      </main>
    </div>
  );
}