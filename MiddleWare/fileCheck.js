const path = require("path");
const fs = require("fs");

module.exports.fileCheck = (req, res, next) => {
  console.log(req.file?.product_image);
  console.log(req.file);
  if (req.files?.property_image) {
    const file = req.files.property_image;
    const validExts = [".jpg", ".jpeg", ".png"];
    if (validExts.includes(path.extname(file.name))) {
      file.mv(`./upload/${file.name}`, (err) => {
        if (err) {
        }
        req.property_image = `/upload/${file.name}`;

        return next();
      });
    } else {
      return res.status(400).json({
        status: "error",
        message: `please provide valid image`,
      });
    }
  } else {
    return res.status(400).json({
      status: "error",
      message: `please provide image`,
    });
  }
};

module.exports.updateCheck = (req, res, next) => {

  if (req.files?.product_image && req.body?.imagePath) {



    const file = req.files.product_image;
    const validExts = ['.jpg', '.jpeg', '.png'];
    if (validExts.includes(path.extname(file.name))) {
      file.mv(`./upload/${file.name}`, (err) => {
        if (err) {

        }

        fs.unlink(`.${req.body.imagePath}`, (err) => {

        })

        req.product_image = `/upload/${file.name}`;

        return next();
      });


    } else {
      return res.status(400).json({
        status: 'error',
        message: `please provide valid image`
      });
    }




  } else {
    next();
  }







}
