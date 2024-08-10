const mongoose = require("mongoose");
const User = require("../models/userSchema")
const Course = require("../models/courseSchema"); // Adjust the path as necessary
const Mentor = require("../models/mentorSchema"); // Adjust the path as necessary

mongoose.connect("mongodb://localhost:27017/E-learning", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createCourses = async () => {
  const mentorIds = await Mentor.find({});

  const coursesData = [
    {
      students: [{ _id: "64d8f7d2f1a1a0f01b8e9c1a" }, { _id: "64d8f7d2f1a1a0f01b8e9c1b" }],
      data: {
        details: {
          category: "Web Development",
          title: "Full Stack Web Development",
          price: 199.99,
          rating: 4.8,
          numOfReviews: 1500,
          img: "https://example.com/fullstack.jpg",
        },
        duration: 40,
        description: "Learn full stack web development with hands-on projects and real-world examples.",
        reviews: [
          { rating: 5, review: "Excellent course with in-depth coverage!", _id: "64d8f7d2f1a1a0f01b8e9c1c" },
          { rating: 4, review: "Good content but could use more advanced projects.", _id: "64d8f7d2f1a1a0f01b8e9c1d" },
        ],
        lessons: [
          { title: "Introduction to Web Development", desc: "Overview of web technologies and tools.", img: "https://example.com/lesson1.jpg" },
          { title: "Frontend Development", desc: "Learning HTML, CSS, and JavaScript.", img: "https://example.com/lesson2.jpg" },
          { title: "Backend Development", desc: "Building APIs with Node.js and Express.", img: "https://example.com/lesson3.jpg" },
        ],
      },
    },
    {
      students: [{ _id: "64d8f7d2f1a1a0f01b8e9c1e" }, { _id: "64d8f7d2f1a1a0f01b8e9c1f" }],
      data: {
        details: {
          category: "Data Science",
          title: "Data Science Masterclass",
          price: 249.99,
          rating: 4.9,
          numOfReviews: 2000,
          img: "https://example.com/datascience.jpg",
        },
        duration: 50,
        description: "Master data science with practical projects and real-world datasets.",
        reviews: [
          { rating: 5, review: "In-depth and practical course.", _id: "64d8f7d2f1a1a0f01b8e9c20" },
          { rating: 4, review: "Great content but a bit fast-paced.", _id: "64d8f7d2f1a1a0f01b8e9c21" },
        ],
        lessons: [
          { title: "Introduction to Data Science", desc: "Overview of data science concepts.", img: "https://example.com/lesson4.jpg" },
          { title: "Python for Data Science", desc: "Using Python for data analysis.", img: "https://example.com/lesson5.jpg" },
          { title: "Machine Learning", desc: "Introduction to machine learning algorithms.", img: "https://example.com/lesson6.jpg" },
        ],
      },
    },
    {
      students: [{ _id: "64d8f7d2f1a1a0f01b8e9c22" }],
      data: {
        details: {
          category: "Design",
          title: "Graphic Design Basics",
          price: 99.99,
          rating: 4.6,
          numOfReviews: 1200,
          img: "https://example.com/graphicdesign.jpg",
        },
        duration: 30,
        description: "Learn the basics of graphic design with Adobe Photoshop and Illustrator.",
        reviews: [
          { rating: 4, review: "Great for beginners!", _id: "64d8f7d2f1a1a0f01b8e9c23" },
          { rating: 3, review: "Could have covered more tools.", _id: "64d8f7d2f1a1a0f01b8e9c24" },
        ],
        lessons: [
          { title: "Introduction to Graphic Design", desc: "Basic principles of design.", img: "https://example.com/lesson7.jpg" },
          { title: "Photoshop Basics", desc: "Learning Adobe Photoshop.", img: "https://example.com/lesson8.jpg" },
          { title: "Illustrator Basics", desc: "Learning Adobe Illustrator.", img: "https://example.com/lesson9.jpg" },
        ],
      },
    },
  ]

 
    const c1 ="66b5bd832cb47cb74a412948"
    const c2 ="66b5bd832cb47cb74a41294c"
  console.log(c1)
  console.log(c2)

  try {
    // await Course.deleteMany({});
    await User.updateOne({email: "hamid@6"}, {$push: {savedCourses: c1}});
    // await Course.create(newCourse);
    console.log("Database seeded with courses");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

createCourses();
