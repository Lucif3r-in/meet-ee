const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Multer configuration for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Destination folder for storing uploaded images
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + ext); // Unique filename for each uploaded image
  },
});
const upload = multer({ storage });

// Student model
const Student = require("../models/students");

// @route   GET /api/students/
// @desc    Get all students
// @access  Public
router.get("/", async (req, res) => {
  try {
    const students = await Student.find({});
    res.send({ students });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// @route   GET /api/students/:id
// @desc    Get a specific student
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.send({ student });
  } catch (err) {
    res.status(404).send({ message: "Student not found!" });
  }
});

// @route   POST /api/students/
// @desc    Create a student
// @access  Public
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, email, rollnumber } = req.body;
    const imagePath = req.file.path; // File path of the uploaded image

    const newStudent = new Student({
      name,
      email,
      rollnumber,
      image: imagePath, // Store the image path in the image field of the student model
    });

    await newStudent.save();

    res.send({ newStudent });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// @route   PUT /api/students/:id
// @desc    Update a student
// @access  Public
router.put("/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.send({ message: "The student was updated" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// @route   DELETE /api/students/:id
// @desc    Delete a student
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const removeStudent = await Student.findByIdAndRemove(req.params.id);
    res.send({ message: "The student was removed" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

module.exports = router;
