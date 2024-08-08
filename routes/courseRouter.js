const router = require("express").Router();
const courseControl = require("../controller/courseControl");

router.get("/courses", courseControl.searchApi);
router.get("/catagories", courseControl.catagories);
router.get("/search", courseControl.search);
router.get("/serach/categories", courseControl.searchCategory);

module.exports = router;
