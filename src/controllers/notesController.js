const AppError = require("../services/appError");
const Note = require("../models/noteModel");
const User = require("../models/userModel");

// create new note
const createNewNote = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if ((!title, !description)) {
      throw new Error("Incomplete Information");
    }
    // only logged in user can make note
    const userFound = await User.findOne({ email: req.body.c });
    if (userFound) {
      const newNote = new Note({ title, description });
      newNote.createdBy = userFound;
      // saving the note in DB
      await newNote.save();
      return res.status(200).json({
        status: "success",
        message: "Note created",
      });
    } else {
      throw new Error("User doesnot exists");
    }
  } catch (error) {
    return next(new AppError(`Error: ${error}`, 400));
  }
};

// get all notes
const getNotes = async (req, res, next) => {
  try {
    const userFound = await User.findOne({ email: req.body.c });
    // getting the notes of logged in user
    if (userFound) {
      const notes = await Note.find({ createdBy: userFound });
      return res.status(200).json({
        status: "success",
        message: "All notes are listed below",
        data: notes,
      });
    } else {
      throw new Error("User does not exists");
    }
  } catch (error) {
    return next(new AppError(`Error: ${error}`, 400));
  }
};

// get the note by id
const getNoteById = async (req, res, next) => {
  try {
    const userFound = await User.findOne({ email: req.body.c });
    if (userFound) {
      const notes = await Note.findById(req.params.id);
      if (notes.createdBy != userFound.id) {
        throw new Error("Notes not created yet");
      }
      return res.status(200).json({
        status: "success",
        message: "All notes are listed below",
        data: notes,
      });
    } else {
      throw new Error("User does not exists");
    }
  } catch (error) {
    return next(new AppError(`Error: ${error}`, 401));
  }
};

// upadte the note
const updateNote = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if ((!title, !description)) {
      throw new Error("Incomplete data");
    }
    const userFound = await User.findOne({ email: req.body.c });
    if (userFound) {
      const notes = await Note.findById(req.params.id);
      if (notes.createdBy != userFound.id) {
        throw new Error("Notes not created yet");
      }
      await Note.findByIdAndUpdate(req.params.id, { title, description });

      return res.status(200).json({
        status: "success",
        message: "note updated",
      });
    } else {
      throw new Error("User does not exists");
    }
  } catch (error) {
    return next(new AppError(`Error: ${error}`, 401));
  }
};

// delete the note
const deleteNote = async (req, res, next) => {
  try {
    const userFound = await User.findOne({ email: req.body.c });
    if (userFound) {
      const notes = await Note.findById(req.params.id);
      if (notes.createdBy != userFound.id) {
        throw new Error("Notes not created yet");
      }
      await Note.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        status: "success",
        message: "note deleted",
      });
    } else {
      throw new Error("User does not exists");
    }
  } catch (error) {
    return next(new AppError(`Error: ${error}`, 401));
  }
};

// searching note by keyword (title)
const searchNotes = async (req, res, next) => {
  try {
    const userFound = await User.findOne({ email: req.body.c });
    if (userFound) {
      // fetching the keyword from query
      const keyword = req.query.keyword;
      if (!keyword) {
        return res
          .status(400)
          .json({ error: "Keyword parameter is required for search" });
      }
      // finding the note which matches the title
      const notes = await Note.find({ $text: { $search: keyword } });
      if (notes.length != 0) {
        return res.status(200).json({
          status: "success",
          message: "All notes are listed below",
          data: notes,
        });
      } else {
        throw new Error("No notes");
      }
    } else {
      throw new Error("User does not exists");
    }
  } catch (error) {
    return next(new AppError(`Error: ${error}`, 401));
  }
};
// sharing the note
const shareNote = async (req, res, next) => {
  try {
    const noteId = req.params.id;
    // getting the email of user whom note is to be shared
    const { email } = req.body;
    const note = await Note.findById(noteId);
    if (!note) {
      throw new Error("No note of this id");
    }
    const userFound = await User.findOne({ email: email });
    if (userFound) {
      const notes = await Note.findById(noteId);
      if (notes.createdBy != userFound.id) {
        throw new Error("Notes not created yet");
      }
      // checking if note is shared already or not
      if (note.sharedWith.includes(userFound.id)) {
        throw new Error("Note is already shared with this user");
      }
      // saving the information of user to whom note is shared
      note.sharedWith.push(userFound);
      await note.save();
      return res.status(200).json({
        status: "success",
        message: "note shared",
      });
    } else {
      throw new Error("User doesnot exists");
    }
  } catch (error) {
    return next(new AppError(`Error: ${error}`, 401));
  }
};
module.exports = {
  createNewNote: createNewNote,
  getNotes: getNotes,
  updateNote: updateNote,
  deleteNote: deleteNote,
  searchNotes: searchNotes,
  getNoteById: getNoteById,
  shareNote: shareNote,
};
