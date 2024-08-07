const router = require("express").Router();
const authControll = require("../controller/authControl");

router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/register", authControll.register);
router.post("/login", authControll.login);

module.exports = router;
