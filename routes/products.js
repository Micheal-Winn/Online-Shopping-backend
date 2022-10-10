var express = require('express');
var router = express.Router();
const products = require('../controller/productController')
/* GET users listing. */
router.get('/get',products.getAllProducts);
router.get('/:id',products.getProductDetails)
router.post('/new',products.createProduct);
router.put('/:id',products.updateProduct)
router.delete('/:id',products.deleteProduct)

module.exports = router;
