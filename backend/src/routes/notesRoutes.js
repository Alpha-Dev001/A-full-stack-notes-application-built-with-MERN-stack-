import express from 'express';
import { getAllNotes, makeNotes, updateNotes, deleteNotes, getNoteById } from '../controllers/noteController.js';

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id",getNoteById);
router.post("/", makeNotes);
router.put("/:id", updateNotes);
router.delete("/:id", deleteNotes);

export default router