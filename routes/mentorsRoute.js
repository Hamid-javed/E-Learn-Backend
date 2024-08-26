const router = require("express").Router();
const mentorControl = require("../controller/mentorControl");
const { verifyUserToken } = require("../middleware/authUser");


// To get a mentors all data
router.get("/data/:mentorId",verifyUserToken,  mentorControl.getMentor);
// To get mentors about
router.get("/about/:mentorId", verifyUserToken, mentorControl.getMentorAbout);
// To get all courses of a mentor
router.get("/courses/:mentorId", verifyUserToken, mentorControl.getMentorCours);
// To all reviews of a mentor
router.get("/reviews/:mentorId",verifyUserToken, mentorControl.getMentorReviews);
// To to add a review to a mentor
router.post("/reviews/:mentorId", verifyUserToken, mentorControl.addMentorReviews);
// To allow a user to delete their review
router.delete("/reviews/:mentorId", verifyUserToken, mentorControl.delMentorReviews);


module.exports = router;
