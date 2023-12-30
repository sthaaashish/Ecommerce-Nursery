const Order = require("../Model/order");
const mongoose = require("mongoose");

module.exports.getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find({});
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: `${err}`,
    });
  }
};

module.exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById({ _id: req.params.id });
    return res.status(200).json(order);
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: `${err}`,
    });
  }
};

module.exports.getOrderByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId });
    return res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: "error",
      message: `${err}`,
    });
  }
};

module.exports.addOrder = async (req, res) => {
  const { orderItems, totalPrice } = req.body;
  try {
    await Order.create({
      user: req.userId,
      orderItems,
      totalPrice,
    });
    return res.status(200).json({
      status: "success",
      message: "successfully created",
    });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: `${err}`,
    });
  }
};
