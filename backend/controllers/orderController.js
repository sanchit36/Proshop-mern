import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import AppError from '../utils/appError.js';

// @desc Create new order
// @route POST /api/orders
// @access Private
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    throw new AppError('No order items', 400);
    return;
  }

  const order = await Order.create({
    orderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });
  res.status(201).json({ _id: order._id });
});

// @desc Get order by id
// @route GET /api/orders/:id
// @access Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) res.status(201).json(order);
  else throw new AppError('Order not found', 404);
});

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else throw new AppError('Order not found', 404);
});

// @desc Get logged in user orders
// @route PUT /api/orders/my-orders
// @access Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc Get all orders
// @route PUT /api/orders
// @access Private/Admin
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'name email');
  res.json(orders);
});
