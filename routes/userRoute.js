var express = require('express');
var router = express.Router();
const userController = require('../controller/userController')
const {isAuthenticatedUser} = require("../middleware/auth");

router.get('/me',isAuthenticatedUser,userController.getUserDetail)
router.post('/register',userController.registerUser)
router.post('/login',userController.loginUser)
router.post('/password/forgot',userController.forgotPassword)
router.put('/password/reset/:id/:token',userController.resetPassword)
router.put('/password/update',isAuthenticatedUser,userController.updatePassword)
router.put('/me/update',isAuthenticatedUser,userController.updateUserProfileData)
router.get('/logout',userController.logoutUser)

module.exports = router;