
const orderServices = require('../services/orderServices')

const createOrder = async (req,res,next)=>
{
   try {
      const newOrder = req.body;
       const userId = req.user._id;
       newOrder.paidAt = Date.now();
       newOrder.user = userId
       const order = await orderServices.createOrder(newOrder)
      if(!order)throw Error('Order cannot be created')

       res.status(201).json({
           success:true,
           order
       })

   }catch (e) {
       res.status(400).json({message:e.message})
   }

}


const getSingleOrder = async (req,res,next)=>
{
   try {
       const orderId = req.params.id;
       const order = await orderServices.getSingleOrder(orderId)
       if(!order)throw Error('Order cannot be found with Id')
       res.status(200).json({success : true,order})
   }catch (e) {
       res.status(400).json({success : false,message : e.message})
   }

}
//LoggedIN user orders
const myOrders = async (req,res,next)=>
{
        const userId = req.user._id;
        const order = await orderServices.findAllOrders(userId)
        res.status(200).json({success : true,order})


}

module.exports = {
    createOrder,
    getSingleOrder,
    myOrders
}