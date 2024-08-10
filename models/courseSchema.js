const { request } = require("express");
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  students: [{ _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
  data: {
    details: {
      category: { type: String, required: true },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      rating: { type: Number, required: true },
      numOfReviews: { type: Number, required: true },
      img: { type: String, required: true },
    },
    duration: { type: Number, required: true },
    description: { type: String, required: true },
    reviews: [
      {
        rating: { type: Number },
        review: { type: String },
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    lessons: [
      {
        title: { type: String },
        desc: { type: String },
        img: { type: String },
      },
    ],
  },
});

courseSchema.pre("save", function (next) {
  const reviewNum = this.data.reviews.length;
  let rating = 0;
  for (let i = 0; i < this.data.reviews.length; i++) {
    rating += this.data.reviews[i].rating;
  }
  rating = rating / this.data.reviews.length;
  this.data.details.numOfReviews = reviewNum;
  this.data.rating = rating;

  next();
});

module.exports = mongoose.model("Course", courseSchema);
