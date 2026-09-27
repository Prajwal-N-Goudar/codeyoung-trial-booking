import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BookingSteps from "../components/booking/BookingSteps";
import { createParent } from "../services/api";

export default function ParentDetails() {
  const navigate = useNavigate();

  const [saving, setSaving] =
    useState(false);

  const submit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (saving) {
      return;
    }

    const form =
      new FormData(e.currentTarget);

    const parentName = String(
      form.get("parentName") || ""
    );

    const email = String(
      form.get("email") || ""
    );

    const childName = String(
      form.get("childName") || ""
    );

    const childAge = Number(
      form.get("childAge") || 0
    );

    const country = String(
      form.get("country") || ""
    );

    const timezone = String(
      form.get("timezone") || ""
    );

    try {
      setSaving(true);

      // -----------------------------------
      // SAVE PARENT TO BACKEND
      // -----------------------------------

      const response =
        await createParent({
          parentName,
          email,
          timezone,
        });

      if (
        !response?.success ||
        !response?.data
      ) {
        throw new Error(
          "Parent registration failed"
        );
      }

      const parentId =
        response.data.id;

      // -----------------------------------
      // GO TO STEP 2
      // -----------------------------------

      navigate(
        "/book-trial/select-time",
        {
          state: {
            parentId,

            parent: {
              parentName,
              parentEmail: email,
              studentName: childName,
              childAge,
              country,
              timezone,
            },
          },
        }
      );
    } catch (error: any) {
      console.error(
        "Parent registration error:",
        error
      );

      alert(
        error?.message ||
          "Unable to save parent details."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="booking-page">
      <BookingSteps current={1} />

      <form
        className="card booking-card"
        onSubmit={submit}
      >
        <span className="section-label">
          Step 1
        </span>

        <h1>
          Tell us about your child.
        </h1>

        <p>
          We use these details to
          personalize your trial-class
          experience.
        </p>

        <div className="two-column">

          <div className="form-group">
            <label>
              Parent Full Name
            </label>

            <input
              name="parentName"
              className="form-input"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label>
              Email Address
            </label>

            <input
              name="email"
              className="form-input"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>
              Child's Name
            </label>

            <input
              name="childName"
              className="form-input"
              placeholder="Enter child's name"
              required
            />
          </div>

          <div className="form-group">
            <label>
              Child's Age
            </label>

            <input
              name="childAge"
              className="form-input"
              type="number"
              min="4"
              max="18"
              placeholder="Enter age"
              required
            />
          </div>

          <div className="form-group">
            <label>
              Country
            </label>

            <select
              name="country"
              className="form-input"
              required
              defaultValue="United States"
            >
              <option value="United States">
                United States
              </option>

              <option value="United Kingdom">
                United Kingdom
              </option>

              <option value="Canada">
                Canada
              </option>

              <option value="Australia">
                Australia
              </option>

              <option value="India">
                India
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>
              Your Timezone
            </label>

            <select
              name="timezone"
              className="form-input"
              required
              defaultValue="America/New_York"
            >
              <option value="America/New_York">
                America/New_York
              </option>

              <option value="America/Los_Angeles">
                America/Los_Angeles
              </option>

              <option value="America/Chicago">
                America/Chicago
              </option>

              <option value="America/Denver">
                America/Denver
              </option>

              <option value="Europe/London">
                Europe/London
              </option>

              <option value="Europe/Paris">
                Europe/Paris
              </option>

              <option value="Asia/Kolkata">
                Asia/Kolkata
              </option>

              <option value="Australia/Sydney">
                Australia/Sydney
              </option>
            </select>
          </div>
        </div>

        <div className="booking-actions">
          <span />

          <button
            type="submit"
            className="primary-btn"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : "Continue →"}
          </button>
        </div>
      </form>
    </main>
  );
}