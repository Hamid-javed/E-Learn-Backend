const data = require("../data");
const Catagory = require("../models/catagories");
const Course = require("../models/courses");

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
