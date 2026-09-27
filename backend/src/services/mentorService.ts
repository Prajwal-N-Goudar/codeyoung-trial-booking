import {
  findMentors,
  findMentorById,
} from "../repositories/mentorRepository";

export async function getMentors() {
  return await findMentors();
}

export async function getMentorById(id: number) {
  const mentor = await findMentorById(id);

  if (Array.isArray(mentor) && mentor.length === 0) {
    throw new Error("Mentor not found");
  }

  return mentor;
}