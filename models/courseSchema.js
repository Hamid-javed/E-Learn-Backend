const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  students: [],
  data: {
    category: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    reviews: [],
    numOfReviews: { type: Number, required: true },
    duration: { type: Number, required: true },
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentors",
      required: true,
    },
    lessons: [],
  },
});

courseSchema.pre("save", function (next) {
  const reviewNum = this.data.reviews.length;
  this.data.numOfReviews = reviewNum;
  next();
});

module.exports = mongoose.model("Course", courseSchema);
