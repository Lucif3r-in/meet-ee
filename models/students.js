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
});

module.exports = mongoose.model("students", studentSchema);
