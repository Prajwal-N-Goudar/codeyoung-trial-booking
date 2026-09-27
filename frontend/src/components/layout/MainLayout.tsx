import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function MainLayout() {
  return (
    <div className="app-layout">
      <Navbar />

      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
}