import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <Link to="/" className="logo footer-logo">
            <span className="logo-icon">▰</span>
            Codeyoung
          </Link>
          <p>
            Personalized 1:1 learning for international students.
          </p>
        </div>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/mentors">Mentors</Link>
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/book">Book Trial</Link>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 Codeyoung Trial Class Booking
      </div>
    </footer>
  );
}