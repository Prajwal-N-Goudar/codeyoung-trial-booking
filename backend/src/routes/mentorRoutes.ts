import { Router } from "express";
import {
  getAllMentors,
  getMentor,
} from "../controllers/mentorController.js";

const router = Router();

router.get("/", getAllMentors);
router.get("/:id", getMentor);

export default router;