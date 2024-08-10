const data = require("../data");
const Catagory = require("../models/catagoriesSchema");
const Course = require("../models/courseSchema");
const User = require("../models/userSchema")

// /search/courses
//todo fix the mess
exports.searchApi = async (req, res, next) => {
  const filters = req.query;
  const filteredUsers = data.filter((user) => {
    let isValid = true;

    for (key in filters) {
      console.log(key, user[key], filters[key]);
      isValid = isValid && user[key] == filters[key];
    }
    return isValid;
  });
  res.send(filteredUsers);
};

// Api for specific data
exports.shortDetails = async (req, res) => {
  try {
    const projection = {
      "data.title": 1,
      "data.category": 1,
      "data.rating": 1,
      "data.price": 1,
      "data.reviews": 1,
      "data.image": 1
    };
    const shortData = await Course.find({}, projection);
    res.status(200).json(shortData);
  } catch (error) {
    res.status(404).json({
      error: error,
    });
  }
};

// Search by ID pr anyuthing we want!
exports.searchByID = async (req, res) => {
  try {
    const id = req.params.id; // Convert the id parameter to an integer

    if (!id) {
      return res.status(400).json({ message: "Invalid id!S" });
    }
    const course = await Course.findOne({ _id: id });

    res.json({
      id: course._id,
      data: course.data
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: error });
  }
};

// search/catagories
exports.catagories = async (req, res) => {
  const catagories = await Catagory.find();
  res.status(200).send(catagories);
};

// courses/search?query=${}&page=${}&limit=${}
// get all courses /courses/search
exports.search = async (req, res) => {
  try {
    const { query = "", page = 1, limit = 10, category = "" } = req.query;
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;
    const skip = (pageNumber - 1) * pageSize;
    const regex = query ? new RegExp(query, "i") : new RegExp("");

    const searchCriteria = query
      ? {
        $or: [
          { "data.title": { $regex: regex } },
          { "data.category": { $regex: regex } },
        ],
      }
      : {};

    const courses = await Course.find(searchCriteria)
      .skip(skip)
      .limit(pageSize);

    const totalCount = await Course.countDocuments(searchCriteria);

    const coursesToSend = courses.map((course) => {
      return { id: course._id, data: course.data.details }
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
    const { query = "", page = 1, limit = 10, category = "" } = req.query;
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;
    const skip = (pageNumber - 1) * pageSize;
    const regexQuery = query ? new RegExp(query, "i") : new RegExp("");

    const searchCriteria = {
      $and: [
        category
          ? { "data.category": { $regex: category, $options: "i" } }
          : {},
        query ? { "data.title": { $regex: regexQuery } } : {},
      ],
    };


    searchCriteria.$and = searchCriteria.$and.filter(
      (criteria) => Object.keys(criteria).length > 0
    );
    const courses = await Course.find(searchCriteria)
      .skip(skip)
      .limit(pageSize);
    const totalCount = await Course.countDocuments(searchCriteria);
    const coursesToSend = courses.map((course) => {
      return { id: course._id, data: course.data.details }
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
    const fetchUser = await User.findOne({ _id: userID })
    const savedCourses = fetchUser.savedCourses;
    const courses = await Course.find({ _id: { $in: savedCourses } })
    const coursesToSend = courses.map((course) => {
      return {
        _id: course._id,
        data: course.data.details
      }
    }
    )
    res.status(200).json(coursesToSend)


  } catch (error) {

  }
}

// TO add a new course in save
exports.addSaved = async (req, res) => {
  try {
    const userId = req.id
    const courseId = req.body.courseId;
    const user = await User.findOne({ _id: userId })
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.savedCourses.push(courseId);
    const savedUser = await user.save();
    res.status(200).json({
      Message: "Course added successfully!",
    })
  } catch (error) {
    res.status(408).json({
      error: error
    })
  }
}

// To delete added course
exports.deleteSaved = async (req, res) => {
  try {
    const userId = req.id
    const courseId = req.body.courseId;
    const user = await User.findOne({ _id: userId })
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.savedCourses.pull(courseId);
    const updatedUser = await user.save();
    res.status(200).json({
      Message: "Course deleted successfully!",
    })
  } catch (error) {
    res.status(408).json({
      error: error
    })
  }
}

// To buy a new course
exports.buyCourse = async (req, res) => {
  try {
    const userId = req.id;
    const courseId = req.body.courseId;
    const { cardNumber, cardName, ExData, CVV } = req.body;
    if (!cardNumber || !cardName || !ExData || !CVV) {
      return res.status(400).json({
        message: "Fill all details please!"
      })
    }
    const user = await User.findOne({ _id: userId })
    if (!user) {
      return res.status(404).json({ message: "User not found!" })
    }
    user.boughtCourses.push(courseId);
    const deleteCourse = await user.save();
    res.status(200).json({
      message: "Buy Course successfully!",
    })
  } catch (error) {
    res.status(501).json({
      error: error
    })
  }
}


exports.deleteBoughtCourse = async (req, res) => {
  try {
    const userId = req.id;
    const courseId = req.body.courseId; 
    const user = await User.findOne({ _id: userId })
    if (!user) {
      return res.status(404).json({ message: "User not found!" })
    }
    user.boughtCourses.pull(courseId);
    const boughtCourseList = await user.save();
    res.status(200).json({
      message: "Delete bought course successfully!",
    })
  } catch (error) {
    
  }
}
