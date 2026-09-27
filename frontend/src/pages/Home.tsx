import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock3,
  Globe2,
  GraduationCap,
  UsersRound,
} from "lucide-react";

export default function Home() {
  return (
    <div className="home-page">

      <main>
        {/* HERO */}
        <section className="hero-section">

          <div className="hero-content">

            <div className="online-badge">
              <span className="online-dot"></span>
              Live 1:1 Online Classes
            </div>

            <h1>
              Global Learning
              <br />
              for a Brighter Tomorrow
            </h1>

            <p>
              Personalized 1:1 classes for international students.
              <br />
              Book a free trial class and experience the
              <br />
              Codeyoung difference.
            </p>

            <Link
              to="/book-trial"
              className="hero-button"
            >
              Book a Trial Class
              <ArrowRight size={22} />
            </Link>

          </div>

          {/* HERO VISUAL */}
          <div className="hero-visual">

            <div className="glow-circle"></div>

            <div className="decor globe">◎</div>
            <div className="decor graduation">⌁</div>
            <div className="decor paper-plane">➤</div>

            <div className="student-card">

              <img
                src="/images/student.png"
                alt="Student attending online class"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />

              <div className="student-placeholder">
                <GraduationCap size={70} />
              </div>

            </div>

            <div className="mentor-mini-card">

              <div className="mini-avatar">
                <UsersRound size={20} />
              </div>

              <div>
                <strong>Expert Mentors</strong>
                <small>Ready to teach</small>
              </div>

            </div>

            <div className="class-mini-card">
              <span className="mini-live-dot"></span>
              1:1 Live Class
            </div>

          </div>

        </section>

        {/* FEATURES */}
        <section className="feature-strip">

          <div className="feature-item">

            <div className="feature-icon">
              <UsersRound size={30} />
            </div>

            <div>
              <h3>Expert Mentors</h3>
              <p>Learn from experienced mentors</p>
            </div>

          </div>

          <div className="feature-item">

            <div className="feature-icon">
              <Clock3 size={30} />
            </div>

            <div>
              <h3>Flexible Timing</h3>
              <p>Choose a convenient time</p>
            </div>

          </div>

          <div className="feature-item">

            <div className="feature-icon">
              <Globe2 size={30} />
            </div>

            <div>
              <h3>Global Students</h3>
              <p>Learn from anywhere</p>
            </div>

          </div>

          <div className="feature-item">

            <div className="feature-icon">
              <GraduationCap size={30} />
            </div>

            <div>
              <h3>Personalized Learning</h3>
              <p>Learning designed for your child</p>
            </div>

          </div>

        </section>
      </main>

    </div>
  );
}