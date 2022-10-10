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
    const product = req.body;
    try{
        const newitem = await productServices.newProduct(product)
        res.status(201).json({
            success: true,
            newitem
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
    const productId = req.params['id'];
    try {
        const product = await productServices.deleteById(productId)
        res.status(200).json({success:true,product})
    }catch (err){
        res.status(400).send({message:err})
    }

}


module.exports ={
    getAllProducts,
    getProductDetails,
    createProduct,
    updateProduct,
    deleteProduct
}