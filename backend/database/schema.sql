CREATE DATABASE IF NOT EXISTS codeyoung_booking;

USE codeyoung_booking;

-- ============================================
-- PARENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS parents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    timezone VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- MENTORS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS mentors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    timezone VARCHAR(100) NOT NULL DEFAULT 'Asia/Kolkata',
    working_start TIME NOT NULL DEFAULT '09:00:00',
    working_end TIME NOT NULL DEFAULT '21:00:00',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- BOOKINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,

    parent_id INT NOT NULL,
    mentor_id INT NOT NULL,

    -- Appointment is stored in UTC
    scheduled_at_utc DATETIME NOT NULL,

    -- Parent's timezone at the time of booking
    parent_timezone VARCHAR(100) NOT NULL,

    -- Dummy online class link
    class_link VARCHAR(255) NOT NULL UNIQUE,

    status ENUM(
        'CONFIRMED',
        'CANCELLED'
    ) NOT NULL DEFAULT 'CONFIRMED',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_booking_parent
        FOREIGN KEY (parent_id)
        REFERENCES parents(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_booking_mentor
        FOREIGN KEY (mentor_id)
        REFERENCES mentors(id)
        ON DELETE CASCADE,

    INDEX idx_booking_parent (parent_id),
    INDEX idx_booking_mentor (mentor_id),
    INDEX idx_booking_scheduled (scheduled_at_utc),
    INDEX idx_mentor_schedule (mentor_id, scheduled_at_utc)
);