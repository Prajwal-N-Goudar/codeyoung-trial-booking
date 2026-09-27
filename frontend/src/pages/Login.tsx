import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Eye,
  EyeOff,
  GraduationCap,
  CheckCircle2,
} from "lucide-react";

import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.password
    ) {
      alert(
        "Please enter your email and password."
      );
      return;
    }

    console.log("Login:", formData);

    navigate("/dashboard");
  };

  return (
    <main className="login-page">

      <section className="login-container">

        {/* =====================================================
            LEFT VISUAL SECTION
        ===================================================== */}

        <section className="login-visual">

          <div className="login-overlay"></div>

          <div className="login-visual-content">

            <div className="visual-badge">

              <GraduationCap size={15} />

              <span>
                CODEYOUNG FOR PARENTS
              </span>

            </div>

            <h2>
              Welcome back to your
              child's learning journey.
            </h2>

            <p>
              Sign in to manage your
              child's classes, bookings
              and learning experience
              with CodeYoung.
            </p>

            <div className="visual-features">

              <div className="visual-feature">

                <CheckCircle2 size={16} />

                <span>
                  Expert mentors
                </span>

              </div>

              <div className="visual-feature">

                <CheckCircle2 size={16} />

                <span>
                  Live interactive classes
                </span>

              </div>

              <div className="visual-feature">

                <CheckCircle2 size={16} />

                <span>
                  Flexible learning
                </span>

              </div>

              <div className="visual-feature">

                <CheckCircle2 size={16} />

                <span>
                  Easy trial class booking
                </span>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            RIGHT FORM SECTION
        ===================================================== */}

        <section className="login-form-side">

          <div className="login-card">

            {/* HEADER */}

            <div className="login-header">

              <span className="section-label">
                PARENT LOGIN
              </span>

              <h1>
                Welcome back
              </h1>

              <p>
                Sign in to continue managing
                your child's learning journey.
              </p>

            </div>


            {/* FORM */}

            <form
              className="login-form"
              onSubmit={handleSubmit}
            >

              {/* EMAIL */}

              <div className="form-group">

                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />

              </div>


              {/* PASSWORD */}

              <div className="form-group">

                <label htmlFor="password">
                  Password
                </label>

                <div className="password-input-wrapper">

                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >

                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}

                  </button>

                </div>

              </div>


              {/* OPTIONS */}

              <div className="login-options">

                <label className="remember-me">

                  <input
                    type="checkbox"
                  />

                  <span>
                    Remember me
                  </span>

                </label>

                <a href="#forgot">
                  Forgot password?
                </a>

              </div>


              {/* SIGN IN BUTTON */}

              <button
                type="submit"
                className="login-submit"
              >
                Sign In
              </button>

            </form>


            {/* REGISTER */}

            <div className="login-footer">

              <span>
                Don't have an account?
              </span>

              <Link to="/register">
                Create one
              </Link>

            </div>

          </div>

        </section>

      </section>

    </main>
  );
}