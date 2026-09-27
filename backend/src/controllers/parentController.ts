import { Request, Response } from "express";

import {
  createParent,
  getParentById,
} from "../services/parentService";


export async function createNewParent(
  req: Request,
  res: Response
) {
  try {
    const {
      parentName,
      email,
      timezone,
    } = req.body;

    if (
      !parentName ||
      !email ||
      !timezone
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Parent name, email and timezone are required",
      });
    }

    const parent = await createParent({
      name: parentName,
      email,
      timezone,
    });

    if (!parent) {
      return res.status(500).json({
        success: false,
        message:
          "Parent could not be created",
      });
    }

    return res.status(201).json({
      success: true,
      message:
        "Parent registered successfully",
      data: parent,
    });
  } catch (error) {
    console.error(
      "Create parent error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to create parent",
    });
  }
}


export async function getParent(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    if (
      !Number.isInteger(id) ||
      id <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid parent ID",
      });
    }

    const parent =
      await getParentById(id);

    if (
      !Array.isArray(parent) ||
      parent.length === 0
    ) {
      return res.status(404).json({
        success: false,
        message:
          "Parent not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: parent[0],
    });
  } catch (error) {
    console.error(
      "Get parent error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch parent",
    });
  }
}