const router = require('express').Router()
const searchControl = require("../controller/searchControl")



router.get("/courses", searchControl.searchApi)


module.exports = router