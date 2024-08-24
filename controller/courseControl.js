const Catagory = require("../models/catagoriesSchema");
const Course = require("../models/courseSchema");
const Mentor = require("../models/mentorSchema")
const User = require("../models/userSchema");
const Video = require("../models/videoSchema");


// Api for featured data
exports.featured = async (req, res) => {
  try {
    const categories = await Course.aggregate([
      { $group: { _id: "$data.details.category" } },
      { $limit: 7 }
    ]).exec();
    const coursePromises = categories.map(category => {
      return Course.findOne({ "data.details.category": category._id }).exec();
    });
    const featuredCourses = await Promise.all(coursePromises);
    const resp = featuredCourses.map((course) => {
      return { id: course._id, data: course.data }
    })
    res.status(200).json(resp);
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

// Search by ID pr anyuthing we want!
exports.searchByID = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "Invalid id!S" });
    }
    const course = await Course.findOne({ _id: id }).populate({ path: "data.reviews.user", select: "name email" });
    if (!course) return res.status(400).json({ message: "course not found" })
    const mentor = await Mentor.findOne({ _id: course.data.mentor })
    res.json({
      id: course._id,
      data: course.data,
      mentor: { name: mentor.name, title: mentor.title, img: mentor.image, id: mentor._id }
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: error });
  }
};

exports.searchByIDdetails = async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.findOne({ _id: id })
    if (!course) return res.status(400).json({ message: "course not found" })
    const resp = { id: course._id, data: course.data.details }
    res.status(200).json(resp)
  } catch (error) {
    res.status(500).json({ message: error });

  }
}

// search/catagories
exports.catagories = async (req, res) => {
  const catagories = await Catagory.find();
  res.status(200).send(catagories.map((cate) => cate.name));
};

