const Order = require('../model/orderModel')

const createOrder = async (req)=>
{
    const order = await new Order(req)
    return order.save()
}

const getSingleOrder = async (id)=>
{
    const order = await Order.findById(id).populate('User','name email')
    return order
}
const findAllOrders = async (id)=>
{
    const order = await Order.find(id)
    return order
}

module.exports = {
    createOrder,
    getSingleOrder,
    findAllOrders
}