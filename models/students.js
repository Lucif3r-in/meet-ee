const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 33,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  rollnumber: {
    type: String,
    validate: {
      validator: function (value) {
        return /^121EE\d{4}$/.test(value);
      },
      message: 'Roll number should be in the format "121EEXXXX".',
    },
    required: true,
  },
  profilePhoto: {
    type: String,
    required: false,
  },
  github: {
    type: String,
    required: false,
    trim: true,
  },
  linkedin: {
    type: String,
    required: false,
    trim: true,
  },
  twitter: {
    type: String,
    required: false,
    trim: true,
  },
  instagram: {
    type: String,
    required: false,
    trim: true,
  },
  about: {
    type: String,
    required: false,
  },
  areaOfInterest: {
    type: String,
    required: false,
  },
  internshipExperiences: {
    type: String,
    required: false,
  },
  achievements: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("students", studentSchema);
