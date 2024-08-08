const mongoose = require("mongoose");
const Course = require("./models/courses"); // Adjust the path as necessary
const Mentor = require("./models/mentor"); // Adjust the path as necessary

mongoose.connect("mongodb://localhost:27017/E-learning", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createCourses = async () => {
  const mentorIds = await Mentor.find({});

  const courses = [
    {
      students: [],
      data: {
        category: "Programming",
        title: "Introduction to JavaScript",
        description:
          "Learn the basics of JavaScript, the most popular programming language.",
        price: 100,
        rating: 4.5,
        reviews: [],
        numOfReviews: 0,
        duration: 10,
        mentor: mentorIds[0],
        lessons: [],
      },
    },
    {
      students: [],
      data: {
        category: "Programming",
        title: "Advanced JavaScript",
        description: "Deep dive into advanced JavaScript concepts.",
        price: 120,
        rating: 4.7,
        reviews: [],
        numOfReviews: 0,
        duration: 15,
        mentor: mentorIds[1],
        lessons: [],
      },
    },
    {
      students: [],
      data: {
        category: "Data Science",
        title: "Introduction to Data Science",
        description:
          "Learn the fundamentals of data science and data analysis.",
        price: 150,
        rating: 4.6,
        reviews: [],
        numOfReviews: 0,
        duration: 20,
        mentor: mentorIds[0],
        lessons: [],
      },
    },
    {
      students: [],
      data: {
        category: "Data Science",
        title: "Machine Learning Basics",
        description:
          "An introduction to machine learning algorithms and techniques.",
        price: 200,
        rating: 4.8,
        reviews: [],
        numOfReviews: 0,
        duration: 25,
        mentor: mentorIds[1],
        lessons: [],
      },
    },
    {
      students: [],
      data: {
        category: "Web Development",
        title: "HTML & CSS for Beginners",
        description: "Learn how to build websites with HTML and CSS.",
        price: 80,
        rating: 4.3,
        reviews: [],
        numOfReviews: 0,
        duration: 8,
        mentor: mentorIds[1],
        lessons: [],
      },
    },
    {
      students: [],
      data: {
        category: "Web Development",
        title: "React.js Fundamentals",
        description:
          "Learn the basics of React.js for building dynamic web applications.",
        price: 110,
        rating: 4.5,
        reviews: [],
        numOfReviews: 0,
        duration: 12,
        mentor: mentorIds[0],
        lessons: [],
      },
    },
    {
      students: [],
      data: {
        category: "Web Development",
        title: "Node.js Essentials",
        description:
          "Master the fundamentals of Node.js for backend development.",
        price: 130,
        rating: 4.6,
        reviews: [],
        numOfReviews: 0,
        duration: 14,
        mentor: mentorIds[1],
        lessons: [],
      },
    },
    {
      students: [],
      data: {
        category: "Mobile Development",
        title: "Introduction to Android Development",
        description: "Learn to build Android apps from scratch.",
        price: 150,
        rating: 4.4,
        reviews: [],
        numOfReviews: 0,
        duration: 18,
        mentor: mentorIds[1],
        lessons: [],
      },
    },
    {
      students: [],
      data: {
        category: "Mobile Development",
        title: "iOS Development for Beginners",
        description: "Get started with building iOS apps.",
        price: 160,
        rating: 4.7,
        reviews: [],
        numOfReviews: 0,
        duration: 20,
        mentor: mentorIds[0],
        lessons: [],
      },
    },
    {
      students: [],
      data: {
        category: "Design",
        title: "Graphic Design Fundamentals",
        description: "Learn the basics of graphic design.",
        price: 90,
        rating: 4.5,
        reviews: [],
        numOfReviews: 0,
        duration: 10,
        mentor: mentorIds[1],
        lessons: [],
      },
    },
    {
      students: [],
      data: {
        category: "Design",
        title: "UI/UX Design Basics",
        description:
          "An introduction to user interface and user experience design.",
        price: 100,
        rating: 4.6,
        reviews: [],
        numOfReviews: 0,
        duration: 12,
        mentor: mentorIds[0],
        lessons: [],
      },
    },
    {
      students: [],
      data: {
        category: "Marketing",
        title: "Digital Marketing Essentials",
        description: "Learn the core concepts of digital marketing.",
        price: 130,
        rating: 4.7,
        reviews: [],
        numOfReviews: 0,
        duration: 15,
        mentor: mentorIds[1],
        lessons: [],
      },
    },
    {
      students: [],
      data: {
        category: "Marketing",
        title: "Social Media Marketing",
        description: "Master the art of marketing on social media platforms.",
        price: 120,
        rating: 4.4,
        reviews: [],
        numOfReviews: 0,
        duration: 14,
        mentor: mentorIds[1],
        lessons: [],
      },
    },
    {
      students: [],
      data: {
        category: "Photography",
        title: "Photography Basics",
        description: "Learn the essentials of photography.",
        price: 70,
        rating: 4.5,
        reviews: [],
        numOfReviews: 0,
        duration: 8,
        mentor: mentorIds[1],
        lessons: [],
      },
    },
    {
      students: [],
      data: {
        category: "Photography",
        title: "Advanced Photography Techniques",
        description: "Take your photography skills to the next level.",
        price: 110,
        rating: 4.8,
        reviews: [],
        numOfReviews: 0,
        duration: 12,
        mentor: mentorIds[0],
        lessons: [],
      },
    },
    {
      students: [],
      data: {
        category: "Business",
        title: "Business Management 101",
        description: "Learn the basics of managing a business.",
        price: 140,
        rating: 4.6,
        reviews: [],
        numOfReviews: 0,
        duration: 18,
        mentor: mentorIds[0],
        lessons: [],
      },
    },
    {
      students: [],
      data: {
        category: "Business",
        title: "Entrepreneurship Fundamentals",
        description:
          "Get started with entrepreneurship and start your own business.",
        price: 160,
        rating: 4.7,
        reviews: [],
        numOfReviews: 0,
        duration: 20,
        mentor: mentorIds[1],
        lessons: [],
      },
    },
    {
      students: [],
      data: {
        category: "Health & Fitness",
        title: "Yoga for Beginners",
        description: "Learn the basics of yoga for a healthier lifestyle.",
        price: 60,
        rating: 4.3,
        reviews: [],
        numOfReviews: 0,
        duration: 8,
        mentor: mentorIds[1],
        lessons: [],
      },
    },
    {
      students: [],
      data: {
        category: "Health & Fitness",
        title: "Nutrition and Diet Planning",
        description: "Learn how to plan a healthy diet.",
        price: 80,
        rating: 4.5,
        reviews: [],
        numOfReviews: 0,
        duration: 10,
        mentor: mentorIds[1],
        lessons: [],
      },
    },
    {
      students: [],
      data: {
        category: "Health & Fitness",
        title: "Fitness Training",
        description:
          "Get started with fitness training and improve your physical health.",
        price: 90,
        rating: 4.6,
        reviews: [],
        numOfReviews: 0,
        duration: 12,
        mentor: mentorIds[0],
        lessons: [],
      },
    },
    {
      students: [],
      data: {
        category: "Personal Development",
        title: "Time Management",
        description: "Learn how to manage your time effectively.",
        price: 70,
        rating: 4.4,
        reviews: [],
        numOfReviews: 0,
        duration: 10,
        mentor: mentorIds[0],
        lessons: [],
      },
    },
    {
      students: [],
      data: {
        category: "Personal Development",
        title: "Public Speaking",
        description: "Improve your public speaking skills.",
        price: 90,
        rating: 4.7,
        reviews: [],
        numOfReviews: 0,
        duration: 12,
        mentor: mentorIds[0],
        lessons: [],
      },
    },
    {
      students: [],
      data: {
        category: "Finance",
        title: "Personal Finance Management",
        description: "Learn how to manage your personal finances effectively.",
        price: 110,
        rating: 4.5,
        reviews: [],
        numOfReviews: 0,
        duration: 14,
        mentor: mentorIds[1],
        lessons: [],
      },
    },
    {
      students: [],
      data: {
        category: "Finance",
        title: "Investment Strategies",
        description:
          "Learn different investment strategies for better financial growth.",
        price: 150,
        rating: 4.6,
        reviews: [],
        numOfReviews: 0,
        duration: 18,
        mentor: mentorIds[0],
        lessons: [],
      },
    },
    {
      students: [],
      data: {
        category: "Language",
        title: "Spanish for Beginners",
        description: "Learn the basics of the Spanish language.",
        price: 80,
        rating: 4.4,
        reviews: [],
        numOfReviews: 0,
        duration: 10,
        mentor: mentorIds[0],
        lessons: [],
      },
    },
  ];

  try {
    await Course.deleteMany({});
    const newCourse = {
      students: [],
      data: {
        category: "Programming",
        title: "Introduction to JavaScript",
        description:
          "Learn the basics of JavaScript, the most popular programming language.",
        price: 100,
        rating: 4.5,
        reviews: [],
        numOfReviews: 0,
        duration: 10,
        mentor: mentorIds[0],
        lessons: [],
      },
    };
    await Course.insertMany(courses);
    // await Course.create(newCourse);
    console.log("Database seeded with courses");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

createCourses();
