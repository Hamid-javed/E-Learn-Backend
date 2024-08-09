const dataControl = require('../controller/dataControl')
const { verifyUserToken } = require('../middleware/authUser')
const router = require('express').Router()

router.get("/user-details",verifyUserToken, dataControl.userData)



module.exports = router;