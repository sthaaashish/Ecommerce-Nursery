const express = require('express');
const router = express.Router();
const orderController=require("../Controller/orderController")
const checkUser=require('../MiddleWare/authCheck');

router.get('/api/order/all', checkUser.adminCheck, orderController.getAllOrder);

router.get('/api/order/user',  checkUser.userCheck, orderController.getOrderByUser);
router.get('/api/orderById/:id',  checkUser.userCheck,orderController.getOrderById);
router.post('/api/create-order', checkUser.userCheck,orderController.addOrder)

module.exports=router;