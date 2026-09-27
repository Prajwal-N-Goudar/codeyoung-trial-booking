import { db } from "../config/database";

export interface CreateParentData {
  name: string;
  email: string;
  timezone: string;
}


export async function createParent(
  data: CreateParentData
) {
  const [result] = await db.execute(
    `INSERT INTO parents (name, email, timezone)
     VALUES (?, ?, ?)`,
    [
      data.name,
      data.email,
      data.timezone,
    ]
  );

  const insertResult = result as {
    insertId: number;
  };

  const [rows] = await db.execute(
    `SELECT id, name, email, timezone
     FROM parents
     WHERE id = ?`,
    [insertResult.insertId]
  );

  const parents = rows as Array<{
    id: number;
    name: string;
    email: string;
    timezone: string;
  }>;

  return parents[0] ?? null;
}


export async function findParentByEmail(
  email: string
) {
  const [rows] = await db.execute(
    `SELECT id, name, email, timezone
     FROM parents
     WHERE email = ?`,
    [email]
  );

  return rows;
}


export async function findParentById(
  id: number
) {
  const [rows] = await db.execute(
    `SELECT id, name, email, timezone
     FROM parents
     WHERE id = ?`,
    [id]
  );

  return rows;
}