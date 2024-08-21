const router = require("express").Router();
const authControll = require("../controller/authControl");
const { verifyUserToken } = require("../middleware/authUser");


// To register a user
router.post("/", authControll.register);
// To sign in with google
router.post("/signin-google", authControll.googleAuth);
// To login in a user
router.post("/login", authControll.login);
// To change user details 
router.patch("/change-details", verifyUserToken, authControll.changeDetails)
// To sign a user out
router.post("/signout", authControll.SignOut);
// To request otp for password change
router.post("/request-otp", authControll.requestOtp);
// To reset password (with otp)
router.post("/reset-password", authControll.resetPassword);
// To change password using old password
router.post("/change-password", verifyUserToken, authControll.changePassword);
// To to delete a user accout
router.delete("/delete", verifyUserToken, authControll.deleteUser);
// To get user details
router.get("/user-details", verifyUserToken, authControll.userData)
// to check
router.get("/check", verifyUserToken,  authControll.check)




module.exports = router;
