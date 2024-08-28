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
router.get("/mentors/get", adminControl.getMentors)
router.get("/mentors/reviews", adminControl.getAllMentorReviews)
router.get("/courses/reviews", adminControl.getAllCourseReviews)
// To add mentor
router.post("/mentors/add",  adminControl.addMentor)
// To updata mentor
router.patch("/mentors/:mentorId/update", adminControl.updataMentor)
// To delete a mentor
router.delete("/mentors/:mentorId/delete", adminControl.deleteMentor)
// To add social media platform to mentor
router.post("/mentors/:mentorId/add-socialplatform", verifyAdminToken, adminControl.addMentorSocialData)
// To delete social media platform to mentor
router.delete("/mentors/:mentorId/del-socialplatform", verifyAdminToken, adminControl.deleteMentorSocialData)
// to add mentor courses
router.post("/mentors/:mentorId/add-course/:courseId", verifyAdminToken, adminControl.addMentorCourses)
// to delete mentor courses
router.delete("/mentors/:mentorId/del-course/:courseId", verifyAdminToken, adminControl.deleteMentorCourses)
// To delete mentor reviews
router.delete("/mentors/:mentorId/del-review/:reviewId", adminControl.deleteMentorReviews)
// to search all/by querry also courses
router.get('/courses/search', courseControl.search)
// To get single course by ID
router.get("/courses/:id/get", verifyAdminToken, courseControl.searchByID),
router.get("/courses/:courseId/reviews", adminControl.getReviews),
router.get("/mentors/:mentorId/reviews", adminControl.getMentorReviews),
// To add a new course 
router.post("/courses/add", adminControl.addCourse)
// To update a course
router.patch("/courses/:courseId/update",  adminControl.updateCourse)
// To delete a course
router.delete("/courses/:courseId", adminControl.delCourse)
// To delete a review
router.delete("/courses/:courseId/del-review/:reviewId", adminControl.deletReview)
// To add mentor to a course
router.post("/courses/:courseId/add-mentor/:mentorId", verifyAdminToken, adminControl.addMentorToCourse)
// To add lesson to a course
router.post("/courses/:courseId/add-lesson", verifyAdminToken, adminControl.addLessonToCourse)
// To delete lesson from a course
router.delete("/courses/:courseId/del-lesson/:lessonId", verifyAdminToken, adminControl.delLessonFromCourse)
// To get all users
router.get("/users", adminControl.user)
// To delete a user
router.delete("/users/:userId",  adminControl.deletUser)
// To get all videos/by querry also 
router.get("/videos", adminControl.getVideos)
router.get("/videos/:videoId", adminControl.getVideo)
// To add a new video
router.post("/videos/add-video",  adminControl.addVideo)
// To delete a video
router.delete("/videos/:videoId",  adminControl.delVideo)
router.patch("/videos/:videoId",  adminControl.updVideo)
router.get("/get/admins",  adminControl.getAdmins)
router.post("/admin/add",  adminControl.addAdmin)
router.delete("/admin/del/:adminId",  adminControl.delAdmin)
router.delete("/admin/change-password",verifyAdminToken,  adminControl.changePass)
router.get("/charts/biaxial",  adminControl.getBiaxialData)
router.get("/charts/piechart",  adminControl.getPieChartData)
router.get("/charts/linechart",  adminControl.getLineChartData)
router.get("/charts/top-selling-courses",  adminControl.getTopSellingChartData)
router.get("/charts/info-summary",  adminControl.getSummary)
router.get("/charts/user-growth",  adminControl.getUserGrowth)
router.get("/categories/get",  adminControl.getCategories)
router.delete("/categories/del/:categoryId",  adminControl.delCategories)
router.post("/categories/add",  adminControl.addCategories)
router.get("/categories", courseControl.catagories);



















module.exports = router;