// courses/search?query=${}&page=${}&limit=${}
// get all courses /courses/search
exports.search = async (req, res) => {
  try {
    const {
      query = "",
      page = 1,
      limit = 10,
      category = "",
      sortField = "",
      sortOrder = "asc",
    } = req.query;
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;
    const skip = (pageNumber - 1) * pageSize;
    const regex = query ? new RegExp(query, "i") : new RegExp("");

    const searchCriteria = query
      ? {
        $or: [
          { "data.details.title": { $regex: regex } },
          { "data.details.category": { $regex: regex } },
        ],
      }
      : {};
    let sortF;
    if (sortField === "price") {
      sortF = "data.details.price";
    }
    if (sortField === "rating") {
      sortF = "data.details.rating";
    }
    if (sortField === "duration") {
      sortF = "data.details.duration";
    }

    const validSortFields = [
      "data.details.price",
      "data.details.duration",
      "data.details.rating",
    ];
    const validSortOrder = ["asc", "desc"];
    let sortCriteria = {};

    if (
      sortField &&
      validSortFields.includes(sortF) &&
      validSortOrder.includes(sortOrder)
    ) {
      sortCriteria[sortF] = sortOrder === "asc" ? 1 : -1;
    } else {
      sortCriteria = { _id: 1 }; // Default sort by _id if invalid or not provided
    }

    const courses = await Course.find(searchCriteria)
      .sort(sortCriteria)
      .skip(skip)
      .limit(pageSize);

    const totalCount = await Course.countDocuments(searchCriteria);

    const coursesToSend = courses.map((course) => {
      return { id: course._id, data: course.data.details };
    });

    res.status(200).json({
      page: pageNumber,
      limit: pageSize,
      totalResults: totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      results: coursesToSend,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching courses" });
  }
};

// serach/category?
exports.searchCategory = async (req, res) => {
  try {
    const {
      query = "",
      page = 1,
      limit = 10,
      categories = "", // Note the change from category to categories
      sortField = "",
      sortOrder = "asc",
    } = req.query;
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;
    const skip = (pageNumber - 1) * pageSize;
    const regexQuery = query ? new RegExp(query, "i") : new RegExp("");

    // Parse categories from query
    const categoryArray = categories ? categories.split(",") : [];

    const searchCriteria = {
      $and: [
        categoryArray.length > 0
          ? { "data.details.category": { $in: categoryArray.map(c => new RegExp(c, "i")) } }
          : {},
        query ? { "data.details.title": { $regex: regexQuery } } : {},
      ],
    };

    let sortF;
    if (sortField === "price") {
      sortF = "data.details.price";
    }
    if (sortField === "rating") {
      sortF = "data.details.rating";
    }
    if (sortField === "duration") {
      sortF = "data.details.duration";
    }

    const validSortFields = [
      "data.details.price",
      "data.details.duration",
      "data.details.rating",
    ];
    const validSortOrder = ["asc", "desc"];
    let sortCriteria = {};

    if (
      sortField &&
      validSortFields.includes(sortF) &&
      validSortOrder.includes(sortOrder)
    ) {
      sortCriteria[sortF] = sortOrder === "asc" ? 1 : -1;
    } else {
      sortCriteria = { _id: 1 }; // Default sort by _id if invalid or not provided
    }

    searchCriteria.$and = searchCriteria.$and.filter(
      (criteria) => Object.keys(criteria).length > 0
    );

    const courses = await Course.find(searchCriteria)
      .sort(sortCriteria)
      .skip(skip)
      .limit(pageSize);

    const totalCount = await Course.countDocuments(searchCriteria);

    const coursesToSend = courses.map((course) => {
      return { id: course._id, data: course.data.details };
    });

    res.status(200).json({
      page: pageNumber,
      limit: pageSize,
      totalResults: totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      results: coursesToSend,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching courses", msg: error.message });
  }
};

exports.getSavedCourse = async (req, res) => {
  try {
    const userID = req.id;
    if (!userID) {
      return res.status(404).json("User not found!");
    }
    const fetchUser = await User.findOne({ _id: userID });
    const savedCourses = fetchUser.savedCourses;
    const courses = await Course.find({ _id: { $in: savedCourses } });
    if (courses.length < 1) return res.status(404).json({ message: "no saved courses" })
    const coursesToSend = courses.map((course) => {
      return {
        _id: course._id,
        data: course.data,
      };
    });
    res.status(200).json(coursesToSend);
  } catch (error) {
    res.status(408).json({
      error: error,
    });
  }
};

// TO add a new course in save
exports.addSaved = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { courseId } = req.params;
    const course = Course.findOne({ _id: courseId })
    if (!course) return res.status(404).json({ message: "course not found" })
    if (user.savedCourses.includes(courseId)) return res.status(400).json({ message: "course already saved" })
    user.savedCourses.push(courseId);
    const savedUser = await user.save();
    res.status(200).json({
      Message: "Course added successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

// To delete added course
exports.deleteSaved = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { courseId } = req.params;
    if (!courseId) {
      return res.status(400).json("Course id not found!");
    }
    user.savedCourses.pull(courseId);
    const updatedUser = await user.save();
    res.status(200).json({
      message: "Course deleted successfully!",
    });
  } catch (error) {
    res.status(408).json({
      error: error,
    });
  }
};

// To buy a new course
exports.buyCourse = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.params;
    const course = await Course.findOne({ _id: courseId })
    if (!course) return res.status(404).json({ message: "course not found" })
    if (!courseId) {
      return res.status(400).json("Course id not found!");
    }
    const { cardNumber, cardName, ExData, CVV } = req.body;
    if (!cardNumber || !cardName || !ExData || !CVV) {
      return res.status(400).json({
        message: "Fill all details please!",
      });
    }
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    if (user.boughtCourses.includes(courseId)) return res.status(400).json({ message: "course already bought" })
    user.boughtCourses.push(courseId);
    course.students.push(userId)
    const BoughtCourse = await user.save();
    const StudentCourse = await course.save();
    res.status(200).json({
      message: "Buy Course successfully!",
    });
  } catch (error) {
    res.status(501).json({
      error: error.message,
    });
  }
}

exports.getBoughtCourse = async (req, res) => {
  try {

    const userId = req.id
    const user = await User.findOne({ _id: userId }).populate("boughtCourses").exec();
    const completed = user.completed
    const coursesToSend = user.boughtCourses.map((course) => {
      const lessons = course.data.lessons
      let total = lessons.length
      let done = 0

      lessons.forEach((lesson) => {
        if (completed.includes(lesson._id)) {
          done += 1
        }

      })
      const progress = `${(done / total) * 100}%`

      return {
        _id: course._id,
        data: course.data,
        completed: `${done}/${total}`,
        progress: progress,
      }
    })
    if (coursesToSend.length < 1) return res.status(404).json({ message: "no bought courses" })
    res.status(200).json(coursesToSend)
  } catch (error) {
    res.status(500).json({
      error: error
    })
  }
}

exports.deleteBoughtCourse = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.params;
    if (!courseId) {
      return res.status(404).json({ message: "Course id not found!" });
    }
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const course = await Course.findOne({ _id: courseId })
    course.students.pull(userId)
    user.boughtCourses.pull(courseId);

    const studentsList = await course.save();
    const boughtCourseList = await user.save();
    res.status(200).json({
      message: "Delete bought course successfully!",
    });
  } catch (error) {
    res.status(408).json({
      error: error,
    });
  }
};

