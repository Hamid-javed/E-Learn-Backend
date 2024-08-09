const data = require("../data");
const Catagory = require("../models/catagoriesSchema");
const Course = require("../models/courseSchema");

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
      'data.title': 1,      
      'data.category': 1,   
      'data.rating': 1,     
      'data.price': 1,  
      'data.reviews': 1          
  };
    const shortData = await Course.find({}, projection)
    res.status(200).json(shortData)
  } catch (error) {
    res.status(404).json({
      error: error
    })
  }
}


// Search by ID pr anyuthing we want!
exports.searchByID = async (req, res) => {
  // console.log(12323)
  try {
    const id = parseInt(req.params.id); // Convert the id parameter to an integer


    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid id parameter' });
    }
    const course = data.filter((course) => course.id === id); // Query for courses with id greater than the provided value
    if (course.length < 1) {
      return res.status(404).json({ msg: "CourseID not found" })
    }

    res.json(course)


  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Server error' });
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

    const coursesToSend = courses.map((course) => course.data);

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
    const coursesToSend = courses.map((course) => course.data);

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
