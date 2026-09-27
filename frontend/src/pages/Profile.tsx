import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Dashboard/Sidebar";

export default function Profile() {
  const navigate = useNavigate();

  // ============================================
  // GET CURRENT USER FROM LOCAL STORAGE
  // ============================================

  const getStoredUser = () => {
    const keys = [
      "registeredUser",
      "user",
      "currentUser",
      "parent",
      "parentData",
    ];

    for (const key of keys) {
      const value = localStorage.getItem(key);

      if (!value) {
        continue;
      }

      try {
        return JSON.parse(value);
      } catch {
        continue;
      }
    }

    return null;
  };

  const storedUser = getStoredUser();

  // ============================================
  // PROFILE STATE
  // ============================================

  const [fullName, setFullName] = useState(
    storedUser?.fullName ||
      storedUser?.name ||
      "Parent"
  );

  const [email, setEmail] = useState(
    storedUser?.email ||
      ""
  );

  const [timezone, setTimezone] = useState(
    storedUser?.timezone ||
      "America/New_York"
  );

  const [saving, setSaving] = useState(false);

  // ============================================
  // CREATE INITIALS
  // ============================================

  const initials =
    fullName
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map(
        (name: string) =>
          name.charAt(0).toUpperCase()
      )
      .slice(0, 2)
      .join("") || "P";

  // ============================================
  // SAVE PROFILE
  // ============================================

  const handleSave = () => {
    if (saving) {
      return;
    }

    setSaving(true);

    const updatedUser = {
      ...(storedUser || {}),

      fullName: fullName.trim(),

      name: fullName.trim(),

      email: email.trim(),

      timezone,
    };

    // Save updated information
    localStorage.setItem(
      "registeredUser",
      JSON.stringify(updatedUser)
    );

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    localStorage.setItem(
      "currentUser",
      JSON.stringify(updatedUser)
    );

    localStorage.setItem(
      "parent",
      JSON.stringify(updatedUser)
    );

    localStorage.setItem(
      "parentData",
      JSON.stringify(updatedUser)
    );

    // Small delay so button shows Saving...
    setTimeout(() => {
      setSaving(false);

      // Return to dashboard
      navigate("/dashboard");
    }, 300);
  };

  // ============================================
  // BACK TO DASHBOARD
  // ============================================

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  // ============================================
  // UI
  // ============================================

  return (
    <div className="dashboard-layout">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="dashboard-main">

        {/* HEADER */}
        <div className="dashboard-top">

          <div>
            <h1>Your Profile</h1>

            <p>
              Manage your account details.
            </p>
          </div>

        </div>

        {/* PROFILE CARD */}
        <div className="card profile-card">

          {/* AVATAR */}
          <div
            style={{
              width: 75,
              height: 75,
              borderRadius: "50%",
              background: "#e7edff",
              display: "grid",
              placeItems: "center",
              color: "#2454ff",
              fontWeight: 800,
              fontSize: 24,
              marginBottom: 25,
            }}
          >
            {initials}
          </div>

          {/* FULL NAME */}
          <div className="form-group">

            <label>
              Full Name
            </label>

            <input
              className="form-input"
              type="text"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
              placeholder="Enter your full name"
            />

          </div>

          {/* EMAIL */}
          <div className="form-group">

            <label>
              Email
            </label>

            <input
              className="form-input"
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
            />

          </div>

          {/* TIMEZONE */}
          <div className="form-group">

            <label>
              Timezone
            </label>

            <select
              className="form-input"
              value={timezone}
              onChange={(e) =>
                setTimezone(e.target.value)
              }
            >

              <option value="America/New_York">
                America/New_York
              </option>

              <option value="Europe/London">
                Europe/London
              </option>

              <option value="Asia/Kolkata">
                Asia/Kolkata
              </option>

            </select>

          </div>

          {/* BUTTONS */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "10px",
              flexWrap: "wrap",
            }}
          >

            {/* SAVE */}
            <button
              type="button"
              className="primary-btn"
              onClick={handleSave}
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

            {/* BACK */}
            <button
              type="button"
              className="dashboard-secondary-btn"
              onClick={handleBackToDashboard}
            >
              Back to Dashboard
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}