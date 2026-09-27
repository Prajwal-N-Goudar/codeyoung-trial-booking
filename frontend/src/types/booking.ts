export type Booking = {
  id: string;

  parentName: string;
  parentEmail: string;

  childName: string;
  childAge: number;

  country: string;
  timezone: string;

  date: string;
  time: string;

  mentorName: string;
  mentorSubject: string;
  mentorImage: string;

  meetingLink: string;

  status: "upcoming" | "completed" | "cancelled";

  createdAt: string;
};