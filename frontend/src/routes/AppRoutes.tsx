import { Routes, Route } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import Home from "../pages/Home";
import HowItWorks from "../pages/HowItWorks";
import Mentors from "../pages/Mentors";
import Login from "../pages/Login";
import Register from "../pages/Register";

import ParentDetails from "../pages/ParentDetails";
import SelectDateTime from "../pages/SelectDateTime";
import ConfirmBooking from "../pages/ConfirmBooking";
import BookingSuccess from "../pages/BookingSuccess";
import Dashboard from "../pages/Dashboard";
import NoMentor from "../pages/NoMentor";

export default function AppRoutes() {
  return (
    <Routes>

      {/* ONE NAVBAR FOR THE ENTIRE WEBSITE */}
      <Route element={<MainLayout />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/how-it-works"
          element={<HowItWorks />}
        />

        <Route
          path="/mentors"
          element={<Mentors />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/book-trial"
          element={<ParentDetails />}
        />

        <Route
          path="/book-trial/select-time"
          element={<SelectDateTime />}
        />

        <Route
          path="/confirm-booking"
          element={<ConfirmBooking />}
        />

        <Route
          path="/booking-success"
          element={<BookingSuccess />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/no-mentor"
          element={<NoMentor />}
        />

      </Route>

    </Routes>
  );
}