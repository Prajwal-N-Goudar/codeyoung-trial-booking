import { db } from "../config/database";

export async function findMentors() {
  const [rows] = await db.execute(`
    SELECT
      id,
      name,
      email,
      timezone,
      working_start,
      working_end,
      is_active
    FROM mentors
    WHERE is_active = 1
    ORDER BY id
  `);

  return rows;
}

export async function findMentorById(id: number) {
  const [rows] = await db.execute(
    `
    SELECT
      id,
      name,
      email,
      timezone,
      working_start,
      working_end,
      is_active
    FROM mentors
    WHERE id = ?
    `,
    [id]
  );

  return rows;
}