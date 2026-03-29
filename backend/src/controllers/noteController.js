import mongoose from "mongoose"
import Note from "../models/notemodel.js"

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);

  } catch (error) {
    console.log(`Server error : ${error}`)
    res.status(500).json({
      message: 'Internal server error'
    })

  }
};

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Notes not found" })
    res.status(200).json(note);
  } catch (error) {
    console.log(`Server error : ${error}`)
  }
}

export async function makeNotes(req, res) {
  try {

    const { title, content } = req.body;
    const newNote = new Note({ title, content })

    const savedNotes = await newNote.save()
    res.status(201).json(savedNotes);

  } catch (error) {
    console.log(`Server error : ${error}`)
    res.status(500).json({
      message: 'Internal server error'
    })

  }
};

export async function updateNotes(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNotes = await Note.findByIdAndUpdate(req.params.id, { title, content }, {
      returnDocument: "after"
    })
    if (!updateNotes) return res.status(404).json({ message: "Notes not found" })
    res.status(200).json(updatedNotes);

  } catch (error) {
    console.log(`Server error : ${error}`)
    res.status(500).json({
      message: 'Internal server error'
    })

  }
};


export async function deleteNotes(req, res) {
  try {
    const deletedNotes = await Note.findByIdAndDelete(req.params.id)
    if (!deleteNotes) return res.status(404).json({ message: "Notes not found" });
    res.status(200).json({
      message: "Notes deleted successfully"
    });
  } catch (error) {
    console.log(`Server error : ${error}`)
    res.status(500).json({
      message: 'Internal server error'
    })

  }
};

