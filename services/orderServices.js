const Order = require('../model/orderModel')

const createOrder = async (req)=>
{
    const order = await new Order(req)
    return order.save()
}

const getSingleOrder = async (id)=>
{
    const order = await Order.findById(id).populate('user','name email')
    return order
}
const myOrders = async (id)=>
{
    const order = await Order.find({user:id})
    return order
}

const findAllOrders = async ()=>
{
    const orders = await Order.find()
    return orders
}

const getOrderById = async (id)=>
{
    const orders = await Order.findById(id)
    if(!orders) throw Error("Orders cannot be found")
    return orders
}

module.exports = {
    createOrder,
    getSingleOrder,
    myOrders,
    findAllOrders,
    getOrderById
}