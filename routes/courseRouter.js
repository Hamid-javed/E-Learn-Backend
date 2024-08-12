const router = require('express').Router()
const courseControl = require("../controller/courseControl");
const { verifyUserToken } = require('../middleware/authUser');


router.get("/courses",verifyUserToken, courseControl.searchApi),
router.get("/featured",verifyUserToken, courseControl.featured),
router.get("/searchById/:id",verifyUserToken, courseControl.searchByID),
router.get("/catagories",verifyUserToken, courseControl.catagories);
router.get("/search",verifyUserToken, courseControl.search);
router.get("/serach/categories",verifyUserToken, courseControl.searchCategory);
router.get("/saved", verifyUserToken, courseControl.getSavedCourse) 
router.post("/saved", verifyUserToken, courseControl.addSaved) 
router.delete("/saved", verifyUserToken, courseControl.deleteSaved) 
router.post("/bought-courses", verifyUserToken, courseControl.buyCourse)
router.get("/bought-courses", verifyUserToken, courseControl.getBoughtCourse)
router.delete("/bought-courses", verifyUserToken, courseControl.deleteBoughtCourse)
router.post('/reviews', verifyUserToken, courseControl.addReview)
router.delete('/reviews', verifyUserToken, courseControl.deleteReview)




module.exports = router;
