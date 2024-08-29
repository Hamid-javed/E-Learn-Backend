const router = require('express').Router()
const courseControl = require("../controller/courseControl");
const { verifyUserToken } = require('../middleware/authUser');

// To get featured courses
router.get("/featured", verifyUserToken, courseControl.featured),
// TO get a course by Id
router.get("/get/:id",verifyUserToken, courseControl.searchByID),
// To get a course by Id (short details)
router.get("/get/details/:id",verifyUserToken, courseControl.searchByIDdetails),
// To get all categories
router.get("/categories", verifyUserToken, courseControl.catagories);
// To search courses (query, categories, page, limit, sortOrder, sortField)
router.get("/search", verifyUserToken, courseControl.search);
// To get courses in specific categories and search (query, categories, page, limit, sortOrder, sortField)
router.get("/search/categories", verifyUserToken, courseControl.searchCategory);
// To get saved courses of a user
router.get("/saved", verifyUserToken, courseControl.getSavedCourse)
// To add a course to saved courses
router.post("/saved/:courseId", verifyUserToken, courseControl.addSaved)
// To check saved courses
router.post("/checksaved/:courseId", verifyUserToken, courseControl.checkSaved)
// To delete a course from saved courses 
router.delete("/saved/:courseId", verifyUserToken, courseControl.deleteSaved)
// To get all bought courses of a user
router.get("/bought-courses", verifyUserToken, courseControl.getBoughtCourse)
// To check bought courses
router.get("/checkbought/:courseId", verifyUserToken, courseControl.checkBought)
// To add a course to bought courses
router.post("/bought-courses/:courseId", verifyUserToken, courseControl.buyCourse)
// To delete a course from bought users
router.delete("/bought-courses/:courseId", verifyUserToken, courseControl.deleteBoughtCourse)
// To get all reviews of course
router.get('/reviews/:courseId', verifyUserToken, courseControl.getReviews)
// To add review to a course
router.post('/reviews/:courseId', verifyUserToken, courseControl.addReview)
// To delete a review from a course
router.delete('/reviews/:courseId', verifyUserToken, courseControl.deleteReview)
// To get all lessons of a course
router.get('/lessons/:courseId', verifyUserToken, courseControl.getLessons)
// To mark a lesson as done
router.post('/:courseId/lessonId/:lessonId/markdone', verifyUserToken, courseControl.markDone)
// To mark a lesson as undone
router.delete('/:courseId/lessonId/:lessonId/markdone', verifyUserToken, courseControl.markUnDone)
// To get a lesson video

router.delete('/:courseId/review/:reviewId', verifyUserToken, courseControl.verifyReview)













module.exports = router;
