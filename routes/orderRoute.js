var express = require('express');
var router = express.Router();
const orderController = require('../controller/orderController')
const {isAuthenticatedUser, isAdmin} = require("../middleware/auth");

router.post('/new',isAuthenticatedUser,orderController.createOrder)



module.exports = router