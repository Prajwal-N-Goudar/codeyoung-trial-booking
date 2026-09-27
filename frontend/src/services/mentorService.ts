// =========================================
// MENTOR SERVICE
// =========================================

export interface Mentor {
  id: number;
  name: string;
  email: string;
  subject: string;
  rating: number;
  classes: number;
  timezone: string;
  country: string;
  active: boolean;
  image: string;
}

// =========================================
// 10 CODEYOUNG MENTORS
// =========================================

export const mentors: Mentor[] = [
  {
    id: 1,
    name: "Ananya Sharma",
    email: "ananya@codeyoung.demo",
    subject: "Mathematics",
    rating: 4.9,
    classes: 120,
    timezone: "Asia/Kolkata",
    country: "India",
    active: true,
    image:
      "https://ul.postcrest.com/page_contents/south-asian-woman-in-studio-headshot-with-clean-gray-background-khczzyiq.png",
  },

  {
    id: 2,
    name: "Rahul Kumar",
    email: "rahul@codeyoung.demo",
    subject: "Science",
    rating: 4.8,
    classes: 108,
    timezone: "Asia/Kolkata",
    country: "India",
    active: true,
    image:
      "https://ul.postcrest.com/page_contents/south-asian-man-in-studio-headshot-with-clean-resume-photo-crop-kibhxse.png",
  },

  {
    id: 3,
    name: "Priya Nair",
    email: "priya@codeyoung.demo",
    subject: "English",
    rating: 4.9,
    classes: 115,
    timezone: "Asia/Kolkata",
    country: "India",
    active: true,
    image:
      "https://ul.postcrest.com/page_contents/south-asian-woman-studio-headshot-with-beauty-lighting-and-warm-beige-backdrop-dxzzfu20.png",
  },

  {
    id: 4,
    name: "Arjun Rao",
    email: "arjun@codeyoung.demo",
    subject: "Coding",
    rating: 4.8,
    classes: 102,
    timezone: "Asia/Kolkata",
    country: "India",
    active: true,
    image:
      "https://ul.postcrest.com/page_contents/south-asian-man-studio-headshot-in-light-gray-suit-modern-professional-portrait-ofrcysn0.png",
  },

  {
    id: 5,
    name: "Sneha Patel",
    email: "sneha@codeyoung.demo",
    subject: "Mathematics",
    rating: 4.9,
    classes: 97,
    timezone: "Asia/Kolkata",
    country: "India",
    active: true,
    image:
      "https://ul.postcrest.com/page_contents/south-asian-woman-studio-3-4-portrait-premium-professional-ai-headshot-f5vnl8hc.png",
  },

  {
    id: 6,
    name: "Vikram Singh",
    email: "vikram@codeyoung.demo",
    subject: "Science",
    rating: 4.7,
    classes: 94,
    timezone: "Asia/Kolkata",
    country: "India",
    active: true,
    image:
      "https://ul.postcrest.com/page_contents/south-asian-man-in-navy-suit-studio-3-4-portrait-for-professional-ai-headshot-stwzdaxb.png",
  },

  {
    id: 7,
    name: "Kavya Reddy",
    email: "kavya@codeyoung.demo",
    subject: "English",
    rating: 4.9,
    classes: 110,
    timezone: "Asia/Kolkata",
    country: "India",
    active: true,
    image:
      "https://ul.postcrest.com/page_contents/south-asian-female-attorney-studio-headshot-with-deep-blue-background-partner-ready-8okpakbb.png",
  },

  {
    id: 8,
    name: "Rohan Mehta",
    email: "rohan@codeyoung.demo",
    subject: "Coding",
    rating: 4.8,
    classes: 88,
    timezone: "Asia/Kolkata",
    country: "India",
    active: true,
    image:
      "https://ul.postcrest.com/page_contents/south-asian-man-with-arms-crossed-on-gray-studio-background-headshot-b85bg3rc.png",
  },

  {
    id: 9,
    name: "Neha Joshi",
    email: "neha@codeyoung.demo",
    subject: "Mathematics",
    rating: 4.8,
    classes: 91,
    timezone: "Asia/Kolkata",
    country: "India",
    active: true,
    image:
      "https://ul.postcrest.com/page_contents/south-asian-woman-at-home-against-white-wall-warm-profile-headshot-ldbgt3yc.png",
  },

  {
    id: 10,
    name: "Aditya Verma",
    email: "aditya@codeyoung.demo",
    subject: "Coding",
    rating: 4.9,
    classes: 105,
    timezone: "Asia/Kolkata",
    country: "India",
    active: true,
    image:
      "https://ul.postcrest.com/page_contents/south-asian-man-on-high-key-white-seamless-with-rim-separation-and-crisp-catchlights-zlt330s.png",
  },
];

// =========================================
// GET ALL ACTIVE MENTORS
// =========================================

export function getActiveMentors(): Mentor[] {
  return mentors.filter((mentor) => mentor.active);
}

// =========================================
// FIND MENTOR BY ID
// =========================================

export function getMentorById(id: number): Mentor | undefined {
  return mentors.find((mentor) => mentor.id === id);
}