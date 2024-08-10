const router = require('express').Router()
const mentorControl = require("../controller/mentorControl")
const { verifyUserToken } = require('../middleware/authUser');



router.get("/data", verifyUserToken, mentorControl.getMentor)





module.exports = router;