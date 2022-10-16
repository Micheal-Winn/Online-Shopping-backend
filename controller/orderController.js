
const orderServices = require('../services/orderServices')

const createOrder = async (req,res,next)=>
{
   try {
      const newOrder = req.body;
       const userId = req.user._id;
       const order = await orderServices.createOrder(newOrder,userId)
      if(!order)throw Error('Order cannot be created')

       res.status(201).json({
           success:true,
           order
       })

   }catch (e) {
       res.status(400).json({message:e.message})
   }

}

module.exports = {
    createOrder
}