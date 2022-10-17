var express = require('express');
var router = express.Router();
const userController = require('../controller/userController')
const {isAuthenticatedUser, isAdmin} = require("../middleware/auth");

router.get('/admin/users',isAuthenticatedUser,isAdmin,userController.getAllUsers)
router.get('/admin/user/:id',isAuthenticatedUser,isAdmin,userController.getSingleUserById)
router.get('/me',isAuthenticatedUser,userController.getUserDetail)
router.get('/logout',userController.logoutUser)
router.post('/register',userController.registerUser)
router.post('/login',userController.loginUser)
router.post('/password/forgot',userController.forgotPassword)
router.put('/admin/user/:id',isAuthenticatedUser,isAdmin,userController.updateUserRole)
router.put('/password/reset/:id/:token',userController.resetPassword)
router.put('/password/update',isAuthenticatedUser,userController.updatePassword)
router.put('/me/update',isAuthenticatedUser,userController.updateUserProfileData)
router.delete('/admin/user/:id',isAuthenticatedUser,isAdmin,userController.deleteUser)
console.log('hello')

module.exports = router;