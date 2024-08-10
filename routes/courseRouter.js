const router = require('express').Router()
const courseControl = require("../controller/courseControl");
const { verifyUserToken } = require('../middleware/authUser');


router.get("/courses", courseControl.searchApi),
router.get("/short-details", courseControl.shortDetails),
router.get("/serachById/:id", courseControl.searchByID),
router.get("/catagories", courseControl.catagories);
router.get("/search", courseControl.search);
router.get("/serach/categories", courseControl.searchCategory);
router.get("/saved", verifyUserToken, courseControl.getSavedCourse) 
router.post("/saved", verifyUserToken, courseControl.addSaved) 
router.delete("/saved", verifyUserToken, courseControl.deleteSaved) 
router.post("/bought-courses", verifyUserToken, courseControl.buyCourse)
router.delete("/deleteBuy-courses", verifyUserToken, courseControl.deleteBoughtCourse)
module.exports = router;
