
const orderServices = require('../services/orderServices')
const product = require('../model/products')


async function updateStock(id,quantity){
    const updatedProduct = await product.findById(id);
    console.log('updatedPrdocuct',updatedProduct)
    updatedProduct.stock = updatedProduct.stock - quantity;
    await updatedProduct.save();
}


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

//user
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
        const orders = await orderServices.myOrders(userId)
        res.status(200).json({success : true,orders})


}
// GetAllOrder --- Admin (dashboard)
const getAllOrder = async (req,res,next)=>
{
    const orders = await orderServices.findAllOrders()
    let totalAmount = 0;

    orders.forEach((order)=>{
        totalAmount += order.totalPrice
    })
    res.status(200).json({success : true,orders,
    totalAmount})


}

//update Order Status -- Admin
const updateOrder = async (req,res,next)=>
{
    try {
        const orderId = req.params.id
        const status = req.body.status
        const orders = await orderServices.getOrderById(orderId)

        if(orders.orderStatus === "Delivered") throw Error("Your order has been delivered");

        for (const order of orders.orderItems) {
            await updateStock(order.product,order.quantity)
        }
        // orders.forEach(async (o)=>({
        //     await updateStock(o.product,o.quantity)
        // }))

        orders.orderStatus = status;
        if(req.body.status === "Delievered"){
            orders.deliverAt = Date.now()
        }
        const updatedOrder = await orders.save()

        res.status(200).json({success :true,updatedOrder})
    }catch (e) {
        res.status(400).json({success:false, message :e.message})
    }
}

//delete Order

const deleteOrder = async (req,res,next)=>
{
   try {
       const orderId = req.params.id
       const order = await orderServices.getOrderById(orderId)
       if(!order)throw Error('Order cannot be found with Id')

       await order.remove()

       res.status(200).json({success: true})
   }catch (e) {
       res.status(400).json({success:false,message:e.message})
   }
}




module.exports = {
    createOrder,
    getSingleOrder,
    myOrders,
    getAllOrder,
    updateOrder,
    deleteOrder
}