exports.addReview = async (req, res) => {
  try {
    const userId = req.id
    const { rating, review } = req.body
    const { courseId } = req.params
    if (!rating || !courseId) {
      return res.status(400).json({ message: "please privied all details" })
    }
    const course = await Course.findOne({ _id: courseId })
    if (!course) return res.status(404).json({ message: "course not found" })
    const reviewIds = course.data.reviews.map((review) => review.user)
    course.data.reviews = course.data.reviews.filter(review => !review.user.equals(userId));
    const newReview = { rating: rating, review: review, user: userId }
    course.data.reviews.push(newReview)
    const x = await course.save()
    res.status(201).json({ message: "review added" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteReview = async (req, res) => {
  try {
    const userId = req.id
    const { courseId } = req.params
    if (!courseId) return res.status(400).json({ message: "please send course Id" })
    const course = await Course.findOne({ _id: courseId })
    if (!course) return res.status(404).json({ message: "course not found" })
    course.data.reviews = course.data.reviews.filter(review => !review.user.equals(userId));
    const x = await course.save()
    res.status(201).json({ message: "review deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })

  }
}

exports.getReviews = async (req, res) => {
  try {
    const { courseId } = req.params
    if (!courseId) return res.status(400).json({ message: "please send course Id" })
    const course = await Course.findOne({ _id: courseId }).populate({ path: "data.reviews.user", select: "name email" })
    if (!course) return res.status(404).json({ message: "course not found" })
    if (course.data.reviews.length < 1) return rs.status(404).json({ message: "no reviews" })
    res.status(202).json(course.data.reviews)
  } catch (error) {
    res.status(500).json({ error: error.message })

  }
}

exports.getLessons = async (req, res) => {
  try {
    const { courseId } = req.params
    if (!courseId) return res.status(400).json({ message: "please send course Id" })
    const course = await Course.findOne({ _id: courseId })
    if (!course) return res.status(404).json({ message: "course not found" })
    res.status(202).json(course.data.lessons)
  } catch (error) {
    res.status(500).json({ error: error.message })

  }
}

exports.markDone = async (req, res) => {
  try {
    const userId = req.id
    const { courseId, lessonId } = req.params
    const course = await Course.findOne({ _id: courseId })
    if (!course) return res.status(404).json({ message: "course not found" })
    const user = await User.findOne({ _id: userId })
    if (!user.boughtCourses.includes(courseId)) return res.status(404).json({ message: "buy the course" })
    if (user.completed.includes(lessonId)) return res.status(404).json({ message: "already marked" })
    user.completed.push(lessonId)
    await user.save()
    res.status(202).json({ message: "lesson marked done" })
  } catch (error) {
    res.status(500).json({ error: error.message })

  }
}

exports.markUnDone = async (req, res) => {
  try {
    const userId = req.id
    const { courseId, lessonId } = req.params
    const course = await Course.findOne({ _id: courseId })
    if (!course) return res.status(404).json({ message: "course not found" })
    const user = await User.findOne({ _id: userId })
    user.completed = user.completed.filter((lesson) => !lesson.equals(lessonId))
    await user.save()
    res.status(202).json({ message: "lesson marked undone" })
  } catch (error) {
    res.status(500).json({ error: error.message })

  }
}


exports.getVideo = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId, videoId } = req.params
    const course = await Course.findOne({ _id: courseId })
    if (!course) return res.status(404).json({ message: "course not found" })
    const user = await User.findOne({ _id: userId })
    if (!user.boughtCourses.includes(courseId)) return res.status(403).json({ message: "buy the course" })
    const video = await Video.findOne({ _id: videoId })
    res.status(200).json({ link: video.link })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}





