var express = require('express');
var router = express.Router();
const orderController = require('../controller/orderController')
const {isAuthenticatedUser, isAdmin} = require("../middleware/auth");

router.get('/admin/orders',isAuthenticatedUser,isAdmin,orderController.getAllOrder)
router.get('/orders/me',isAuthenticatedUser,orderController.myOrders)
router.get('/:id',isAuthenticatedUser,orderController.getSingleOrder)
router.post('/new',isAuthenticatedUser,orderController.createOrder)
router.put('/admin/:id',isAuthenticatedUser,isAdmin,orderController.updateOrder)
router.delete('/admin/:id',isAuthenticatedUser,isAdmin,orderController.deleteOrder)


module.exports = router