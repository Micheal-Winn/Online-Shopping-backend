const productServices = require('../services/productServices')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')

//Admin
async function getAllProducts(req,res)
{
   try {
       const allProducts = await productServices.getAll(req)
       res.status(200).json({success:true,
           allProducts
       })
   }catch (err){
       console.log(err)
       res.status(400).send({message:'No product Found!'})
   }
}

const getProductDetails = async (req,res,next)=> {
    const productId = req.params['id'];
    try {
        const product = await productServices.findById(productId)
        res.status(200).json({success: true, product,productCount})
    } catch (err) {
        res.status(400).send({message: err})
    }
}



//Admin
async function createProduct(req,res,next)
{

    try{
        req.body.user = req.user.id;
        const product = req.body;
        const newItem = await productServices.newProduct(product)
        res.status(201).json({
            success: true,
            newItem
        })
    }catch (err){
        console.log(err)
        res.status(400).send({message: "product cannot be created"});
    }



}

//Admin
async function updateProduct (req,res,next)
{
    const productId = req.params['id'];
    const product = req.body;
    try {
        const update = await productServices.updateById(productId,product)
        res.status(200).json({success:true,update})
    }catch (err){
        console.log(err)
        res.status(400).json({message:err})
    }

}

//Admin
const deleteProduct = async (req,res,next)=>
{
    try {
        const productId = req.params['id'];
        const product = await productServices.deleteById(productId)
        res.status(200).json({success:true,product})
    }catch (err){
        res.status(400).send({message:err})
    }

}

//Creating rewiew or update the review

const createProductReview = async (req,res,next)=>
{
    try {
        const {rating , comment, productId } = req.body;
        const review = {
            user : req.user.id,
            name : req.user.name,
            rating : Number(rating),
            comment
        }
        const product = await productServices.searchProduct(productId)
        console.log('product ' ,product)
        const isReviewed = product.reviews.find(rev=>rev.user.toString() === req.user.id.toString())
        if(isReviewed){
            product.reviews.forEach(rev => {
                if(rev=>rev.user.toString() === req.user.id.toString()){
                    (rev.rating = rating)
                    (rev.comment = comment)
                }
            })
        }else {
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length
        }
        //5+5+2+2 = 14 * 4(review.length)_
        let avg = 0;
        product.reviews.forEach((rev) => {
            avg += rev.rating;
        });

        product.ratings = avg / product.reviews.length;
        await product.save();
        res.status(201).json({
            success :true,
            product
        })
    }catch (e) {
        res.status(400).json({message : e.message})
    }
}




module.exports ={
    getAllProducts,
    getProductDetails,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview
}