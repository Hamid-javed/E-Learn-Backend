const router = require("express").Router();
const mentorControl = require("../controller/mentorControl");
const { verifyUserToken } = require("../middleware/authUser");

router.get("/:mentorId/data",  mentorControl.getMentor);
router.get("/:mentorId/about", verifyUserToken, mentorControl.getMentorAbout);
router.get("/:mentorId/courses", verifyUserToken, mentorControl.getMentorCours);
router.get("/:mentorId/reviews",verifyUserToken, mentorControl.getMentorReviews);
router.post("/:mentorId/reviews", verifyUserToken, mentorControl.addMentorReviews);
router.delete("/:mentorId/reviews", verifyUserToken, mentorControl.delMentorReviews);


module.exports = router;
