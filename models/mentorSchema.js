const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  about: { type: String },
  title: {type: String},
  reviews: [
    {
      rating: { type: Number },
      review: { type: String },
      user: { type: mongoose.Schema.Types.ObjectId, ref: "AuthUser" },
    },
  ],
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  numOFReviews: { type: Number },
  numOfCourses: { type: Number },
  socialMedia: [
    {
      platform: { type: String, required: true },
      link: { type: String, required: true },
    },
  ],
});

mentorSchema.pre("save", function (next) {
  const reviewNum = this.reviews.length;
  const courseNum = this.courses.length;

  this.numOfCourses = courseNum;
  this.numOFReviews = reviewNum;

  next();
});

module.exports = mongoose.model("Mentor", mentorSchema);
