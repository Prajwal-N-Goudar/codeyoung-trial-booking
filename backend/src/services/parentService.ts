import {
  createParent as createParentRepository,
  findParentByEmail,
  findParentById,
  type CreateParentData,
} from "../repositories/parentRepository";

/**
 * Create / register a parent
 */
export async function createParent(
  data: CreateParentData
) {
  // Check whether parent already exists
  const existingParent =
    await findParentByEmail(data.email);

  if (
    Array.isArray(existingParent) &&
    existingParent.length > 0
  ) {
    return existingParent[0];
  }

  // Create new parent
  const parent =
    await createParentRepository(data);

  return parent;
}

/**
 * Get parent by ID
 */
export async function getParentById(
  id: number
) {
  const parent =
    await findParentById(id);

  return parent;
}