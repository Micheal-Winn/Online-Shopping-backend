var express = require('express');
var router = express.Router();
const userController = require('../controller/userController')

router.post('/register',userController.registerUser)
router.post('/login',userController.loginUser)
router.get('/logout',userController.logoutUser)

module.exports = router;