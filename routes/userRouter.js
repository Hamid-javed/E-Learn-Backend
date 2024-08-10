const router = require("express").Router();
const authControll = require("../controller/authControl");
const { verifyUserToken } = require("../middleware/authUser");

router.post("/register", authControll.register);
router.post("/signin-google", authControll.googleAuth);
router.post("/login", authControll.login);
router.post("/change-details", verifyUserToken , authControll.changeDetails)
router.post("/signout", authControll.SignOut);
router.post("/request-otp", authControll.requestOtp);
router.post("/reset-password", authControll.resetPassword);
router.post("/change-password", verifyUserToken, authControll.changePassword);
router.delete("/delete", verifyUserToken, authControll.deleteUser);



module.exports = router;
