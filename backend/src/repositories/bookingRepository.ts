import { db } from "../config/database";
import { DateTime } from "luxon";



function toMySQLDateTime(
  isoDateTime: string
): string {
  const dateTime = DateTime.fromISO(
    isoDateTime,
    {
      setZone: true,
    }
  );

  if (!dateTime.isValid) {
    throw new Error(
      "Invalid scheduled UTC date"
    );
  }

  return dateTime
    .toUTC()
    .toFormat("yyyy-MM-dd HH:mm:ss");
}



export async function findAllBookings() {
  const [rows] = await db.query(`
    SELECT
      b.id,
      b.parent_id AS parentId,
      b.mentor_id AS mentorId,
      b.scheduled_at_utc AS scheduledAtUtc,
      b.parent_timezone AS parentTimezone,
      b.class_link AS classLink,
      b.status,
      b.created_at AS createdAt,

      p.name AS parentName,
      p.email AS parentEmail,

      m.name AS mentorName

    FROM bookings b

    LEFT JOIN parents p
      ON p.id = b.parent_id

    LEFT JOIN mentors m
      ON m.id = b.mentor_id

    ORDER BY
      b.scheduled_at_utc ASC
  `);

  return rows as any[];
}



export async function countActiveMentors() {
  const [rows] = await db.query(`
    SELECT COUNT(*) AS count
    FROM mentors
    WHERE is_active = TRUE
  `);

  return Number(
    (rows as any[])[0]?.count || 0
  );
}


export async function findParentById(
  parentId: number
) {
  const [rows] = await db.query(
    `
    SELECT
      id,
      name,
      email,
      timezone
    FROM parents
    WHERE id = ?
    LIMIT 1
    `,
    [parentId]
  );

  return (
    (rows as any[])[0] || null
  );
}



export async function findAvailableMentors(
  scheduledAtUtc: string
) {
  const mysqlDateTime =
    toMySQLDateTime(
      scheduledAtUtc
    );

  const [rows] = await db.query(
    `
    SELECT
      m.*
    FROM mentors m

    WHERE m.is_active = TRUE

      AND NOT EXISTS (
        SELECT 1
        FROM bookings b
        WHERE b.mentor_id = m.id
          AND b.scheduled_at_utc = ?
          AND b.status = 'CONFIRMED'
      )

    ORDER BY
      m.id ASC
    `,
    [mysqlDateTime]
  );

  return rows as any[];
}



export async function countMentorBookings(
  mentorId: number,
  scheduledAtUtc: string
) {
  const scheduled =
    DateTime.fromISO(
      scheduledAtUtc,
      {
        setZone: true,
      }
    );

  if (!scheduled.isValid) {
    throw new Error(
      "Invalid scheduled UTC date"
    );
  }

  
  const indiaDate =
    scheduled.setZone(
      "Asia/Kolkata"
    );

  
  const startOfIndiaDay =
    indiaDate
      .startOf("day")
      .toUTC()
      .toFormat(
        "yyyy-MM-dd HH:mm:ss"
      );

  
  const endOfIndiaDay =
    indiaDate
      .endOf("day")
      .toUTC()
      .toFormat(
        "yyyy-MM-dd HH:mm:ss"
      );

  const [rows] =
    await db.query(
      `
      SELECT
        COUNT(*) AS count

      FROM bookings

      WHERE mentor_id = ?

        AND scheduled_at_utc >= ?

        AND scheduled_at_utc <= ?

        AND status = 'CONFIRMED'
      `,
      [
        mentorId,
        startOfIndiaDay,
        endOfIndiaDay,
      ]
    );

  return Number(
    (rows as any[])[0]?.count || 0
  );
}



export async function createBooking(
  data: {
    parentId: number;
    mentorId: number;
    scheduledAtUtc: string;
    parentTimezone: string;
    classLink: string;
  }
) {
  

  const mysqlScheduledAt =
    toMySQLDateTime(
      data.scheduledAtUtc
    );

  const [result] =
    await db.query(
      `
      INSERT INTO bookings
      (
        parent_id,
        mentor_id,
        scheduled_at_utc,
        parent_timezone,
        class_link,
        status
      )

      VALUES
      (
        ?,
        ?,
        ?,
        ?,
        ?,
        'CONFIRMED'
      )
      `,
      [
        data.parentId,
        data.mentorId,
        mysqlScheduledAt,
        data.parentTimezone,
        data.classLink,
      ]
    );

  return {
    id: (result as any)
      .insertId,

    parentId:
      data.parentId,

    mentorId:
      data.mentorId,

    scheduledAtUtc:
      data.scheduledAtUtc,

    parentTimezone:
      data.parentTimezone,

    classLink:
      data.classLink,

    status:
      "CONFIRMED",
  };
}