import type { Booking } from "../types/booking";

export function addToCalendar(booking: Booking) {
  const start = new Date(
    `${booking.date} ${convertTo24Hour(booking.time)}`
  );

  const end = new Date(
    start.getTime() + 30 * 60 * 1000
  );

  const formatDate = (date: Date) => {
    return date
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  };

  const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Codeyoung//Trial Class//EN
BEGIN:VEVENT
UID:${booking.id}@codeyoung.demo
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(start)}
DTEND:${formatDate(end)}
SUMMARY:Codeyoung Trial Class
DESCRIPTION:Trial class with ${booking.mentorName}\\nMeeting Link: ${booking.meetingLink}
LOCATION:${booking.meetingLink}
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([ics], {
    type: "text/calendar;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "codeyoung-trial-class.ics";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

function convertTo24Hour(time: string) {
  const [timePart, modifier] = time.split(" ");

  let [hours, minutes] = timePart.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  }

  if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  return `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:00`;
}