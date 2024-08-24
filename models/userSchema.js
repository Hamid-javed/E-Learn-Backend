const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Please enter a valid email address",
    ],
  },
  number: {
    type: Number,
    unique: true,
    required : false,
    min: [1000000000, "Number must be at least 10 digits"],
    max: [9999999999, "Number cannot exceed 10 digits"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  user_type_id: {
    type: Number,
    default: 0,
    min: [0, "User type ID must be a positive number"],
  },
  savedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  boughtCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  completed: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Course.data.lessons" },
  ],
  noOfSavedCourses: { type: Number, default: 0 },
  noOfBoughtCourses: { type: Number, default: 0 },

  otp: {
    otp: {
      type: Number,
    },
    expireDate: { type: Number },
  },
});

// Middleware to set noOfSavedCourses and noOfBoughtCourses before saving
userSchema.pre("save", function (next) {
  this.noOfSavedCourses = this.savedCourses.length;
  this.noOfBoughtCourses = this.boughtCourses.length;
  next();
});

module.exports = mongoose.model("AuthUser", userSchema);
