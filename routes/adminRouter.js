const adminControl = require('../controller/adminControl')
const Admin = require("../models/adminSchema")
const { verifyAdminToken } = require('../middleware/authAdmin')
const router = require('express').Router()

router.post("/login", adminControl.Login)
router.post("/mentors/add",verifyAdminToken, adminControl.addMentor)
router.patch("/mentors/:mentorId/update",verifyAdminToken, adminControl.updataMentor)
router.delete("/mentors/:mentorId/delete",verifyAdminToken, adminControl.deleteMentor)
router.post("/mentors/:mentorId/add-course/:courseId",verifyAdminToken, adminControl.addMentorCourses)
router.delete("/mentors/:mentorId/add-course/:courseId",verifyAdminToken, adminControl.deleteMentorCourses)
router.post("/courses/add",verifyAdminToken, adminControl.addCourse)
router.delete("/courses/:courseId",verifyAdminToken, adminControl.delCourse)
router.patch("/courses/:courseId",verifyAdminToken, adminControl.updateCourse)
router.post("/courses/:courseId/add-mentor/:mentorId",verifyAdminToken, adminControl.addMentorToCourse)
router.post("/courses/:courseId/add-lesson",verifyAdminToken, adminControl.addLessonToCourse)


module.exports = router;