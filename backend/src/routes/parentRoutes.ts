import { Router } from "express";

import {
  createNewParent,
  getParent,
} from "../controllers/parentController";

const router = Router();

// Create / register parent
router.post("/", createNewParent);

// Get parent by ID
router.get("/:id", getParent);

export default router;