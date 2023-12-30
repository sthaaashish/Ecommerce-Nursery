const express = require("express");
const router = express.Router();
const authController = require("../Controller/authController");
const check = require("../MiddleWare/authCheck");
const validator = require("express-joi-validation").createValidator({});
const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
});

router.post(
  "/api/userLogin",
  validator.body(loginSchema),
  authController.userLogin
);
router.post("/api/userRegister", authController.userRegister);
router.patch("/api/user/update", check.userCheck, authController.userUpdate);

module.exports = router;
