const router = require("express").Router();
const authControll = require("../controller/authControl");
const middle = require("../controller/middle");

router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/register", authControll.register);
router.post("/login", authControll.login);
router.post("/logout", authControll.logout);
router.post("/request-otp", authControll.requestOtp);
router.post("/reset-password", authControll.resetPassword);
router.delete("/delete", authControll.deleteUser);

module.exports = router;
