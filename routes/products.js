var express = require('express');
var router = express.Router();
const products = require('../controller/productController')
const {isAuthenticatedUser,isAdmin} = require("../middleware/auth");
/* GET users listing. */
router.get('/get',isAuthenticatedUser,products.getAllProducts);
router.get('/:id',isAuthenticatedUser,products.getProductDetails)
router.post('/admin/new',isAuthenticatedUser,isAdmin,products.createProduct);
router.post('/user/review',isAuthenticatedUser,products.createProductReview)
router.put('/admin/:id',isAuthenticatedUser,isAdmin,products.updateProduct)
router.delete('/admin/:id',isAuthenticatedUser,isAdmin,products.deleteProduct)

module.exports = router;
