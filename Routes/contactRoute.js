
const express = require('express');
const router = express.Router();
 const checkUser=require("../MiddleWare/authCheck")
const contactController=require("../Controller/contactController")



router.post('/sendMessage',checkUser.userCheck, contactController.sendMessages)

module.exports = router;