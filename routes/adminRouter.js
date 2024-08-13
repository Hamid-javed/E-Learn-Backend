const adminControl = require('../controller/adminControl')
const mentorControl = require('../controller/mentorControl')
const courseControl = require("../controller/courseControl")
const { verifyAdminToken } = require('../middleware/authAdmin')
const router = require('express').Router()


router.post("/login", adminControl.Login)
router.get("/mentors/:mentorId/get", verifyAdminToken, mentorControl.getMentor)
router.get("/mentors/get", verifyAdminToken, adminControl.getMentors)
router.post("/mentors/add", verifyAdminToken, adminControl.addMentor)
router.post("/mentors/:mentorId/add-socialplatform", verifyAdminToken, adminControl.addMentorSocialData)
router.delete("/mentors/:mentorId/add-socialplatform", verifyAdminToken, adminControl.deleteMentorSocialData)
router.patch("/mentors/:mentorId/update", verifyAdminToken, adminControl.updataMentor)
router.delete("/mentors/:mentorId/delete", verifyAdminToken, adminControl.deleteMentor)
router.post("/mentors/:mentorId/add-course/:courseId", verifyAdminToken, adminControl.addMentorCourses)
router.delete("/mentors/:mentorId/del-course/:courseId", verifyAdminToken, adminControl.deleteMentorCourses)
router.delete("/mentors/:mentorId/del-review/:reviewId", verifyAdminToken, adminControl.deleteMentorReviews)
router.get('/courses/search', verifyAdminToken, courseControl.search)
router.get("/courses/:id/get", verifyAdminToken, courseControl.searchByID),
router.post("/courses/add", verifyAdminToken, adminControl.addCourse)
router.patch("/courses/:courseId", verifyAdminToken, adminControl.updateCourse)
router.delete("/courses/:courseId", verifyAdminToken, adminControl.delCourse)
router.post("/courses/:courseId/add-mentor/:mentorId", verifyAdminToken, adminControl.addMentorToCourse)
router.post("/courses/:courseId/add-lesson", verifyAdminToken, adminControl.addLessonToCourse)
router.get("/users", verifyAdminToken, adminControl.user)
router.delete("/users/:userId", verifyAdminToken, adminControl.deletUser)
router.delete("/courses/:courseId/del-review/:reviewId", adminControl.deletReview)
router.patch("/courses/:courseId/update", verifyAdminToken, adminControl.updateCourse)
router.post("/courses/:courseId/add-mentor/:mentorId", verifyAdminToken, adminControl.addMentorToCourse)
router.post("/courses/:courseId/add-lesson", verifyAdminToken, adminControl.addLessonToCourse)
router.delete("/courses/:courseId/del-lesson/:lessonId", verifyAdminToken, adminControl.delLessonFromCourse)
router.post("/videos/add-video", verifyAdminToken, adminControl.addVideo)
router.delete("/videos/:videoId", verifyAdminToken, adminControl.delVideo)
router.get("/videos", verifyAdminToken, adminControl.getVideos)





module.exports = router;