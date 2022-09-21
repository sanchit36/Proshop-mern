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
  });
  res.status(201).json(order);
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
