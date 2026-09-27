import { useState } from "react";
import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  Menu,
  X,
} from "lucide-react";

import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();

  const [menuOpen, setMenuOpen] =
    useState(false);

  // =========================================
  // CHECK ACTIVE PAGE
  // =========================================

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Book Trial pages should keep
  // Book a Trial Class active
  const isBookingActive =
    location.pathname.startsWith(
      "/book-trial"
    ) ||
    location.pathname === "/confirm-booking" ||
    location.pathname === "/booking-success" ||
    location.pathname === "/no-mentor";

  // =========================================
  // CLOSE MOBILE MENU
  // =========================================

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* =====================================
          COMMON NAVBAR
      ===================================== */}

      <header className="main-navbar">

        <div className="navbar-inner">

          {/* =================================
              LOGO
          ================================= */}

          <Link
            to="/"
            className="navbar-logo"
            onClick={closeMenu}
          >
            <span className="navbar-logo-mark">
              <span></span>
            </span>

            <span className="navbar-logo-text">
              Codeyoung
            </span>
          </Link>


          {/* =================================
              DESKTOP NAVIGATION
          ================================= */}

          <nav className="navbar-links">

            {/* HOME */}

            <Link
              to="/"
              className={
                isActive("/")
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Home
            </Link>


            {/* BOOK TRIAL */}

            <Link
              to="/book-trial"
              className={
                isBookingActive
                  ? "nav-link trial-link active"
                  : "nav-link trial-link"
              }
            >
              Book a Trial Class
            </Link>


            {/* MENTORS */}

            <Link
              to="/mentors"
              className={
                isActive("/mentors")
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Our Mentors
            </Link>


            {/* HOW IT WORKS */}

            <Link
              to="/how-it-works"
              className={
                isActive("/how-it-works")
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              How It Works
            </Link>

          </nav>


          {/* =================================
              DESKTOP SIGN IN
          ================================= */}

          <Link
            to="/login"
            className={
              isActive("/login")
                ? "navbar-signin active-signin"
                : "navbar-signin"
            }
          >
            Sign In
          </Link>


          {/* =================================
              MOBILE HAMBURGER BUTTON
          ================================= */}

          <button
            type="button"
            className="mobile-menu-button"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>

        </div>

      </header>


      {/* =====================================
          MOBILE MENU OVERLAY
      ===================================== */}

      <div
        className={
          menuOpen
            ? "mobile-menu-overlay open"
            : "mobile-menu-overlay"
        }
        onClick={closeMenu}
      >

        {/* ===================================
            MOBILE SIDE MENU
        =================================== */}

        <div
          className="mobile-menu"
          onClick={(event) =>
            event.stopPropagation()
          }
        >

          {/* =================================
              MOBILE MENU HEADER
          ================================= */}

          <div className="mobile-menu-header">

            <Link
              to="/"
              className="mobile-menu-logo"
              onClick={closeMenu}
            >

              <span className="navbar-logo-mark">
                <span></span>
              </span>

              <span className="navbar-logo-text">
                Codeyoung
              </span>

            </Link>


            {/* CLOSE */}

            <button
              type="button"
              className="mobile-close-button"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <X size={23} />
            </button>

          </div>


          {/* =================================
              MOBILE NAVIGATION
          ================================= */}

          <nav className="mobile-nav">

            {/* HOME */}

            <Link
              to="/"
              className={
                isActive("/")
                  ? "mobile-nav-link active"
                  : "mobile-nav-link"
              }
              onClick={closeMenu}
            >
              Home
            </Link>


            {/* BOOK TRIAL */}

            <Link
              to="/book-trial"
              className={
                isBookingActive
                  ? "mobile-nav-link active"
                  : "mobile-nav-link"
              }
              onClick={closeMenu}
            >
              Book a Trial Class
            </Link>


            {/* MENTORS */}

            <Link
              to="/mentors"
              className={
                isActive("/mentors")
                  ? "mobile-nav-link active"
                  : "mobile-nav-link"
              }
              onClick={closeMenu}
            >
              Our Mentors
            </Link>


            {/* HOW IT WORKS */}

            <Link
              to="/how-it-works"
              className={
                isActive("/how-it-works")
                  ? "mobile-nav-link active"
                  : "mobile-nav-link"
              }
              onClick={closeMenu}
            >
              How It Works
            </Link>

          </nav>


          {/* =================================
              MOBILE SIGN IN
          ================================= */}

          <Link
            to="/login"
            className={
              isActive("/login")
                ? "mobile-signin active"
                : "mobile-signin"
            }
            onClick={closeMenu}
          >
            Sign In
          </Link>


          {/* =================================
              MOBILE FOOTER
          ================================= */}

          <div className="mobile-menu-footer">
            <span>
              Learn. Grow. Succeed.
            </span>
          </div>

        </div>

      </div>
    </>
  );
}