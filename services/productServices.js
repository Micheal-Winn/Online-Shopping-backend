const product = require('../model/products')
const ApiFeatures = require('../utils/apifeatures')
//Admin
async function getAll(req){
    const resultPerPage = 5;
    const productCount = await product.countDocuments()
    const apiFeature = new ApiFeatures(
        product.find(),
        req.query)
        .search()
        .filter()
        .pagination(resultPerPage)
    ;
    // return product.find()
    const products = await apiFeature.query
    return products;
}

const findById = async (productId)=>{
     const detailProduct = await product.findById(productId)
    return {detailProduct,productCount}
}
//Admin
async function newProduct(req)
{
    const newProductItem = await product.create(req);
    return newProductItem;
}
//Admin
async function updateById(productId,newProduct)
{
    const updateProduct = await product.findByIdAndUpdate(productId,newProduct,{new:true,});
    return updateProduct;
}

const deleteById = async (productId)=>
{
    const deleteProduct = await product.findByIdAndDelete(productId)
    return deleteProduct
}


module.exports = {

    getAll,
    findById,
    newProduct,
    updateById,
    deleteById
}