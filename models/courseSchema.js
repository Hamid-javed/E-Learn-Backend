// const mongoose = require("mongoose");

// const courseSchema = new mongoose.Schema({
//   students: [{ type: mongoose.Schema.Types.ObjectId, ref: "AuthUser" }],
//   data: {
//     details: {
//       category: { type: String, required: true },
//       title: { type: String, required: true },
//       price: { type: Number, required: true },
//       rating: { type: Number, },
//       numOfReviews: { type: Number },
//       img: { type: String, required: true },
//     },
//     mentor: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Mentor",
//     },
//     duration: { type: Number, required: true },
//     description: { type: String, required: true },
//     reviews: [
//       {
//         rating: { type: Number },
//         review: { type: String },
//         date: { type: Number, default: Date.now },
//         user: { type: mongoose.Schema.Types.ObjectId, ref: "AuthUser" },
//       },
//     ],
//     lessons: [
//       {
//         title: { type: String },
//         desc: { type: String },
//         duration: { type: Number },
//         img: { type: String },
//         video: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
//       },
//     ],
//   },
// });

// courseSchema.pre("save", function (next) {
//   const reviewNum = this.data.reviews.length;
//   let rating = 0;
//   for (let i = 0; i < this.data.reviews.length; i++) {
//     rating += this.data.reviews[i].rating;
//   }
//   rating = rating / this.data.reviews.length;
//   rating = rating > 5 ? 5 : rating
//   rating = rating < 0 ? 0 : rating
//   rating = parseFloat(rating.toFixed(1));
//   this.data.details.numOfReviews = reviewNum;
//   this.data.details.rating = rating || 0;

//   next();
// });

// module.exports = mongoose.model("Course", courseSchema);


const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "AuthUser" }],
  data: {
    details: {
      category: { type: String, required: true, index: true }, // Add index for category
      title: { type: String, required: true, index: true }, // Add index for title
      price: { type: Number, required: true, index: true }, // Add index for price
      rating: { type: Number, index: true }, // Add index for rating
      numOfReviews: { type: Number, index: true }, // Add index for numOfReviews
      img: { type: String, required: true },
    },
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentor",
      index: true, // Add index for mentor
    },
    duration: { type: Number, required: true, index: true }, // Add index for duration
    description: { type: String, required: true },
    reviews: [
      {
        rating: { type: Number },
        review: { type: String },
        date: { type: Number, default: Date.now },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "AuthUser" },
      },
    ],
    lessons: [
      {
        title: { type: String },
        desc: { type: String },
        duration: { type: Number },
        img: { type: String },
        video: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
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
  rating = rating > 5 ? 5 : rating;
  rating = rating < 0 ? 0 : rating;
  rating = parseFloat(rating.toFixed(1));
  this.data.details.numOfReviews = reviewNum;
  this.data.details.rating = rating || 0;

  next();
});

module.exports = mongoose.model("Course", courseSchema);
