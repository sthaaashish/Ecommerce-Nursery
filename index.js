
const express = require("express");
const { default: mongoose } = require("mongoose");
const morgan = require("morgan");
const app = express();
const productRoute = require("./Routes/ProductRoute");
const authRoute = require("./Routes/authRoute");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const orderRoute=require("./Routes/orderRoute")
const contactRoute = require("./Routes/contactRoute");

mongoose.set('strictQuery', true);
mongoose
  .connect("mongodb+srv://asaashish345:stha01@cluster0.iiccqvj.mongodb.net/")
  .then((data) => {
    app.listen(5000, () => {});
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/upload", express.static("upload"));
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    abortOnLimit: true,
    createParentPath: true,
  })
);

app.use(productRoute);
app.use(authRoute);
app.use(orderRoute);
app.use(contactRoute);

app.use((req, res) => {
  return res.status(404).json({
    status: "error",
    message: "Not found",
  });
});