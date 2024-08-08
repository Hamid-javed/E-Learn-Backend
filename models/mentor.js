const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
  name: { type: String, requierd: true },
  image: { type: String },
  about: { type: String },
  reviews: [{ type: String }],
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  numOFReviews: { type: Number, requierd: true },
  numOfCourses: { type: Number, requierd: true },
  socialMedia: [
    {
      platform: { type: String, requierd: true },
      link: { type: String, required: true },
    },
  ],
});

mentorSchema.pre("save", function (next) {
  this.numOfCourses = this.courses.length;
  this.numOfReviews = this.reviews.length;
  next();
});

module.exports = mongoose.model("Mentor", mentorSchema);
