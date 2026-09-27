import { Link } from "react-router-dom";
import "./HowItWorks.css";

function CalendarIcon() {
  return (
    <svg viewBox="0 0 64 64" className="how-icon">
      <rect x="10" y="14" width="44" height="40" rx="5" />
      <line x1="10" y1="25" x2="54" y2="25" />
      <line x1="21" y1="9" x2="21" y2="19" />
      <line x1="43" y1="9" x2="43" y2="19" />
      <rect x="20" y="33" width="7" height="7" rx="1" />
      <rect x="36" y="33" width="7" height="7" rx="1" />
    </svg>
  );
}

function MentorIcon() {
  return (
    <svg viewBox="0 0 64 64" className="how-icon">
      <circle cx="32" cy="20" r="11" />
      <path d="M14 53c1-12 8-18 18-18s17 6 18 18" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 64 64" className="how-icon">
      <rect x="8" y="15" width="48" height="34" rx="5" />
      <path d="M10 19l22 18 22-18" />
    </svg>
  );
}

function LaptopIcon() {
  return (
    <svg viewBox="0 0 64 64" className="how-icon">
      <rect x="13" y="9" width="38" height="31" rx="3" />
      <path d="M7 49h50" />
      <path d="M16 49l3-7h26l3 7" />
    </svg>
  );
}

const steps = [
  {
    number: "1",
    title: "Select Date & Time",
    description:
      "Choose a time slot that's convenient for you in your local time.",
    icon: <CalendarIcon />,
  },
  {
    number: "2",
    title: "We Assign a Mentor",
    description:
      "We automatically assign an available mentor for your trial class.",
    icon: <MentorIcon />,
  },
  {
    number: "3",
    title: "Get a Meeting Link",
    description:
      "We email the class link to both you and the mentor.",
    icon: <EmailIcon />,
  },
  {
    number: "4",
    title: "Join the Trial Class",
    description:
      "Join the live class at your scheduled time and experience our learning.",
    icon: <LaptopIcon />,
  },
];

export default function HowItWorks() {
  return (
    <div className="how-page">

      <main className="how-main">

        {/* HERO */}
        <section className="how-hero">

          <p className="how-eyebrow">
            SIMPLE &amp; CONVENIENT
          </p>

          <h1>
            How It Works
          </h1>

          <p className="how-subtitle">
            Booking a trial class is simple and takes just a few minutes.
          </p>

        </section>

        {/* STEPS */}
        <section className="how-steps">

          {steps.map((step, index) => (

            <div
              className="how-step-wrapper"
              key={step.number}
            >

              <article className="how-step">

                <div className="how-icon-circle">
                  {step.icon}
                </div>

                <div className="how-number">
                  {step.number}
                </div>

                <h2>
                  {step.title}
                </h2>

                <p>
                  {step.description}
                </p>

              </article>

              {index < steps.length - 1 && (
                <div
                  className="how-arrow"
                  aria-hidden="true"
                >
                  →
                </div>
              )}

            </div>

          ))}

        </section>

        {/* CTA */}
        <section className="how-bottom">

          <h2>
            Ready to start your child's learning journey?
          </h2>

          <p>
            Choose a convenient time and book a free trial class with
            an expert mentor.
          </p>

          <Link
            to="/book-trial"
            className="how-cta"
          >
            Book a Trial Class
            <span>→</span>
          </Link>

        </section>

      </main>

    </div>
  );
}