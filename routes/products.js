var express = require('express');
var router = express.Router();
const products = require('../controller/productController')
const {isAuthenticatedUser,isAdmin} = require("../middleware/auth");
/* GET users listing. */
router.get('/get',isAuthenticatedUser,isAdmin,products.getAllProducts);
router.get('/:id',isAuthenticatedUser,products.getProductDetails)
router.post('/admin/new',isAuthenticatedUser,isAdmin,products.createProduct);
router.put('/admin/:id',isAuthenticatedUser,isAdmin,products.updateProduct)
router.delete('/admin/:id',isAuthenticatedUser,isAdmin,products.deleteProduct)

module.exports = router;
