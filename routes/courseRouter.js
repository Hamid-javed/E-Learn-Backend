const router = require('express').Router()
const courseControl = require("../controller/courseControl");
const { verifyUserToken } = require('../middleware/authUser');


router.get("/featured",verifyUserToken, courseControl.featured),
router.get("/get/:id", courseControl.searchByID),
router.get("/get/:id/details", courseControl.searchByIDdetails),
router.get("/categories",verifyUserToken, courseControl.catagories);
router.get("/search",verifyUserToken, courseControl.search);
router.get("/search/categories",verifyUserToken, courseControl.searchCategory);
router.get("/saved", verifyUserToken, courseControl.getSavedCourse) 
router.post("/:courseId/saved",verifyUserToken, courseControl.addSaved) 
router.delete("/:courseId/saved", verifyUserToken, courseControl.deleteSaved) 
router.get("/bought-courses", verifyUserToken, courseControl.getBoughtCourse)
router.post("/:courseId/bought-courses", verifyUserToken, courseControl.buyCourse)
router.delete("/:courseId/bought-courses", verifyUserToken, courseControl.deleteBoughtCourse)
router.get('/:courseId/reviews', verifyUserToken, courseControl.getReviews)
router.post('/:courseId/reviews', verifyUserToken, courseControl.addReview)
router.delete('/:courseId/reviews', verifyUserToken, courseControl.deleteReview)
router.get('/:courseId/lessons', verifyUserToken, courseControl.getLessons)
router.post('/:courseId/lessonId/:lessonId/markdone',verifyUserToken, courseControl.markDone)
router.delete('/:courseId/lessonId/:lessonId/markdone',verifyUserToken, courseControl.markUnDone)
router.get('/:courseId/video/:videoId',  courseControl.getVideo)












module.exports = router;
