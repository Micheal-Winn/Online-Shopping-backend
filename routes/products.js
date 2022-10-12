var express = require('express');
var router = express.Router();
const products = require('../controller/productController')
const {isAuthenticatedUser,isAdmin} = require("../middleware/auth");
/* GET users listing. */
router.get('/get',isAuthenticatedUser,isAdmin,products.getAllProducts);
router.get('/:id',isAuthenticatedUser,products.getProductDetails)
router.post('/new',isAuthenticatedUser,products.createProduct);
router.put('/:id',products.updateProduct)
router.delete('/:id',products.deleteProduct)

module.exports = router;
