const fs = require("fs");
const Contact =require("../Model/contact")


module.exports.sendMessages = async (req, res) => {
  try {
  
    const newMessage = new Contact({
      fullname: req.body.fullname, 
      email: req.body.email,
      subject: req.body.subject, 
      message: req.body.message,
    });
    const savedMessage = await newMessage.save();

    return res.status(200).json(savedMessage);
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: `${err}`,
    });
  }
};