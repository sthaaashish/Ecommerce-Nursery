const User = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.userLogin = async (req, res) => {
    const { email, password } = req.body;
  try {
    const userExist = await User.findOne({
      email: email,
    });
    if (userExist) {
      const validPassword = bcrypt.compareSync(password, userExist.password);
      if (validPassword) {
        const token = jwt.sign(
          { id: userExist._id, isAdmin: userExist.isAdmin },
          "stha2121"
        );
        return res.status(200).json({
          token,
          email,
          fullname:userExist.fullname,
          shippingAddress: userExist.shippingAddress,
          isAdmin: userExist.isAdmin,
        });
      } else {
        return res.status(404).json({
          status: "error",
          message: "invalid credentials",
        });
      }
    } else {
      return res.status(404).json({
        status: "error",
        message: "user doesnot exist",
      });
    }
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: `${err}`,
    });
  }
};

module.exports.userRegister = async (req, res) => {
    const { email, password,fullname} = req.body;
    try{
        const userExist=await User.findOne({email})
        if(userExist){
            return res.status(404).json({
                status:"error",
                message:"email already exist"
            })
        }else{
            const hassPass=await bcrypt.hash(password,12);
            await User.create({
                email,
                password:hassPass,
                fullname
            })
            return res.status(200).json({
                status:"success",
                message:"succesfully registered1"
            })
        }

    }catch(err){
        return res.status(400).json({
            status: "error",
            message: `${err}`,
        })
    }
}

module.exports.userUpdate = async (req, res) => {
  try {

    const userExist = await User.findOne({ _id: req.userId });
    if (userExist) {
      userExist.fullname = req.body.fullname || userExist.fullname;
      userExist.email = req.body.email || userExist.email;
      userExist.shippingAddress = req.body.shippingAddress || userExist.shippingAddress;

      userExist.save();

      return res.status(201).json({
        status: 'success',
        message: `successfully updated`
      });

    } else {

      return res.status(404).json({
        status: 'error',
        message: `user not found`
      });
    }


  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }

};


