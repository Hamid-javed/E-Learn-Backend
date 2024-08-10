const mongoose = require("mongoose");
const Mentor = require("../models/mentor"); // Adjust the path as necessary

mongoose.connect("mongodb://localhost:27017/E-learning", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mentors = [
  {
    name: "John Doe",
    image: "path/to/image.jpg",
    about: "Experienced web developer",
    reviews: [],
    courses: [],
    numOfReviews: 0,
    numOfCourses: 0,
    socialMedia: [{ platform: "Twitter", link: "https://twitter.com/johndoe" }],
  },
  {
    name: "Jane Smith",
    image: "path/to/image.jpg",
    about: "Expert in data science",
    reviews: [],
    courses: [],
    numOfReviews: 0,
    numOfCourses: 0,
    socialMedia: [
      { platform: "LinkedIn", link: "https://linkedin.com/in/janesmith" },
    ],
  },
  // Add more mentor objects as needed
];

const seedMentors = async () => {
  try {
    const user = await Mentor.findOne({ name: "John Doe" });
    user.reviews.push("must be good");

    const news = await user.save();
    console.log("Database seeded with mentors");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedMentors().then((insertedMentors) => {
  console.log(insertedMentors); // Log the inserted mentors to get their IDs
});
