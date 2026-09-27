import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import "./Register.css";

type RegisteredUser = {
  fullName: string;
  email: string;
  password: string;
  createdAt: string;
};

export default function Registration() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!password.trim()) {
      setError("Please create a password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    const user: RegisteredUser = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      password,
      createdAt: new Date().toISOString(),
    };

    /*
     * Save registered parent.
     */
    localStorage.setItem(
      "codeyoung_registered_user",
      JSON.stringify(user)
    );

    /*
     * Save logged-in user.
     */
    localStorage.setItem(
      "codeyoung_current_user",
      JSON.stringify({
        fullName: user.fullName,
        email: user.email,
      })
    );

    /*
     * Go to booking flow.
     */
    navigate("/book-trial");
  };

  return (
    <main className="registration-page">

      <div className="registration-container">

        {/* =====================================================
            LEFT SIDE
        ===================================================== */}

        <section className="registration-visual">

          <div className="registration-overlay"></div>

          <div className="registration-visual-content">

            <div className="visual-badge">
              <CheckCircle2 size={16} />
              Parent Learning Portal
            </div>

            <h2>
              Give Your Child
              <br />
              the Right Learning
              <br />
              Experience.
            </h2>

            <p>
              Connect with expert mentors, explore engaging
              classes and book a personalized trial session
              for your child.
            </p>

            <div className="visual-features">

              <div className="visual-feature">
                <CheckCircle2 size={17} />
                <span>Expert mentors</span>
              </div>

              <div className="visual-feature">
                <CheckCircle2 size={17} />
                <span>Flexible trial classes</span>
              </div>

              <div className="visual-feature">
                <CheckCircle2 size={17} />
                <span>Personalized learning</span>
              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            RIGHT SIDE
        ===================================================== */}

        <section className="registration-form-side">

          <div className="registration-card">

            <div className="registration-header">

              <span className="section-label">
                CREATE ACCOUNT
              </span>

              <h1>
                Create Your Account
              </h1>

              <p>
                Create your parent account to book and manage
                your child's trial classes.
              </p>

            </div>


            <form
              className="registration-form"
              onSubmit={handleRegister}
            >

              {/* FULL NAME */}

              <div className="form-group">

                <label htmlFor="fullName">
                  Full Name
                </label>

                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(e.target.value)
                  }
                />

              </div>


              {/* EMAIL */}

              <div className="form-group">

                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
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
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

                <small>
                  Minimum 6 characters
                </small>

              </div>


              {/* ERROR */}

              {error && (
                <div className="form-error">
                  {error}
                </div>
              )}


              {/* TERMS */}

              <label className="terms-checkbox">

                <input
                  type="checkbox"
                  required
                />

                <span>
                  I agree to the Terms & Conditions and
                  Privacy Policy.
                </span>

              </label>


              {/* SUBMIT */}

              <button
                type="submit"
                className="register-submit"
              >
                Create Account
              </button>

            </form>


            {/* FOOTER */}

            <div className="registration-footer">

              Already have an account?{" "}

              <Link to="/login">
                Sign In
              </Link>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}