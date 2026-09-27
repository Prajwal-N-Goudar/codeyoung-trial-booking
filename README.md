# CodeYoung Trial Class Appointment Booking

## Project Overview

A full-stack trial class appointment booking application built for CodeYoung.

The application allows parents to:

- Enter parent and student details
- Select their country and timezone
- Choose a preferred date
- Select a convenient time slot
- View mentor availability
- Get automatically assigned an available mentor
- Receive a dummy live-class meeting link
- View booking information
- Handle cases where no mentor is available

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- CSS
- React Router
- Luxon
- Lucide React

### Backend
- Node.js
- Express.js
- TypeScript
- MySQL
- Luxon

## Main Features

### Parent Booking
Parents can enter their details and select a suitable date and time.

### Timezone Support
The application supports timezone-aware scheduling using IANA timezone identifiers such as:

- Asia/Kolkata
- America/New_York
- Europe/London

Selected times are converted to UTC before being stored.

### Mentor Assignment
The system checks mentor availability before confirming a booking.

Each mentor can have a maximum of 2 demo classes per day.

### No Mentor Available
If no mentor is available for the selected slot, the parent is shown a dedicated no-mentor-availability page and can choose another slot.

### Meeting Link
After successful booking, a dummy meeting link is generated for the trial class.

## Project Structure

```text
codeyoung-trial-booking/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── src/
│   ├── database/
│   ├── package.json
│   └── ...
│
├── README.md
├── TRANSCRIPT.md
└── .gitignore