import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  User,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const links = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      end: true,
    },
    {
      to: "/dashboard/bookings",
      label: "My Bookings",
      icon: CalendarDays,
    },
    {
      to: "/dashboard/profile",
      label: "Profile",
      icon: User,
    },
  ];

  return (
    <aside className="sidebar">
      <div className="logo sidebar-logo">
        <span className="logo-icon">▰</span>
        Codeyoung
      </div>

      <div className="sidebar-links">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          );
        })}

        <NavLink to="/" className="sidebar-link">
          <LogOut size={18} />
          Logout
        </NavLink>
      </div>
    </aside>
  );
}