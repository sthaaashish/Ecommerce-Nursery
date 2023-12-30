const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});
const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    orderItems: [cartSchema],
    totalPrice:{
      type:Number,
      required:true
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", orderSchema);
