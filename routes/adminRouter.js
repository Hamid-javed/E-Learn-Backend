const adminControl = require('../controller/adminControl')
const mentorControl = require('../controller/mentorControl')
const courseControl = require("../controller/courseControl")
const { verifyAdminToken } = require('../middleware/authAdmin')
const router = require('express').Router()

// To login admin
router.post("/login", adminControl.Login)
// To get single mentor by id
router.get("/mentors/:mentorId/get", verifyAdminToken, mentorControl.getMentor)
// to get all mentors
router.get("/mentors/get", verifyAdminToken, adminControl.getMentors)
// To add mentor
router.post("/mentors/add", verifyAdminToken, adminControl.addMentor)
// To updata mentor
router.patch("/mentors/:mentorId/update", verifyAdminToken, adminControl.updataMentor)
// To delete a mentor
router.delete("/mentors/:mentorId/delete", verifyAdminToken, adminControl.deleteMentor)
// To add social media platform to mentor
router.post("/mentors/:mentorId/add-socialplatform", verifyAdminToken, adminControl.addMentorSocialData)
// To delete social media platform to mentor
router.delete("/mentors/:mentorId/add-socialplatform", verifyAdminToken, adminControl.deleteMentorSocialData)
// to add mentor courses
router.post("/mentors/:mentorId/add-course/:courseId", verifyAdminToken, adminControl.addMentorCourses)
// to delete mentor courses
router.delete("/mentors/:mentorId/del-course/:courseId", verifyAdminToken, adminControl.deleteMentorCourses)
// To delete mentor reviews
router.delete("/mentors/:mentorId/del-review/:reviewId", verifyAdminToken, adminControl.deleteMentorReviews)
// to search all/by querry also courses
router.get('/courses/search', verifyAdminToken, courseControl.search)
// To get single course by ID
router.get("/courses/:id/get", verifyAdminToken, courseControl.searchByID),
// To add a new course 
router.post("/courses/add", verifyAdminToken, adminControl.addCourse)
// To update a course
router.patch("/courses/:courseId/update", verifyAdminToken, adminControl.updateCourse)
// To delete a course
router.delete("/courses/:courseId", verifyAdminToken, adminControl.delCourse)
// To delete a review
router.delete("/courses/:courseId/del-review/:reviewId", adminControl.deletReview)
// To add mentor to a course
router.post("/courses/:courseId/add-mentor/:mentorId", verifyAdminToken, adminControl.addMentorToCourse)
// To add lesson to a course
router.post("/courses/:courseId/add-lesson", verifyAdminToken, adminControl.addLessonToCourse)
// To delete lesson from a course
router.delete("/courses/:courseId/del-lesson/:lessonId", verifyAdminToken, adminControl.delLessonFromCourse)
// To get all users
router.get("/users", verifyAdminToken, adminControl.user)
// To delete a user
router.delete("/users/:userId", verifyAdminToken, adminControl.deletUser)
// To get all videos/by querry also 
router.get("/videos", verifyAdminToken, adminControl.getVideos)
// To add a new video
router.post("/videos/add-video", verifyAdminToken, adminControl.addVideo)
// To delete a video
router.delete("/videos/:videoId", verifyAdminToken, adminControl.delVideo)





module.exports = router;