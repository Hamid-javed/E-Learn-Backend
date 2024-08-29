const Admin = require("../models/adminSchema");
const Course = require("../models/courseSchema");
const Mentor = require("../models/mentorSchema");
const User = require("../models/userSchema");
const Video = require("../models/videoSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Categories = require("../models/catagoriesSchema");
const { SECRET_TOKEN } = require("../config/crypto");

// To login admin
exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email });
    if (!admin) return res.status(404).json({ message: "Admin not found!" });
    const IsMatch = await bcrypt.compare(password, admin.password);
    if (!IsMatch) return res.status(401).json({ message: "Wrong password!" });
    let payload = { id: admin._id };
    const token = jwt.sign(payload, SECRET_TOKEN);
    res.cookie("admintoken", token, {
      httpOnly: true,
      path: '/',
      sameSite: 'None',
      // maxAge: 60 * 60 * 1000,
      secure: true
    });
    res.status(200).send({
      message: "Admin successfully logged in",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// get all mentors
exports.getMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.status(200).json(mentors);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

exports.getAllMentorReviews = async (req, res) => {
  try {
    const { page = 1, limit = 15, search = "" } = req.query;
    const skip = (page - 1) * limit;

    const mentors = await Mentor.find().populate({
      path: "reviews.user",
      select: "name email",
    });

    const reviewsArr = mentors.map((mentor) => {
      return mentor.reviews.map((review) => ({
        ...review.toObject(),
        mentor: mentor._id,
      }));
    });

    const allReviews = reviewsArr.flat();

    const filteredReviews = allReviews.filter((review) => {
      const userName = review.user?.name?.toLowerCase() || "";
      const userEmail = review.user?.email?.toLowerCase() || "";
      const reviewText = review.review?.toLowerCase() || "";
      const searchLower = search.toLowerCase();

      return (
        userName.includes(searchLower) ||
        userEmail.includes(searchLower) ||
        reviewText.includes(searchLower)
      );
    });

    const totalResults = filteredReviews.length;
    const totalPages = Math.ceil(totalResults / limit);

    const reviews = filteredReviews.slice(skip, skip + parseInt(limit));

    res.status(200).json({
      totalResults,
      totalPages,
      page: parseInt(page),
      limit: parseInt(limit),
      results: reviews,
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

exports.getAllCourseReviews = async (req, res) => {
  try {
    const { page = 1, limit = 15, search = "" } = req.query;
    const skip = (page - 1) * limit;

    const courses = await Course.find().populate({
      path: "data.reviews.user",
      select: "name email",
    });

    const reviewsArr = courses.map((course) => {
      return course.data.reviews.map((review) => ({
        ...review.toObject(),
        course: course._id,
      }));
    });

    const allReviews = reviewsArr.flat();

    // Apply search filtering
    const filteredReviews = allReviews.filter((review) => {
      const userName = review.user?.name?.toLowerCase() || "";
      const userEmail = review.user?.email?.toLowerCase() || "";
      const reviewText = review.review?.toLowerCase() || "";
      const searchLower = search.toLowerCase();

      return (
        userName.includes(searchLower) ||
        userEmail.includes(searchLower) ||
        reviewText.includes(searchLower)
      );
    });

    const totalResults = filteredReviews.length;
    const totalPages = Math.ceil(totalResults / limit);

    const reviews = filteredReviews.slice(skip, skip + parseInt(limit));

    res.status(200).json({
      totalResults,
      totalPages,
      page: parseInt(page),
      limit: parseInt(limit),
      results: reviews,
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// to Add new mentor
exports.addMentor = async (req, res) => {
  try {
    const { name, image, about, title, socialMedia } = req.body;
    const newMentor = new Mentor({
      name: name,
      image: image,
      about: about,
      title: title,
      socialMedia: socialMedia ? socialMedia : [],
    });
    await newMentor.save();
    res.status(200).json({
      message: "Mentor added siccessfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// To add social media data of Mentor!
exports.addMentorSocialData = async (req, res) => {
  try {
    const { platform, link } = req.body;
    const mentorId = req.params;
    if (!mentorId) {
      return res.status(404).json({ message: "Mentor not found!" });
    }
    const getMentor = await Mentor.findOne({ _id: mentorId });
    getMentor.socialMedia.push({ platform: platform, link: link });
    await getMentor.save();
    res.status(200).json({
      message: "Added social media platform to mentor!",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.deleteMentorSocialData = async (req, res) => {
  try {
    const { platform, link } = req.body;
    const { mentorId, socialId } = req.params;
    if (!mentorId) {
      return res.status(404).json({ message: "Mentor not found!" });
    }
    const getMentor = await Mentor.findOne({ _id: mentorId });
    getMentor.socialMedia = getMentor.socialMedia.filter((media) => {
      return !media._id.equals(socialId);
    });
    await getMentor.save();
    res.status(200).json({
      message: "Deletes social media platform of mentor!",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// To update mentor details
exports.updataMentor = async (req, res) => {
  try {
    const { name, image, about, title, socialMedia } = req.body;
    const { mentorId } = req.params;
    const findMentor = await Mentor.findOne({ _id: mentorId });
    if (!findMentor) {
      return res.status(404).json({ message: "Mentor not fund!" });
    }
    findMentor.name = name || findMentor.name;
    findMentor.image = image || findMentor.image;
    findMentor.about = about || findMentor.about;
    findMentor.title = title || findMentor.title;
    findMentor.socialMedia = socialMedia;
    await findMentor.save();
    res.status(200).json({
      message: "Mentor updated siccessfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

// to delete mentor
exports.deleteMentor = async (req, res) => {
  try {
    const { mentorId } = req.params;
    const findMentor = await Mentor.findOne({ _id: mentorId });
    if (!findMentor) {
      return res.status(404).json({ message: "Mentor not found!" });
    }
    await Mentor.deleteOne({ _id: mentorId });
    // await newMentorsList.save();
    res.status(200).json({
      message: "Mentor deleted siccessfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// to add course in mentor courses
exports.addMentorCourses = async (req, res) => {
  try {
    const { courseId, mentorId } = req.params;
    const getMentor = await Mentor.findOne({ _id: mentorId });
    if (!getMentor) {
      return res.status(404).json({ message: "Mentor not found!" });
    }
    getMentor.courses.push(courseId);
    await getMentor.save();
    res.status(200).json({
      message: "Course addded successfully!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// To delete coursee from mentor courses
exports.deleteMentorCourses = async (req, res) => {
  try {
    const { courseId, mentorId } = req.params;
    const getMentor = await Mentor.findOne({ _id: mentorId });
    if (!getMentor) {
      return res.status(404).json({ message: "Mentor not found!" });
    }
    getMentor.courses.pull(courseId);
    await getMentor.save();
    res.status(200).json({
      message: "Course deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteMentorReviews = async (req, res) => {
  try {
    const { mentorId, reviewId } = req.params;
    const getMentor = await Mentor.findOne({ _id: mentorId });
    if (!getMentor) {
      return res.status(404).json({ message: "Mentor not found!" });
    }

    getMentor.reviews = getMentor.reviews.filter(
      (review) => review._id.toString() !== reviewId.toString()
    );
    await getMentor.save();
    res.status(200).json({
      message: "review deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const { courseId } = req.params;
    if (!courseId)
      return res.status(400).json({ msg: "please send course Id" });
    const course = await Course.findOne({ _id: courseId }).populate({
      path: "data.reviews.user",
      select: "name email",
    });
    if (!course) return res.status(404).json({ msg: "course not found" });

    res.status(202).json(course.data.reviews);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getMentorReviews = async (req, res) => {
  const { mentorId } = req.params;
  const mentor = await Mentor.findOne({ _id: mentorId }).populate({
    path: "reviews.user",
    select: "name email",
  });
  if (!mentor) return res.status(404).json({ msg: "mentor not found" });
  res.status(200).json(mentor.reviews);
};

//add a course
exports.addCourse = async (req, res) => {
  try {
    const {
      category,
      title,
      price,
      img,
      duration,
      description,
      mentor,
      lessons,
    } = req.body;
    const newCourse = new Course({
      data: {
        details: {
          category: category,
          title: title,
          price: price,
          img: img,
        },
        duration: duration,
        description: description,
        mentor: mentor,
        lessons: lessons,
      },
    });
    const savedCourse = await newCourse.save();
    const mento = await Mentor.findById(mentor);
    mento.courses.push(savedCourse);
    await mento.save();
    res.status(201).json({ msg: "course created" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// delete a course
exports.delCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findOne({ _id: courseId });
    if (!course) return res.status(404).json({ msg: "course not found" });
    const mentor = await Mentor.findById(course.data.mentor);
    mentor.courses.pull(course._id);
    await mentor.save();
    const deCourse = await Course.deleteOne({ _id: courseId });
    res.status(200).json({ msg: "Course Deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//update a course
exports.updateCourse = async (req, res) => {
  try {
    const {
      category,
      title,
      price,
      img,
      duration,
      description,
      mentor,
      lessons,
    } = req.body;

    const { courseId } = req.params;
    const course = await Course.findOne({ _id: courseId });
    if (!course) return res.status(404).json({ msg: "Course not found" });
    course.data.details.category = category || course.data.details.category;
    course.data.details.title = title || course.data.details.title;
    course.data.details.price = price || course.data.details.price;
    course.data.details.img = img || course.data.details.img;
    course.data.duration = duration || course.data.duration;
    course.data.description = description || course.data.description;
    course.data.mentor = mentor || course.data.mentor;
    course.data.lessons = lessons || course.data.lessons;
    const updateCourse = await course.save();
    res.status(201).json({ msg: "course updated" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//add a metntor to a course
exports.addMentorToCourse = async (req, res) => {
  try {
    const { courseId, mentorId } = req.params;
    const course = await Course.findOne({ _id: courseId });
    if (!course) return res.status(404).json({ msg: "Course not found" });
    const mentor = await Mentor.findOne({ _id: mentorId });
    if (!mentor) return res.status(404).json({ msg: "mentor not found" });
    course.data.mentor = mentorId;
    await course.save();
    res.status(201).json({ msg: "mentor added" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//add a lesson to course
exports.addLessonToCourse = async (req, res) => {
  try {
    const { lesson } = req.body;
    const { courseId } = req.params;
    const course = await Course.findOne({ _id: courseId });
    if (!course) return res.status(404).json({ msg: "Course not found" });
    course.data.lessons.push(lesson);
    await course.save();
    res.status(201).json({ msg: "lesson added" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//del a lesson to course
exports.delLessonFromCourse = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { courseId } = req.params;
    const course = await Course.findOne({ _id: courseId });
    if (!course) return res.status(404).json({ msg: "Course not found" });
    course.data.lessons.pull(lessonId);
    await course.save();
    res.status(201).json({ msg: "lesson deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.addVideo = async (req, res) => {
  try {
    const { link, title } = req.body;
    const newVideo = new Video({ link: link, title: title });
    const savedVideo = await newVideo.save();
    res.status(201).json({ msg: "video added" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.delVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const delVideo = await Video.deleteOne({ _id: videoId });
    res.status(200).json({ msg: "video deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.updVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { link, title } = req.body;
    const video = await Video.findById(videoId);
    video.link = link ? link : video.link;
    video.title = title ? title : video.title;
    await video.save();
    res.status(200).json({ msg: "video updated" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getVideos = async (req, res) => {
  try {
    const { page = 1, limit = 10, query = "" } = req.query;
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;
    const skip = (pageNumber - 1) * pageSize;
    const filter = query ? { title: new RegExp(query, "i") } : {};
    const videos = await Video.find(filter).skip(skip).limit(pageSize);
    const totalCount = await Video.countDocuments(filter);
    const response = {
      page: pageNumber,
      limit: pageSize,
      totalResults: totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      results: videos,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await Video.findById(videoId);

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.user = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);

    const searchCriteria = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(searchCriteria)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    const totalUsers = await User.countDocuments(searchCriteria);
    const userData = users.map((user) => {
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        boughtCourse: user.boughtCourses,
        savedCourses: user.savedCourses,
        completed: user.completed,
        noOfBoughtCourses: user.noOfBoughtCourses,
        noOfSavedCourses: user.noOfSavedCourses,
      };
    });

    res.status(200).json({
      total: totalUsers,
      page: pageNumber,
      totalPages: Math.ceil(totalUsers / pageSize),
      results: userData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin --delete a single User
exports.deletUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const delUser = await User.deleteOne({ _id: userId });
    if (!delUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User deleted successfully!",
    });
  } catch (error) {
    res.status().json({
      message: "Server Error",
    });
  }
};

// Admin --delete a single Review
exports.deletReview = async (req, res) => {
  try {
    const { courseId, reviewId } = req.params;
    if (!courseId || !reviewId) {
      return res
        .status(400)
        .json({ message: "Course ID and Review ID are required" });
    }
    const course = await Course.findOne({ _id: courseId });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    course.data.reviews = course.data.reviews.filter(
      (review) => !review.equals(reviewId)
    );
    await course.save();
    res.status(200).json({
      message: "Review Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.addAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newAdmin = new Admin({
      name: name,
      email: email,
      password: password,
    });
    const savedAdmin = await newAdmin.save();
    res.status(201).json({ msg: "admin added" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.delAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;
    const admin = await Admin.find().limit(2);
    if (admin.length < 2)
      return res.status(400).json({ msg: "Cannot delete last admin" });
    const del = await Admin.deleteOne({ _id: adminId });
    res.status(200).json({ msg: "admin deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.changePass = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { adminId } = req.id;
    const admin = await Admin.findById(adminId);
    const IsMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!IsMatch)
      return res.status(400).json({ message: "incorrect password" });
    const newPassHash = bcrypt.hash(newPassword, 10);
    admin.password = newPassHash;
    await admin.save();
    res.status(200).json({ msg: "password changed" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getBiaxialData = async (req, res) => {
  try {
    const courses = await Course.find()
      .sort({
        "data.details.rating": -1,
        "data.details.numOfReviews": -1,
      })
      .limit(15);
    const data = courses.map((course) => {
      return {
        name: course.data.details.title,
        rating: course.data.details.rating,
        numOfReviews: course.data.details.numOfReviews,
      };
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.getPieChartData = async (req, res) => {
  try {
    const categories = await Course.aggregate([
      {
        $group: {
          _id: "$data.details.category",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    const formattedCategories = categories.map((cat) => ({
      category: cat._id,
      count: cat.count,
    }));

    res.json(formattedCategories);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getLineChartData = async (req, res) => {
  try {
    const growthData = await User.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }, // Change format to "%Y-%m" for monthly data
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } }, // Sort by date
    ]);

    res.json(growthData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTopSellingChartData = async (req, res) => {
  try {
    const users = await User.find();
    const soldCoursesArrays = users.map((user) => user.boughtCourses);
    const soldCourses = soldCoursesArrays.flat();
    const countMap = soldCourses.reduce((accumulator, item) => {
      if (accumulator[item]) {
        accumulator[item] += 1;
      } else {
        accumulator[item] = 1;
      }
      return accumulator;
    }, {});

    const result = Object.entries(countMap).map(([id, count]) => ({
      id,
      count,
    }));
    const top = result
      .sort((a, b) => (a.count > b.count ? -1 : 1))
      .slice(0, 15);
    const courseIds = top.map((item) => item.id);
    const courses = await Course.find({ _id: { $in: courseIds } });
    const shortCourseData = courses.map((course) => {
      return {
        id: course._id,
        title: course.data.details.title,
        price: course.data.details.price,
      };
    });

    const data = shortCourseData.map((course, indx) => {
      let sold = 0;
      top.forEach((obj) => {
        if (course.id.equals(obj.id)) {
          sold = obj.count;
        }
      });
      return {
        id: course.id,
        title: course.title,
        price: course.price,
        totalSales: sold,
        revenue: course.price * sold,
      };
    });

    const sorted = data.sort((a, b) => (a.totalSales > b.totalSales ? -1 : 1));
    res.json(sorted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSummary = async (req, res) => {
  try {
    const numberOfMentors = await Mentor.countDocuments({});
    const numberOfCourses = await Course.countDocuments({});
    const numberOfUsers = await User.countDocuments({});
    const numberOfVideos = await Video.countDocuments({});

    const users = await User.find().populate({
      path: "boughtCourses",
      select: "data.details.price",
    });

    let revenue = 0;
    users.forEach((user) => {
      user.boughtCourses.forEach((course) => {
        revenue += Math.floor(course.data.details.price);
      });
    });

    const data = [
      { category: "Mentors", count: numberOfMentors },
      { category: "Courses", count: numberOfCourses },
      { category: "Users", count: numberOfUsers },
      { category: "Videos", count: numberOfVideos },
      { category: "Revenue(K)", count: Math.floor(revenue / 1000) },
    ];

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserGrowth = async (req, res) => {
  try {
    // Get the date 7 days ago from now
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const userGrowth = await User.aggregate([
      { $match: { createdAt: { $gte: lastWeek } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const formattedData = userGrowth.map((data) => ({
      date: data._id,
      count: data.count,
    }));

    res.json(formattedData);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching user growth data." });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Categories.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delCategories = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const del = await Categories.deleteOne({ _id: categoryId });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addCategories = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = new Categories({ name: name });
    await newCategory.save();
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
