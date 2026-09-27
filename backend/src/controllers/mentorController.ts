import { Request, Response } from "express";
import {
  getMentors,
  getMentorById,
} from "../services/mentorService";

export async function getAllMentors(
  req: Request,
  res: Response
) {
  try {
    const mentors = await getMentors();

    return res.status(200).json({
      success: true,
      data: mentors,
    });
  } catch (error) {
    console.error("Get mentors error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch mentors",
    });
  }
}

export async function getMentor(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid mentor ID",
      });
    }

    const mentor = await getMentorById(id);

    return res.status(200).json({
      success: true,
      data: mentor,
    });
  } catch (error) {
    console.error("Get mentor error:", error);

    return res.status(404).json({
      success: false,
      message: "Mentor not found",
    });
  }
}