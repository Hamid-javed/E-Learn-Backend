const router = require('express').Router()
const courseControl = require("../controller/courseControl");
const { verifyUserToken } = require('../middleware/authUser');

// To get featured courses
router.get("/featured",verifyUserToken, courseControl.featured),
// TO get a course by Id
router.get("/get/:id", courseControl.searchByID),
// To get a course by Id (short details)
router.get("/get/:id/details", courseControl.searchByIDdetails),
// To get all categories
router.get("/categories",verifyUserToken, courseControl.catagories);
// To search courses (query, categories, page, limit, sortOrder, sortField)
router.get("/search",verifyUserToken, courseControl.search);
// To get courses in specific categories and search (query, categories, page, limit, sortOrder, sortField)
router.get("/search/categories",verifyUserToken, courseControl.searchCategory);
// To get saved courses of a user
router.get("/saved", verifyUserToken, courseControl.getSavedCourse) 
// To add a course to saved courses
router.post("/:courseId/saved",verifyUserToken, courseControl.addSaved) 
// To delete a course from saved courses 
router.delete("/:courseId/saved", verifyUserToken, courseControl.deleteSaved) 
// To get all bought courses of a user
router.get("/bought-courses", verifyUserToken, courseControl.getBoughtCourse)
// To add a course to bought courses
router.post("/:courseId/bought-courses", verifyUserToken, courseControl.buyCourse)
// To delete a course from bought users
router.delete("/:courseId/bought-courses", verifyUserToken, courseControl.deleteBoughtCourse)
// To get all reviews of course
router.get('/:courseId/reviews', verifyUserToken, courseControl.getReviews)
// To add review to a course
// todo check
router.post('/:courseId/reviews', verifyUserToken, courseControl.addReview)
// To delete a review from a course
router.delete('/:courseId/reviews', verifyUserToken, courseControl.deleteReview)
// To get all lessons of a course
router.get('/:courseId/lessons', verifyUserToken, courseControl.getLessons)
// To mark a lesson as done
router.post('/:courseId/lessonId/:lessonId/markdone',verifyUserToken, courseControl.markDone)
// To mark a lesson as undone
router.delete('/:courseId/lessonId/:lessonId/markdone',verifyUserToken, courseControl.markUnDone)
// To get a lesson video
router.get('/:courseId/video/:videoId',  courseControl.getVideo)












module.exports = router;
