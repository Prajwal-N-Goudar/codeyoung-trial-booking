import Sidebar from "../components/Dashboard/Sidebar";

export default function MyBookings() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <div className="dashboard-top">
          <div>
            <h1>My Bookings</h1>
            <p>Manage your child's trial classes.</p>
          </div>
        </div>

        <div className="card dashboard-content">
          <div className="booking-row">
            <div className="booking-person">
              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=200&q=80"
                alt="Priya Sharma"
              />

              <div>
                <strong>Priya Sharma</strong>
                <p>Mathematics Mentor</p>
                <small>
                  March 15, 2026 · 10:00 AM – 10:30 AM EST
                </small>
              </div>
            </div>

            <span className="status upcoming">
              Upcoming
            </span>
          </div>

          <div className="booking-row">
            <div className="booking-person">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
                alt="Rahul Mehta"
              />

              <div>
                <strong>Rahul Mehta</strong>
                <p>Science Mentor</p>
                <small>February 20, 2026</small>
              </div>
            </div>

            <span className="status completed">
              Completed
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}