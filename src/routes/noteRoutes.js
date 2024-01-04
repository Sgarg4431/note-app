const express = require("express");
const router = express.Router();
const controller = require("../controllers/notesController");
const authJwt = require("../middleware/authJWT");

// notes route
router.get("/getNotes", [authJwt.verifyToken], controller.getNotes);
router.get("/getNotes/:id", [authJwt.verifyToken], controller.getNoteById);
router.get("/search", [authJwt.verifyToken], controller.searchNotes);
router.post("/createNewNote", [authJwt.verifyToken], controller.createNewNote);
router.post("/share/:id", [authJwt.verifyToken], controller.shareNote);
router.put("/updateNote/:id", [authJwt.verifyToken], controller.updateNote);
router.delete("/deleteNote/:id", [authJwt.verifyToken], controller.deleteNote);

module.exports = router;
