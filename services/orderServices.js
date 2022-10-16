const Order = require('../model/orderModel')

const createOrder = async (req)=>
{
    const order = new Order(
        {req,paidAt:Date.now()
        })
    return order.save()
}

module.exports = {
    createOrder
}