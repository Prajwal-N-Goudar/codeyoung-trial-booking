import "./BookingSteps.css";

const steps = [
  "Your Details",
  "Select Date & Time",
  "Confirm Booking",
  "Meeting Link",
];

export default function BookingSteps({
  current = 1,
}: {
  current?: number;
}) {
  return (
    <div className="booking-steps">
      {steps.map((step, index) => {
        const number = index + 1;

        const isCompleted = number < current;
        const isCurrent = number === current;

        return (
          <div
            className={`booking-step ${
              isCurrent || isCompleted
                ? "active"
                : ""
            }`}
            key={step}
          >
            <div className="booking-step-circle">
              {isCompleted ? "✓" : number}
            </div>

            <span>{step}</span>
          </div>
        );
      })}
    </div>
  );
}