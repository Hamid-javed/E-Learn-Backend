const router = require("express").Router();
const mentorControl = require("../controller/mentorControl");
const { verifyUserToken } = require("../middleware/authUser");


// To get a mentors all data
router.get("/:mentorId/data",  mentorControl.getMentor);
// To get mentors about
router.get("/:mentorId/about", verifyUserToken, mentorControl.getMentorAbout);
// To get all courses of a mentor
router.get("/:mentorId/courses", verifyUserToken, mentorControl.getMentorCours);
// To all reviews of a mentor
router.get("/:mentorId/reviews",verifyUserToken, mentorControl.getMentorReviews);
// To to add a review to a mentor
router.post("/:mentorId/reviews", verifyUserToken, mentorControl.addMentorReviews);
// To allow a user to delete their review
router.delete("/:mentorId/reviews", verifyUserToken, mentorControl.delMentorReviews);


module.exports = router;
