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
    await Mentor.deleteMany({});
    const insertedMentors = await Mentor.insertMany(mentors);
    console.log("Database seeded with mentors");
    mongoose.connection.close();
    return insertedMentors;
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedMentors().then((insertedMentors) => {
  console.log(insertedMentors); // Log the inserted mentors to get their IDs
});
