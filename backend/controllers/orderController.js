import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../utils/catchAsync.js";
import {sendCreatedResponse, sendSuccessResponse} from "../utils/responses.js";

// Create new order
export const newOrder = catchAsyncErrors(async (req, res, next) => {

    const {shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body;
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    })

    return sendCreatedResponse("Order placed successfully", order, res);
})

// Get single order
export const getOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email")

    if (!order) return next(new ErrorHandler("Order not found", 404));

    return sendSuccessResponse("Order found successfully", order, res);
})

// Get all orders of logged-in user
export const getOrders = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.find({user: req.user._id}).populate("user", "name email")

    if (!order) return next(new ErrorHandler("Orders not found", 404));

    return sendSuccessResponse("Orders found successfully", order, res);
})

// Get all orders - admin
export const getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();

    if (!orders) return next(new ErrorHandler("Orders not found", 404));

    let totalPrice = 0;
    orders.forEach(order => totalPrice += order.totalPrice)

    return sendSuccessResponse("Orders found successfully", {orders, totalPrice}, res);
})

// Update order status - admin
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) return next(new ErrorHandler("Orders not found", 404));

    if (order.orderStatus === 'Delivered') return next(new ErrorHandler("You have already delivered this order", 404));

    for (const item of order.orderItems) {
        await updateStock(item.product, item.quantity);
    }

    const {status} = req.body;
    order.orderStatus = status;
    if (status === 'Delivered') order.deliveredAt = Date.now();

    await order.save({validateBeforeSave: false})
    return sendSuccessResponse("Orders updated successfully", order, res);
})

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    console.log(product)

    const remaining = product.stock - quantity;
    product.stock = remaining > 0 ? remaining : 0;

    await product.save({validateBeforeSave: false})
}

// Delete order - admin
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) return next(new ErrorHandler("Order not found", 404));

    await order.deleteOne();

    return sendSuccessResponse("Order deleted successfully", {}, res);
})