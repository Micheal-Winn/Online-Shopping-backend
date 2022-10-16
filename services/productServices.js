const product = require('../model/products')
const ApiFeatures = require('../utils/apifeatures')
//Admin
async function getAll(req){
    const resultPerPage = 2;
    const productCount = await product.countDocuments()
    const apiFeature = new ApiFeatures(
        product.find(),
        req.query)
        .search()
        .filter()
    ;
    // return product.find()
    let products = await apiFeature.query
    let filteredProductsCount = products.length;
    apiFeature.pagination(resultPerPage)
    return{
        products,
        productCount,
        resultPerPage,
        filteredProductsCount

    };
}

const findById = async (productId)=>{
     const detailProduct = await product.findById(productId)
    return detailProduct
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

const searchProduct = async (productId)=>
{
    const searchProduct = product.findById(productId)
   return searchProduct

}

module.exports = {

    getAll,
    findById,
    newProduct,
    updateById,
    deleteById,
    searchProduct,

}